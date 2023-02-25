const Bet = require("../models/bet");
const Survey = require("../models/othersTypeOfBets/survey");
const User = require("../models/user");
const UserBet = require("../models/userBet");
const CombinedBet = require("../models/othersTypeOfBets/combinedBets");
const UserCombinedBet = require("../models/othersTypeOfBets/usercombinedbet");
const RankBet = require("../models/othersTypeOfBets/rankBets");
const UserRankBet = require("../models/othersTypeOfBets/userrankbet");

const mongoose = require("mongoose");
const {
  getSuccess,
  point,
  winner,
  calculTotalCoins,
  getCombinedBetSuccess,
  getCombinedBetGain,
  getRankBetGain,
} = require("../utils/shemaFunction");

exports.getAllBets = (req, res, next) => {
  console.log("guépard");
  Bet.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.getAllSurveys = (req, res, next) => {
  Survey.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.getAllRankBets = (req, res, next) => {
  RankBet.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

// exports.getLigueParisienne = (req, res, next) => {
//   console.log("guépard");
//   Bet.find((err, docs) => {
//     if (!err) {
//       res.send(docs);
//     } else res.send("Erreur :" + err);
//   });
// };

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

//Voter lor d'un survey
exports.voteSurvey = (req, res, next) => {
  console.log("vote survey");
  Survey.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        arrayVotersId: req.auth.userId,
      },
    }
  )
    .then(() => console.log("arrayVotersId filled!"))
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error });
    });

  Survey.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        userChoice: {
          userId: req.auth.userId,
          answer: req.body.userChoice,
        },
      },
    }
  )
    .then(() => res.status(201).json("survey send !"))
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error });
    });
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

  User.findOneAndUpdate(
    { _id: req.auth.userId },
    {
      $push: {
        betsArray: {
          gameId: req.body.gameID,
          mise: req.body.mise,
          betType: "game",
        }, //inserted data is the object to be inserted
      },
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
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

exports.rankBets = (req, res, next) => {
  console.log(req.body);

  var userRankBet = new UserRankBet({
    rankBetId: req.params.id,
    userRanking: req.body.ranking,
    userId: req.auth.userId,
    prize: req.body.prize,
  });
  userRankBet
    .save()
    .then(() => {
      // res.status(201).json({ message: "bet saved !" });
      console.log("rankBet saved");
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
        betsArray: {
          gameId: req.params.id,
          mise: 0,
          betType: "ranking",
        }, //inserted data is the object to be inserted
      },
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log("user updated");
      }
    }
  );

  RankBet.findOneAndUpdate(
    { _id: req.params.id },
    {
      $addToSet: { userIdArray: req.auth.userId },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json("bet saved");
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
                    element.victoireEquipePrediction
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

        User.findOneAndUpdate(
          { _id: element.userId, "betsArray.gameId": req.params.id },
          {
            $set: {
              "betsArray.$.score":
                point(
                  getSuccess(
                    req.body.finalScoreEquipeA,
                    req.body.finalScoreEquipeB,
                    element.victoireEquipePrediction
                  ),
                  winner(
                    req.body.finalScoreEquipeA,
                    req.body.finalScoreEquipeB
                  ),
                  element.coteEquipeA,
                  element.coteEquipeB
                ) * element.mise,
              "betsArray.$.state": "closed",
            },
          }
        )
          .then(() => console.log("test betsarray closed pushed"))
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
              element.victoireEquipePrediction
            ),
            point:
              point(
                getSuccess(
                  req.body.finalScoreEquipeA,
                  req.body.finalScoreEquipeB,
                  element.victoireEquipePrediction
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
      console.log("Bet closed");
      res.status(200).json("bet closed");
    })
    .catch();
};

exports.getAllCombinedBets = (req, res, next) => {
  CombinedBet.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.CombinedBets = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.auth.userId },
    {
      $push: {
        betsArray: {
          gameId: req.params.id,
          betType: "combined",
          mise: 0,
        },
      },
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log("user updated");
      }
    }
  );

  var userCombinedBet = new UserCombinedBet({
    ...req.body,
    userId: req.auth.userId,
  });
  userCombinedBet
    .save()
    .then(() => {
      console.log("Combinedbet saved");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        error: error,
      });
    });

  CombinedBet.findOneAndUpdate(
    { _id: req.params.id },
    {
      $addToSet: { userIdArray: req.auth.userId },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log("bet updated");
        res.status(200).json("bet saved");
      }
    }
  );
};

exports.closeCombinedBet = (req, res, next) => {
  // UserCombinedBet.updateMany(
  //   { combinedBetId: req.params.id },
  //   {
  //     $set: {
  //       result: req.body.resultCombinaison,
  //       live: "closed",
  //       success:
  //     },
  //   }
  // )
  //   .then(console.log("UserBet.updateMany"))
  //   .catch((error) => console.log(error));

  CombinedBet.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        result: req.body.resultCombinaison,
        live: "closed",
      },
    },
    { new: true }
  )
    .then((doc) => {
      console.log("Bet closed");
      res.status(200).json("bet closed");
    })
    .catch();

  UserCombinedBet.find({ combinedBetId: req.params.id }, (err, docs) => {
    if (!err) {
      docs.forEach((element) => {
        User.findOneAndUpdate(
          { _id: element.userId, "betsArray.gameId": req.params.id },
          {
            $set: {
              "betsArray.$.score": getCombinedBetGain(
                req.body.resultCombinaison,
                element.userCombinaison,
                element.prize
              ),

              "betsArray.$.state": "closed",
            },
          }
        )
          .then(() => console.log("combined bet done"))
          .catch((error) => res.status(401).json({ error }));

        UserCombinedBet.updateOne(
          { _id: element._id },
          {
            live: "closed",

            resultCombinaison: req.body.resultCombinaison,
            success: getCombinedBetSuccess(
              req.body.resultCombinaison,
              element.userCombinaison
            ),
            gain: getCombinedBetGain(
              req.body.resultCombinaison,
              element.userCombinaison,
              element.prize
            ),
          }
        )
          .then(() => console.log("youhou"))
          .catch((error) => console.log(error));
      });
    } else res.send("Erreur :" + err);
  });
};

exports.closeRankBet = (req, res, next) => {
  RankBet.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        resultRanking: req.body.ranking,
        live: "closed",
      },
    },
    { new: true }
  )
    .then((doc) => {
      res.status(200).json("bet closed");
    })
    .catch();
  console.log("closeRankBet");

  UserRankBet.find({ rankBetId: req.params.id }, (err, docs) => {
    result = req.body.ranking;
    if (!err) {
      docs.forEach((element) => {
        User.findOneAndUpdate(
          { _id: element.userId, "betsArray.gameId": req.params.id },
          {
            $set: {
              "betsArray.$.score": getRankBetGain(
                result,
                element.userRanking,
                element.prize
              ),

              "betsArray.$.state": "closed",
            },
          }
        )
          .then(() => console.log("combined bet done"))
          .catch((error) => res.status(401).json({ error }));
        console.log(
          "result, element.userRanking, element.prize",
          result,
          element.userRanking,
          element.prize
        );
        UserRankBet.updateOne(
          { _id: element._id },
          {
            live: "closed",

            resultRanking: req.body.ranking,
            userRanking: element.userRanking,

            gain: getRankBetGain(result, element.userRanking, element.prize),
          }
        )
          .then(() => console.log("youhou"))
          .catch((error) => console.log(error));
      });
    } else res.send("Erreur :" + err);
  });
};
