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
import { faClock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const MyBetCard = ({ bet }) => {
  const [teamAscore, setTeamAscore] = useState({ Number });
  const [teamBscore, setTeamBscore] = useState({ Number });
  const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);

  return (
    <>
      <li className="my-bet-card" key={bet._id}>
        <div className="bet-open-closed en-cours">
          {bet.live !== "closed" && (
            <span>
              <FontAwesomeIcon icon={faClock} /> EN COURS
            </span>
          )}
        </div>
        {/* {bet.live === "closed" ? (
            <span>
              <FontAwesomeIcon icon={faLock} />
              CLOSED
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faClock} />
              EN COURS
            </span>
          )} */}

        {bet.success === "true" && bet.live === "closed" && (
          <div className="bet-success success">
            <span>
              <FontAwesomeIcon icon={faCircleCheck} /> GAGNÉ
            </span>{" "}
          </div>
        )}

        {bet.success === "false" && bet.live === "closed" && (
          <div className="bet-success echec">
            <span>
              <FontAwesomeIcon icon={faXmarkCircle} /> PERDU
            </span>{" "}
          </div>
        )}

        <h3 className="team-name">
          {bet.nomEquipeA} - {bet.nomEquipeB}
        </h3>
        <h4 className="competition-name">{bet.ligue}</h4>
        <h5 className="group-name">{bet.group}</h5>
        <div className="team-A-container  team-container">
          <p className="team-A-player1 player">{bet.joueursEquipeA[0]}</p>
          <p className="team-A-player2 player">{bet.joueursEquipeA[1]}</p>
          <p className="team-A-cote team-cote">{bet.coteEquipeA}</p>
          {/* <p className="team-A-bet-score team-bet-score">
            {bet.betScoreEquipeA}
          </p>
          <p className="team-A-final-score team-final-score">
            {bet.finalScoreEquipeA}
          </p> */}
        </div>
        <div className="team-B-container  team-container">
          <p className="team-B-player1 player">{bet.joueursEquipeB[0]}</p>
          <p className="team-B-player2 player">{bet.joueursEquipeB[1]}</p>
          <p className="team-B-cote team-cote">{bet.coteEquipeB}</p>
          {/* <p className="team-B-bet-score team-bet-score">
            {bet.betScoreEquipeB}
          </p>

          <p className="team-B-final-score team-final-score">
            {bet.finalScoreEquipeB}
          </p> */}
        </div>
        {bet.live === "closed" && (
          <>
            <div className="final-score">
              {"Score Final : "} {bet.finalScoreEquipeA}
              {"-"}
              {bet.finalScoreEquipeB}
            </div>
            {/* <div className="user-bet user-bet">
              {"Ton paris : "}{" "}
              {bet.victoireEquipePrediction == "A"
                ? bet.nomEquipeA
                : bet.nomEquipeB}
            </div> */}
            <div className="user-gain">
              {bet.success == "true" && (
                <span>
                  {"+"}
                  {bet.point - bet.mise}
                  <FontAwesomeIcon icon={faCoins} className={"icon"} />
                </span>
              )}
              {bet.success == "false" && (
                <span>
                  {"-"}
                  {bet.mise}
                  <FontAwesomeIcon icon={faCoins} className={"icon"} />
                </span>
              )}
            </div>
          </>
        )}
        {bet.live === "open" && (
          <>
            <div className="user-bet center-user-bet">
              {"Ton paris : "}
              {bet.victoireEquipePrediction == "A"
                ? bet.nomEquipeA
                : bet.nomEquipeB}
              {/* {"-"}
              {bet.betScoreEquipeB} */}
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default MyBetCard;
