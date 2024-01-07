import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

import axios from "axios";
import { UidContext } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faCheck,
  faCircleCheck,
  faCoins,
  faSmile,
  faSmileWink,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const SurveyCard = ({ survey, getSurveys }) => {
  const [userChoice, setUserChoice] = useState();
  const uid = useContext(UidContext);

  const sendSurvey = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/survey/${survey._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { userChoice },
    })
      .then((res) => {
        getSurveys();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculSurveyStat = (userChoice) => {
    let choiceNbOfVoters = 0;

    survey.userChoice.forEach((element) => {
      if (element.answer === userChoice) {
        choiceNbOfVoters++;
      }
    });
    return (
      ((choiceNbOfVoters * 100) / survey.arrayVotersId.length).toFixed(0) + "%"
    ); //percentage of voters
  };

  return (
    <>
      <li className="survey-card" key={survey._id}>
        <h3 className="survey">{survey.survey}</h3>
        <div className="survey-choices">
          {survey.choices.map((choice, index) => {
            return (
              <>
                <div className="choice-container">
                  <div
                    className="choice"
                    style={{
                      width: calculSurveyStat(choice),
                      backgroundColor: index % 2 === 0 ? "#696969" : "#A9A9A9",
                    }}
                    onClick={() => setUserChoice(choice)}
                  >
                    {choice}
                  </div>
                  <div className="survey-stat">{calculSurveyStat(choice)}</div>
                </div>
              </>
            );
          })}
        </div>

        {uid.uid && !survey.arrayVotersId.includes(uid.uid) && (
          <button className="btn-confirmer" onClick={() => sendSurvey()}>
            vote
          </button>
        )}
      </li>
    </>
  );
};

export default SurveyCard;
