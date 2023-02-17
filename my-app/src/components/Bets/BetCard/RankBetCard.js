import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

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

  const handleRemoveTeam = (team, index) => {
    setError();
    let updatedRanking = ranking.filter((item) => item.name !== team);
    setSelectedTeams(selectedTeams.filter((item) => item !== team));
    setRanking(ranking.filter((item) => item.name !== team));

    //permet d'actualiser en direct la position au classement
    updatedRanking.forEach((element) => {
      if (element.position >= index) {
        console.log("hello", element.position--);
      }
    });
    setRanking(updatedRanking);
    console.log(updatedRanking);
  };

  const handleTeamsReorder = (direction, position) => {
    let selectedTeam = ranking.filter((item) => item.position === position);

    let orderingTeam = ranking;

    if (direction === "up") {
      orderingTeam.forEach(function (element) {
        if (element.position === position) {
          console.log(element);
          element.position--;
          console.log(element);
        } else if (element.position === position - 1) {
          console.log(element);
          element.position++;
          console.log(element);
        }
      });
    } else {
    }
    console.log(orderingTeam);
    setRanking(orderingTeam);
  };

  const handleRanking = () => {
    console.log(ranking);
  };

  // const bet = () => {

  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_SERVER_URL}api/bet/combinedBets/${combinedBet._id}`,
  //     headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  //     data: {}
  //     },
  //   })
  //     .then((res) => {
  //       console.log("bet saved");
  //       getRankBets();

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <li className="rank-bet-card" key={rankBet._id}>
        {/* <div>
          <h1>Rank the top 5 players</h1>
          <Select
            teams={rankBet.teams}
            selectedTeams={selectedTeams}
            onSelect={handleTeamSelect}
          />
          <Ranking
            teams={selectedTeams}
            onReorder={handleTeamsReorder}
            onSubmit={handleRankingSubmit}
          />
        </div> */}

        <p className="prize">
          {" "}
          Cash prize : {rankBet.prize}{" "}
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
                  onClick={() => handleRemoveTeam(team.name, index)}
                />
                {team.position < 4 && (
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

        <button onClick={() => handleRanking()}>test</button>
        {error && <p className="bet-error">{error}</p>}

        {/* {uid.uid && */}
        {/* combinedBet.live !== "closed" &&
            (!combinedBet.userIdArray.includes(uid.uid) ? (
              <button className="btn-confirmer" onClick={() => bet()}>
                Parier
              </button>
            ) : (
              <p className="already-bet">
                <FontAwesomeIcon icon={faCheck} /> DÉJA PARIÉ
              </p>
            ))}
          {uid.uid && combinedBet.live === "closed" && (
            <p className="already-bet">
              <FontAwesomeIcon icon={faCheck} /> CLOSED
            </p>
          )} */}
      </li>
    </>
  );
};

export default RankBetCard;
