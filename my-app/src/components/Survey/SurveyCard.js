import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { UidContext } from "../AppContext";
import womenPlayers from "./women_players.json";
import menPlayers from "./baguette_players.json";
import Select from "react-select"; // import react-select

const SurveyCard = ({ survey, getSurveys }) => {
  const [userChoice, setUserChoice] = useState();
  const uid = useContext(UidContext);
  const [buttonState, setButtonState] = useState("waiting");
  const [error, setError] = useState("");

  if (survey.type === "search") {
    if (survey.categ === "men") {
      survey.choices = menPlayers;
    } else if (survey.categ === "women") {
      survey.choices = womenPlayers;
    }
  }

  const getVoteCounts = (userChoices) => {
    return userChoices.reduce((acc, choice) => {
      if (!acc[choice.answer]) {
        acc[choice.answer] = 0;
      }
      acc[choice.answer]++;
      return acc;
    }, {});
  };

  const voteCounts = getVoteCounts(survey.userChoice);
  console.log(voteCounts);
  const sendSurvey = () => {
    if (!userChoice) {
      setButtonState("error");
      setError("Veuillez choisir une réponse");
      return;
    }
    axios({
      method: "put",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/survey/${survey._id}`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      data: { userChoice },
    })
      .then((res) => {
        getSurveys();
        setButtonState("success");
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setButtonState("error");
      });
  };

  const calculSurveyStat = (userChoice) => {
    let choiceNbOfVoters = 0;

    if (survey.arrayVotersId.length === 0) return 0;

    survey.userChoice.forEach((element) => {
      if (element.answer === userChoice) {
        choiceNbOfVoters++;
      }
    });
    return choiceNbOfVoters; //percentage of voters
  };

  const handleSelectChange = (selectedOption) => {
    if (uid.uid) setUserChoice(selectedOption.value);
  };

  const sortChoicesByVotes = (choices) => {
    return choices.sort((a, b) => {
      const votesA = calculSurveyStat(a);
      const votesB = calculSurveyStat(b);
      return votesB - votesA;
    });
  };

  // Utilisez cette fonction pour trier les choix avant de les afficher
  const sortedChoices = sortChoicesByVotes(survey.choices);
  const sortedChoicesSelect = sortedChoices.map((choice) => ({
    value: choice,
    label: choice,
  }));

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

  return (
    <>
      <li className="survey-card" key={survey._id}>
        <h3 className="survey">{survey.survey}</h3>
        <div className="survey-choices">
          {sortedChoices &&
            sortedChoices.length < 7 &&
            sortedChoices.map((choice, index) => {
              return (
                <>
                  <div
                    className="choice-container"
                    style={{
                      color: userChoice === choice && "darkgoldenrod",
                    }}
                    onClick={() => {
                      if (uid.uid) setUserChoice(choice);
                    }}
                  >
                    <div className="label">{choice}</div>
                    <div className="choice-survey-stat">
                      <div
                        className="choice"
                        style={{
                          width: calculSurveyStat(choice) / 2,
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

                      <div className="survey-stat">
                        {calculSurveyStat(choice)} votes
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          {sortedChoices.length >= 7 && (
            <>
              <Select
                options={sortedChoicesSelect}
                onChange={handleSelectChange}
                isSearchable
                isClearable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "black",
                    color: "white",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "grey" : "black",
                    color: "white",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: "white",
                  }),
                }}
              />
              {Object.entries(voteCounts || {}).map(([choice, votecount]) => (
                <div key={choice}>
                  <div
                    className="choice-container"
                    onclick={() => setUserChoice(choice)}
                    style={{
                      color: userChoice === choice && "darkgoldenrod",
                    }}
                  >
                    <div className="label">{choice}</div>
                    <div className="choice-survey-stat">
                      <div
                        className="choice"
                        style={{
                          width: votecount / 2,
                          backgroundColor:
                            userChoice === choice ? "darkgoldenrod" : "#A9A9A9",
                        }}
                      ></div>

                      <div className="survey-stat">{votecount} votes</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {uid.uid ? (
          !survey.arrayVotersId.includes(uid.uid) ? (
            <button
              className={`primary-button ${buttonState}`}
              onClick={() => sendSurvey()}
            >
              VALIDER
            </button>
          ) : (
            <button
              className={`primary-button ${buttonState}`}
              onClick={() => sendSurvey()}
            >
              MODIFIER
            </button>
          )
        ) : null}

        <p className="survey-error">{error}</p>
      </li>
    </>
  );
};

export default SurveyCard;
