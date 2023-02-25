const mongoose = require("mongoose");

const rankbetSchema = mongoose.Schema(
  {
    teams: [],
    competition: { type: String },
    prize: [],
    live: { type: String, default: "open" },
    userIdArray: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rankbet", rankbetSchema);
