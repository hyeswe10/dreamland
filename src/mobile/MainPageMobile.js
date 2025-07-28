import { useNavigate } from "react-router-dom";

import BottomNavBarMobile from "./BottomNavBarMobile";
import HeaderMobile from "./HeaderMobile";

import MainHeaderMobile from "./MainHeaderMobile";
import { FaCar } from "react-icons/fa";
import { HiTicket } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
// import { ReactComponent as Parking } from "../icons/Parking.svg";
import { FaRedoAlt } from "react-icons/fa";

const MainPageMobile = () => {
  const navigate = useNavigate();
  const now = new Date();
  const formatted = now.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div id="main-page">
      <MainHeaderMobile />
      <div className="zone-map">
  
        <div className="top-info">
          <div className="redo-wrap">
          <button className="redo-btn">
            <FaRedoAlt />
          </button>
        </div>
        <div className="wrap">
    <div className="left">
            {/* <Parking /> */}
            <div className="date-info">
              <p>{formatted}</p>
              <h3>드림랜드 실시간 주차 현황</h3>
            </div>
          </div>
          <div className="right"></div>
        </div>

        </div>

        <div className="reservation-zone">
          <div className="zone-title">
            <FaMapMarkerAlt />
            <p> 사전 예약 ZONE</p>
            <span>정문 GATE 바로 앞! 빠른 입장</span>
          </div>
          <div className="zone-wrap">
            <div className="zone">
              <div className="top">
                <h2>
                  A<span>구역</span>
                </h2>
                <p>
                  <span></span>혼잡
                </p>
              </div>
              <div className="bottom">
                <p>잔여석</p>
                <div className="num">
                  <p>3</p>
                  <p>/25</p>
                </div>
              </div>
            </div>

            <div className="zone">
              <div className="top">
                <h2>
                  B<span>구역</span>
                </h2>
                <p>
                  <span></span>혼잡
                </p>
              </div>
              <div className="bottom">
                <p>잔여석</p>
                <div className="num">
                  <p>3</p>
                  <p>/25</p>
                </div>
              </div>
            </div>

            <div className="zone">
              <div className="top">
                <h2>
                  C<span>구역</span>
                </h2>
                <p>
                  <span></span>혼잡
                </p>
              </div>
              <div className="bottom">
                <p>잔여석</p>
                <div className="num">
                  <p>3</p>
                  <p>/25</p>
                </div>
              </div>
            </div>

            <div className="zone">
              <div className="top">
                <h2>
                  D<span>구역</span>
                </h2>
                <p>
                  <span></span>혼잡
                </p>
              </div>
              <div className="bottom">
                <p>잔여석</p>
                <div className="num">
                  <p>3</p>
                  <p>/25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="normal-zone">
          <div className="zone-left">
            <div className="zone-title">
              <FaMapMarkerAlt />
              <p> 일반 주차 ZONE</p>
            </div>
            <span>현장에서만 이용할 수 있어요</span>
          </div>
          <div className="zone-right">
            <p>
              <span></span>혼잡
            </p>
            <div className="bottom">
              <p>잔여석</p>
              <div className="num">
                <p>153</p>
                <p>/400</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reservation-section">
        {/* 상단 예약하기 버튼 */}
        <button
          className="reserve-btn"
          onClick={() => navigate("reservation/schedule")}
        >
          <FaCar className="car-icon" />
          주차 예약하기
        </button>

        {/* 안내 버튼들 */}
        <div className="info-buttons">
          <button className="info-btn" onClick={() => navigate("/")}>
            <HiInformationCircle className="icon" />
            주차 안내
          </button>
          <button className="info-btn" onClick={() => navigate("/")}>
            <HiTicket className="icon" />내 예약 내역
          </button>
        </div>

        {/* 더 많은 정보 */}
        <div className="more-info" onClick={() => navigate("/")}>
          더 많은 정보 보기
          <FaCaretRight className="icon" />
        </div>
      </div>
      <BottomNavBarMobile />
    </div>
  );
};

export default MainPageMobile;
