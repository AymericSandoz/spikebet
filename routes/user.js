const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importation controllers
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth"); //authentifications
//Routes

router.post("/register", userCtrl.signup); //Inscriptions
router.post("/login", userCtrl.login); //Connexion
router.get("/getAllUsers", userCtrl.getAllUsers);
router.get("/fetchCoins", auth, userCtrl.fetchCoins);
module.exports = router; //exportations de notre routeur
