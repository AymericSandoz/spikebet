const getSuccess = (
  finalScoreEquipeA,
  finalScoreEquipeB,
  victoireEquipePrediction
) => {
  if (
    finalScoreEquipeA > finalScoreEquipeB &&
    victoireEquipePrediction == "A"
  ) {
    return "true";
  } else if (
    finalScoreEquipeA < finalScoreEquipeB &&
    victoireEquipePrediction == "B"
  ) {
    return "true";
  } else {
    return "false";
  }
};

const winner = (finalScoreEquipeA, finalScoreEquipeB) => {
  if (finalScoreEquipeA - finalScoreEquipeB > 0) return "A";
  else return "B";
};

const point = (success, winner, coteEquipeA, coteEquipeB) => {
  console.log("point shemaUtils :", success, winner, coteEquipeA, coteEquipeB);
  if (success == "true") {
    if (winner == "A") {
      return coteEquipeA;
    } else return coteEquipeB;
  } else return 0;
};
const arraySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

const calculTotalCoins = (coins, miseArray, scoreArray) => {
  let miseArraySum = 0;
  for (let i = 0; i < miseArray.length; i++) {
    miseArraySum += miseArray[i];
  }

  let miseScoreArray = 0;
  for (let i = 0; i < scoreArray.length; i++) {
    miseScoreArray += scoreArray[i];
  }

  let totalCoins = miseScoreArray - miseArraySum + coins;
  return totalCoins;
};

const getCombinedBetGain = (resultCombinaison, userCombinaison, prize) => {
  console.log(resultCombinaison, "//", userCombinaison, prize);
  console.log(
    "resultCombinaison===userCombinaison",
    resultCombinaison === userCombinaison
  );
  if (resultCombinaison === userCombinaison) {
    return prize;
  } else return 0;
};

const getCombinedBetSuccess = (resultCombinaison, userCombinaison) => {
  if (resultCombinaison === userCombinaison) {
    return true;
  } else return false;
};

module.exports = {
  point,
  winner,
  getSuccess,
  arraySum,
  calculTotalCoins,
  getCombinedBetSuccess,
  getCombinedBetGain,
};
