import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";
import { faLock, faCoins, faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IsAdmin } from "../../utils/Utils";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const uid = useContext(UidContext);
  console.log("NAVBAR uid", uid);

  // Permet de rendre la nabar fonctionnel sur mobile
  useEffect(() => {
    function handleClick(event) {
      if (event.target.closest(".hamburger")) {
        return;
      }
      setIsNavExpanded(false);
    }

    // Bind the event listener
    document.addEventListener("mouseup", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

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
                <NavLink exact to="/about" aria-label="Lien page about">
                  Roundnet Actus
                </NavLink>
              </li>
            </>
          )}

          {IsAdmin() && (
            <li>
              <NavLink
                exact
                to="/admin/rankBets"
                aria-label="Lien page resevé aux administrateurs"
              >
                <FontAwesomeIcon icon={faLock} className={"icon"} /> Admin
              </NavLink>
            </li>
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
