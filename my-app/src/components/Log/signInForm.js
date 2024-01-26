import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UidContext } from "../AppContext";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const uid = useContext(UidContext);
  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/user/login`, //${process.env.REACT_APP_SERVER_URL}

      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("pseudo", res.data.pseudo);
          uid.updateToken();
          uid.updateCoins();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error">{error && error}</div>
      <br />
      <input className="primary-button" type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
