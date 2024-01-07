import React from "react";
import { useLocation } from "react-router-dom";
import {
  calculScore,
  calculNbClosedBets,
  calculNbBetWon,
} from "../../utils/Utils";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserProfil(props) {
  const location = useLocation();
  const { state } = location;
  let user = state.user;

  return (
    <>
      {user && (
        <div className="user-card-details">
          <div className="user-infos-img">
            <img
              className="user-img"
              src="https://res.cloudinary.com/dcdign4zb/image/upload/v1668004489/j1ca0kzldivrqxa4nt9g.png"
              alt="Logo"
            />

            <div className="user-info">
              <h2>{user.name}</h2>
              <h3> {user.pseudo}</h3>
              <p>Membre depuis le {user.createdAt}</p>
            </div>
          </div>
          <div className="user-stats">
            <div className="user-score">
              {calculScore(user.betsArray, user.coins).toFixed(0)}{" "}
              <FontAwesomeIcon icon={faCoins} color="gold" />
              <p> Score</p>
            </div>
            <div className="user-rank">
              10
              <p> Classement</p>
            </div>
            <div className="user-nb-won-bets">
              {calculNbBetWon(user.betsArray)}
              {"/"}
              {calculNbClosedBets(user.betsArray)}{" "}
              <p> Nombre de paris réussis</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfil;
