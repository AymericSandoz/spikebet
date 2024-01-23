import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faRankingStar,
  faMoneyBill1Wave,
  faSquarePollVertical,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
const LeftNav = () => {
  return (
    <>
      <div className="left-nav-container left-nav-big-screen">
        <section>
          <h2 className=" sidebar-item lefnav-level-1">
            Compétitions
            <FontAwesomeIcon icon={faTrophy} className={"icon"} />
          </h2>
          <NavLink
            className={"sidebar-item lefnav-level-2 hovered"}
            to="/rankbets?competition=Clermont_2024"
          >
            Open La Terre du milieu 2024
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2 hovered"}
            to="/rankbets?competition=TS_Montpellier_2024"
          >
            TS Montpellier 2024
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-1 hovered"}
            to="/survey"
          >
            Sondages{" "}
            <FontAwesomeIcon icon={faSquarePollVertical} className={"icon"} />
          </NavLink>
        </section>
        <br />
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
      <div className="left-nav-container left-nav-small-screen">
        <NavLink
          className={"sidebar-item lefnav-level-2 hovered"}
          to="/tournamentSelection"
        >
          <span>Paris</span>
          <FontAwesomeIcon icon={faTrophy} className="icon" />
        </NavLink>
        <section>
          <NavLink
            className={"sidebar-item lefnav-level-1 hovered"}
            to="/ranking"
          >
            <span>Classement</span>
            <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default LeftNav;
