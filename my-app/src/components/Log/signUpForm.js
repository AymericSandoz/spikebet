// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SignInForm from "./signInForm";

// const SignUpForm = (props) => {
//     const [formSubmit, setFormSubmit] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");

//     const [pseudo, setPseudo] = useState("");
//     const [pseudoError, setPseudoError] = useState("");
//     const passwordMinimunLengthSecurity = 5; //Tqille minimun MDP

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         if (password.length > passwordMinimunLengthSecurity) {
//             await axios({
//                 method: "post",
//                 url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
//                 data: {
//                     email,
//                     password,
//                     pseudo
//                 }
//             })
//                 .then((res) => {
//                     if (res.data.pseudo == "" && res.data.email == "") {
//                         props.registerActionDone();
//                         setFormSubmit(true);
//                     } else if (res.data.message == "Utilisateur créé !") {
//                         props.registerActionDone();
//                         setFormSubmit(true);
//                     } else {
//                         setPseudoError(res.data.pseudo);
//                         setEmailError(res.data.email);
//                     }
//                 })
//                 .catch((err) => console.log(err));
//         } else {
//             setPasswordError(
//                 `Le mot de passe doit contenir plus de ${passwordMinimunLengthSecurity} caractères`
//             );
//         }
//     };

//     useEffect(() => {
//         if (password.length > 0) {
//             if (password.length > passwordMinimunLengthSecurity) {
//                 setPasswordError("");
//             } else {
//                 setPasswordError(
//                     `Le mot de passe doit contenir plus de ${passwordMinimunLengthSecurity} caractères`
//                 );
//             }
//         } else {
//             setPasswordError(``);
//         }
//     }, [password]);

//     return (
//         <>
//             {formSubmit ? (
//                 <>
//                     <SignInForm />
//                 </>
//             ) : (
//                 <form action="" onSubmit={handleRegister} id="sign-up-form">
//                     <label htmlFor="email">Email</label>
//                     <br />
//                     <input
//                         type="text"
//                         name="email"
//                         id="email"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                     />
//                     <div className="email error">{emailError}</div>
//                     <label htmlFor="pseudo">Pseudo</label>
//                     <br />
//                     <input
//                         type="text"
//                         name="pseudo"
//                         id="email"
//                         onChange={(e) => setPseudo(e.target.value)}
//                         value={pseudo}
//                     />
//                     <div className="pseudo error">{pseudoError}</div>
//                     <br />
//                     <label htmlFor="password">Mot de passe</label>
//                     <br />
//                     <input
//                         type="password"
//                         name="password"
//                         id="password"
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                     />
//                     <br />
//                     <div className="password error">{passwordError}</div>
//                     <br />
//                     <input
//                         type="submit"
//                         className="btn-inscription"
//                         value="Valider votre inscription"
//                     />
//                     <input
//                         type="submit"
//                         className="btn-inscription-mobile"
//                         value="Valider"
//                     />
//                 </form>
//             )}
//         </>
//     );
// };

// export default SignUpForm;

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
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `api/user/register`,
        data: {
          pseudo,
          email,
          password,
          name,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
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
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
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
