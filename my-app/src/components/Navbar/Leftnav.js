import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faRankingStar,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
const LeftNav = () => {
  return (
    <>
      <div className="left-nav-container left-nav-big-screen">
        <section>
          <h2 className=" sidebar-item lefnav-level-1">
            Compétition
            <FontAwesomeIcon icon={faTrophy} className={"icon"} />
          </h2>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/?groupName=Ligue Parisienne"
          >
            Ligue Parisienne
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-3"}
            to="/?groupName=Poulpe"
            state={{ group: "Poulpe" }}
          >
            Poulpe
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-3"}
            to="/?groupName=Poule au Pot"
            state={{ group: "Poule au Pot" }}
          >
            Poule au Pot
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-3"}
            to="/?groupName=Poule Mouillée"
            state={{ group: "Poule Mouillée" }}
          >
            Poule Mouillée
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-3"}
            to="/?groupName=Poule Pondeuse"
            state={{ group: "Poule Pondeuse" }}
          >
            Poule Pondeuse
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/?groupName=All"
          >
            Autres
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink
            className="sidebar-item lefnav-level-1"
            to="/MyBets?live=All"
          >
            Mes Paris{" "}
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="icon" />
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/MyBets?live=open"
          >
            À venir
          </NavLink>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/MyBets?live=closed"
          >
            Terminé
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink className={"sidebar-item lefnav-level-1"} to="/ranking">
            Classement{" "}
            <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
          </NavLink>
        </section>
      </div>
      <div className="left-nav-container left-nav-small-screen">
        <section>
          <NavLink
            className={"sidebar-item lefnav-level-2"}
            to="/?groupName=Ligue Parisienne"
          >
            Ligue Parisienne
          </NavLink>
        </section>
        <section>
          <NavLink
            className="sidebar-item lefnav-level-1"
            to="/MyBets?live=All"
          >
            Mes Paris <br />
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="icon" />
          </NavLink>
        </section>
        <br />
        <section>
          <NavLink className={"sidebar-item lefnav-level-1"} to="/ranking">
            Classement <br />
            <FontAwesomeIcon icon={faRankingStar} className={"icon"} />
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default LeftNav;
