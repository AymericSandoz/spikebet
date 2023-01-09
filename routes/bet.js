const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importations des middleware
const auth = require("../middleware/auth"); //authentifications

//Importation controllers
const stuffCtrl = require("../controllers/bet");

//Routes

router.get("/", stuffCtrl.getAllBets);
router.get("/combined", stuffCtrl.getAllCombinedBets); //Récupération de tous les bets
router.put("/modifyBet/:id", stuffCtrl.modifyBet);
router.post("/", auth, stuffCtrl.bet);
router.get("/getLigueParisienne", stuffCtrl.getLigueParisienne);
router.get("/getMyBets", auth, stuffCtrl.getMyBets);
router.put("/closeBet/:id", auth, stuffCtrl.closeBet);
module.exports = router; //exportations de notre routeur
