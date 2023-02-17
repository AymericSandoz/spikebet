import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminCombinedBetCard = ({ combinedBet, getCombinedBets }) => {
  const [victoriousTeamCombo1, setVictoriousTeamCombo1] = useState();
  const [victoriousTeamCombo2, setVictoriousTeamCombo2] = useState();
  const [victoriousTeamCombo3, setVictoriousTeamCombo3] = useState();

  const closeCombinedBet = () => {
    if (
      !victoriousTeamCombo1 ||
      !victoriousTeamCombo2 ||
      !victoriousTeamCombo3
    ) {
      alert("résultats non rentrés");
      return "erreur, résultats non rentrés";
    }

    let resultCombinaison =
      victoriousTeamCombo1 + victoriousTeamCombo2 + victoriousTeamCombo3;

    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/closeCombinedBet/${combinedBet._id}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: {
        resultCombinaison: resultCombinaison,
      },
    })
      .then((res) => {
        alert("combined bet closed");
        getCombinedBets();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <li className="combined-betcard" key={combinedBet._id}>
        <p className="prize">
          {" "}
          Cash prize : {combinedBet.prize}{" "}
          <FontAwesomeIcon icon={faCoins} className="icon" />
        </p>
        <div className="combined-bet combined-bet-1">
          <h3 className="team-name">
            {combinedBet.game1.nomEquipeA} - {combinedBet.game1.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game1.competition}</h4>

          <div
            className={
              victoriousTeamCombo1 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container "
            }
            onClick={() => setVictoriousTeamCombo1("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game1.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game1.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo1 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo1("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game1.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game1.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>
        <div className="combined-bet combined-bet-2">
          <h3 className="team-name">
            {combinedBet.game2.nomEquipeA} - {combinedBet.game2.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game2.competition}</h4>

          <div
            className={
              victoriousTeamCombo2 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo2("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game2.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game2.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo2 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo2("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game2.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game2.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>
        <div className="combined-bet combined-bet-3">
          <h3 className="team-name">
            {combinedBet.game3.nomEquipeA} - {combinedBet.game3.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game3.competition}</h4>

          <div
            className={
              victoriousTeamCombo3 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo3("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game3.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game3.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo3 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo3("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game3.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game3.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>
        <button className="btn-confirmer" onClick={() => closeCombinedBet()}>
          Confirmer
        </button>
      </li>
    </>
  );
};

export default AdminCombinedBetCard;
