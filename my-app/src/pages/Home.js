import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import BetCard from "../components/Bets/BetCard/BetCard";

import { sortBetArray } from "../utils/Utils";

const Home = () => {
  const [loadBets, setLoadBets] = useState(true);
  const [bets, setBets] = useState([]);
  const [betsToDisplay, setBetsToDisplay] = useState([]);

  const uid = useContext(UidContext);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  let betType = query.get("betType");
  let betCompetition = query.get("competition");
  let betGroupName = query.get("groupName");

  ///définir point d'entré dans l'application, là c'est ligue parisienne
  if (!betType) {
    betType = "bet";
    betCompetition = "Ligue Parisienne";
  }

  const getBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setBets(res.data);
        setBetsToDisplay(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
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
      <>
        <div className="home">
          {betType === "bet" &&
            betsToDisplay.length > 0 &&
            sortBetArray(uid.uid, betsToDisplay).map((bet) => {
              return (
                <>
                  <BetCard bet={bet} getBets={getBets} key={bet._id} />
                </>
              );
            })}

          <br />
        </div>
      </>
    </>
  );
};
export default Home;
