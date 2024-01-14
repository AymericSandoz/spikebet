import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import BarChart from "./BarChart";
import axios from "axios";
import { UidContext } from "../../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faCoins,
  faDollar,
  faMoneyBill,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import RPLogo from "../../../images/Roundnet_Paris.png";
import Select from "./Rank/Select";
import Ranking from "./Rank/Ranking";

const RankBetCard = ({ rankBet, getRankBets }) => {
  const [error, setError] = useState();
  const uid = useContext(UidContext);

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [showAllTeams, setShowAllTeams] = useState(false);

  function getFrenchOrdinal(n) {
    if (n === 1) return "1er";
    return n + "ème";
  }

  const handleTeamSelect = (event) => {
    let teamName = event.target.value;
    let rankedTeam = {};

    if (selectedTeams.length < 5) {
      setSelectedTeams([...selectedTeams, teamName]);
      rankedTeam.name = teamName;
      rankedTeam.position = selectedTeams.length + 1;
      setRanking([...ranking, rankedTeam]);
    } else setError("Hop Hop Hop, 5 équipes max");
  };

  const handleRemoveTeam = (team, position) => {
    setError();
    let updatedRanking = ranking.filter((item) => item.name !== team);
    setSelectedTeams(selectedTeams.filter((item) => item !== team));
    //setRanking(ranking.filter((item) => item.name !== team));

    //permet d'actualiser en direct la position au classement
    updatedRanking.forEach((element) => {
      if (element.position >= position) {
        element.position--;
      }
    });
    setRanking(updatedRanking);
  };

  const handleTeamsReorder = (direction, position) => {
    let orderingTeam = ranking;
    if (direction === "up") {
      orderingTeam.forEach(function (element) {
        if (element.position === position) {
          element.position--;
        } else if (element.position === position - 1) {
          element.position++;
        }
      });
    } else {
      orderingTeam.forEach(function (element) {
        if (element.position === position) {
          element.position++;
        } else if (element.position === position + 1) {
          element.position--;
        }
      });
    }

    setRanking([...orderingTeam]);
  };

  const bet = () => {
    if (ranking.length !== 5) {
      console.log("erreur : Le top 5 n'est pas complet");

      const randomErrorNumber = Math.floor(Math.random() * 4);
      if (randomErrorNumber === 0)
        setError("Tu ne sais pas compter jusqu'à 5 ?");
      else if (randomErrorNumber === 1) setError("Tu dois ajouter 5 équipes");
      else if ((randomErrorNumber) => 2)
        setError(`Ohhhh ! C'est un top 5 par un top ${ranking.length} !`);

      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/rankBets/${rankBet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { ranking: ranking, prize: rankBet.prize },
    })
      .then((res) => {
        getRankBets();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <li className="rank-bet-card" key={rankBet._id}>
        <h1>QUEL EST TON PRONOSTIC ?</h1>
        <div className="select-player-header">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <span className="index">#{i + 1}</span>
              <select id={`select-player-${i}`} onChange={handleTeamSelect}>
                {rankBet.teams.map((team) => {
                  if (!selectedTeams.includes(team.name)) {
                    return (
                      <option key={team.name} value={team.name}>
                        {team.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          ))}
        </div>
        <button className="primary-button" onClick={() => bet()}>
          Valider
        </button>

        {/* <div className="select-player-header">

          <select id="select-player" onChange={handleTeamSelect}>
            {rankBet.teams.map((team) => {
              if (!selectedTeams.includes(team.name)) {
                return (
                  <>
                    <option key={team.name} value={team.name}>
                      {team.name}
                    </option>
                  </>
                );
              }
            })}
          </select>
        </div>

        <div className="selected-teams">
          {ranking
            .sort((b, a) => b.position - a.position)
            .map((team, index) => (
              <p>
                {getFrenchOrdinal(team.position)} - {team.name}
                {"    "}
                <FontAwesomeIcon
                  icon={faXmark}
                  className="icon"
                  onClick={() => handleRemoveTeam(team.name, team.position)}
                />
                {team.position < ranking.length && (
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="icon"
                    onClick={() => handleTeamsReorder("down", team.position)}
                  />
                )}
                {team.position > 1 && (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="icon"
                    onClick={() => handleTeamsReorder("up", team.position)}
                  />
                )}
              </p>
            ))}
        </div>

        <button className="primary-button" onClick={() => bet()}>
          Envoyer
        </button> */}
        {error && <p className="bet-error">{error}</p>}
        {rankBet.teamScores && (
          <div className="bar-chart-container">
            <h1>Ceux que les autres ont parié</h1>
            <BarChart data={rankBet.teamScores} showAllTeams={showAllTeams} />
            <button
              className="display-more-button"
              onClick={() => setShowAllTeams(!showAllTeams)}
            >
              {showAllTeams ? "Afficher moins" : "Afficher plus"}
            </button>
          </div>
        )}
      </li>
    </>
  );
};

export default RankBetCard;
