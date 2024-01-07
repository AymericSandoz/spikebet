import { UidContext } from "../AppContext";

import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import userCard from "./UserCard";
import { NavLink } from "react-router-dom";
import UserCard from "./UserCard";
import { CalculTotalCoins, calculScore } from "../../utils/Utils";
import LeftNav from "../Navbar/Leftnav";
import Log from "../../components/Log";
const Ranking = () => {
  const [error, setError] = useState("");

  const [loadUsers, setLoadUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const uid = useContext(UidContext);

  const returnScoreArray = (array) => {
    for (let j = 0; j < array.length; j++) {
      array[j].score = calculScore(array[j].betsArray, array[j].coins);
    }

    return array;
  };

  const getUsers = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/user/getAllUsers`,
    })
      .then((res) => {
        let newArray = returnScoreArray(res.data);
        newArray.sort((a, b) => (a.score < b.score ? 1 : -1));
        setUsers(newArray);
        setLoadUsers(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (loadUsers) {
      getUsers();
    }
  }, [loadUsers, users]);

  return (
    <>
      <>
        <div className="ranking">
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <>
                  <UserCard user={user} index={index} />
                </>
              );
            })}
          <br />
        </div>
      </>
    </>
  );
};
export default Ranking;
