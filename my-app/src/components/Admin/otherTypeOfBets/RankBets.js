import React, { useEffect, useState } from "react";
import axios from "axios";
import RankBetCard from "../../Admin/AdminCard/RankBetCard";
import { IsAdmin } from "../../../utils/Utils";
import { useLocation } from "react-router-dom";

const RankBets = () => {
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);
  const [betsToDisplay, setBetsToDisplay] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let competition = query.get("competition");

  if (!competition) {
    competition = "Clermont_2024";
  }

  const calculateTeamScores = (bets) => {
    bets?.forEach((bet) => {
      const teamScores = {};
      bet.usersBets?.forEach((userBet) => {
        const teamsRanked = userBet.userRanking;
        teamsRanked?.forEach((team) => {
          const score = 6 - team.position;
          if (!teamScores[team.name]) {
            teamScores[team.name] = 0;
          }
          teamScores[team.name] += score;
        });

        bet.teamScores = teamScores;
      });
    });

    return bets;
  };

  const getRankBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        let bets = calculateTeamScores(res.data);
        setRankBets(bets);
        setLoadRankBets(false);
        setBetsToDisplay(res.data);
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
      {IsAdmin() && (
        <>
          <div className="rank-bets-container">
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
          </div>
        </>
      )}
    </>
  );
};
export default RankBets;
