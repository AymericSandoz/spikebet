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

  const betsNumber = user.betsArray.length;

  const data = [
    { name: "Paris classiques", tauxDeReussite: 75, nbParis: 100 },
    { name: "Combinés", tauxDeReussite: 60, nbParis: 50 },
    { name: "Autres types de paris", tauxDeReussite: 80, nbParis: 25 },
  ];

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
          {!isNaN(BetsuccessRate(user.betsArray).betSuccessRate) && (
            <div className="user-nb-won-bets">
              <p>Pourcentage de succès :</p>
              {BetsuccessRate(user.betsArray).betSuccessRate}
              <FontAwesomeIcon icon={faCoins} color="gold" />{" "}
            </div>
          )}
          {!isNaN(BetsuccessRate(user.betsArray).combinedBetSuccessRate) && (
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
          )}

          <SuccessRatesChart betSuccessRate={BetsuccessRate(user.betsArray)} />
          <BetCountChart betSuccessRate={BetsuccessRate(user.betsArray)} />
          <LineChart betSuccessRate={BetsuccessRate(user.betsArray)} />
        </div>
      )}
    </>
  );
}

export default UserProfil;
