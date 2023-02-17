import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

import axios from "axios";
import { UidContext } from "../../../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCheck,
  faCircleCheck,
  faCoins,
  faSmile,
  faSmileWink,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Select from "./Select";
const Ranking = ({ team }) => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [ranking, setRanking] = useState([]);

  const handleSelect = (team) => {
    setSelectedTeams((prevTeams) => [...prevTeams, team]);
  };

  const handleRanking = () => {
    const sortedTeams = [...selectedTeams].sort((a, b) => b.rating - a.rating);
    const top5teams = sortedTeams.slice(0, 5);
    setRanking(top5teams);
  };

  return (
    <div>
      <h2>Ranking</h2>
      <p>Select your top 5 teams:</p>
      <ul>
        {ranking.map((team, index) => (
          <li key={team.name}>
            {team.name} - {team.rating}
          </li>
        ))}
      </ul>
      {ranking.length === 5 ? (
        <p>Ranking complete!</p>
      ) : (
        <div>
          {/* <Select
            team={team}
            selectedteams={selectedTeams}
            onSelect={handleSelect}
          /> */}
          <button onClick={handleRanking}>Ranking</button>
        </div>
      )}
    </div>
  );
};

export default Ranking;
