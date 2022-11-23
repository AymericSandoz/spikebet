import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import MyBets from "../../components/Bets/MyBets";
import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";
import {
  faLock,
  faTrophy,
  faUser,
  faCoins,
  faBaseball,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IsAdmin } from "../../utils/Utils";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const uid = useContext(UidContext);

  return (
    <nav className="navigation">
      <NavLink
        exact
        to="/"
        aria-label="Lien page d'acceuil"
        className="brand-name"
      >
        Spikebet
      </NavLink>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* hamburger svg code... */}
        <FontAwesomeIcon icon={faBaseball} />
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          {uid.uid && (
            <>
              <li>
                <NavLink
                  exact
                  to="/?groupName=Ligue Parisienne"
                  aria-label="Lien page d'acceuil"
                >
                  Acceuil
                </NavLink>
              </li>
              {IsAdmin() && (
                <li>
                  <NavLink
                    exact
                    to="/admin?groupName=Ligue Parisienne"
                    aria-label="Lien page resevé aux administrateurs"
                  >
                    <FontAwesomeIcon icon={faLock} /> Admin
                  </NavLink>
                </li>
              )}
              <li className="coins">
                {uid.coins.toFixed(
                  0 //
                )}{" "}
                <FontAwesomeIcon icon={faCoins} color="gold" />
              </li>

              <li>
                <NavLink exact to="/about" aria-label="Lien page about">
                  About
                </NavLink>
              </li>
            </>
          )}
          {/* <li>
            <NavLink exact to="/profil" aria-label="Lien page de profil">
              Profil
            </NavLink>
          </li> */}
          {!uid.uid ? (
            <li>
              <NavLink exact to="/log" aria-label="Lien page d'acceuil">
                Connexion/Inscription
              </NavLink>
            </li>
          ) : (
            // <li>
            //   <a href="/log" aria-label="Lien page d'acceuil">
            //     <FontAwesomeIcon icon={faUser} /> Connexion/Inscription
            //   </a>
            // </li>
            <Logout />
          )}
        </ul>
      </div>
    </nav>
  );
}