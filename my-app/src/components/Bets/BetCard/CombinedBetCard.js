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
  faCheck,
  faCoins,
  faDollar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import RPLogo from "../../../images/Roundnet_Paris.png";
const CombinedBetCard = ({ combinedBet, getCombinedBets }) => {
  //const [teamAscore, setTeamAscore] = useState(Number);
  //const [teamBscore, setTeamBscore] = useState(Number);
  const [victoriousTeamCombo1, setVictoriousTeamCombo1] = useState();
  const [victoriousTeamCombo2, setVictoriousTeamCombo2] = useState();
  const [victoriousTeamCombo3, setVictoriousTeamCombo3] = useState();
  const [error, setError] = useState();

  //const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);

  const bet = () => {
    if (
      !victoriousTeamCombo1 ||
      !victoriousTeamCombo2 ||
      !victoriousTeamCombo3
    ) {
      setError("Iiiiiiiiiiiichhhh, il manque pas quelque chose ?");
      return "Pronostic incomplet";
    }

    let combinaison =
      victoriousTeamCombo1 + victoriousTeamCombo2 + victoriousTeamCombo3;

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/combinedBets/${combinedBet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        combinedBetId: combinedBet._id,
        game1: combinedBet.game1,
        game2: combinedBet.game2,
        game3: combinedBet.game3,
        prize: combinedBet.prize,
        userCombinaison: combinaison,
      },
    })
      .then((res) => {
        console.log("bet saved");
        getCombinedBets();
        setVictoriousTeamCombo1(null);
        setVictoriousTeamCombo2(null);
        setVictoriousTeamCombo3(null);
        setError();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <li className="combined-betcard" key={combinedBet._id}>
        <p className="prize">
          {" "}
          Cash prize : {combinedBet.prize}{" "}
          <FontAwesomeIcon icon={faCoins} className="icon" />
        </p>
        <div className="combined-bet combined-bet-1">
          <h3 className="team-name">
            {combinedBet.game1.nomEquipeA} - {combinedBet.game1.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game1.competition}</h4>

          <div
            className={
              victoriousTeamCombo1 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container "
            }
            onClick={() => setVictoriousTeamCombo1("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game1.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game1.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo1 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo1("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game1.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game1.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>
        <div className="combined-bet combined-bet-2">
          <h3 className="team-name">
            {combinedBet.game2.nomEquipeA} - {combinedBet.game2.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game2.competition}</h4>

          <div
            className={
              victoriousTeamCombo2 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo2("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game2.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game2.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo2 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo2("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game2.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game2.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>
        <div className="combined-bet combined-bet-3">
          <h3 className="team-name">
            {combinedBet.game3.nomEquipeA} - {combinedBet.game3.nomEquipeB}
          </h3>
          <h4 className="competition-name">{combinedBet.game3.competition}</h4>

          <div
            className={
              victoriousTeamCombo3 === "A"
                ? "team-A-container  team-container clicked"
                : "team-A-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo3("A")}
          >
            <p className="team-A-player1 player">
              {combinedBet.game3.joueursEquipeA[0]}
            </p>
            <p className="team-A-player2 player">
              {combinedBet.game3.joueursEquipeA[1]}
            </p>
            {/* <p className="team-A-cote team-cote">{bet.coteEquipeA}</p> */}
          </div>
          <div
            className={
              victoriousTeamCombo3 === "B"
                ? "team-B-container  team-container clicked"
                : "team-B-container  team-container"
            }
            onClick={() => setVictoriousTeamCombo3("B")}
          >
            <p className="team-B-player1 player">
              {combinedBet.game3.joueursEquipeB[0]}
            </p>
            <p className="team-B-player2 player">
              {combinedBet.game3.joueursEquipeB[1]}
            </p>
            {/* <p className="team-B-cote team-cote">{bet.coteEquipeB}</p> */}
          </div>
        </div>

        {error && <p className="bet-error">{error}</p>}

        {uid.uid &&
          combinedBet.live !== "closed" &&
          (!combinedBet.userIdArray.includes(uid.uid) ? (
            <button className="btn-confirmer" onClick={() => bet()}>
              Parier
            </button>
          ) : (
            <p className="already-bet">
              <FontAwesomeIcon icon={faCheck} /> DÉJA PARIÉ
            </p>
          ))}
        {uid.uid && combinedBet.live === "closed" && (
          <p className="already-bet">
            <FontAwesomeIcon icon={faCheck} /> CLOSED
          </p>
        )}
      </li>
    </>
  );
};

export default CombinedBetCard;
