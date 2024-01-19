import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faRankingStar,
  faMoneyBill1Wave,
  faSquarePollVertical,
  faObjectGroup,
  faStar,
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
          className={"sidebar-item lefnav-level-3"}
          to="/admin/rankBets?competition=Clermont_2024"
        >
          Clermont La terre du milieu 2024
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3"}
          to="/admin/rankBets?competition=TS_Montpellier_2024"
        >
          TS Montepellier 2024
        </NavLink>
      </section>
    </div>
  );
};

export default AdminLeftNav;
