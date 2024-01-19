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

const index = () => {
  return (
    <BrowserRouter>
      <Navbars />
      <LeftNav />
      <Routes>
        <Route path="/" element={<RankBets />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/rankBets" element={<RankBets />} />
        <Route path="tournamentSelection" element={<TournamentSelection />} />
        <Route path="/admin/rankBets" element={<AdminRankBets />} />
        <Route path="/log" element={<Log />} />
        <Route path="/about" element={<About />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/user/:id" element={<UserProfil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
