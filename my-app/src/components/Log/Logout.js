import React, { useContext } from "react";
import { FaUsersSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { UidContext } from "../AppContext";

const Logout = () => {
  const uid = useContext(UidContext);
  const navigate = useNavigate();
  const clearToken = () => {
    if (window.confirm("Voulez-vous vous déconnectez ?")) {
      localStorage.clear();
      uid.destroyToken();
      console.log(uid);
      navigate("/");
      setTimeout(console.log(uid), 1000);
    }
  };

  return (
    <li onClick={clearToken} className="icon-logout">
      <FaUsersSlash color="white" />
    </li>
  );
};

export default Logout;
