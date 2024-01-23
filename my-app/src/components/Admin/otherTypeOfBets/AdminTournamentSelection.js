import { NavLink } from "react-router-dom"; // Import your CSS file
import { IsAdmin } from "../../../utils/Utils";

function MobileTournamentSelection() {
  return (
    <div className="competition-selection-container">
      <div className="competition-selection">
        <div className="competitions">
          <NavLink
            className={"competition-link"}
            to="/admin/rankbets?competition=Clermont_2024"
          >
            OPEN LA TERRE DU MILIEU 2024
          </NavLink>
          <NavLink
            className={"competition-link"}
            to="/admin/rankbets?competition=TS_Montpellier_2024"
          >
            TS MONTPELLIER 2024
          </NavLink>
          <NavLink className={"competition-link"} to="/admin/survey">
            SONDAGE
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileTournamentSelection;
