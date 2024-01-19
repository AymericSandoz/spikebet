const mongoose = require("mongoose");

const surveySchema = mongoose.Schema(
  {
    survey: { type: String },
    choices: [],
    live: { type: String, default: "open" },
    arrayVotersId: [(type = String)],
    userComments: [],
    userChoice: [
      {
        userId: String,
        answer: String,
        userNames: String,
        userPseudo: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Survey", surveySchema);
