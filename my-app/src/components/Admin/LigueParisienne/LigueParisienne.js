import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CreateBet from "../CreateBet";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminLeftNav from "../../Navbar/AdminLeftNav";
import { IsAdmin } from "../../../utils/Utils";
import Home from "../../../pages/Home";
import AdminBetcard from "../AdminCard/AdminCardLigueParisienne";

const LigueParisienne = () => {
  // const [competition, setCompetition] = useState("Ligue parisienne");
  // const [numberOfGroup, setNumberOfGroup] = useState();
  // const [GroupNames, setGroupNames] = useState([]);
  // const [teams, setTeams] = useState([]);

  const [error, setError] = useState("");

  const [loadBets, setLoadBets] = useState(true);
  const [bets, setBets] = useState([]);
  // const [teamAcote, setTeamACote] = useState();
  // const [teamBcote, setTeamBCote] = useState();
  // const [teamAscore, setTeamAscore] = useState();
  // const [teamBscore, setTeamBscore] = useState();

  const [betsToDisplay, setBetsToDisplay] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let betType = query.get("betType");
  let betCompetition = query.get("competition");
  let betGroupName = query.get("groupName");

  const getBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet`,
    })
      .then((res) => {
        setBets(res.data);
        setBetsToDisplay(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (loadBets) {
      getBets();
    }

    if (betType && bets) {
      if (betType === "bet") {
        let filteredBets = bets.filter(function (data) {
          return data.ligue === betCompetition; ///remplacer ligue par competitition serait plus logique
        });
        setBetsToDisplay(filteredBets);

        if (betGroupName) {
          filteredBets = filteredBets.filter(function (data) {
            return data.group === betGroupName; ///remplacer ligue par competitition serait plus logique
          });
          setBetsToDisplay(filteredBets);
        }
      }
    }
  }, [loadBets, bets, betType, betCompetition, betGroupName]);

  return (
    <>
      {IsAdmin() ? (
        <>
          <AdminLeftNav />

          <div className="admin-bets">
            {betsToDisplay.length > 0 &&
              betsToDisplay
                .sort((a, b) => (a.live < b.live ? 1 : -1))
                .map((bet) => {
                  return (
                    <>
                      <AdminBetcard bet={bet} key={bet._id} getBets={getBets} />
                    </>
                  );
                })}
            <br />
          </div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default LigueParisienne;
