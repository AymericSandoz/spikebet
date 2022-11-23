import { UidContext } from "../AppContext";

import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import userCard from "./UserCard";
import { NavLink } from "react-router-dom";
import UserCard from "./UserCard";
import { CalculTotalCoins } from "../../utils/Utils";
import LeftNav from "../Navbar/Leftnav";
import Log from "../../components/Log";
const Ranking = () => {
  const [error, setError] = useState("");

  const [loadUsers, setLoadUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const uid = useContext(UidContext);

  const returnScoreArray = (array) => {
    // let sum = 0;
    // let miseSum = 0;
    // // let scoreArray = [];
    // console.log(array.length);
    // console.log(array);
    // for (let j = 0; j < array.length; j++) {
    //   for (let i = 0; i < array[j].scoreArray.length; i++) {
    //     sum += array[j].scoreArray[i];
    //   }
    //   for (let i = 0; i < array[j].miseArray.length; i++) {
    //     miseSum += array[j].miseArray[i];
    //   }

    //   CalculTotalCoins(array[j].coins,array[j].scoreArray)
    //   // scoreArray.push(sum);
    //   array[j].score = sum + miseSum + array[j].coins;
    //   sum = 0;
    //   miseSum = 0;

    // }
    // console.log(scoreArray.sort());
    // console.log(array);
    // return array;

    for (let j = 0; j < array.length; j++) {
      array[j].score = CalculTotalCoins(
        array[j].coins,
        array[j].miseArray,
        array[j].scoreArray
      );
    }

    return array;
  };

  const getUsers = (e) => {
    axios({
      method: "get",
      url: `api/user/getAllUsers`,
    })
      .then((res) => {
        let newArray = returnScoreArray(res.data);
        console.log(newArray);
        newArray.sort((a, b) => (a.score < b.score ? 1 : -1));
        console.log(newArray);
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
      {uid.uid ? (
        <>
          <LeftNav />
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
      ) : (
        <Log />
      )}
    </>
  );
};
export default Ranking;
