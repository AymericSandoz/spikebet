import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TeamList = ({
  teams,
  handleTeamSelect,
  toggleTeamListVisibility,
  index,
}) => {
  return (
    <div className="team-list-overlay">
      <div className="team-list-container">
        <div className="background">
          <h2>Sélectionnez une équipe :</h2>

          <div
            onClick={() => toggleTeamListVisibility(index)}
            className="close-icon"
          >
            <MdClose />
          </div>
          <div className="teams">
            {teams.map((team) => (
              <div
                key={team.name}
                className="team"
                onClick={() => handleTeamSelect(team, index, true)}
              >
                <div>
                  <span className="team-name">{team.name}</span> -{" "}
                  <span className="team-players">
                    ({team.joueur1} et {team.joueur2})
                  </span>
                </div>{" "}
                <MdAdd />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
