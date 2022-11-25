import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CreateBet from "../CreateBet";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminLeftNav from "../../Navbar/AdminLeftNav";
import { IsAdmin } from "../../../utils/Utils";
import Home from "../../../pages/Home";
const LigueParisienne = () => {
  const [competition, setCompetition] = useState("Ligue parisienne");
  const [numberOfGroup, setNumberOfGroup] = useState();
  const [GroupNames, setGroupNames] = useState([]);
  const [teams, setTeams] = useState([]);

  const [error, setError] = useState("");

  const [loadBets, setLoadBets] = useState(true);
  const [bets, setBets] = useState([]);
  const [teamAcote, setTeamACote] = useState();
  const [teamBcote, setTeamBCote] = useState();
  const [teamAscore, setTeamAscore] = useState();
  const [teamBscore, setTeamBscore] = useState();

  const [betsToDisplay, setBetsToDisplay] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  console.log(query.get("groupName"));
  let GroupName = query.get("groupName");

  const getBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/getLigueParisienne`,
    })
      .then((res) => {
        console.log("coucou", res.data);
        setBets(res.data);
        setBetsToDisplay(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const modifyBet = (bet) => {
    if (!teamAcote || !teamBcote) {
      alert("aucune côte rentrée");
      return "aucune côte rentrée";
    }
    axios({
      method: "put",
      url: `api/bet/modifyBet/${bet._id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        // // type: "match",
        // // ligue: "parisienne",
        // // round: "groupStage",
        // // nomEquipeA: bet.nomEquipeA,
        // // joueursEquipeA: bet.joueursEquipeA,
        // scoreEquipeA: teamAscore,
        // // nomEquipeB: bet.nomEquipeB,
        // scoreEquipeB: teamBscore,
        // // joueursEquipeB: bet.joueursEquipeB,
        coteEquipeA: teamAcote,
        coteEquipeB: teamBcote,
      },
    })
      .then((res) => {
        console.log("coucou", res.data);
        alert("Côte mise à jour");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeBet = (bet) => {
    if (!teamAscore || !teamBscore) {
      alert("aucun score rentré");
      return "aucun score rentré";
    }

    if (teamAscore == teamBscore) {
      alert("match nul impossible");
      return "match nul impossible";
    }
    if (window.confirm("Confirmer?")) {
    } else {
      return "abort";
    }

    axios({
      method: "put",
      url: `api/bet/closeBet/${bet._id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        finalScoreEquipeA: teamAscore,
        finalScoreEquipeB: teamBscore,
      },
    })
      .then((res) => {
        alert("bet closed");
        getBets();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadBets) {
      getBets();
    }
    if (GroupName && bets) {
      if (GroupName === "Ligue Parisienne") {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.ligue === GroupName;
          })
        );
      } else if (GroupName === "autres") {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.type === "autre";
          })
        );
      } else {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.group === GroupName;
          })
        );
      }
    }
  }, [loadBets, bets, GroupName]);

  return (
    <>
      {IsAdmin() ? (
        <>
          <AdminLeftNav />
          <div className="admin-bets">
            {betsToDisplay.length > 0 &&
              betsToDisplay
                .sort((a, b) => (a.live < b.live ? 1 : -1))
                .map((bet) => {
                  return (
                    <>
                      <li className="admin-bet-card" key={bet.nomEquipeA}>
                        {/* <h3>
                  {bet.nomEquipeA}-{bet.nomEquipeB}
                </h3>

                <p>{bet.group}</p>

                <p>{bet.nomEquipeA}</p>
                <p>{bet.joueursEquipeA[0]}</p>
                <p>{bet.joueursEquipeA[1]}</p>
                <p>{bet.nomEquipeB}</p>
                <p>{bet.joueursEquipeB[0]}</p>
                <p>{bet.joueursEquipeB[1]}</p>
                <p>{teamAcote ? teamAcote : bet.coteEquipeA}</p>
                <p>{teamBcote ? teamBcote : bet.coteEquipeB}</p> */}
                        <h3 className="team-name">
                          {bet.nomEquipeA} - {bet.nomEquipeB}
                        </h3>
                        <h4 className="competition-name"> {bet.ligue}</h4>
                        <h5 className="group-name"> {bet.group}</h5>
                        <div className="team-A-container  team-container">
                          <p className="team-A-player1">
                            {bet.joueursEquipeA[0]}
                          </p>
                          <p className="team-A-player2">
                            {" "}
                            {bet.joueursEquipeA[1]}
                          </p>
                        </div>
                        <div className="team-B-container  team-container">
                          <p className="team-B-player1">
                            {bet.joueursEquipeB[0]}
                          </p>
                          <p className="team-B-player2">
                            {" "}
                            {bet.joueursEquipeB[1]}
                          </p>
                        </div>

                        <input
                          type="number"
                          className="bet-cote"
                          onChange={(e) => setTeamACote(e.target.value)}
                          placeholder={teamAcote ? teamAcote : bet.coteEquipeA}
                        />
                        <input
                          type="number"
                          className="bet-cote"
                          onChange={(e) => setTeamBCote(e.target.value)}
                          placeholder={teamBcote ? teamBcote : bet.coteEquipeB}
                        />
                        <input
                          type="number"
                          className="score"
                          onChange={(e) => setTeamAscore(e.target.value)}
                          placeholder={
                            bet.finalScoreEquipeA
                              ? bet.finalScoreEquipeA
                              : "score"
                          }
                        />
                        <input
                          type="number"
                          className="score"
                          onChange={(e) => setTeamBscore(e.target.value)}
                          placeholder={
                            bet.finalScoreEquipeB
                              ? bet.finalScoreEquipeB
                              : "score"
                          }
                        />

                        {bet.live !== "closed" && (
                          <>
                            <button
                              className="btn btn-modif-cote"
                              onClick={() => modifyBet(bet)}
                            >
                              modifier
                            </button>
                            <button
                              className="btn btn-cloturer-paris"
                              onClick={() => closeBet(bet)}
                            >
                              clôturer
                            </button>
                          </>
                        )}
                        {bet.live === "closed" && (
                          <p className="already-bet">
                            <FontAwesomeIcon icon={faLock} /> CLOSED
                          </p>
                        )}
                      </li>
                    </>
                  );
                })}
            <br />
          </div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default LigueParisienne;
