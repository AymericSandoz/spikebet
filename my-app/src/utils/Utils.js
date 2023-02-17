import React, { useContext } from "react";

import { UidContext } from "../components/AppContext";
export const IsAdmin = () => {
  const uid = useContext(UidContext);

  const admin_user_id = `${process.env.REACT_APP_ADMIN_USER_ID}`;

  return admin_user_id === uid.uid ? true : false;
};

export const arraySum = (array) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

// export const CalculTotalCoins = (coins, miseArray, scoreArray) => {
//   let miseArraySum = 0;
//   for (let i = 0; i < miseArray.length; i++) {
//     miseArraySum += miseArray[i];
//   }

//   let miseScoreArray = 0;
//   for (let i = 0; i < scoreArray.length; i++) {
//     miseScoreArray += scoreArray[i];
//   }

//   let totalCoins = miseScoreArray - miseArraySum + coins;

//   return totalCoins;
// };

export const CalculTotalCoins = (betsArray, initialCoins) => {
  let totalCoins = initialCoins;
  betsArray.forEach((bet) => {
    totalCoins = totalCoins - bet.mise;
    if (bet.state === "closed") {
      totalCoins = totalCoins + bet.score;
    }
  });

  return totalCoins;
};

export const calculScore = (betsArray) => {
  let totalScore = 50;
  betsArray.forEach((bet) => {
    if (bet.state === "closed") {
      totalScore = totalScore + bet.score;
    }
  });
  return totalScore;
};

//sort array according to bet closed bet and bet already bet
export const sortBetArray = (uid, array) => {
  for (let i = 0; i < array.length; i++) {
    //console.log("array[i].usersBet", array[i].usersBet);
    if (array[i].usersBet.includes(uid)) {
      array[i].position = 3;
    } else if (array[i].live === "closed") {
      array[i].position = 2;
    } else {
      array[i].position = 1;
    }
  }

  return array.sort((a, b) => (a.position < b.position ? -1 : 1));
};
