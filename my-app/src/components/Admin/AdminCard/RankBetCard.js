import React, { useContext, useState } from "react";

import axios from "axios";
import { UidContext } from "../../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCoins,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const RankBetCard = ({ rankBet, getRankBets }) => {
  const [error, setError] = useState();
  const uid = useContext(UidContext);

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [ranking, setRanking] = useState([]);

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
    console.log(updatedRanking);
    setSelectedTeams(selectedTeams.filter((item) => item !== team));
    //setRanking(ranking.filter((item) => item.name !== team));

    //permet d'actualiser en direct la position au classement
    updatedRanking.forEach((element) => {
      if (element.position >= position) {
        console.log("hello", element.position, "//", position);
        element.position--;
      }
    });
    setRanking(updatedRanking);
    console.log(updatedRanking);
  };

  const handleTeamsReorder = (direction, position) => {
    let orderingTeam = ranking;
    console.log("ranking", ranking);
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

  const closeBet = () => {
    if (ranking.length !== 5) {
      setError(`Ohhhh ! C'est un top 5 par un top ${ranking.length} !`);
      return;
    }

    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/closeRankBet/${rankBet._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { ranking },
    })
      .then((res) => {
        console.log("bet saved");
        getRankBets();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(ranking);
  };

  return (
    <>
      {rankBet.live === "open" ? (
        <li className="rank-bet-card" key={rankBet._id}>
          <p className="prize">
            {" "}
            Cash prizddddddddddddde : {rankBet.prize}{" "}
            <FontAwesomeIcon icon={faCoins} className="icon" />
          </p>

          <h4 className="competition-name">{rankBet.competition}</h4>

          <div>
            <label htmlFor="select-player"> choisis 5 équipes:</label>
            <select id="select-player" onChange={handleTeamSelect}>
              <option value="">-- Choisis 5 équipes --</option>
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
                  {team.position} - {team.name}
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

          <button onClick={() => closeBet()}>Confirmer</button>
          {error && <p className="bet-error">{error}</p>}
        </li>
      ) : (
        <p>closed</p>
      )}
    </>
  );
};

export default RankBetCard;
