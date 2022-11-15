const mongoose = require("mongoose");

// const userBetSchema = mongoose.Schema(
//   {
//     gameID: { type: String },
//     userId: { type: String },
//     scoreEquipeA: { type: Number },
//     scoreEquipeB: { type: Number },

//   },
//   {
//     timestamps: true,
//   }
// );

const userBetSchema = mongoose.Schema(
  {
    gameID: { type: String },
    userId: { type: String },
    type: { type: String },
    ligue: { type: String },
    round: { type: String, required: true },
    nomEquipeA: { type: String },
    joueursEquipeA: { type: Array },
    finalScoreEquipeA: { type: Number },
    nomEquipeB: { type: String },
    finalScoreEquipeB: { type: Number },
    joueursEquipeB: { type: Array },
    coteEquipeA: { type: Number },
    coteEquipeB: { type: Number },
    betScoreEquipeA: { type: Number },
    betScoreEquipeB: { type: Number },
    live: { type: String, default: "open" },
    success: {
      type: String,

      // default: function () {
      //   if (this.live == "closed") {
      //     if (
      //       (this.finalScoreEquipeA - this.finalScoreEquipeB) *
      //         (this.betScoreEquipeA - this.betScoreEquipeB) >=
      //       1
      //     )
      //       return "true";
      //     else return "false";
      //   } else {
      //     return "Unknow";
      //   }
      // },
    },
    winner: {
      type: String,
      default: "Unknow",
      // default: function () {
      //   if (this.live == "closed") {
      //     if (this.finalScoreEquipeA - this.finalScoreEquipeB > 0) return "A";
      //     else return "B";
      //   } else {
      //     return "Unknow";
      //   }
      // },
    },
    point: {
      type: Number,
      default: 0,
      // default: function () {
      //   if (this.live == "closed") {
      //     if (this.success) {
      //       if (this.winner == "A") {
      //         return this.coteEquipeA;
      //       } else return this.coteEquipeB;
      //     }
      //   } else {
      //     return 0;
      //   }
      // },
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userBet", userBetSchema);
