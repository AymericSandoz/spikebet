import { UidContext } from "../../../components/AppContext";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import RankBetCard from "../../Admin/AdminCard/RankBetCard";
import Home from "../../../pages/Home";
import AdminLeftNav from "../../Navbar/AdminLeftNav";
import { IsAdmin } from "../../../utils/Utils";

const RankBets = () => {
  console.log("RankBets");
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);

  const uid = useContext(UidContext);

  const getRankBets = (e) => {
    console.log("getrankBets");
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
      {IsAdmin() ? (
        <>
          <AdminLeftNav />
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
      ) : (
        <Home />
      )}

      {/* <LeftNav /> */}
    </>
  );
};
export default RankBets;
