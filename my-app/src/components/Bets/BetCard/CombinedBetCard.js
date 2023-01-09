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
  faCircleCheck,
  faCoins,
  faSmile,
  faSmileWink,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import RPLogo from "../../../images/Roundnet_Paris.png";
const BetCard = ({ bet, getBets }) => {
  //const [teamAscore, setTeamAscore] = useState(Number);
  //const [teamBscore, setTeamBscore] = useState(Number);
  const [victoriousTeam, setVictoriousTeam] = useState();

  //const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);

  return (
    <>
      <li className="bet-card" key={bet._id}>
        <p> {bet.prize}</p>
      </li>
    </>
  );
};

export default BetCard;
