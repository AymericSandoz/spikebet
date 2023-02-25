const mongoose = require("mongoose");

const userRankBetSchema = mongoose.Schema(
  {
    rankBetId: { type: String, required: true },
    userId: { type: String },
    prize: { type: Number },
    userRanking: [],
    live: { type: String, default: "open" },
    resultRanking: [],
    gain: { type: Number },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userrankbet", userRankBetSchema);
