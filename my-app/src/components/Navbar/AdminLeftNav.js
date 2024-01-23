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
    <div className="left-nav-container admin">
      <section>
        <h2 className=" sidebar-item lefnav-level-1">
          Compétitions
          <FontAwesomeIcon icon={faTrophy} className={"icon"} />
        </h2>
        <NavLink
          className={"sidebar-item lefnav-level-3 hovered"}
          to="/admin/rankBets?competition=Clermont_2024"
        >
          Clermont La terre du milieu 2024
        </NavLink>
        <NavLink
          className={"sidebar-item lefnav-level-3 hovered"}
          to="/admin/rankBets?competition=TS_Montpellier_2024"
        >
          TS Montpellier 2024
        </NavLink>
        <NavLink className={"sidebar-item lefnav-level-1 hovered"} to="/survey">
          Sondages{" "}
          <FontAwesomeIcon icon={faSquarePollVertical} className={"icon"} />
        </NavLink>
      </section>
      <section>
        <NavLink
          className={"sidebar-item lefnav-level-1 hovered"}
          to="/ranking"
        >
          <span></span>Classement{" "}
          <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
        </NavLink>
      </section>
    </div>
  );
};

export default AdminLeftNav;
