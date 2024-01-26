const mongoose = require("mongoose"); //Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
const uniqueValidator = require("mongoose-unique-validator");
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "invalid email"],
    }, //********New modif
    pseudo: {
      type: String,
      minLength: 4,
      maxLength: 30,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
    },
    password: { type: String, required: true },
    scoreArray: [(type = Number)],
    miseArray: [(type = Number)],
    scoreIdArray: [(type = String)],
    imgUrl: { type: String },
    club: { type: String },

    // betsArray: { type: Array, default: [] },
    betsArray: [
      {
        mise: Number,
        betType: String, //game, combined, rank
        gameId: String,
        score: Number,
        state: { type: String, default: "open" },
      },
    ],
    combinedBetsArray: [
      {
        gameId: String,
        score: Number,
      },
    ],
    combinedBetsArrayId: [(type = String)],

    coins: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
