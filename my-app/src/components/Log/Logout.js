import React from "react";
import { FaUsersSlash } from "react-icons/fa";
const Logout = () => {
  const clearToken = () => {
    if (window.confirm("Voulez-vous vous déconnectez ?")) {
      localStorage.clear();
      window.location = "/log";
    }
  };

  return (
    <li onClick={clearToken} className="icon-logout">
      <FaUsersSlash color="white" />
    </li>
  );
};

export default Logout;
