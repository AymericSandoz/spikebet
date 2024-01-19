import React, { useContext, useEffect, useState } from "react";
import BarChart from "./BarChart";
import axios from "axios";
import { UidContext } from "../../AppContext";
import { FaTimes } from "react-icons/fa";

const RankBetCard = ({ rankBet, getRankBets }) => {
  const [error, setError] = useState();
  const uid = useContext(UidContext);

  const [ranking, setRanking] = useState([]);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [buttonState, setButtonState] = useState("");
  const [userRankBet, setUserRankBet] = useState();
  const [loadsUserRankBet, setLoadsUserRankBet] = useState(true);

  const handleTeamSelect = (event, index) => {
    console.log("index", index);
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
    console.log("ranking", newRanking);
  };

  const handleDeleteTeam = (index) => {
    let position = index + 1;
    console.log("position", position);
    // Update ranking state
    console.log("ranking", ranking);
    let newRanking = ranking.filter((team) => team.position !== position);
    console.log("newRanking", newRanking);
    // sort newRanking by position
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
            console.log("userRankBet", res.data);
            setLoadsUserRankBet(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const bet = () => {
    if (ranking.length !== 5) {
      console.log("erreur : Le top 5 n'est pas complet");

      const randomErrorNumber = Math.floor(Math.random() * 4);
      if (randomErrorNumber === 0)
        setError("Tu ne sais pas compter jusqu'à 5 ?");
      else if (randomErrorNumber === 1) setError("Tu dois ajouter 5 équipes");
      else if ((randomErrorNumber) => 2)
        setError(`Ohhhh ! C'est un top 5 par un top ${ranking.length} !`);

      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets/${rankBet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { ranking: ranking, prize: rankBet.prize },
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
          {buttonState === "before" && uid.uid ? (
            <>
              {!rankBet.userIdArray.includes(uid.uid) ? (
                <h1>QUEL EST TON PRONOSTIC ?</h1>
              ) : (
                <h1>TON PARI</h1>
              )}

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
              {uid.uid && rankBet.userIdArray.includes(uid.uid) ? (
                <button className="primary-button" onClick={() => bet()}>
                  MODIFIER
                </button>
              ) : (
                <button className="primary-button" onClick={() => bet()}>
                  VALIDER
                </button>
              )}
            </>
          ) : buttonState === "ongoing" ? (
            <p>Tournoi en cours</p>
          ) : buttonState === "after" ? (
            <p>Tournoi terminé</p>
          ) : null}
          {!uid.uid && <p>Connecte toi pour parier !</p>}

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
