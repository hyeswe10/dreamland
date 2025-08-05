import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";
import { LuListCheck } from "react-icons/lu";

// localStorage 저장 "시작시간"
const saveStartTime = (startTime) => {
  localStorage.setItem("start_time", JSON.stringify(startTime));
};
// localStorage 저장 "종료시간"
export const saveEndTime = (endTime) => {
  localStorage.setItem("end_time", JSON.stringify(endTime));
};
// localStorage 저장 "총 금액"
export const saveTotal = (total) => {
  localStorage.setItem("total", JSON.stringify(total));
};
// localStorage 저장 "총 시간"
export const saveHourAndMinutes = (hourAndMinutes) => {
  localStorage.setItem("hourAndMinutes", JSON.stringify(hourAndMinutes));
};

const ReservesAllDay = ({ reservation }) => {
  const startTime = "00:00"; // 시작 시간관리
  const endTime = "23:59"; // 종료 시간관리
  const hourAndMinutes = "24시간";
  const total = 15000; // 일 최대 요금
  const [popUp, setPopUp] = useState(false); // 팝업 상태 관리

  const navigate = useNavigate();

  const getDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "long" });
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  // 로컬 스토리지에 저장된 날짜 불러오기 (없으면 오늘 날짜)
  const today = new Date();
  const storedDate = localStorage.getItem("selectedDate");
  const initialDate = storedDate ? new Date(storedDate) : today;
  const [selectedDate, setSelectDate] = useState(initialDate);

  // 로컬 스토리지에 저장된 구역,자리 불러오기
  const storedZone = localStorage.getItem("selectedZone");
  const [selectedZone, setSelectedZone] = useState(storedZone);

  // 좌석 데이터 가져오기
  const storedZoneSeatsString = localStorage.getItem("selectedZoneSeats");
  const storedSeatID = localStorage.getItem("selectedSeatID");

  // JSON 파싱
  const parsedZoneSeats = storedZoneSeatsString
    ? JSON.parse(storedZoneSeatsString)
    : null;
  const parsedSeatID = storedSeatID ? JSON.parse(storedSeatID) : null;

  // 상태 설정
  const [selectedSeatID, setselectedSeatID] = useState(parsedSeatID);
  const [selectedSeatNum, setSelectedSeatNum] = useState(null);

  // allSeatsData 추출
  let allSeatsData = [];
  if (parsedZoneSeats && parsedZoneSeats.allSeatsData) {
    allSeatsData = parsedZoneSeats.allSeatsData;
  }
  // 컴포넌트 마운트 시 좌석 번호 찾기
  useEffect(() => {
    if (localStorage.getItem("selectedSeatID")) {
      setselectedSeatID(localStorage.getItem("selectedSeatID"));
    }
    window.scrollTo(0, 0);
  }, []);

  //↓↓ 다음 버튼을 클릭했을 때 처리
  const handleClick = () => {
    saveStartTime(startTime);
    saveEndTime(endTime);
    saveTotal(total);
    saveHourAndMinutes(hourAndMinutes);
    navigate("/MobileReservation/payment"); //다음페이지로 넘겨주기
  };

  const selectDay = () => {
    return selectedDate
      ? selectedDate.toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
        })
      : "";
  };

  return (
    <div className="reserves-day">
      <div className={`pop ${popUp ? "active" : ""}`}>
        <div className="pop-up">
          <p>
            <PiWarningCircleFill />
          </p>
          <p>결제를 처리할 수 없습니다</p>
          <button
            onClick={() => {
              setPopUp(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
      <div className="top-wrapper">
        <div className="top1">
          <LuListCheck className="calendar-icon" />
          <p>
            {getDate(selectedDate)} {selectedZone}-
            {selectedSeatID ? `${selectedSeatID}` : "null"}
          </p>
        </div>
        <div className="top2">
          <GoClockFill className="map-icon" />
          <h2>이용 시간 선택</h2>
        </div>
      </div>
      <div className="price-info">
        <ul className="price-detail">
          <li>
            <span>최소 1시간</span>
            <span>2,000원</span>
          </li>
          <li>
            <span>이후 30분당</span>
            <span>1,000원</span>
          </li>
          <li>
            <span>일 최대 요금</span>
            <span>15,000원</span>
          </li>
        </ul>
      </div>
      <div className="bottom-wrap">
        <div className="day-btn">
          <button
            onClick={() => {
              navigate("/MobileReservation/Time");
            }}
          >
            <GoClockFill /> 시간제
          </button>
          <button
            onClick={() => {
              navigate("/MobileReservation/AllDay");
            }}
          >
            <FaRegCalendarAlt /> 일일권
          </button>
        </div>
        <div className="day-content-wrap">
          <div className="day-wrap">
            <div className="day-day">
              <p>선택한 날짜 및 시간</p>
              <p>
                {selectedDate
                  ? selectedDate.toLocaleDateString("ko-KR", {
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })
                  : ""} {startTime} - {endTime}
              </p>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="day-info">
              <h5>
                <PiWarningFill /> 주차장 이용 안내
              </h5>
              <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
              <p>한 번 출차 시 다시 입차할 수 없어요</p>
            </div>
            <div className="day-price">
              <p>
                <span>일일권</span> 이용 금액
              </p>
              <h5>{total.toLocaleString()}원</h5>
            </div>
          </div>
        </div>
        <button onClick={handleClick} className="nextBtn">
          다음으로
        </button>
      </div>
    </div>
  );
};

export default ReservesAllDay;
