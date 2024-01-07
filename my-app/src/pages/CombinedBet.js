import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import CombinedBetCard from "../components/Bets/BetCard/CombinedBetCard";
import Log from "../components/Log";

const CombinedBet = () => {
  const [combinedBets, setCombinedBets] = useState([]);
  const [loadCombinedBets, setLoadCombinedBets] = useState(true);

  const uid = useContext(UidContext);

  const getCombinedBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/combinedBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setCombinedBets(res.data);
        setLoadCombinedBets(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadCombinedBets) {
      getCombinedBets();
    }
  }, [loadCombinedBets, combinedBets]);

  return (
    <>
      <>
        <div className="combined-bets">
          {combinedBets.length > 0 &&
            combinedBets.map((combinedBet) => {
              return (
                <>
                  <CombinedBetCard
                    combinedBet={combinedBet}
                    getCombinedBets={getCombinedBets}
                    key={combinedBet._id}
                  />
                </>
              );
            })}
          <br />
        </div>
      </>

      {/* <LeftNav /> */}
    </>
  );
};
export default CombinedBet;
