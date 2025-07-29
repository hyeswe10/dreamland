import { useNavigate } from "react-router-dom";

// import BottomNavBarMobile from "./BottomNavBarMobile";
// import HeaderMobile from "./HeaderMobile";

// import MainHeaderMobile from "./MainHeaderMobile";
// import { BsStars } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { HiTicket } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { fetchAllZoneStatus } from "../utils/ParkingAPI";
import { useEffect, useState } from "react";
// import { ReactComponent as Parking } from "../icons/Parking.svg";

const MainPageMobile = () => {
  const [zone,setZone] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const now = new Date();

  useEffect(()=>{
    const getZone = async () => {
      setIsLoading(true);
      const data = await fetchAllZoneStatus();
      setZone(data);
      setIsLoading(false);
    }
    getZone();
  },[])


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
      {/* <MainHeaderMobile /> */}
      {/* <HeaderMobile/> */}
      <div className="zone-map">
        <div className="top-info">
          <div className="left">
            {/* <Parking /> */}
            <div className="date-info">
              <p>{formatted}</p>
              <h3>드림랜드 실시간 주차 현황</h3>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="reservation-zone">
          <div className="zone-title">
            <FaMapMarkerAlt />
            <p> 사전 예약 ZONE</p>
            <span>정문 GATE 바로 앞! 빠른 입장</span>
          </div>
          <div className="zone-wrap">
          {

          }
            {/* <div className="zone">
              <div className="top">
              <h2>A<span>구역</span></h2>
              <p><span></span>혼잡</p>
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
              <h2>B<span>구역</span></h2>
              <p><span></span>혼잡</p>
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
              <h2>C<span>구역</span></h2>
              <p><span></span>혼잡</p>
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
              <h2>D<span>구역</span></h2>
              <p><span></span>혼잡</p>
            </div>
            <div className="bottom">
              <p>잔여석</p>
              <div className="num">
                <p>3</p>
                <p>/25</p>
              </div>
            </div>
            </div> */}

          </div>

          <div className="normal-zone">
            <div className="zone-title">
            <FaMapMarkerAlt />
            <p> 일반 주차 ZONE</p>
            <span>정문 GATE 바로 앞! 빠른 입장</span>
          </div>
          </div>
        </div>
      </div>

      <div className="reservation-section">
        {/* 상단 예약하기 버튼 */}
        <button
          className="reserve-btn"
          onClick={() => navigate("/reservation")}
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
      {/* <BottomNavBarMobile /> */}
    </div>
  );
};

export default MainPageMobile;
