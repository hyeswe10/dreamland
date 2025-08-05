import { NavLink, useNavigate } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";
import { MdMore } from "react-icons/md";
import { RiYoutubeFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/LocalStorage";
import { PiWarningCircleFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";


const LeftNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loginCheck, setLoginCheck] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoginCheck(getUserInfo());
  }, []);

  const handleProtectedNav = (path) => {
    if (loginCheck) {
      navigate(path);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="left-nav">
      {/* 알림창 */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <PiWarningCircleFill />
            <p>로그인 후 이용 가능합니다</p>
            <p className="alert-bot">로그인 후 이용해 주세요</p>
            <button onClick={() => setShowAlert(false)}>확인</button>
          </div>
        </div>
      )}

      <nav className="top">
        <div className="logo">
          <img
            onClick={() => navigate("/")}
            className="logo"
            src={`${process.env.PUBLIC_URL}/images/dreamland_logo1.png`}
          />
        </div>
        <ul className="bottom-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <TiHome className="icon" />
              <span>홈</span>
            </li>
          </NavLink>

          <li 
          className={location.pathname === "/MobileReservation/schedule" ? "active" : ""}
          onClick={() => handleProtectedNav("/MobileReservation/schedule")}>
            <FaCar className="icon" />
            <span>예약하기</span>
          </li>

          <li 
          className={location.pathname === "/mypage/reservation" ? "active" : ""}
          onClick={() => handleProtectedNav("/mypage/reservation")}>
            <HiTicket className="icon" />
            <span>예약 내역</span>
          </li>

          <NavLink
            to="/information"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <HiInformationCircle className="icon" />
              <span>주차 안내</span>
            </li>
          </NavLink>

          <NavLink
            to="/intro"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <li>
              <MdMore className="icon" />
              <span>더보기</span>
            </li>
          </NavLink>
        </ul>
      </nav>

      <div className="dreamland-info">
        <div className="footer-top">
          <div className="header" onClick={() => setIsOpen(!isOpen)}>
            <span className="title">DREAMLAND PARKING</span>
            <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
          </div>

          {isOpen && (
            <div className="details">
              <p>대표이사 : 아무개</p>
              <p>
                경기 수원시 팔달구 덕영대로 899
                <br />
                (매산로1가) 웹디몰산(주)
              </p>
              <p>통신판매업번호제 2014-수원팔달-0189호</p>
              <p>사업자번호 113-91-12270</p>
            </div>
          )}
        </div>
        <div className="line"></div>
        <div className="footer-bottom">
          <ul className="icon-list">
            <li>
              <RiYoutubeFill />
            </li>
            <li>
              <FaFacebookSquare />
            </li>
            <li>
              <FaSquareXTwitter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
