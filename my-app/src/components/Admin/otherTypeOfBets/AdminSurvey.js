import React, { useEffect, useState } from "react";

import axios from "axios";
import SurveyCard from "./AdminSurveyCard";
import { IsAdmin } from "../../../utils/Utils";

const AdminSurvey = () => {
  const [error, setError] = useState("");
  const [loadSurveys, setLoadSurveys] = useState(true);
  const [surveys, setSurveys] = useState([]);

  const getSurveys = (e) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/surveys`,
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setSurveys(res.data);
        setLoadSurveys(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  useEffect(() => {
    if (loadSurveys) {
      getSurveys();
    }
  }, [loadSurveys, surveys]);

  return (
    <>
      {IsAdmin() && (
        <div className="survey-bets">
          {surveys.length > 0 &&
            surveys.map((survey) => {
              return (
                <>
                  <SurveyCard
                    survey={survey}
                    getSurveys={getSurveys}
                    key={survey._id}
                  />
                </>
              );
            })}
          <br />
        </div>
      )}
    </>
  );
};
export default AdminSurvey;
