import React from "react";
import { useState } from "react";
import axios from "axios";
import LigueParisienne from "./LigueParisienne/LigueParisienne";

const CreateBet = () => {
  const [betType, setBetType] = useState("LigueParisienne");
  const [competition, setCompetition] = useState("");
  const [division, setDIvivision] = useState("");
  const [stage, setStage] = useState("");
  const [group, setGroup] = useState("");
  const [bracketPhase, setBracketPhase] = useState("");
  const [teamAname, setTeamAname] = useState("");
  const [teamBname, setTeamBname] = useState("");
  const [teamAcote, setTeamAcote] = useState();
  const [teamBcote, setTeamBcote] = useState();
  const [teamAplayer1, setTeamAplayer1] = useState("");
  const [teamAplayer2, setTeamAplayer2] = useState("");
  const [teamBplayer2, setTeamBplayer2] = useState("");
  const [teamBplayer1, setTeamBplayer1] = useState("");
  const [randomBet, setRamdomBet] = useState("Propose un paris...");
  const [randomBetCoteFor, setRamdomBetBetCoteFor] = useState();
  const [randomBetCoteAgainst, setRamdomBetBetCoteAgainst] = useState();
  const [error, setError] = useState("");
  const createBet = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}api/bet/createBet`,
      data: {
        betType: betType,
      },
    })
      .then((res) => {
        console.log("kaak", betType);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <>
      {/* <select value={betType} onChange={(e) => setBetType(e.target.value)}>
        <option value="LigueParisienne">Ligue Parisienne</option>
        <option value="match">match</option>
        <option value="autre">autre</option>
      </select>
      <br /> */}

      {/* {betType === "match" && (
        <form action="" onSubmit={createBet} id="bet-match-form">
          <br />
          <label htmlFor="competition"> Compétition </label>
          <br />
          <input
            type="text"
            name="competition"
            id="competition"
            onChange={(e) => setCompetition(e.target.value)}
            value={competition}
          />

          <select
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
          >
            <option value="Ligue parisienne">Ligue parisienne</option>
            <option value="autre">autre</option>
          </select>
          <br />
          <div className="error">{error}</div>
          <br />
          <input type="submit" className="btn-connexion" value="Envoyer" />
        </form>
      )} */}

      {betType === "LigueParisienne" && <LigueParisienne />}
    </>
  );
};

export default CreateBet;
