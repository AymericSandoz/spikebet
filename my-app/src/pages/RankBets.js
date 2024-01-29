import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import RankBetCard from "../components/Bets/BetCard/RankBetCard";

const RankBets = () => {
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);
  const [betsToDisplay, setBetsToDisplay] = useState([]);
  const [competitionName, setCompetitionName] = useState("");
  // const [displayBets, setDisplayBets] = useState(false);

  const query = useQuery();
  let competition = query.get("competition");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const calculateTeamScores = (bets) => {
    // Vérifier si 'bets' est défini et non vide
    bets?.forEach((bet) => {
      const teamScores = {};
      // Vérifier si 'usersBets' est défini et non vide pour chaque pari
      bet.usersBets?.forEach((userBet) => {
        console.log("bet, userBet", bet.usersBets);
        const teamsRanked = userBet.userRanking; // Assurez-vous que c'est la bonne façon d'accéder aux équipes classées dans vos données
        teamsRanked?.forEach((team) => {
          console.log(team);
          const score = 6 - team.position; // 5 points pour la 1ère place, 1 point pour la 5ème, etc...
          if (!teamScores[team.name]) {
            teamScores[team.name] = 0;
          }
          teamScores[team.name] += score;
        });
        console.log("teamScores", teamScores);
        bet.teamScores = teamScores;
        console.log(bet.teamScores);
      });
    });

    return bets;
  };

  if (!competition) {
    competition = "Clermont_2024";
  }

  const getRankBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        let bets = calculateTeamScores(res.data);
        setRankBets(bets);
        // setBetsToDisplay(bets);
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

      // trier filteredBets en focntion de cote_aymeric team qui est un tableau

      setBetsToDisplay(filteredBets);
      if (filteredBets.length > 0) {
        setCompetitionName(filteredBets[0].competition_global_name);
      }
    }
  }, [loadRankBets, rankBets, competition]);

  return (
    <>
      <div className="rank-bets-container">
        {competitionName && <h1 className="no-mobile"> {competitionName}</h1>}
        <div className="rank-bets">
          {betsToDisplay.length === 3 &&
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
  );
};
export default RankBets;
