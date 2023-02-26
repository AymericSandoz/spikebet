import { faCoins, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalculTotalCoins, calculScore } from "../../utils/Utils";
import { NavLink, Link } from "react-router-dom";
import UserProfil from "../User/UserProfil";
const UserCard = ({ user, index }) => {
  console.log(user);
  const [showUserProfil, setShowUserProfil] = useState(false);

  return (
    <>
      <NavLink
        className="user-card"
        to={{ pathname: `/user/${user._id}` }}
        state={{ user: user }}
      >
        <div className="user-name"> {user.name} </div>
        <div className="user-pseudo"> {user.pseudo} </div>
        <div className="user-score">
          {calculScore(user.betsArray, user.coins).toFixed(0)}{" "}
          <FontAwesomeIcon icon={faCoins} color="gold" />
        </div>
        <div className="user-bet-rank">
          {index + 1} <FontAwesomeIcon icon={faMedal} color="gold" />
        </div>
      </NavLink>
    </>
  );
};

export default UserCard;
