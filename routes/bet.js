const express = require("express");
const router = express.Router(); //création d'un routeur express dans lequel on va enregistrer nos routes

//Importations des middleware
const auth = require("../middleware/auth"); //authentifications

//Importation controllers
const stuffCtrl = require("../controllers/bet");

//Routes
router.get("/surveys", stuffCtrl.getAllSurveys);
router.put("/survey/:id", auth, stuffCtrl.voteSurvey);

router.get("/rankBets", stuffCtrl.getAllRankBets);
router.post("/rankBets/:id", auth, stuffCtrl.rankBets);
router.get("/getMyRankedBets", auth, stuffCtrl.getMyRankedBets);
router.get("/getUserRankBet/:id", auth, stuffCtrl.getUserRankBet);

router.put("/closeRankBet/:id", auth, stuffCtrl.closeRankBet);
module.exports = router; //exportations de notre routeur
