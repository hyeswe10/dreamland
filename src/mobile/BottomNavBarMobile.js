import { useNavigate, useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { getUserInfo } from "../utils/LocalStorage";
import { PiWarningCircleFill } from "react-icons/pi";

const BottomNavBarMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [noUser,setNoUser] = useState(false);

  const isActive = (path) => location.pathname === path; //정확할때
  const isIncludeActive = (path) => location.pathname.includes(path); //포함일때
  const handleNavigate = (path) => {
    if(!getUserInfo()){
      if(path === '/MobileReservation/schedule' || path === '/mypage/reservation'){
        setNoUser(true);
        return;
      }
      navigate(path);
    } else {
      navigate(path);
    }
  }
  return (
    <nav id="bottom-navbar">
      <div className="navbar-container">
        <div
          className={`icon ${isActive('/') ? 'active' : ''}`}
          onClick={() => {handleNavigate('/')}}
        >
          <TiHome />
        </div>
        <div
          className={`icon ${isIncludeActive('/MobileReservation') ? 'active' : ''}`}
          onClick={() => {handleNavigate('/MobileReservation/schedule')}}
        >
          <FaCar />
        </div>
        <div
          className={`icon ${isActive('/mypage/reservation') ? 'active' : ''}`}
          onClick={() => {handleNavigate('/mypage/reservation')}}
        >
          <HiTicket />
        </div>
        <div
          className={`icon ${isActive('/information') ? 'active' : ''}`}
          onClick={() => {handleNavigate('/information')}}
        >
          <HiInformationCircle />
        </div>
      </div>
      {
        noUser && (
          <div className="no-user-pop">
            <div className="no-user-box">
              <PiWarningCircleFill/>
              <p>로그인 후 이용 가능합니다</p>
              <p className="no-user-bot">로그인 후 이용해 주세요</p>
              <button onClick={()=>{setNoUser(false)}}>확인</button>
            </div>
          </div>
        )
      }
    </nav>
  );
};

export default BottomNavBarMobile;
