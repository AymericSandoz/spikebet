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
import {
  faArrowAltCircleRight,
  faCheck,
  faCircleCheck,
  faCoins,
  faEye,
  faEyeDropper,
  faSmile,
  faSmileWink,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import RPLogo from "../../../images/Roundnet_Paris.png";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
const BetCard = ({ bet, getBets }) => {
  //const [teamAscore, setTeamAscore] = useState(Number);
  //const [teamBscore, setTeamBscore] = useState(Number);
  const [victoriousTeam, setVictoriousTeam] = useState();
  const [mise, setMise] = useState(Number);
  const [error, setError] = useState(String);
  const [confirmationBox, showConfirmationBox] = useState(false);
  const [validation, showValidation] = useState(false);

  //const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);
  let navigate = useNavigate();
  const logRedirection = () => {
    let path = `/log`;
    navigate(path);
  };

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

  const checkForBetError = (bet) => {
    // if (!teamAscore || !teamBscore) {
    //   //alert("aucun score rentré");
    //   setError("Hop hop hop, t'as pas oublié de rentrer le score ?");
    //   return "aucun score rentré";
    // } else
    if (!mise || mise == 0) {
      //alert("aucune mise rentrée");
      setError("Tu dois rentrer une mise");
      return "aucune mise rentrée";
    } else if (!victoriousTeam) {
      setError("Hop hop hop, t'as pas oublié de rentrer le score ?");
      return "aucun score rentré";
    }
    // else if (teamAscore == teamBscore) {
    //   //alert("T'es bourré ou quoi ? Les matchs nul n'existe pas");
    //   setError("T'es bourré ou quoi ? Les matchs nul n'existe pas");
    //   return "match nul impossible";
    // }
    else if (mise > uid.coins) {
      //alert("Petit filou, tu ne peux pas te permettre un tel paris");
      setError("Petit filou, tu ne peux pas te permettre un tel paris");
      return "Fond insuffisant";
    }
    // else if (teamAscore > 5 || teamBscore > 5) {
    //   //alert("T'exagères pas un peu sur les scores ? C'est pas du tennis");
    //   setError("T'exagères pas un peu sur les scores ? C'est pas du tennis");
    //   return "Score > 5";
    // }

    setError(null);
    showConfirmationBox(true);
  };
  const betScore = (bet) => {
    ////validation

    // if (teamAscore > teamBscore) {
    //   var victoireEquipePrediction = "A";
    // } else {
    //   victoireEquipePrediction = "B";
    // }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        gameID: bet._id,
        type: bet.type,
        ligue: bet.ligue,
        round: bet.round,
        group: bet.group,
        nomEquipeA: bet.nomEquipeA,
        joueursEquipeA: bet.joueursEquipeA,
        // betScoreEquipeA: teamAscore,
        nomEquipeB: bet.nomEquipeB,
        // betScoreEquipeB: teamBscore,
        joueursEquipeB: bet.joueursEquipeB,
        coteEquipeA: bet.coteEquipeA,
        coteEquipeB: bet.coteEquipeB,
        victoireEquipePrediction: victoriousTeam,
        mise: mise,
      },
    })
      .then((res) => {
        showValidation(true);
        //setUserBets(res.data.docs.usersBet);

        setTimeout(() => {
          getBets();
          uid.updateCoins();
          showConfirmationBox(false);
          showConfirmationBox(false);
          setError(null);
          setMise(null);
          setVictoriousTeam(null);
          // setTeamAscore(null);
          // setTeamBscore(null);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <>
      <li className="bet-card" key={bet._id}>
        <NavLink
          className="link-to-bet"
          to={{ pathname: `/bet/${bet._id}` }}
          state={{ bet: bet }}
        >
          <FontAwesomeIcon icon={faEye} className="icon" />
        </NavLink>
        {bet.ligue == "Ligue Parisienne" && (
          <img
            className="Logo-club Logo-RP"
            src={RPLogo}
            alt="Logo Roundnet Paris"
          />
        )}
        <h3 className="team-name">
          {bet.nomEquipeA} - {bet.nomEquipeB}
        </h3>
        <h4 className="competition-name">{bet.ligue}</h4>
        <h5 className="group-name">{bet.group}</h5>
        <div className="team-A-container  team-container">
          <p className="team-A-player1 player">{bet.joueursEquipeA[0]}</p>
          <p className="team-A-player2 player">{bet.joueursEquipeA[1]}</p>
          {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
        </div>
        <div className="team-B-container  team-container">
          <p className="team-B-player1 player">{bet.joueursEquipeB[0]}</p>
          <p className="team-B-player2 player">{bet.joueursEquipeB[1]}</p>
          {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
        </div>

        <div className="bet-zone">
          <div
            className={
              victoriousTeam && victoriousTeam == "A"
                ? "bet-score-container-A bet-score-container bet-clicked"
                : "bet-score-container-A bet-score-container"
            }
            onClick={() => setVictoriousTeam("A")}
          >
            <p className="bet-zone-team-name">{bet.nomEquipeA}</p>
            <p className="team-A-cote team-cote">{bet.coteEquipeA}</p>
          </div>
          <div
            className={
              victoriousTeam && victoriousTeam == "B"
                ? "bet-score-container-B bet-score-container bet-clicked"
                : "bet-score-container-B bet-score-container"
            }
            onClick={() => setVictoriousTeam("B")}
          >
            <p className="bet-zone-team-name">{bet.nomEquipeB}</p>
            <p className="team-B-cote team-cote">{bet.coteEquipeB}</p>
          </div>
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-A winner-prediction">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Apc.toFixed(
                0 //1
              )}
              {"%"}
              {/* {"% - "}

              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).B}
              <FontAwesomeIcon icon={faUser} className="icon" /> */}
            </p>
          )}
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-B winner-prediction">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Bpc.toFixed(
                0 //
              )}
              {"%"}
              {/* {"% - "}

              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).A}
              <FontAwesomeIcon icon={faUser} className="icon" /> */}
            </p>
          )}

          {uid.uid &&
            //!userBets.includes(uid.uid) &&
            !bet.usersBet.includes(uid.uid) &&
            bet.live !== "closed" && ( //!userBets.includes(uid) && !bet.usersBet.includes(uid)
              <>
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

                <button
                  className="btn-parier"
                  onClick={() => checkForBetError(bet)}
                >
                  {/* betScore(bet)*/}
                  Parier
                </button>
                {error && (
                  <span className="bet-error">
                    {" "}
                    {error} <FontAwesomeIcon icon={faSmileWink} />{" "}
                  </span>
                )}
              </>
            )}
        </div>

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
        {/* {!uid.uid && bet.live !== "closed" && (
          <button href="" className="connection-link" onClick={logRedirection}>
            {" "}
            connecte toi pour parier{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </button>
        )} */}
      </li>
      {confirmationBox && (
        <div className="confirmation-box">
          {!validation && (
            <>
              <FontAwesomeIcon
                icon={faXmark}
                className="icon xmark-icon"
                onClick={() => showConfirmationBox(false)}
              />
              <p className="confirm">Confirmez votre paris ? </p>

              <div className="result">
                {"Vainqueur : "}{" "}
                {victoriousTeam == "A" ? bet.nomEquipeA : bet.nomEquipeB}
              </div>
              <div className="mise">
                {" "}
                <p>Mise :</p>{" "}
                <span>
                  {mise}{" "}
                  <FontAwesomeIcon icon={faCoins} className="icon coin-icon" />
                </span>
              </div>
              <div className="gain">
                <p> Gain potentiel : </p>
                <span>
                  {victoriousTeam == "A"
                    ? (mise * bet.coteEquipeA).toFixed(
                        2 //
                      )
                    : (mise * bet.coteEquipeB).toFixed(
                        2 //
                      )}
                  <FontAwesomeIcon icon={faCoins} className="icon coin-icon" />
                </span>
              </div>
              <button className="btn-confirmer" onClick={() => betScore(bet)}>
                Confirmer
              </button>
            </>
          )}
          {validation && (
            <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
          )}
        </div>
      )}
    </>
  );
};

export default BetCard;
