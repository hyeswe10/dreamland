
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MyPage from "../mobile/MyPage/MyPage";
import Login from "../mobile/Login&SignUp/Login";
import SignUp from "../mobile/Login&SignUp/SignUp";
import AgreeMent from "../mobile/Login&SignUp/AgreeMent";
import SignUpComplete from "../mobile/Login&SignUp/SignUpComplete";
import FindID from "../mobile/Login&SignUp/FindID";
import FindIDNo1 from "../mobile/Login&SignUp/FindIDNo1";
import FindPW from "../mobile/Login&SignUp/FindPW";
import ResetPw from "../mobile/Login&SignUp/ResetPw";
import ChangedPw from "../mobile/Login&SignUp/ChangedPw";
import MainPageMobile from "../mobile/MainPageMobile";
import MobileReservation from "../mobile/MobileReservation";
import HeaderMobile from "../mobile/HeaderMobile";
import BottomNavBarMobile from "../mobile/BottomNavBarMobile";
import Information from "../mobile/Information/Information";
import IntroMobile from "../mobile/IntroMobile";


const MobilePage = () => {
  const [userID,setUserID] = useState('');
  const [id,setId] = useState(null);
  const [nameOfPage,setNameOfPage] = useState('');
  const location = useLocation();
  
  // header 이름설정을 위한 path변동시 자동으로 인식
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
      if(path === '/mypage'){
        setNameOfPage('마이페이지');
      }
      if(path.includes("/password-check")){
        setNameOfPage('비밀번호변경');
      }
      if(path.includes("/membership")){
        setNameOfPage('연간회원권 등록');
      }
      if(path.includes("/reservation")){
        setNameOfPage('내 예약 내역');
      }
    } else if(path.includes("/MobileReservation")){
      setNameOfPage('예약하기')
    }else if(path === "/information"){
      setNameOfPage('사이트 정보')
    }
  },[location.pathname])
  return (
    <div className="mobile-page">
      <HeaderMobile pageName={nameOfPage}/>
      <div className="mobile-page-contents">
        <Routes>
          <Route path="/" element={<MainPageMobile />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/mypage/*" element={<MyPage/>}/>
          <Route path="/agreement" element={<AgreeMent/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signupComplete" element={<SignUpComplete/>}/>
          <Route path="/findid" element={<FindID setUserID={setUserID}/>}/>
          <Route path="/findidno1" element={<FindIDNo1 userID={userID}/>}/>
          <Route path="/findpw" element={<FindPW setID={setId}/>}/>
          <Route path="/findpw/resetpw" element={<ResetPw ID={id}/>}/>
          <Route path="/findpw/changedpw" element={<ChangedPw/>}/>
          <Route path="/information/*" element={<Information/>}/>
          <Route path="/intro" element={<IntroMobile/>}/>
          <Route path="MobileReservation/*" element={<MobileReservation />}/>
        </Routes>
      </div>
      <BottomNavBarMobile/>
    </div>
  );
};

export default MobilePage;