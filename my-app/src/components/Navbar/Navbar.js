import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UidContext } from "../AppContext";
import Logout from "../Log/Logout";
import {
  faLock,
  faCoins,
  faBars,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IsAdmin } from "../../utils/Utils";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const uid = useContext(UidContext);
  const [competition, setCompetition] = useState("");
  const location = useLocation();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    console.log(uid.isAdminMode);
    uid.setAdminMode(!uid.isAdminMode);
    console.log(uid.isAdminMode);
    if (isAdminMode) {
      navigate("/rankBets");
    } else {
      navigate("/admin/rankBets");
    }
  };
  //Fonction qui va récupérer la query. SI un paramètre competition contient clermont_2024, une variable est créé et vaut CLERMONT - LA TERRE DU MILIEU 2024, si elle contient TS_Montpellier_2024, une variable est créé et vaut TS MONTPELLIER 2024. je veux que la query soit sous écoute de changement

  // Permet de rendre la nabar fonctionnel sur mobile
  useEffect(() => {
    function handleClick(event) {
      if (event.target.closest(".hamburger")) {
        return;
      }
      setIsNavExpanded(false);
    }

    const params = new URLSearchParams(location.search);
    if (params.get("competition") === "Clermont_2024") {
      setCompetition("CLERMONT");
    } else if (params.get("competition") === "TS_Montpellier_2024") {
      setCompetition("TS MONTPELLIER");
    }
    // si page d'acceuil c'est à dire "/" alors competition = "ClERMONT"
    else if (location.pathname === "/") {
      setCompetition("CLERMONT");
    } else {
      setCompetition("");
    }

    // Bind the event listener
    document.addEventListener("mouseup", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleClick);
    };
  }, [location]);

  return (
    <nav className={`navigation ${isAdminMode ? "admin" : "user"}`}>
      <NavLink
        exact
        to={isAdminMode ? "/admin/rankBets" : "/"}
        aria-label="Lien page d'acceuil"
        className="brand-name"
      >
        <span className="mobile-only">
          {competition ? competition : "Spikebet"}
        </span>
        <span className="no-mobile hovered">Spikebet</span>
      </NavLink>

      <button
        className="hamburger hovered"
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
              <li className="hovered">
                <NavLink exact to="/about" aria-label="Lien page about">
                  Roundnet Actus
                </NavLink>
              </li>
            </>
          )}
          {IsAdmin() && (
            <li className="hovered">
              <div
                className={`admin-mode ${isAdminMode ? "admin" : "user"}`}
                onClick={toggleAdminMode}
                aria-label="Lien page resevé aux administrateurs"
              >
                <FontAwesomeIcon
                  icon={isAdminMode ? faLock : faUnlock}
                  className={"icon"}
                />
                {isAdminMode ? "Désactiver mode Admin" : "Mode Admin"}
              </div>
            </li>
          )}

          {!uid.uid ? (
            <li className="hovered">
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
