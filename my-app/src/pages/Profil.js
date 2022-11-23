import axios from "axios";
import { UidContext } from "../components/AppContext";

import React, { useEffect, useState, useContext } from "react";

const Profil = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [controlPassword, setControlPassword] = useState();
  const [user, setUser] = useState();
  const [loadUser, setLoadUser] = useState(true);
  const getUser = async () => {
    console.log("getUser");
    await axios({
      method: "get",

      url: "api/user/getUser",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },

      //withCredentials: true,
    })
      .then((res) => {
        setUser(res.data);
        setLoadUser(false);
      })
      .catch((err) => console.log("err"));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let updatedProfil = {};
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");

    // if (pseudo) updatedProfil.pseudo = pseudo;
    // if (name) updatedProfil.name = name;
    // if (email) updatedProfil.email = email;
    // const passwordError = document.querySelector(".password.error");
    // const passwordConfirmError = document.querySelector(
    //   ".password-confirm.error"
    // );

    // passwordConfirmError.innerHTML = "";

    // if (password !== controlPassword || !terms.checked) {
    //   if (password !== controlPassword)
    //     passwordConfirmError.innerHTML =
    //       "Les mots de passe ne correspondent pas";

    await axios({
      method: "put",
      url: `api/user/updateProfil`,

      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: {
        email: email,
        name: name,
        pseudo: pseudo,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          // passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loadUser) {
      console.log("lapinossss");
      getUser();
    }
  }, [loadUser, user]);

  return (
    <>
      <form action="" onSubmit={handleRegister} id="update-profil-form">
        <label htmlFor="pseudo">Pseudo</label>
        <br />
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          onChange={(e) => setPseudo(e.target.value)}
          value={pseudo}
          placeholder={user.pseudo}
        />
        <div className="pseudo error"></div>
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder={user.email}
        />
        <div className="name error"></div>
        <br />
        <label htmlFor="name">name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={user.name}
        />
        <div className="email error"></div>
        <br />
        {/* <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <br />
        <label htmlFor="password-conf">Confirmer mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password-conf"
          onChange={(e) => setControlPassword(e.target.value)}
          value={controlPassword}
        />
        <div className="password-confirm error"></div>
        <br /> */}
        <input
          className="btn btn-update"
          type="submit"
          value="Valider modification"
        />
      </form>
    </>
  );
};

export default Profil;
