import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Survey from "../../components/Survey/Survey";
import CreateBet from "../../components/Admin/CreateBet";
import Log from "../../components/Log";
import MyBets from "../../components/Bets/MyBets";
import Navbars from "../Navbar/Navbar";
import Sidebar from "../Navbar/sidebar/Sidebar";
import LeftNav from "../Navbar/Leftnav";
import About from "../../pages/About";
import Profil from "../../pages/Profil";
import Ranking from "../Ranking/Ranking";
import CombinedBet from "../../pages/CombinedBet";
import AdminCombinedBet from "../Admin/otherTypeOfBets/CombinedBets";
import RankBets from "../../pages/RankBets";
import AdminRankBets from "../Admin/otherTypeOfBets/RankBets";
import UserProfil from "../User/UserProfil";

const index = () => {
  return (
    <BrowserRouter>
      <Navbars />
      {/* <Sidebar /> */}
      <LeftNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/rankBets" element={<RankBets />} />

        <Route path="/admin" element={<CreateBet />} />
        <Route path="/admin/CombinedBets" element={<AdminCombinedBet />} />
        <Route path="/admin/rankBets" element={<AdminRankBets />} />
        <Route path="/log" element={<Log />} />
        <Route path="/myBets" element={<MyBets />} />
        <Route path="/about" element={<About />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/combinedBets" element={<CombinedBet />} />
        <Route path="/user/:id" element={<UserProfil />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
