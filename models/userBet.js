const mongoose = require("mongoose");

const userBetSchema = mongoose.Schema(
  {
    gameID: { type: String, required: true },
    userId: { type: String },
    type: { type: String },
    ligue: { type: String },
    group: { type: String },
    round: { type: String, required: true },
    nomEquipeA: { type: String, required: true },
    joueursEquipeA: { type: Array, required: true },
    finalScoreEquipeA: { type: Number },
    nomEquipeB: { type: String, required: true },
    finalScoreEquipeB: { type: Number },
    joueursEquipeB: { type: Array, required: true },
    coteEquipeA: { type: Number, required: true },
    coteEquipeB: { type: Number, required: true },
    victoireEquipePrediction: { type: String },
    live: { type: String, default: "open" },

    mise: { type: Number, required: true },
    success: {
      type: String,
    },
    winner: {
      type: String,
      default: "Unknow",
    },
    point: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userBet", userBetSchema);
