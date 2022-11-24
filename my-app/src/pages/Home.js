import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import BetList from "../components/Bets/BetList";
import BetCard from "../components/Bets/BetCard/BetCard";
import { NavLink } from "react-router-dom";
import Log from "../components/Log";
import Navbars from "../components/Navbar/Navbar";
import LeftNav from "../components/Navbar/Leftnav";
import { sortBetArray } from "../utils/Utils";

const Home = () => {
  console.log("Home");

  const [competition, setCompetition] = useState("Ligue parisienne");
  const [numberOfGroup, setNumberOfGroup] = useState();

  const [teams, setTeams] = useState([]);

  const [error, setError] = useState("");

  const [loadBets, setLoadBets] = useState(true);
  const [bets, setBets] = useState([]);
  const [betsToDisplay, setBetsToDisplay] = useState([]);

  const uid = useContext(UidContext);
  console.log(uid);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let GroupName = query.get("groupName");

  const getBets = (e) => {
    axios({
      method: "get",
      url: `api/bet/getLigueParisienne`,
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
    if (GroupName && bets) {
      if (GroupName === "Ligue Parisienne") {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.ligue === GroupName;
          })
        );
      } else if (GroupName === "autres") {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.type === "autre";
          })
        );
      } else {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.group === GroupName;
          })
        );
      }
    }
  }, [loadBets, bets, GroupName]);

  return (
    <>
      {uid.uid ? (
        <>
          <LeftNav />
          <div className="home">
            {betsToDisplay.length > 0 &&
              sortBetArray(uid.uid, betsToDisplay).map((bet) => {
                return (
                  <>
                    <BetCard bet={bet} getBets={getBets} />
                  </>
                );
              })}
            <br />
          </div>
        </>
      ) : (
        <Log />
      )}
      {/* <LeftNav /> */}
    </>
  );
};
export default Home;
