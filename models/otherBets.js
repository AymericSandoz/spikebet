const mongoose = require("mongoose");

const betSchema = mongoose.Schema(
  {
    type: { type: String },
    bet: { type: String },
    answer1: { type: String },
    answer2: { type: Array },
    finalAnswer: { type: Number },

    coteAnswer1: { type: Number },
    coteAnswer2: { type: Number },
    live: { type: String, default: "open" },
    usersBet: [(type = String)],
    arrayPrediction: [(type = String)],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OtherBet", betSchema);
