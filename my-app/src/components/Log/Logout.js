import React from "react";
import { FaUsersSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const clearToken = () => {
    if (window.confirm("Voulez-vous vous déconnectez ?")) {
      localStorage.clear();

      navigate("/log");
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
