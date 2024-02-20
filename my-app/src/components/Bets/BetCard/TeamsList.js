import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useState } from "react";
import { UidContext } from "../../../components/AppContext";
import { useContext } from "react";
const TeamList = ({
  teams,
  handleTeamSelect,
  toggleTeamListVisibility,
  index,
}) => {
  const [search, setSearch] = useState("");
  const uid = useContext(UidContext);
  return (
    <div className="team-list-overlay">
      <div className="team-list-container">
        <div className="background">
          <h2>Sélectionnez une équipe :</h2>

          <input
            type="text"
            value={search}
            onFocus={() => uid.setDisplayMobileNavBar(false)}
            onBlur={() => uid.setDisplayMobileNavBar(true)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Entre une équipe"
          />
          <div
            onClick={() => toggleTeamListVisibility(index)}
            className="close-icon"
          >
            <MdClose />
          </div>
          <div className="teams">
            {teams
              .filter(
                (team) =>
                  team.name.toLowerCase().includes(search.toLowerCase()) ||
                  team.joueur1.toLowerCase().includes(search.toLowerCase()) ||
                  team.joueur2.toLowerCase().includes(search.toLowerCase())
              )
              .map((team) => (
                <div
                  key={team.name}
                  className="team"
                  onClick={() => handleTeamSelect(team, index, true)}
                >
                  <div>
                    <span className="team-name">
                      {team.name.toLowerCase() === "maréziane"
                        ? "pour sophie"
                        : team.name.toLowerCase()}
                    </span>{" "}
                    -{" "}
                    <span className="team-players">
                      {team.joueur1.toLowerCase()} et{" "}
                      {team.joueur2.toLowerCase()}
                    </span>
                  </div>{" "}
                  <div className="icon-add">
                    <MdAdd size={32} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
