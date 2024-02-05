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
  if (resultCombinaison === userCombinaison) {
    return prize;
  } else return 0;
};

const getCombinedBetSuccess = (resultCombinaison, userCombinaison) => {
  if (resultCombinaison === userCombinaison) {
    return true;
  } else return false;
};

const getRankBetGain = (tournamentResults, userRanking, prize) => {
  let totalPoints = 0;
  if (tournamentResults[0].name === userRanking[0].name) {
    totalPoints += 2;
  }
  for (let i = 1; i < userRanking.length; i++) {
    if (tournamentResults[i].name === userRanking[i].name) {
      totalPoints += 1;
    }
  }
  if (tournamentResults[1].name === userRanking[2].name) {
    totalPoints += 0.5;
  }
  if (tournamentResults[2].name === userRanking[1].name) {
    totalPoints += 0.5;
  }
  return totalPoints * prize;
};

// const getRankBetGain = (tournamentResults, userRanking, prize) => {
//   let totalPoints = 0;

//   // Parcourir les choix de l'utilisateur et les comparer aux résultats du tournoi
//   for (let i = 0; i < userRanking.length; i++) {
//     const userPick = userRanking[i];
//     const tournamentResult = tournamentResults[i];

//     // Si l'utilisateur a choisi l'équipe à la bonne position, ajouter 20 points
//     if (userPick.name === tournamentResult.name) {
//       totalPoints += 20;
//     }
//   }

//   // Vérifier si l'utilisateur a eu tous les choix corrects
//   const allPicksCorrect = userRanking.every(
//     (userPick, index) => userPick.name === tournamentResults[index].name
//   );

//   // Si tous les choix sont corrects, ajouter un bonus de 100 points
//   if (allPicksCorrect) {
//     totalPoints += prize;
//   }

//   return totalPoints;
// };

module.exports = {
  point,
  winner,
  getSuccess,
  arraySum,
  calculTotalCoins,
  getCombinedBetSuccess,
  getCombinedBetGain,
  getRankBetGain,
};
