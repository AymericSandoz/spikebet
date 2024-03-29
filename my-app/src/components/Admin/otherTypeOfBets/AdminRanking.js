import React, { useEffect, useState } from "react";

import axios from "axios";
import { calculNbClosedBets, calculScore } from "../../../utils/Utils";
import { IsAdmin } from "../../../utils/Utils";
const AdminRanking = () => {
  const [loadUsers, setLoadUsers] = useState(true);
  const [users, setUsers] = useState([]);

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
      });
  };

  useEffect(() => {
    if (loadUsers) {
      getUsers();
    }
  }, [loadUsers, users]);

  return (
    <>
      {IsAdmin() && (
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
      )}
    </>
  );
};
export default AdminRanking;
