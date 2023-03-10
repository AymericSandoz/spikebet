import React from "react";
import { useLocation } from "react-router-dom";
import {
  CalculTotalCoins,
  calculScore,
  calculNbClosedBets,
  calculNbBetWon,
  BetsuccessRate,
} from "../../utils/Utils";
import { faCoins, faMedal, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import SuccessRatesChart from "./graph";
import BetCountChart from "./piechart";
import LineChart from "./line";

function UserProfil(props) {
  const location = useLocation();
  const { state } = location;
  let user = state.user;
  console.log(BetsuccessRate(user.betsArray));
  const betsNumber = user.betsArray.length;

  const data = [
    { name: "Paris classiques", tauxDeReussite: 75, nbParis: 100 },
    { name: "Combinés", tauxDeReussite: 60, nbParis: 50 },
    { name: "Autres types de paris", tauxDeReussite: 80, nbParis: 25 },
  ];

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
            {/* <div className="user-nb-closed-bets">
            {calculNbClosedBets(user.betsArray)}{" "}
            <FontAwesomeIcon icon={faCoins} color="gold" />
            <p> Score</p>
          </div> */}
            <div className="user-nb-won-bets">
              {calculNbBetWon(user.betsArray)}
              {"/"}
              {calculNbClosedBets(user.betsArray)}{" "}
              <p> Nombre de paris réussis</p>
            </div>
          </div>
          <div className="graphs-container">
            {/* <div>
              {betsNumber}
              <p>Nombre total de paris</p>
            </div> */}
            <SuccessRatesChart
              betSuccessRate={BetsuccessRate(user.betsArray)}
              className="graph"
            />
            <BetCountChart
              betSuccessRate={BetsuccessRate(user.betsArray)}
              className="graph"
            />
            {/* <div>
              {betsNumber - calculNbClosedBets(user.betsArray)}
              <p>Nombre de paris en cours</p>
            </div> */}
            {/* {!isNaN(BetsuccessRate(user.betsArray).betSuccessRate) && (
            <div className="user-nb-won-bets">
              <p>Pourcentage de succès :</p>
              {BetsuccessRate(user.betsArray).betSuccessRate}
              <FontAwesomeIcon icon={faCoins} color="gold" />{" "}
            </div>
          )} */}
            {/* {!isNaN(BetsuccessRate(user.betsArray).combinedBetSuccessRate) && (
            <div className="user-nb-won-bets">
              &&
              <p>Pourcentage de succès :</p>
              {BetsuccessRate(user.betsArray).combinedBetSuccessRate}{" "}
            </div>
          )}
          {!isNaN(BetsuccessRate(user.betsArray).rankedBetSuccessRate) && (
            <div className="user-nb-won-bets">
              <p>Pourcentage de succès :</p>
              {BetsuccessRate(user.betsArray).rankedBetSuccessRate}{" "}
              <FontAwesomeIcon icon={faCoins} color="gold" />
            </div>
          )} */}

            {/* <LineChart betSuccessRate={BetsuccessRate(user.betsArray)} /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfil;
