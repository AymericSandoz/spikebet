import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CombinedBetCard from "../AdminCard/CombinedBetCard";
import Home from "../../../pages/Home";
import AdminLeftNav from "../../Navbar/AdminLeftNav";
import { IsAdmin } from "../../../utils/Utils";
const CombinedBets = () => {
  const [loadCombinedBets, setLoadCombinedBets] = useState(true);
  const [combinedBets, setCombinedBets] = useState([]);

  const getCombinedBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/combinedBets`,
    })
      .then((res) => {
        setCombinedBets(res.data);
        setLoadCombinedBets(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loadCombinedBets) {
      getCombinedBets();
    }
  }, [loadCombinedBets, combinedBets]);

  return (
    <>
      {IsAdmin() ? (
        <>
          <AdminLeftNav />

          <div className="admin-bets">
            {combinedBets.length > 0 &&
              combinedBets
                .sort((a, b) => (a.live < b.live ? 1 : -1))
                .map((combinedBet) => {
                  return (
                    <>
                      <CombinedBetCard
                        combinedBet={combinedBet}
                        key={combinedBet._id}
                        getCombinedBets={getCombinedBets}
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
    </>
  );
};

export default CombinedBets;
