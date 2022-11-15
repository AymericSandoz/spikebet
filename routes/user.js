const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importation controllers
const userCtrl = require("../controllers/user");

//Routes

router.post("/register", userCtrl.signup); //Inscriptions
router.post("/login", userCtrl.login); //Connexion

module.exports = router; //exportations de notre routeur
