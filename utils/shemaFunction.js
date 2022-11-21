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

module.exports = { point, winner, getSuccess, arraySum };
