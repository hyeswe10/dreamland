import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaCar, FaMapMarkerAlt, FaRedoAlt } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { MdAttractions } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { FaGift } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";

import { ReactComponent as Parking } from "../icons/Parking.svg";
import { ReactComponent as CarBody } from "../icons/Car_ani.svg";
import { ReactComponent as CarSmoke } from "../icons/Smoke_ani.svg";
import { ReactComponent as CarShadow } from "../icons/Shadow_ani.svg";

import facilitiesData from "../data/facilities.json";

import { getAllseatsByDate } from "../utils/ParkingAPI";
import { getUserInfo } from "../utils/LocalStorage"; // 로그인 확인

const MainPageD = () => {
  const navigate = useNavigate();
  const [zoneData, setZoneData] = useState({}); // A,B,C,D 데이터 저장
  const [isSpinning, setIsSpinning] = useState(false); // 아이콘 회전 상태
  const [activeCategory, setActiveCategory] = useState("attraction");
  const [items, setItems] = useState([]);
  const [loginCheck, setLoginCheck] = useState(null); // 로그인 체크
  const [showAlert, setShowAlert] = useState(false); // 알림 모달 상태

  const categories = [
    { id: "attraction", label: "어트랙션", icon: <MdAttractions /> },
    { id: "show", label: "공연", icon: <PiMicrophoneStageFill /> },
    { id: "restaurant", label: "레스토랑", icon: <ImSpoonKnife /> },
    { id: "gift", label: "기프트샵", icon: <FaGift /> },
  ];

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

useEffect(() => {
  const categoryMap = {
    attraction: "어트랙션",
    show: "공연",
    restaurant: "레스토랑",
    gift: "기프트샵",
  };
  const filtered = facilitiesData.filter(
    (item) => item.category === categoryMap[activeCategory]
  );
  setItems(filtered);
}, [activeCategory]);

  const handleRedo = () => {
    // 새로고침 데이터
    fetchData();

    // 아이콘 회전 애니메이션
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 600); // 0.6초 후 원래 상태로
  };

  useEffect(() => {
    fetchData();
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

  // ************** //

  return (
    <div id="main-pageD">
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
      </div>

      {/* 드림랜드 파크가 처음이신가요?  */}
      <div className="welcome-section">
        <div className="welcome-wrap" onClick={() => navigate("/intro")}>
          <div className="text-area">
            <div className="top">
              <h2>
                드림랜드 파크가
                <br />
                처음이신가요?
              </h2>
              <p>처음 방문자를 위한 가이드를 확인하세요!</p>
            </div>
            <p className="btn">가이드 보기</p>
          </div>
          <div className="car-wrapper">
            <CarShadow className="shadow" />
            <CarSmoke className="smoke" />
            <CarBody className="car" />
          </div>
        </div>
      </div>

      {/* 운영시설 안내 */}
      <div className="facility-section">
        <div className="facilities">
          <h2 className="title">
            <BsStars />
            운영 시설
          </h2>
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="attraction-list">
            {items.map((item) => (
              <div key={item.id} className="attraction-item">
                <div className="img-wrap">
                  <img src={`${process.env.PUBLIC_URL}${item.img}`} alt={item.title} />
                </div>
                <div className="info">
                  <span className="tag">{item.category}</span>
                  <p>{item.title}</p>
                  <div className="time">
                    <GoClockFill /> <p>{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="more">더보기</div>
        </div>
      </div>
    </div>
  );
};

export default MainPageD;
