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

const Select = ({ teams, selectedTeams, onSelect }) => {
  const handleSelectChange = (event) => {
    const teamName = event.target.value;
    const team = teams.find((p) => p.name === teamName);
    onSelect(team);
  };

  return (
    <div>
      <label htmlFor="select-team">Select a team:</label>
      <select id="select-team" onChange={handleSelectChange}>
        <option value="">-- Select a team --</option>
        {teams.map((team) => (
          <option
            key={team.name}
            value={team.name}
            disabled={selectedTeams.includes(team)}
          >
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
