const mongoose = require("mongoose");

const betSchema = mongoose.Schema(
  {
    type: { type: String },
    ligue: { type: String }, // à remplacer par compétition prochainement
    competition_date: { type: String },
    round: { type: String },
    nomEquipeA: { type: String },
    joueursEquipeA: { type: Array },
    finalScoreEquipeA: { type: Number },
    nomEquipeB: { type: String },
    finalScoreEquipeB: { type: Number },
    joueursEquipeB: { type: Array },
    coteEquipeA: { type: Number },
    coteEquipeB: { type: Number },
    live: { type: String, default: "open" },
    usersBet: [(type = String)],
    arrayVictoireEquipePrediction: [(type = String)],
    userComments: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bet", betSchema);
