import React from "react";
import { useLocation } from "react-router-dom";
import {
  CalculTotalCoins,
  calculScore,
  calculNbClosedBets,
  calculNbBetWon,
} from "../../utils/Utils";
import { faCoins, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserProfil(props) {
  const location = useLocation();
  const { state } = location;
  let user = state.user;

  const betsNumber = user.betsArray.length;

  return (
    <>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Inscrit le {user.createdAt}</p>
          <p>Pseudo : {user.pseudo}</p>
          <p>Nombre de paris : {betsNumber}</p>
          <div className="user-score">
            {calculScore(user.betsArray, user.coins).toFixed(0)}{" "}
            <FontAwesomeIcon icon={faCoins} color="gold" />
          </div>
          <div className="user-nb-closed-bets">
            {calculNbClosedBets(user.betsArray)}{" "}
            <FontAwesomeIcon icon={faCoins} color="gold" />
          </div>
          <div className="user-nb-won-bets">
            {calculNbBetWon(user.betsArray)}{" "}
            <FontAwesomeIcon icon={faCoins} color="gold" />
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfil;
