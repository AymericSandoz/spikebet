const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importations des middleware
const auth = require("../middleware/auth"); //authentifications

//Importation controllers
const stuffCtrl = require("../controllers/bet");

//Routes

router.get("/", stuffCtrl.getAllBets);
router.get("/surveys", stuffCtrl.getAllSurveys);
router.put("/survey/:id", auth, stuffCtrl.voteSurvey);
router.get("/combinedBets", stuffCtrl.getAllCombinedBets);
router.get("/rankBets", stuffCtrl.getAllRankBets);

router.post("/combinedBets/:id", auth, stuffCtrl.CombinedBets);
router.post("/rankBets/:id", auth, stuffCtrl.rankBets);
router.put("/modifyBet/:id", stuffCtrl.modifyBet);
router.post("/", auth, stuffCtrl.bet);
router.get("/getMyBets", auth, stuffCtrl.getMyBets);
router.put("/closeBet/:id", auth, stuffCtrl.closeBet);
router.put("/closeCombinedBet/:id", auth, stuffCtrl.closeCombinedBet);

module.exports = router; //exportations de notre routeur
