import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainHeaderMobile from "./MainHeaderMobile";

import { ReactComponent as Parking } from "../icons/Parking.svg";
import { FaCar, FaMapMarkerAlt, FaRedoAlt } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";
import { FaCaretRight } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";

import { getAllseatsByDate } from "../utils/ParkingAPI";
import { getUserInfo } from "../utils/LocalStorage"; // 로그인 확인
import Footer from "./Footer";

const MainPageMobile = () => {
  const navigate = useNavigate();
  const [zoneData, setZoneData] = useState({}); // A,B,C,D 데이터 저장
  const [isSpinning, setIsSpinning] = useState(false); // 아이콘 회전 상태
  const [loginCheck, setLoginCheck] = useState(null); // 로그인 체크
  const [showAlert, setShowAlert] = useState(false); // 알림 모달 상태

  const now = new Date();
  const formatted = now.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // 잔여석에 따른 혼잡도 상태 반환
const getParkingStatus = (remaining) => {
  if (remaining >= 18) {
    return {
      dotClass: "status-green",
      textClass: "text-green",
      label: "여유",
    };
  } else if (remaining >= 8) {
    return {
      dotClass: "status-yellow",
      textClass: "text-yellow",
      label: "보통",
    };
  } else if (remaining >= 0) {
    return {
      dotClass: "status-red",
      textClass: "text-red",
      label: "혼잡",
    };
  }
  return {
    dotClass: "status-gray",
    textClass: "text-gray",
    label: "정보 없음",
  };
};

  const fetchData = async () => {
    const today = new Date().toISOString().split("T")[0];
    const result = await getAllseatsByDate(today);
    if (result.success) {
      setZoneData(result.data);
    } else {
      console.error(result.error);
    }
  };

  const handleRedo = () => {
    // 새로고침 데이터
    fetchData();

    // 아이콘 회전 애니메이션
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 600); // 0.6초 후 원래 상태로
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0,0);
  }, []);

  const handleProtectedNav = (path) => {
    if (loginCheck) {
      navigate(path);
    } else {
      setShowAlert(true); // 로그인 안 되어 있으면 알림창 띄움
    }
  };

  useEffect(() => {
    setLoginCheck(getUserInfo()); // 로그인 상태 체크
  }, []);

  return (
    <div id="main-page">
      <MainHeaderMobile />
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <PiWarningCircleFill />
            <p>로그인이 되어 있지 않습니다</p>
            <p className="alert-bot">로그인 후 이용해 주세요</p>
            <button onClick={() => setShowAlert(false)}>확인</button>
          </div>
        </div>
      )}
      <div className="zone-map">
        {/* 상단 날짜 및 새로고침 */}
        <div className="top-info">
          <div className="left">
            <Parking className="parking-icon" />
            <div className="date-info">
              <p>{formatted}</p>
              <h3>드림랜드 실시간 주차 현황</h3>
            </div>
          </div>
          <div className="right">
            <div className="redo-wrap">
              <button
                className={`redo-btn ${isSpinning ? "spinning" : ""}`}
                onClick={handleRedo}
              >
                <FaRedoAlt />
              </button>
            </div>
          </div>
        </div>

        {/* 사전 예약 ZONE */}
        <div className="reservation-zone">
          <div className="zone-title">
            <FaMapMarkerAlt />
            <p> 사전 예약 ZONE</p>
            <span>정문 GATE 바로 앞! 빠른 입장</span>
          </div>

          <div className="zone-wrap">
            {["A", "B", "C", "D"].map((zone) => {
              const available = zoneData[zone]?.available ?? 0;
              const total = zoneData[zone]?.total ?? "-";
              const status = getParkingStatus(available);

              return (
                <div className="zone" key={zone}>
                  <div className="top">
                    <h2>
                      {zone}
                      <span>구역</span>
                    </h2>
                    <p className={status.textClass}>
                      <span className={`status-dot ${status.dotClass}`}></span>
                      {status.label}
                    </p>
                  </div>
                  <div className="bottom">
                    <p>잔여석</p>
                    <div className="num">
                      <p>{available}</p>
                      <p>/{total}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 일반 주차 ZONE */}
        <div className="normal-zone">
          <div className="zone-left">
            <div className="zone-title">
              <FaMapMarkerAlt />
              <p> 일반 주차 ZONE</p>
            </div>
            <span>현장에서만 이용할 수 있어요</span>
          </div>
          <div className="zone-right">
            <p className="text-red">
              <span className="status-dot status-yellow"></span>
              보통
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

      {/* 예약 및 안내 버튼 */}
      <div className="reservation-section">
        <button
          className="reserve-btn"
          onClick={() => handleProtectedNav("MobileReservation/schedule")}
        >
          <FaCar className="car-icon" />
          주차 예약하기
        </button>

        <div className="info-buttons">
          <button className="info-btn" onClick={() => navigate("/information")}>
            <HiInformationCircle className="icon" />
            주차 안내
          </button>
          <button
            className="info-btn"
            onClick={() => handleProtectedNav("mypage/reservation")}
          >
            <HiTicket className="icon" />내 예약 내역
          </button>
        </div>

        <div className="more-info" onClick={() => navigate("/intro")}>
          더 많은 정보 보기
          <FaCaretRight className="icon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPageMobile;
