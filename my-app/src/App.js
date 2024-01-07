import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { CalculTotalCoins } from "./utils/Utils";
//Objectif : stocker ID pour vérifier à chaque fois si notre utilisateurs est connecté ou pas.

const App = () => {
  const [uid, setUid] = useState(null);
  const [coins, setCoins] = useState(null);
  console.log("localStorage.getItem()", localStorage.getItem("token"));

  const fetchToken = async () => {
    console.log("fetchToken");
    await axios({
      method: "post",

      url: `${process.env.REACT_APP_SERVER_URL}jwtid`,
      data: {
        token: localStorage.getItem("token"),
      },

      //withCredentials: true,
    })
      .then((res) => {
        if (res.message != "jwt malformed") {
          console.log("!jwt malformed", res);
          setUid(res.data);
        }
      })
      .catch((err) => {
        setUid(null);
        console.log("No token ");
      });
  };

  const fetchCoins = async () => {
    await axios({
      method: "get",

      url: `${process.env.REACT_APP_SERVER_URL}api/user/getUser`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },

      //withCredentials: true,
    })
      .then((res) => {
        setCoins(CalculTotalCoins(res.data.betsArray, res.data.coins));
      })
      .catch((err) => {
        console.log("No coins ");
      });
  };
  useEffect(() => {
    fetchToken();

    fetchCoins();
  }, [uid]);
  function updateCoins() {
    fetchCoins();
  }

  function updateToken() {
    fetchToken();
  }

  function destroyToken() {
    setUid(null);
  }
  return (
    <UidContext.Provider
      value={{ uid, coins, updateCoins, updateToken, destroyToken }}
    >
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
