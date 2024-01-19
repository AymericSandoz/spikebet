import { UidContext } from "../AppContext";

import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import userCard from "./UserCard";
import { NavLink } from "react-router-dom";
import UserCard from "./UserCard";
import {
  calculNbClosedBets,
  calculScore,
  calculNbBetWon,
} from "../../utils/Utils";
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
      <div className="ranking-container">
        <div className="ranking">
          {users.length > 0 && (
            <>
              <table>
                <thead>
                  <tr>
                    <th className="no-mobile">Classement </th>
                    <th className="mobile-only">Score</th>
                    <th>Nom</th>
                    <th>Score</th>
                    <th>Nombre de paris</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{calculScore(user.betsArray)}</td>
                        <td>{calculNbClosedBets(user.betsArray)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          <br />
        </div>
      </div>
    </>
  );
};
export default Ranking;
