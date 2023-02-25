const mongoose = require("mongoose");

const userRankBetSchema = mongoose.Schema(
  {
    rankBetId: { type: String, required: true },
    userId: { type: String },
    prize: [],
    userRanking: [],
    live: { type: String, default: "open" },
    resultRanking: { type: String },
    success: { type: Boolean },
    gain: { type: Number },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userrankbet", userRankBetSchema);
