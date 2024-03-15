import React, { useEffect, useState } from "react";
import axios from "axios";
import { IsAdmin } from "../../utils/Utils";
// import StatCard from "./AdminCard/StatCard";
import StatsTable from "./AdminTable/StatsTable";
import Select from "react-select";

const RankBets = () => {
  const [stats, setStats] = useState([]);
  const [loadStats, setLoadStats] = useState(true);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competition, setCompetition] = useState("");
  const [competitionType, setCompetitionType] = useState("");

  const handleCompetitionChange = (selectedOption) => {
    setSelectedCompetition(selectedOption);
    setCompetition(selectedOption.value);
  };

  const getRankBetsStats = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/stats/rankbets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setStats(res.data);
        setLoadStats(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompetitionType = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/stats/competition_type`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setCompetitionType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadStats) {
      getCompetitionType();
      getRankBetsStats();
    }
  }, [loadStats]);

  return (
    <>
      {IsAdmin() && (
        <>
          {/* {competitionType.length > 0 && (
            <Select
              value={selectedCompetition}
              onChange={handleCompetitionChange}
              options={competitionType.map((type) => ({
                value: type,
                label: type,
              }))}
            />
          )} */}

          <div className="stats-container">
            <div className="stats">
              {stats.length > 0 && <StatsTable stats={stats} />}
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RankBets;
