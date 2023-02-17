const mongoose = require("mongoose");

const rankbetSchema = mongoose.Schema(
  {
    teams: [
      {
        name: String,
        joueur1: String,
        joueur2: String,
      },
    ],
    competition: { type: String },
    prize: [],
    live: { type: String, default: "open" },
    userIdArray: { type: Array },
    result: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rankbet", rankbetSchema);
