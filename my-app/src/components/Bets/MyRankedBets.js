import { UidContext } from "../AppContext";

import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

import { useLocation } from "react-router-dom";
import MyBetRankedCard from "../Bets/MyBetCard/MyBetRankedCard";

import Log from "../../components/Log";
const MyBets = () => {
  const [error, setError] = useState("");

  const [loadBets, setLoadBets] = useState(true);
  const [bets, setBets] = useState([]);

  const [betsToDisplay, setBetsToDisplay] = useState([]);
  const uid = useContext(UidContext);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let live = query.get("live");
  const getMyBets = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/getMyRankedBets`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setBets(res.data);
        setBetsToDisplay(res.data);
        setLoadBets(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (loadBets) {
      getMyBets();
    }
    if (live && bets) {
      if (live === "All") {
        setBetsToDisplay(bets);
      } else {
        setBetsToDisplay(
          bets.filter(function (data) {
            return data.live === live;
          })
        );
      }
    }
  }, [loadBets, bets, live]);

  return (
    <>
      {uid.uid ? (
        <>
          {/* <LeftNav /> */}
          <div className="my-bets">
            {betsToDisplay.length > 0 &&
              betsToDisplay.map((bet) => {
                return (
                  <>
                    <MyBetRankedCard bet={bet} key={bet._id} />
                  </>
                );
              })}
            <br />
          </div>
        </>
      ) : (
        <Log />
      )}
    </>
  );
};
export default MyBets;
