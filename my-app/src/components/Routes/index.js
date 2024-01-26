import { BrowserRouter, Route, Routes } from "react-router-dom";
import Survey from "../../components/Survey/Survey";
import Log from "../../components/Log";
import Navbars from "../Navbar/Navbar";
import LeftNav from "../Navbar/Leftnav";
import About from "../../pages/About";
import Profil from "../../pages/Profil";
import Ranking from "../Ranking/Ranking";
import RankBets from "../../pages/RankBets";
import AdminRankBets from "../Admin/otherTypeOfBets/RankBets";
import UserProfil from "../User/UserProfil";
import TournamentSelection from "../Navbar/mobileTournamentSelection";
import TeamSelection from "../Bets/BetCard/TeamsList";
import { IsAdmin } from "../../utils/Utils";
import AdminLeftNav from "../Navbar/AdminLeftNav";
import AdminTournamentSelection from "../Admin/otherTypeOfBets/AdminTournamentSelection";
import AdminSurvey from "../Admin/otherTypeOfBets/AdminSurvey";
import AdminRanking from "../Admin/otherTypeOfBets/AdminRanking";
import React, { useContext } from "react";
import { UidContext } from "../AppContext";
const Index = () => {
  // import isAdminMode from context
  const uid = useContext(UidContext);
  console.log(uid);

  return (
    <BrowserRouter>
      <Navbars />
      {uid.isAdminMode ? <AdminLeftNav /> : <LeftNav />}
      <Routes>
        <Route path="/" element={<RankBets />} />
        <Route path="/admin/survey" element={<AdminSurvey />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/rankBets" element={<RankBets />} />
        <Route path="/tournamentSelection" element={<TournamentSelection />} />
        <Route
          path="/admin/tournamentSelection"
          element={<AdminTournamentSelection />}
        />
        <Route path="/admin/rankBets" element={<AdminRankBets />} />
        <Route path="/log" element={<Log />} />
        <Route path="/about" element={<About />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/admin/ranking" element={<AdminRanking />} />
        <Route path="/user/:id" element={<UserProfil />} />
        <Route path="/team-selection" element={<TeamSelection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
