import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../../../components/AppContext";

const AdminSurveyCard = ({ survey, getSurveys }) => {
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

  // set user choice if already voted
  useEffect(() => {
    if (survey.arrayVotersId.includes(uid.uid)) {
      survey.userChoice.forEach((element) => {
        if (element.userId === uid.uid) {
          setUserChoice(element.answer);
        }
      });
    }
  }, [survey]);

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
                  <div className="label">{choice}</div>
                  <div
                    className="choice"
                    style={{
                      width: calculSurveyStat(choice),
                      backgroundColor:
                        userChoice === choice
                          ? "darkgoldenrod"
                          : index % 2 === 0
                          ? "#696969"
                          : "#A9A9A9",
                    }}
                    onClick={() => {
                      if (uid.uid) setUserChoice(choice);
                    }}
                  ></div>
                  <div className="survey-stat">{calculSurveyStat(choice)}</div>
                </div>
              </>
            );
          })}
        </div>

        {uid.uid ? (
          !survey.arrayVotersId.includes(uid.uid) ? (
            <button className="primary-button" onClick={() => sendSurvey()}>
              VALIDER
            </button>
          ) : (
            <button className="primary-button" onClick={() => sendSurvey()}>
              MODIFIER
            </button>
          )
        ) : null}
      </li>
    </>
  );
};

export default AdminSurveyCard;
