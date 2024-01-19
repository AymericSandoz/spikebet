const Bet = require("../models/bet");
const Survey = require("../models/othersTypeOfBets/survey");
const User = require("../models/user");
const UserBet = require("../models/userBet");

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

// exports.getAllRankBets = (req, res, next) => {
//   RankBet.find((err, docs) => {
//     if (!err) {
//       docs.forEach((rankbet) => {
//         UserRankBet.find({ rankBetId: rankbet._id }, (err, elements) => {
//           if (!err) {
//             // console.log("elements", elements);
//             rankbet.usersBets = elements;
//             // console.log("rankbet.usersBets", rankbet.usersBets);
//           } else res.send("Erreur :" + err);
//         });
//       });
//       console.log("docs", docs);
//       res.send(docs);
//     } else res.send("Erreur :" + err);
//   });
// };

exports.getAllRankBets = async (req, res, next) => {
  try {
    const docs = await RankBet.find().exec(); // Utilisation de await pour attendre la fin de cette opération
    for (let rankbet of docs) {
      // Boucle for..of pour itérer sur chaque 'rankbet'
      try {
        const elements = await UserRankBet.find({
          rankBetId: rankbet._id,
        }).exec(); // Utilisation de await ici également
        rankbet.usersBets = elements;
      } catch (err) {
        return res.send("Erreur lors de la recherche des UserRankBets: " + err); // Gérer les erreurs pour UserRankBet.find
      }
    }
    res.send(docs); // Envoyer la réponse après avoir traité tous les 'rankbet'
  } catch (err) {
    res.send("Erreur lors de la recherche des RankBets: " + err); // Gérer les erreurs pour RankBet.find
  }
};

exports.getUserRankBet = (req, res, next) => {
  UserRankBet.findOne({ rankBetId: req.params.id, userId: req.auth.userId })
    .then((existingBet) => {
      if (existingBet) {
        res.status(200).json(existingBet);
      } else {
        res.status(200).json(null);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.getUsersBets = (req, res, next) => {
  UserBet.find({ gameID: req.params.id }, (err, bets) => {
    if (!err) {
      let usersBets = [];
      bets.forEach((bet) => {
        User.findOne({ _id: bet.userId }, (err, user) => {
          if (!err) {
            usersBets.push({
              bet: bet,
              user: user,
            });
            if (usersBets.length === bets.length) {
              res.send(usersBets);
            }
          } else {
            res.send("Erreur :" + err);
          }
        });
      });
    } else {
      res.send("Erreur :" + err);
    }
  });
};

exports.getMyBets = (req, res, next) => {
  UserBet.find({ userId: req.auth.userId }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else res.send("Erreur :" + err);
  });
};

exports.getMyRankedBets = (req, res, next) => {
  UserRankBet.find({ userId: req.auth.userId }, (err, docs) => {
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
  Survey.findOneAndUpdate(
    { _id: req.params.id },
    {
      $addToSet: {
        arrayVotersId: req.auth.userId,
      },
    },
    { new: true } // option pour retourner le document mis à jour
  )
    .then((survey) => {
      if (survey.arrayVotersId.includes(req.auth.userId)) {
        console.log("Vote added !");
      } else {
        console.log("L'utilisateur a déjà voté !");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  Survey.findOne({ _id: req.params.id })
    .then((survey) => {
      // Trouver l'index de l'élément de userChoice pour cet utilisateur
      const index = survey.userChoice.findIndex(
        (choice) => choice.userId.toString() === req.auth.userId
      );

      if (index !== -1) {
        // Si l'utilisateur a déjà fait un choix, le mettre à jour
        survey.userChoice[index].answer = req.body.userChoice;
      } else {
        // Sinon, ajouter un nouveau choix pour cet utilisateur
        survey.userChoice.push({
          userId: req.auth.userId,
          answer: req.body.userChoice,
        });
      }

      // Sauvegarder le document mis à jour
      return survey.save();
    })
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
        console.log("user updated");
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
        console.log("user updated");
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
  UserRankBet.findOne({ rankBetId: req.params.id, userId: req.auth.userId })
    .then((existingBet) => {
      if (existingBet) {
        // Si un pari existant est trouvé, le mettre à jour
        UserRankBet.findOneAndUpdate(
          { rankBetId: req.params.id, userId: req.auth.userId },
          { userRanking: req.body.ranking, prize: req.body.prize },
          { new: true }
        )
          .then(() => {
            console.log("rankBet updated");
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
      } else {
        // Si aucun pari existant n'est trouvé, en créer un nouveau
        var userRankBet = new UserRankBet({
          rankBetId: req.params.id,
          userRanking: req.body.ranking,
          userId: req.auth.userId,
          prize: req.body.prize,
        });
        userRankBet
          .save()
          .then(() => {
            console.log("rankBet saved");
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

  User.findOne({ _id: req.auth.userId }, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      // Check if the game ID already exists in the betsArray
      var exists = user.betsArray.some(function (bet) {
        return bet.gameId.toString() === req.params.id;
      });

      if (exists) {
        // Game ID already exists in the betsArray, do not update
        console.log("Game ID already exists in the betsArray");
      } else {
        // Game ID does not exist in the betsArray, proceed with the update
        User.findOneAndUpdate(
          { _id: req.auth.userId },
          {
            $push: {
              betsArray: {
                gameId: req.params.id,
                mise: 0,
                betType: "ranking",
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
      }
    }
  });

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
          .then(() => console.log("user done"))
          .catch((error) => res.status(401).json({ error }));

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
