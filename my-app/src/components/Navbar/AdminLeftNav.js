import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faRankingStar,
  faMoneyBill1Wave,
  faSquarePollVertical,
  faObjectGroup,
} from "@fortawesome/free-solid-svg-icons";
const AdminLeftNav = () => {
  return (
    <div className="left-nav-container">
      <section>
        <h2 className=" sidebar-item lefnav-level-1">
          Compétitions
          <FontAwesomeIcon icon={faTrophy} className={"icon"} />
        </h2>
        <NavLink
          className={"sidebar-item lefnav-level-2"}
          to="/admin?betType=bet&competition=Ligue Parisienne"
        >
          Ligue Parisienne
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?betType=bet&competition=Ligue Parisienne&groupName=Poulpe"
          state={{ group: "Poulpe" }}
        >
          Poulpe
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?betType=bet&competition=Ligue Parisienne&groupName=Poule au Pot"
          state={{ group: "Poule au Pot" }}
        >
          Poule au Pot
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?betType=bet&competition=Ligue Parisienne&groupName=Poule Mouillée"
          state={{ group: "Poule Mouillée" }}
        >
          Poule Mouillée
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?betType=bet&competition=Ligue Parisienne&groupName=Poule Pondeuse"
          state={{ group: "Poule Pondeuse" }}
        >
          Poule Pondeuse
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-2"}
          to="/admin?betType=bet&competition=Rennes"
        >
          Rennes
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-1"}
          to="/admin/combinedBets"
        >
          Combinés <FontAwesomeIcon icon={faObjectGroup} className={"icon"} />
        </NavLink>
      </section>
    </div>
  );
};

export default AdminLeftNav;
