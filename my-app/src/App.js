import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { CalculTotalCoins } from "./utils/Utils";
//Objectif : stocker ID pour vérifier à chaque fois si notre utilisateurs est connecté ou pas.

const App = () => {
  const [uid, setUid] = useState(null);
  const [coins, setCoins] = useState(0);

  // useEffect(() => {
  const fetchToken = async () => {
    await axios({
      method: "post",

      url: `${process.env.REACT_APP_SERVER_URL}jwtid`,
      data: {
        token: localStorage.getItem("token"),
      },

      //withCredentials: true,
    })
      .then((res) => {
        console.log("fetch token res", res);
        if (res.message != "jwt malformed") {
          console.log("!jwt malformed");
          setUid(res.data);
        }
      })
      .catch((err) => console.log("No token "));
  };
  fetchToken();

  const fetchCoins = async () => {
    await axios({
      method: "get",

      url: `api/user/getUser`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },

      //withCredentials: true,
    })
      .then((res) => {
        setCoins(
          CalculTotalCoins(
            res.data.coins,
            res.data.miseArray,
            res.data.scoreArray
          )
        );
      })
      .catch((err) => console.log("No token "));
  };
  fetchCoins();

  // }, [uid]);
  function updateCoins() {
    fetchCoins();
  }

  function updateToken() {
    fetchToken();
  }
  return (
    <UidContext.Provider value={{ uid, coins, updateCoins, updateToken }}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
