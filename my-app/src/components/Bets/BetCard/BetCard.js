import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

import axios from "axios";
import { UidContext } from "../../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoins, faUser } from "@fortawesome/free-solid-svg-icons";
const BetCard = ({ bet, getBets }) => {
  const [teamAscore, setTeamAscore] = useState(Number);
  const [teamBscore, setTeamBscore] = useState(Number);
  const [mise, setMise] = useState(Number);
  const [confirmationBox, showConfirmationBox] = useState(false);
  //const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);

  const TeamBetPrediction = (betArray) => {
    let result = new Object();

    let sizeArray = betArray.length;
    result.Apc =
      (betArray.filter((value) => value === "A").length / sizeArray) * 100;
    result.Bpc =
      (betArray.filter((value) => value === "B").length / sizeArray) * 100;
    result.A = betArray.filter((value) => value === "A").length;
    result.B = betArray.filter((value) => value === "B").length;
    return result;
  };
  const betScore = (bet) => {
    ////validation
    if (!teamAscore || !teamBscore) {
      alert("aucun score rentré");
      return "aucun score rentré";
    }
    if (!mise) {
      alert("aucune mise rentrée");
      return "aucune mise rentrée";
    }
    if (teamAscore == teamBscore) {
      alert("T'es bourré ou quoi ? Les matchs nul n'existe pas");
      return "match nul impossible";
    }

    if (mise > uid.coins) {
      alert("Petit filou, tu ne peux pas te permettre un tel paris");
      return "Fond insuffisant";
    }

    if (teamAscore > 5 || teamBscore > 5) {
      alert("T'exagères pas un peu sur les scores ? C'est pas du tennis");
      return "Score > 5";
    }
    if (teamAscore > teamBscore) {
      var victoireEquipePrediction = "A";
    } else {
      var victoireEquipePrediction = "B";
    }
    alert("Confirmer ? ");
    axios({
      method: "post",
      url: `api/bet/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        gameID: bet._id,
        type: bet.type,
        ligue: bet.ligue,
        round: bet.round,
        group: bet.group,
        nomEquipeA: bet.nomEquipeA,
        joueursEquipeA: bet.joueursEquipeA,
        betScoreEquipeA: teamAscore,
        nomEquipeB: bet.nomEquipeB,
        betScoreEquipeB: teamBscore,
        joueursEquipeB: bet.joueursEquipeB,
        coteEquipeA: bet.coteEquipeA,
        coteEquipeB: bet.coteEquipeB,
        victoireEquipePrediction: victoireEquipePrediction,
        mise: mise,
      },
    })
      .then((res) => {
        alert("Paris pris en compte ");
        //setUserBets(res.data.docs.usersBet);
        getBets();
        uid.updateCoins();
        showConfirmationBox(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <li className="bet-card" key={bet._id}>
        <h3 className="team-name">
          {bet.nomEquipeA} - {bet.nomEquipeB}
        </h3>
        <h4 className="competition-name">{bet.ligue}</h4>
        <h5 className="group-name">{bet.group}</h5>
        <div className="team-A-container  team-container">
          <p className="team-A-player1 player">{bet.joueursEquipeA[0]}</p>
          <p className="team-A-player2 player">{bet.joueursEquipeA[1]}</p>
          <p className="team-A-cote team-cote">{bet.coteEquipeA}</p>
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-A">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Apc.toFixed(
                0 //
              )}
              {"%"}
              {/* {"% - "}

              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).A}
              <FontAwesomeIcon icon={faUser} className="icon" /> */}
            </p>
          )}
        </div>
        <div className="team-B-container  team-container">
          <p className="team-B-player1 player">{bet.joueursEquipeB[0]}</p>
          <p className="team-B-player2 player">{bet.joueursEquipeB[1]}</p>
          <p className="team-B-cote team-cote">{bet.coteEquipeB}</p>
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-A">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Bpc.toFixed(
                0 //1
              )}
              {"%"}
              {/* {"% - "}

              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).B}
              <FontAwesomeIcon icon={faUser} className="icon" /> */}
            </p>
          )}
        </div>

        {
          //!userBets.includes(uid.uid) &&
          !bet.usersBet.includes(uid.uid) &&
            bet.live !== "closed" && ( //!userBets.includes(uid) && !bet.usersBet.includes(uid)
              <div className="bet-zone">
                <div className="bet-score-container-A bet-score-container">
                  <input
                    type="number"
                    onChange={(e) => setTeamAscore(e.target.value)}
                    max="5"
                    min="0"
                    // placeholder={teamAscore ? teamAscore : bet.coteEquipeA}
                  />
                </div>

                <div className="bet-score-container-B bet-score-container">
                  <input
                    type="number"
                    onChange={(e) => setTeamBscore(e.target.value)}
                    max="5"
                    min="0"
                    // placeholder={teamBscore ? teamBscore : bet.coteEquipeB}
                  />
                </div>
                <div className="mise">
                  <input
                    type="number"
                    onChange={(e) => setMise(e.target.value)}
                    placeholder="Mise"
                    max={uid.coins}
                    min="0"
                  />
                  <span>
                    {mise}
                    <FontAwesomeIcon icon={faCoins} className="icon" />
                  </span>
                </div>
                <button className="btn-parier" onClick={() => betScore(bet)}>
                  {/* showConfirmationBox(true)*/}
                  Parier
                </button>
                {/* {confirmationBox && (
                  <div classname="confirmation-box">
                    <p>Confirmez votre paris ? (dffff)</p>
                    <p> Résultat : {bet.nomEquipeA} {teamAscore} - {teamBscore}{" "}{bet.nomEquipeB}</p>
                    <p> Mise : {mise} </p>
                  </div>
                )} */}
              </div>
            )
        }
        {bet.live !== "closed" &&
          bet.usersBet.includes(uid.uid) && ( //userBets.includes(uid.uid) ||
            <p className="already-bet">
              <FontAwesomeIcon icon={faCheck} /> DÉJA PARIÉ
            </p>
          )}
        {bet.live === "closed" && (
          <p className="already-bet">
            <FontAwesomeIcon icon={faCheck} /> CLOSED
          </p>
        )}
      </li>
    </>
  );
};

export default BetCard;
