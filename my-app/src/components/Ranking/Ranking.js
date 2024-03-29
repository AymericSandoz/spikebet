import React, { useRef, useEffect, useState } from "react";

import axios from "axios";
import { calculNbClosedBets, calculScore } from "../../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

const Ranking = () => {
  const [loadUsers, setLoadUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = (event) => {
    console.log("searching for", event.target.value);
    setSearchTerm(event.target.value);
    filterUsers(event.target.value);
  };

  const filterUsers = (searchTerm) => {
    let filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  };

  const returnScoreArray = (array) => {
    for (let j = 0; j < array.length; j++) {
      array[j].score = calculScore(array[j].betsArray, array[j].coins);
    }

    return array;
  };

  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending

  const sortUsers = () => {
    let sortedUsers = [...users];
    if (sortOrder) {
      sortedUsers.sort((a, b) => (a.score > b.score ? 1 : -1));
    } else {
      sortedUsers.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        // scores are equal, sort by name
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    setFilteredUsers(sortedUsers);
    setSortOrder(!sortOrder); // toggle the sort order for the next click
  };

  const getUsers = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/user/getAllUsers`,
    })
      .then((res) => {
        let newArray = returnScoreArray(res.data);
        newArray.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          }
          if (a.score > b.score) {
            return -1;
          }
          // scores are equal, sort by name
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        newArray = newArray.map((user, index) => {
          return { ...user, rank: index + 1 };
        });
        setUsers(newArray);
        setFilteredUsers(newArray);
        setLoadUsers(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const inputRef = useRef();
  useEffect(() => {
    if (loadUsers) {
      getUsers();
    }

    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
                    <th className="sortable" onClick={sortUsers}>
                      Classement{" "}
                      <span>
                        <FontAwesomeIcon icon={faSort} />
                      </span>
                    </th>
                    <th className="sortable">
                      {!isSearchVisible && (
                        <div onClick={toggleSearch}>
                          Nom{" "}
                          <span onClick={toggleSearch}>
                            <FontAwesomeIcon icon={faFilter} />
                          </span>
                        </div>
                      )}
                      {isSearchVisible && (
                        <input
                          ref={inputRef}
                          type="text"
                          value={searchTerm}
                          placeholder="Rechercher"
                          onChange={handleSearchChange}
                        />
                      )}
                    </th>
                    <th>Score</th>
                    <th>Nombre de paris</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    return (
                      <tr key={user.rank}>
                        <td>{user.rank}</td>
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
