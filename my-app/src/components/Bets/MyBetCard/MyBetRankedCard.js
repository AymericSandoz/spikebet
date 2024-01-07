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
import { faClock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const MyBetCard = ({ bet }) => {
  const [teamAscore, setTeamAscore] = useState({ Number });
  const [teamBscore, setTeamBscore] = useState({ Number });
  const [userBets, setUserBets] = useState([]);
  const uid = useContext(UidContext);

  return (
    <>
      <li className="my-bet-ranked-card" key={bet._id}>
        MY BET RANKED CARD
      </li>
    </>
  );
};

export default MyBetCard;
