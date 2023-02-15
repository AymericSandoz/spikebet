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

const userCombinedBetSchema = mongoose.Schema(
  {
    combinedBetId: { type: String, required: true },
    userId: { type: String },
    game1: {
      nomEquipeA: { type: String },
      nomEquipeB: { type: String },
      joueursEquipeA: { type: Array },
      joueursEquipeA: { type: Array },
    },
    game2: {
      nomEquipeA: { type: String },
      nomEquipeB: { type: String },
      joueursEquipeA: { type: Array },
      joueursEquipeA: { type: Array },
    },
    game3: {
      nomEquipeA: { type: String },
      nomEquipeB: { type: String },
      joueursEquipeA: { type: Array },
      joueursEquipeA: { type: Array },
    },
    prize: { type: Number },

    userCombinaison: { type: String },
    live: { type: String, default: "open" },
    winner: {
      type: String,
      default: "Unknow",
    },
    result: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("usercombinedbet", userCombinedBetSchema);
