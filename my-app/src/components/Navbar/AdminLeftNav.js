import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faRankingStar,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
const AdminLeftNav = () => {
  return (
    <div className="left-nav-container">
      <section>
        <h2 className=" sidebar-item lefnav-level-1">
          Compétition
          <FontAwesomeIcon icon={faTrophy} className={"icon"} />
        </h2>
        <NavLink
          className={"sidebar-item lefnav-level-2"}
          to="/admin?groupName=Ligue Parisienne"
        >
          Ligue Parisienne
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?groupName=Poulpe"
          state={{ group: "Poulpe" }}
        >
          Poulpe
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?groupName=Poule au Pot"
          state={{ group: "Poule au Pot" }}
        >
          Poule au Pot
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?groupName=Poule Mouillée"
          state={{ group: "Poule Mouillée" }}
        >
          Poule Mouillée
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin?groupName=Poule Pondeuse"
          state={{ group: "Poule Pondeuse" }}
        >
          Poule Pondeuse
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-2"}
          to="/admin?groupName=autres"
        >
          Autres
        </NavLink>
      </section>
    </div>
  );
};

export default AdminLeftNav;
