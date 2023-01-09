const mongoose = require("mongoose");

const combinedBetSchema = mongoose.Schema(
  {
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
    userId: { type: Array },
    result: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CombinedBet", combinedBetSchema);
