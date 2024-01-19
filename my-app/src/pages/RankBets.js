import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import RankBetCard from "../components/Bets/BetCard/RankBetCard";

const RankBets = () => {
  const calculateTeamScores = (bets) => {
    const teamScores = {};
    // Vérifier si 'bets' est défini et non vide
    bets?.forEach((bet) => {
      // Vérifier si 'usersBets' est défini et non vide pour chaque pari
      bet.usersBets?.forEach((userBet) => {
        const teamsRanked = userBet.userRanking; // Assurez-vous que c'est la bonne façon d'accéder aux équipes classées dans vos données
        teamsRanked?.forEach((team) => {
          const score = 6 - team.position; // 5 points pour la 1ère place, 1 point pour la 5ème, etc...
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

  console.log("rankBets");
  const [rankBets, setRankBets] = useState([]);
  const [loadRankBets, setLoadRankBets] = useState(true);
  const [betsToDisplay, setBetsToDisplay] = useState([]);
  const [competitionName, setCompetitionName] = useState("");

  const uid = useContext(UidContext);

  const query = useQuery();
  let competition = query.get("competition");

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

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
        console.log(res.data);
        //usersBets contients tous les paris(classement de tous les utilisateurs). Teams contient toutes les équipes sur lesquelles on peut parier. Je souhaite une fonction qui parcours tous les usersbets et attribut à chaque équipe 5 points si elle miser 1er, 4points si elle est misé 2eme etc...
        let bets = calculateTeamScores(res.data);
        setRankBets(bets);
        setBetsToDisplay(bets);
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
      if (filteredBets.length > 0) {
        setCompetitionName(filteredBets[0].competition_global_name);
      }
    }
  }, [loadRankBets, rankBets, competition]);

  return (
    <>
      <div className="rank-bets-container">
        {competitionName && <h1> {competitionName}</h1>}
        <div className="rank-bets">
          {!loadRankBets &&
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
