import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Survey from "../../components/Survey/Survey";
import CreateBet from "../../components/Admin/CreateBet";
import Log from "../../components/Log";
import MyBets from "../../components/Bets/MyBets";
import MyRankedBets from "../../components/Bets/MyRankedBets";
import Navbars from "../Navbar/Navbar";
import LeftNav from "../Navbar/Leftnav";
import About from "../../pages/About";
import Profil from "../../pages/Profil";
import Ranking from "../Ranking/Ranking";
import RankBets from "../../pages/RankBets";
import AdminRankBets from "../Admin/otherTypeOfBets/RankBets";
import UserProfil from "../User/UserProfil";
import BetDetails from "../Bets/BetDetails/BetDetails.js";
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

        <Route path="/admin" element={<CreateBet />} />
        <Route path="/admin/rankBets" element={<AdminRankBets />} />
        <Route path="/log" element={<Log />} />
        <Route path="/myBets" element={<MyBets />} />
        <Route path="/myRankedBets" element={<MyRankedBets />} />
        <Route path="/about" element={<About />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/user/:id" element={<UserProfil />} />
        <Route path="/bet/:id" element={<BetDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
