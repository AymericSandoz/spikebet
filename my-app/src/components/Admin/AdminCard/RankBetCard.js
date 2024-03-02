import React, { useContext, useEffect, useState } from "react";
import BarChart from "../../Bets/BetCard/BarChart";
import axios from "axios";
import { UidContext } from "../../AppContext";
import { FaTimes } from "react-icons/fa";
import moment from "moment";
import TeamList from "../../Bets/BetCard/TeamsList";
import { MdAdd } from "react-icons/md";
import Select from "react-select";

const RankBetCard = ({ rankBet, getRankBets }) => {
  const [error, setError] = useState();
  const uid = useContext(UidContext);
  const [search, setSearch] = useState("");

  const [ranking, setRanking] = useState([]);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [TournamentState, setTournamentState] = useState("");
  const [userRankBet, setUserRankBet] = useState();
  const [loadsUserRankBet, setLoadsUserRankBet] = useState(true);
  const [teamListVisibility, setTeamListVisibility] = useState(
    Array(5).fill(false)
  );
  const [buttonState, setButtonState] = useState("waiting");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleTeamSelect = (event, index, mobile = false) => {
    let teamName;
    if (!mobile) {
      if (!event) {
        // If selectedOption is null, remove the team from the ranking
        setRanking(ranking.filter((team) => team.position !== index + 1));
        return;
      }
      teamName = event.value;
    } else if (mobile) {
      teamName = event.name;
    }
    // Update ranking state
    let newRanking = [...ranking];
    const position = index + 1; // Add 1 to length because array index starts from 0

    // Find the team at the same position
    const existingTeamIndex = newRanking.findIndex(
      (team) => team.position === position
    );

    if (existingTeamIndex !== -1) {
      // If a team at the same position is found, update it
      newRanking[existingTeamIndex] = {
        name: teamName,
        position: position,
      };
    } else {
      // If no team at the same position is found, add a new one
      newRanking.push({
        name: teamName,
        position: position,
      });
    }
    newRanking.sort((a, b) => a.position - b.position);
    setRanking(newRanking);

    if (mobile) {
      toggleTeamListVisibility(index);
    }
  };

  const toggleTeamListVisibility = (index) => {
    const updatedVisibility = [...teamListVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setTeamListVisibility(updatedVisibility);
    setSelectedOptionIndex(index);
  };

  const handleDeleteTeam = (index) => {
    let position = index + 1;
    let newRanking = ranking.filter((team) => team.position !== position);
    newRanking.sort((a, b) => a.position - b.position);
    setRanking(newRanking);
  };

  const options =
    rankBet.teams && rankBet.teams.length > 0
      ? rankBet.teams
          .filter(
            (team) =>
              !ranking.find(
                (rankedTeam) => rankedTeam && rankedTeam.name === team.name
              )
          )
          .sort((a, b) => (b.aymeric_cote || 0) - (a.aymeric_cote || 0))
          .map((team) => ({
            value: team.name,
            label: `${team.name} - (${team.joueur1} et ${team.joueur2})`,
          }))
      : [];

  useEffect(() => {
    if (loadsUserRankBet) {
      getUserRankBet();
    }

    let now = new Date();
    let competitionDate = new Date(rankBet.competition_date);
    let oneHourBefore = new Date(competitionDate.getTime() - 60 * 60 * 1000);
    let oneDayAfter = new Date(competitionDate.getTime() + 24 * 60 * 60 * 1000);

    if (now < oneHourBefore) {
      setTournamentState("before");
    } else if (now >= oneHourBefore && now < oneDayAfter) {
      setTournamentState("ongoing");
    } else if (now >= oneDayAfter) {
      setTournamentState("after");
    }
  }, []);

  // get user rank bet if exists
  const getUserRankBet = () => {
    if (uid.uid) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_SERVER_URL}api/bet/getUserRankBet/${rankBet._id}`,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          if (res.data) {
            setUserRankBet(res.data);

            // charger ranking avec les données de userrankbet cotenu dans userRanking
            let newRanking = [];
            if (res.data.userRanking.length > 0) {
              res.data.userRanking.forEach((team) => {
                newRanking.push({
                  name: team.name,
                  position: team.position,
                });
              });
            }
            setRanking(newRanking);

            setLoadsUserRankBet(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeBet = () => {
    setButtonState("loading");
    setError("");
    if (ranking.length !== 5) {
      setButtonState("error");
      setError(`Ohhhh ! C'est un top 5 par un top ${ranking.length} !`);
      return;
    }

    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/closeRankBet/${rankBet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { ranking },
    })
      .then((res) => {
        getRankBets();
        setButtonState("success");
      })
      .catch((err) => {
        console.log(err);
        setButtonState("error");
      });
  };

  return (
    <>
      {(uid.uid || rankBet.teamScores) && (
        <li className="rank-bet-card" key={rankBet._id}>
          <div className="competition-type">
            {rankBet.competition_type.toUpperCase()}
          </div>
          {/* Pour modifier le tournoi en mode debug il enlever par TournamentState === "after" */}
          {/* {TournamentState === "after" && rankBet.live === "open" ? ( */}
          {TournamentState === "after" && rankBet.live === "open" ? (
            <>
              <h1> ! Rentre les résultats !</h1>

              <div className="select-player-container">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="teams">
                    <span className="index">#{i + 1}</span>

                    <div className="no-mobile">
                      <div className="flex-centered">
                        <Select
                          id={`select-player-${i}`}
                          className="select-player-item"
                          options={options.filter(
                            (option) =>
                              !ranking.find(
                                (rank) => rank.name === option.value
                              )
                          )}
                          isSearchable
                          isClearable
                          onChange={(event) => handleTeamSelect(event, i)}
                          placeholder={
                            ranking &&
                            ranking.find(
                              (team) => team && team.position === i + 1
                            )
                              ? `${
                                  ranking.find(
                                    (team) => team && team.position === i + 1
                                  ).name
                                }`
                              : "Sélectionner une équipe"
                          }
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "black",
                              color: "white",
                              width: "400px",
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "white",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              backgroundColor: "black",
                              color: "white",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused
                                ? "grey"
                                : "black",
                              color: "white",
                            }),
                            input: (provided) => ({
                              ...provided,
                              color: "white",
                            }),
                          }}
                        />
                      </div>
                    </div>
                    <div className="black-background">
                      <div className="mobile-only" style={{ width: "100%" }}>
                        <div className="select-player">
                          <div
                            id={`select-player-${i}`}
                            onClick={() => toggleTeamListVisibility(i)}
                            style={{ cursor: "pointer" }}
                          >
                            {ranking &&
                            ranking.find(
                              (team) => team && team.position === i + 1
                            ) ? (
                              <div className="flex-centered">
                                {" "}
                                <div className="icon-add">
                                  <MdAdd />
                                </div>{" "}
                                {
                                  ranking.find(
                                    (team) => team && team.position === i + 1
                                  ).name
                                }
                              </div>
                            ) : (
                              <div className="flex-centered">
                                {" "}
                                <div className="icon-add">
                                  <MdAdd />
                                </div>{" "}
                                <span className="small-mobile-only">
                                  Équipe
                                </span>
                                <span className="not-small-visible">
                                  Sélectionner une équipe
                                </span>
                              </div>
                            )}
                          </div>
                          <div
                            className="delete-team flex-centered"
                            onClick={() => handleDeleteTeam(i)}
                          >
                            <FaTimes />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`primary-button ${buttonState}`}
                onClick={() => closeBet()}
              >
                VALIDER
              </button>
            </>
          ) : TournamentState === "ongoing" ? (
            <>
              <p>Tournoi en cours</p>
              <h1>{moment(rankBet.competition_date).format("DD/MM/YYYY")}</h1>
            </>
          ) : TournamentState === "before" ? (
            <>
              <p className="tournament-to-come">Tournoi à venir</p>
              <h1>{moment(rankBet.competition_date).format("DD/MM/YYYY")}</h1>
            </>
          ) : null}

          {rankBet.live === "closed" && (
            <>
              <h1> Paris Closed </h1>
              <h2> Les résultats </h2>
              <div>
                {rankBet.resultRanking.map((team) => {
                  return (
                    <>
                      <p>
                        {team.position} - {team.name}
                      </p>
                    </>
                  );
                })}
              </div>
            </>
          )}

          {error && <p className="bet-error">{error}</p>}
          {rankBet.teamScores && (
            <div className="bar-chart-container">
              <h1>Ceux que les autres ont parié</h1>
              <BarChart data={rankBet.teamScores} showAllTeams={showAllTeams} />
              <button
                className="display-more-button"
                onClick={() => setShowAllTeams(!showAllTeams)}
              >
                {rankBet.teamScores.length > 5
                  ? showAllTeams
                    ? "Afficher moins"
                    : "Afficher plus"
                  : null}
              </button>
            </div>
          )}
        </li>
      )}
      {teamListVisibility[selectedOptionIndex] && (
        <TeamList
          teams={rankBet.teams
            .filter(
              (team) =>
                !ranking.find(
                  (rankedTeam) => rankedTeam && rankedTeam.name === team.name
                )
            )
            .sort((a, b) => (b.aymeric_cote || 0) - (a.aymeric_cote || 0))}
          handleTeamSelect={handleTeamSelect}
          toggleTeamListVisibility={toggleTeamListVisibility}
          index={selectedOptionIndex}
        />
      )}
    </>
  );
};

export default RankBetCard;
