import { Route, Routes, useLocation } from "react-router-dom";
import MainPageMobile from "../mobile/MainPageMobile";
import MobileReservation from "../mobile/MobileReservation";
import { useEffect, useState } from "react";
import HeaderMobile from "../mobile/HeaderMobile";
import SignUp from "../mobile/SignUp";
import Login from "../mobile/Login";
import AgreeMent from "../mobile/AgreeMent";
import BottomNavBarMobile from "../mobile/BottomNavBarMobile";
import SignUpComplete from "../mobile/SignUpComplete";
import FindID from "../mobile/FindID";
import FindIDNo1 from "../mobile/FindIDNo1";
import FindPW from "../mobile/FindPW";

const MobilePage = () => {
  const [userID,setUserID] = useState('');
  const [id,setId] = useState('');
  const [nameOfPage,setNameOfPage] = useState('');
  const location = useLocation();
  useEffect(()=>{
    const path = location.pathname;
    if(path === '/login'){
      setNameOfPage('로그인');
    } else if(path === '/agreement' || path === '/signup' || path === '/signupComplete'){
      setNameOfPage('회원가입')
    } else if(path.includes("/findid")){
      setNameOfPage('아이디 찾기')
    } else if(path.includes('/findpw')){
      setNameOfPage('비밀번호 변경')
    } else if(path.includes("/mypage")){
      setNameOfPage('마이페이지')
    }
  },[location.pathname])
  //메인페이지 -> 예약페이지
  return (
    <div className="mobile-page">
      <HeaderMobile pageName={nameOfPage}/>
      <Routes>
        <Route path="/" element={<MainPageMobile />}/>
        <Route path="MobileReservation/*" element={<MobileReservation />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/findid" element={<FindID setUserID={setUserID}/>}/>
        <Route path="/findidno1" element={<FindIDNo1 userID={userID}/>}/> 
        <Route path="/findpw" element={<FindPW setID={setId}/>}/>
        <Route path="/agreement" element={<AgreeMent/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signupComplete" element={<SignUpComplete/>}/>

      </Routes>
      <BottomNavBarMobile/>
    </div>
  );
};

export default MobilePage;