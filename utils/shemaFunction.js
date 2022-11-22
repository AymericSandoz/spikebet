const getSuccess = (
  finalScoreEquipeA,
  finalScoreEquipeB,
  betScoreEquipeA,
  betScoreEquipeB
) => {
  console.log(
    "finalScoreEquipeA - finalScoreEquipeB:",
    finalScoreEquipeA - finalScoreEquipeB
  );
  console.log(
    "betScoreEquipeA - betScoreEquipeB:",
    betScoreEquipeA - betScoreEquipeB
  );
  if (
    (finalScoreEquipeA - finalScoreEquipeB) *
      (betScoreEquipeA - betScoreEquipeB) >=
    1
  )
    return "true";
  else return "false";
};

const winner = (finalScoreEquipeA, finalScoreEquipeB) => {
  if (finalScoreEquipeA - finalScoreEquipeB > 0) return "A";
  else return "B";
};

const point = (success, winner, coteEquipeA, coteEquipeB) => {
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

module.exports = { point, winner, getSuccess, arraySum, calculTotalCoins };
