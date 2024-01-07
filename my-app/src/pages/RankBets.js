import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import RankBetCard from "../components/Bets/BetCard/RankBetCard";

const RankBets = () => {
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);

  const uid = useContext(UidContext);

  const getRankBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setRankBets(res.data);
        setLoadRankBets(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadRankBets) {
      getRankBets();
    }
  }, [loadRankBets, rankBets]);

  return (
    <>
      <>
        <div className="rank-bets">
          {rankBets.length > 0 &&
            rankBets.map((rankBet) => {
              return (
                <>
                  <RankBetCard
                    rankBet={rankBet}
                    getRankBets={getRankBets}
                    key={rankBet._id}
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
export default RankBets;
