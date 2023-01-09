import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import CombinedBetCard from "../components/Bets/BetCard/CombinedBetCard";
import Log from "../components/Log";

const CombinedBet = () => {
  console.log("Home");
  const [bets, setBets] = useState([]);
  const [loadBets, setLoadBets] = useState(true);

  const uid = useContext(UidContext);

  const getBets = (e) => {
    console.log("getBets");
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/combined`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        console.log("get bets res data", res.data);
        setBets(res.data);

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
  }, [loadBets, bets]);

  return (
    <>
      {uid.uid ? (
        <>
          <div className="home">
            {bets.length > 0 &&
              bets.map((bet) => {
                return (
                  <>
                    <CombinedBetCard
                      bet={bet}
                      getBets={getBets}
                      key={bet._id}
                    />
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
export default CombinedBet;
