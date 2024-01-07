import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";
import { faLock, faCoins, faBars } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IsAdmin } from "../../utils/Utils";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const uid = useContext(UidContext);
  console.log("NAVBAR uid", uid);

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
        <FontAwesomeIcon icon={faBars} />
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
                  to="/?betType=bet&competition=Ligue Parisienne"
                  aria-label="Lien page d'acceuil"
                >
                  Accueil
                </NavLink>
              </li>
              {IsAdmin() && (
                <li>
                  <NavLink
                    exact
                    to="/admin?betType=bet&competition=Ligue Parisienne"
                    aria-label="Lien page resevé aux administrateurs"
                  >
                    <FontAwesomeIcon icon={faLock} className={"icon"} /> Admin
                  </NavLink>
                </li>
              )}
              <li className="coins">
                {uid.coins &&
                  uid.coins.toFixed(
                    0 //
                  )}{" "}
                <FontAwesomeIcon
                  icon={faCoins}
                  className={"icon"}
                  color="gold"
                />
              </li>

              <li>
                <NavLink exact to="/about" aria-label="Lien page about">
                  Application version Beta
                </NavLink>
              </li>
            </>
          )}
          {!uid.uid ? (
            <li>
              <NavLink exact to="/log" aria-label="Lien page d'acceuil">
                Inscription / Connexion
              </NavLink>
            </li>
          ) : (
            <Logout />
          )}
        </ul>
      </div>
    </nav>
  );
}
