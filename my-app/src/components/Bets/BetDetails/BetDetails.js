import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RPLogo from "../../../images/Roundnet_Paris.png";
import axios from "axios";

function BetDetails(props) {
  const location = useLocation();
  const { state } = location;
  let bet = state.bet;
  const [loadBets, setLoadBets] = useState(true);
  const [usersBets, setUsersBets] = useState(true);

  const getUsersBets = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/getUsersBets/${bet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setUsersBets(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    if (loadBets) {
      getUsersBets();
    }
  }, [loadBets, usersBets]);

  return (
    <div className="bet-card-details-container">
      <div className="bet-card-details">
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
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-A winner-prediction">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).A} joueurs
              ont voté pour {bet.nomEquipeA} soit
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Apc.toFixed(
                0 //1
              )}
            </p>
          )}
          {bet.arrayVictoireEquipePrediction.length > 0 && (
            <p className="winner-prediction-B winner-prediction">
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).B} joueurs
              ont voté pour {bet.nomEquipeB} soit
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Bpc.toFixed(
                0 //
              )}
            </p>
          )}
        </div>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${TeamBetPrediction(
                bet.arrayVictoireEquipePrediction
              ).Apc.toFixed(
                0 //1
              )}}%`,
            }}
          >
            <span>
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Apc.toFixed(
                0 //1
              )}
              %
            </span>
          </div>
          <div
            className="progress"
            style={{
              width: `${TeamBetPrediction(
                bet.arrayVictoireEquipePrediction
              ).Bpc.toFixed(
                0 //1
              )}%`,
            }}
          >
            <span>
              {TeamBetPrediction(bet.arrayVictoireEquipePrediction).Bpc.toFixed(
                0 //1
              )}
              %
            </span>
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
        <div className="comment-area"></div>
        <div className="users-comments"></div>
      </div>
    </div>
  );
}

export default BetDetails;
