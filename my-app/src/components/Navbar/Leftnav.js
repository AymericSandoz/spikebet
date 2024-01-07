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
      <div className="left-nav-container left-nav-big-screen admin-nav">
        <section>
          <h2 className=" sidebar-item lefnav-level-1">
            Compétitions
            <FontAwesomeIcon icon={faTrophy} className={"icon"} />
          </h2>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/rankbets?competition=Clermont_2024"
          >
            Open La Terre du milieu 2024
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/rankbets?competition=TS_Montpellier_2024"
          >
            TS Montpellier 2024
          </NavLink>
          <NavLink className={"sidebar-item lefnav-level-1"} to="/survey">
            Sondages{" "}
            <FontAwesomeIcon icon={faSquarePollVertical} className={"icon"} />
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink
            className="sidebar-item lefnav-level-1"
            to="/MyRankedBets?live=All"
          >
            Mes Paris{" "}
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="icon" />
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/MyRankedBets?live=open"
          >
            À venir
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/MyRankedBets?live=closed"
          >
            Terminé
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink className={"sidebar-item lefnav-level-1"} to="/ranking">
            <span></span>Classement{" "}
            <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
          </NavLink>
        </section>
      </div>
      <div className="left-nav-container left-nav-small-screen">
        <section>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/?betType=Ligue Parisienne"
          >
            <span>Match</span>
            <FontAwesomeIcon icon={faTrophy} className="icon" />
          </NavLink>
        </section>
        <section>
          <NavLink
            className="sidebar-item lefnav-level-1"
            to="/MyBets?live=All"
          >
            <span>Mes Paris</span>
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="icon" />
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink className={"sidebar-item lefnav-level-1"} to="/ranking">
            <span>Classement</span>
            <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default LeftNav;
