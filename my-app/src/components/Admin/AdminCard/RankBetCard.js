import React, { useContext, useEffect, useState } from "react";
import BarChart from "../../Bets/BetCard/BarChart";
import axios from "axios";
import { UidContext } from "../../AppContext";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

const RankBetCard = ({ rankBet, getRankBets }) => {
  const [error, setError] = useState();
  const uid = useContext(UidContext);

  const [ranking, setRanking] = useState([]);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [buttonState, setButtonState] = useState("");
  const [userRankBet, setUserRankBet] = useState();
  const [loadsUserRankBet, setLoadsUserRankBet] = useState(true);

  const handleTeamSelect = (event, index) => {
    let teamName = event.target.value;
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
  };

  const handleDeleteTeam = (index) => {
    let position = index + 1;
    let newRanking = ranking.filter((team) => team.position !== position);
    newRanking.sort((a, b) => a.position - b.position);
    setRanking(newRanking);
  };

  useEffect(() => {
    if (loadsUserRankBet) {
      getUserRankBet();
    }

    let now = new Date();
    let competitionDate = new Date(rankBet.competition_date);
    let oneHourBefore = new Date(competitionDate.getTime() - 60 * 60 * 1000);
    let oneDayAfter = new Date(competitionDate.getTime() + 24 * 60 * 60 * 1000);

    if (now < oneHourBefore) {
      setButtonState("before");
    } else if (now < competitionDate) {
      setButtonState("ongoing");
    } else if (now < oneDayAfter) {
      setButtonState("after");
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
            setLoadsUserRankBet(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const closeBet = () => {
    if (ranking.length !== 5) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {(uid.uid || rankBet.teamScores) && (
        <li className="rank-bet-card" key={rankBet._id}>
          <div className="competition-type">
            {rankBet.competition_type.toUpperCase()}
          </div>
          {buttonState !== "after" && rankBet.live === "open" ? (
            <>
              <h1> ! Rentre les résultats !</h1>

              <div className="select-player-container">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="teams">
                    <span className="index">#{i + 1}</span>
                    <div className="black-background">
                      <select
                        id={`select-player-${i}`}
                        onChange={(event) => handleTeamSelect(event, i)}
                      >
                        <option value="">
                          {ranking &&
                          ranking.find(
                            (team) => team && team.position === i + 1
                          )
                            ? `${
                                ranking.find(
                                  (team) => team && team.position === i + 1
                                ).name
                              }`
                            : "Sélectionner une équipe"}
                        </option>

                        {rankBet.teams && rankBet.teams.length > 0
                          ? rankBet.teams
                              .filter(
                                (team) =>
                                  !ranking.find(
                                    (rankedTeam) =>
                                      rankedTeam &&
                                      rankedTeam.name === team.name
                                  )
                              )
                              .map((team) => {
                                return (
                                  <>
                                    <option key={team.name} value={team.name}>
                                      {team.name}- ({team.joueur1} et{" "}
                                      {team.joueur2})
                                    </option>
                                  </>
                                );
                              })
                          : null}
                      </select>
                      <span
                        className="delete-team"
                        onClick={() => handleDeleteTeam(i)}
                      >
                        <FaTimes />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="primary-button" onClick={() => closeBet()}>
                VALIDER
              </button>
            </>
          ) : buttonState === "ongoing" ? (
            <>
              <p>Tournoi en cours</p>
              <h1>{moment(rankBet.competition_date).format("DD/MM/YYYY")}</h1>
            </>
          ) : buttonState === "before" ? (
            <>
              <p>Tournoi à venir</p>
              <h1>{moment(rankBet.competition_date).format("DD/MM/YYYY")}</h1>
            </>
          ) : null}

          {rankBet.live === "closed" && (
            <>
              <h1> Paris Closed </h1>
              <h2> Les résultats </h2>
              <div className="ranking-container">
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
                {showAllTeams ? "Afficher moins" : "Afficher plus"}
              </button>
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default RankBetCard;
