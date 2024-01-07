const mongoose = require("mongoose");

const rankbetSchema = mongoose.Schema(
  {
    teams: [],
    competition: { type: String },
    competition_date: { type: String },
    resultRanking: [],
    prize: { type: Number },
    live: { type: String, default: "open" },
    userIdArray: { type: Array },
    userComments: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rankbet", rankbetSchema);