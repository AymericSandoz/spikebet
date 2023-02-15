import { faCoins, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalculTotalCoins, calculScore } from "../../utils/Utils";
const UserCard = ({ user, index }) => {
  console.log(user);

  return (
    <div className="user-card">
      <div className="user-name"> {user.name} </div>
      <div className="user-pseudo"> {user.pseudo} </div>
      <div className="user-score">
        {CalculTotalCoins(user.coins, user.miseArray, user.scoreArray).toFixed(
          0
        )}{" "}
        {calculScore(user.betsArray).toFixed(0)}{" "}
        <FontAwesomeIcon icon={faCoins} color="gold" />
      </div>
      <div className="user-bet-rank">
        {index + 1} <FontAwesomeIcon icon={faMedal} color="gold" />
      </div>
    </div>
  );
};

export default UserCard;
