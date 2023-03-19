import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RPLogo from "../../../images/Roundnet_Paris.png";
import axios from "axios";

function BetDetails(props) {
  const location = useLocation();
  const { state } = location;
  let bet = state.bet;
  console.log(bet);
  const [loadBets, setLoadBets] = useState(true);
  const [usersBets, setUsersBets] = useState(true);

  const getUsersBets = () => {
    console.log("getUsersBets");
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/getUsersBets/${bet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        console.log("coucou", res.data);
        setUsersBets(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadBets) {
      getUsersBets();
    }
  }, [loadBets, usersBets]);

  return (
    <div className="bet-card-details">
      test
      {/* {bet.ligue == "Ligue Parisienne" && (
        <img
          className="Logo-club Logo-RP"
          src={RPLogo}
          alt="Logo Roundnet Paris"
        />
      )} */}
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
        <div className="bet-score-container">
          <p className="bet-zone-team-name">{bet.nomEquipeA}</p>
          <p className="team-A-cote team-cote">{bet.coteEquipeA}</p>
        </div>
        <div className="bet-score-container">
          <p className="bet-zone-team-name">{bet.nomEquipeB}</p>
          <p className="team-B-cote team-cote">{bet.coteEquipeB}</p>
        </div>
      </div>
      <div className="users-bets">
        {usersBets.length > 0 &&
          usersBets.map((userBet) => {
            return (
              <>
                {userBet.bet._id}
                {userBet.user.name}
              </>
            );
          })}
        <br />
      </div>
    </div>
  );
}

export default BetDetails;
