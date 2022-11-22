const Bet = require("../models/bet");
const User = require("../models/user");
const UserBet = require("../models/UserBet");
const mongoose = require("mongoose");
const { updateOne } = require("../models/bet");
const {
  getSuccess,
  point,
  winner,
  calculTotalCoins,
} = require("../utils/shemaFunction");
const user = require("../models/user");
// const LPGroup = require("../models/ligue_parisienne_group");
// const LPteamName = require("../models/ligue_parisienne_team_name");
// const LP = require("../models/ligue_parisienne_all_bets");

exports.getAllBets = (req, res, next) => {
  console.log("guépard");
  Bet.find((err, docs) => {
    if (!err) {
      res.send(docs);
      console.log(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.getLigueParisienne = (req, res, next) => {
  console.log("guépard");
  Bet.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

/////////////////////Obtenir ses propres paris : intéressant, à ne pas supprimer
// exports.getMyBets = (req, res, next) => {
//   console.log("messi");

//   UserBet.find({ userId: req.auth.userId }, (err, userBets) => {
//     if (!err) {

//       var betIdArray = [];
//       userBets.forEach((userBet) => betIdArray.push(userBet.gameID));
//       let objectIdArray = betIdArray.map(mongoose.Types.ObjectId);
//       console.log(objectIdArray);

//       Bet.find({ _id: { $in: objectIdArray } })
//         .then((bet) => {
//           console.log("bet", bet);
//           res.send(bet);
//         })
//         .catch((error) => {
//           res.status(400).json({
//             error: error,
//           });
//         });
//       ///////////////////////////////////:
//     } else res.send("Erreur :" + err);
//   });
// };

exports.getMyBets = (req, res, next) => {
  console.log("messi");

  UserBet.find({ userId: req.auth.userId }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.modifyBet = (req, res, next) => {
  Bet.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json("object modified !"))
    .catch((error) => res.status(401).json({ error }));
};

//créer un bet
exports.bet = (req, res, next) => {
  User.findOne({ _id: req.auth.userId }, (err, docs) => {
    if (!err) {
      if (
        req.body.mise <
        calculTotalCoins(docs.mise, docs.miseArray, docs.scoreArray)
      ) {
        res.status(404).json({
          error: "Fond insuffisant",
        });
      }
    } else res.send("Erreur :" + err);
  });

  var userBet = new UserBet({ ...req.body, userId: req.auth.userId });
  console.log("userBet:", req.body);
  userBet
    .save()
    .then(() => {
      // res.status(201).json({ message: "bet saved !" });
      console.log("bet saved");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });

  User.findOneAndUpdate(
    { _id: req.auth.userId },
    {
      $push: {
        miseArray: req.body.mise,
        scoreIdArray: req.body.gameID,
      },
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(error);
        res.status(400).json(err);
      } else {
        console.log("miseArray et scoreIdArray : ", docs);
      }
    }
  );

  Bet.findOneAndUpdate(
    { _id: req.body.gameID },
    {
      $addToSet: { usersBet: req.auth.userId },
      $push: {
        arrayVictoireEquipePrediction: req.body.victoireEquipePrediction,
      },
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(error);
        res.status(400).json(err);
      } else {
        res.status(201).json({ docs });
      }
    }
  );
};

exports.closeBet = (req, res, next) => {
  UserBet.updateMany(
    { gameID: req.params.id },
    {
      $set: {
        finalScoreEquipeA: req.body.finalScoreEquipeA,
        finalScoreEquipeB: req.body.finalScoreEquipeB,
        live: "closed",
      },
    }
  )
    .then(console.log("UserBet.updateMany"))
    .catch((error) => console.log(error));

  UserBet.find({ gameID: req.params.id }, (err, docs) => {
    if (!err) {
      docs.forEach((element) => {
        User.updateOne(
          { _id: element.userId },
          {
            $push: {
              scoreArray:
                point(
                  getSuccess(
                    req.body.finalScoreEquipeA,
                    req.body.finalScoreEquipeB,
                    element.betScoreEquipeA,
                    element.betScoreEquipeB
                  ),
                  winner(
                    req.body.finalScoreEquipeA,
                    req.body.finalScoreEquipeB
                  ),
                  element.coteEquipeA,
                  element.coteEquipeB
                ) * element.mise,
              // miseArray: element.mise,
              // scoreIdArray: element.gameID,
            },
          }
        )
          .then(() => console.log("scoreArray pushed"))
          .catch((error) => res.status(401).json({ error }));

        // User.updateOne(
        //   { _id: element.userId },
        //   {

        //     $push: { scoreIdArray: element.gameID },
        //   }
        // )
        //   .then(() => console.log("scoreArray"))
        //   .catch((error) => res.status(401).json({ error }));

        UserBet.updateOne(
          { _id: element._id },
          {
            winner: winner(
              req.body.finalScoreEquipeA,
              req.body.finalScoreEquipeB
            ),
            success: getSuccess(
              req.body.finalScoreEquipeA,
              req.body.finalScoreEquipeB,
              element.betScoreEquipeA,
              element.betScoreEquipeB
            ),
            point:
              point(
                getSuccess(
                  req.body.finalScoreEquipeA,
                  req.body.finalScoreEquipeB,
                  element.betScoreEquipeA,
                  element.betScoreEquipeB
                ),
                winner(req.body.finalScoreEquipeA, req.body.finalScoreEquipeB),
                element.coteEquipeA,
                element.coteEquipeB
              ) * element.mise,
          }
        )
          .then(() => console.log("youhou"))
          .catch((error) => console.log(error));
      });
    } else res.send("Erreur :" + err);
  });

  Bet.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        finalScoreEquipeA: req.body.finalScoreEquipeA,
        finalScoreEquipeB: req.body.finalScoreEquipeB,
        live: "closed",
      },
    },
    { new: true }
  )
    .then((doc) => {
      console.log("Bet modified");
    })
    .catch();
};
