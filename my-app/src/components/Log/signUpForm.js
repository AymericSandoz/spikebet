import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./signInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const nameError = document.querySelector(".name.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    nameError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";
    //const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    //termsError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
      return "Les mots de passe ne correspondent pas";
    }

    //     if (!terms.checked) {
    //       termsError.innerHTML = "Veuillez valider les conditions générales";
    //       return "Veuillez valider les conditions générales"
    // }

    if (password.length < 4) {
      passwordError.innerHTML = "Le mdp doit contenir au moins 4 caractères";
      return "Le mdp doit contenir au moins 4 caractères";
    }

    if (name.length < 1) {
      nameError.innerHTML = "Veuillez remplir un nom";
      return "Veuillez remplir un nom";
    }
    if (email.length < 1) {
      emailError.innerHTML = "Veuillez remplir un email";
      return "Veuillez remplir un email";
    }
    if (pseudo.length < 4) {
      pseudoError.innerHTML = "Le pseudo doit contenir au moins 4 caractères";
      return "Le pseudo doit contenir au moins 4 caractères";
    }

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
      data: {
        pseudo,
        email,
        password,
        name,
      },
    })
      .then((res) => {
        if (res.data.pseudo || res.data.email) {
          pseudoError.innerHTML = res.data.pseudo;
          emailError.innerHTML = res.data.email;
          //passwordError.innerHTML = res.data.error.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
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
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="name">name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div className="name error"></div>
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
          <br />
          {/* <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"> </div>
          <br /> */}
          <input
            className="btn btn-inscription"
            type="submit"
            value="Valider inscription"
          />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
