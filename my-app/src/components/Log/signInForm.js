// import React from "react";
// import { useState } from "react";
// import axios from "axios";

// const SignInForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [identificationError, setIdentificationError] = useState("");

//     const HandleLogin = (e) => {
//         e.preventDefault();

//         axios({
//             method: "post",
//             url: `${process.env.REACT_APP_SERVER_URL}api/user/login`,
//             data: {
//                 email: email,
//                 password: password
//             }
//         })
//             .then((res) => {
//                 console.log("res data error : " + res.data.error);

//                 if (res.data.error) {
//                     console.log(res.data.error);

//                     setIdentificationError(res.data.error);
//                 } else {
//                     window.location = "/";
//                     localStorage.setItem("token", res.data.token);
//                     localStorage.setItem("pseudo", res.data.pseudo);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     return (
//         <form action="" onSubmit={HandleLogin} id="sign-in-form">
//             <label htmlFor="email">Email</label>
//             <br />
//             <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//             />
//             <br />
//             <label htmlFor="password">Mot de passe</label>
//             <br />
//             <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//             />
//             <br />
//             <div className="identification error">{identificationError}</div>
//             <br />
//             <input
//                 type="submit"
//                 className="btn-connexion"
//                 value="Se connecter"
//             />
//         </form>
//     );
// };

// export default SignInForm;

import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  console.log("SignInForm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    console.log("handleLogin");
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `api/user/login`,

      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log("handleLoginres", res);

        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("pseudo", res.data.pseudo);
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
      <div className="password error"></div>
      <br />
      <input className="btn-connexion" type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
