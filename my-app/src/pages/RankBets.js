import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import RankBetCard from "../components/Bets/BetCard/RankBetCard";

const RankBets = () => {
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);
  const [betsToDisplay, setBetsToDisplay] = useState([]);

  const uid = useContext(UidContext);

  const query = useQuery();
  const competition = query.get("competition");
  console.log(competition, "competition");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const getRankBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setRankBets(res.data);
        setBetsToDisplay(res.data);
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

    //Si il y a une competition dans l'url, on filtre les paris en fonction de la competition
    if (competition && rankBets) {
      const filteredBets = rankBets.filter(
        (bet) => bet.competition_name === competition
      );
      setBetsToDisplay(filteredBets);
    }
  }, [loadRankBets, rankBets, competition]);

  return (
    <>
      <>
        <div className="rank-bets">
          {betsToDisplay.length > 0 &&
            betsToDisplay.map((rankBet) => {
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
    </>
  );
};
export default RankBets;
