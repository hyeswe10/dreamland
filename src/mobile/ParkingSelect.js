import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa6";
import SeatIcon from "./SeatIcon";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuListCheck } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import { loadZoneSeats } from "../utils/ParkingAPI";

// 전체 구성 순서 요약
// 1. 로컬스토리지에서 selectedZone, selectedZoneSeats, selectedSeatID 불러오기
// 2. 상태 관리: selectedZone, selectedZoneSeats, selectSeatID
// 3. 좌석 예약 상태 확인 함수 정의 (isReserved, isMyReserved)
// 4. 좌석 클릭 시 선택 처리 (handleSeatClick)
// 5. 좌석 색상 결정 함수 (getSeatColor)
// 6. 좌석을 3개 구간으로 나누기 (oneRow, twoRow, threeRow)
// 7. 예약 가능 여부 안내용 UI 아이템 정의 (noticeItems)
// 8. 좌석 배경 색상 결정 함수 (getSeatBackgroundColor)
// 9. 다음 버튼 클릭 시 선택된 좌석 체크 및 페이지 이동 (nextbtn)
// 10. 선택된 좌석 번호 추출 및 표시 (selectedSeat, displayNum)

const ParkingSelect = ({}) => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedZoneSeats, setSelectedZoneSeats] = useState({});
  const [selectSeatID, setSelectSeatID] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  // 로컬스토리지에서 데이터 불러오기
  useEffect(() => {
    const parkZone = localStorage.getItem("selectedZone");
    const parkSeats = localStorage.getItem("selectedZoneSeats");
    const selectedSeatID = localStorage.getItem("selectedSeatID");

    if (parkZone && parkSeats) {
      setSelectedZone(parkZone);
      setSelectedZoneSeats(JSON.parse(parkSeats));

      if (setSelectSeatID) {
        setSelectSeatID(parseInt(selectedSeatID, 10)); //선택한 좌석 유지(숫자로 변환)
      }
    }
  }, []);

  // selectedDate를 localStorage에서 가져와서 selectedDate로 저장
  const storedDate = localStorage.getItem("selectedDate");
  const selectedDate = storedDate ? new Date(storedDate) : null;

  // 날짜 문자열 포맷 함수
  const getDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "long" });
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  // 예약 상태 정보 구조 분해 (초기값 설정)
  const {
    allSeatsData = [],
    reserveID = [],
    myReserved = [],
  } = selectedZoneSeats || {};

  // 예약 상태 확인 함수
  const isReserved = (seat) => reserveID.includes(seat.id); //reserveID는 이미 예약된 좌석을 의미, seat_id가 reserveID 안에 있는지 확인(있으면 true)
  const isMyReserved = (seat) => myReserved.includes(seat.id); //myReserved는 내가 예약한 좌석을 의미, seat_id가 myReserved는 안에 있는지 확인(있으면 true)
  

  // 예약이 가능한 seat만 선택이 되게 하는 함수(예약중, 예약불가능은 클릭 안됨)
const handleSeatClick = (seat) => {
  // `isReserved`와 `isMyReserved` 함수를 사용해 예약 불가능한 좌석은 클릭되지 않도록 함
  if (!isReserved(seat) && !isMyReserved(seat)) {
    setSelectSeatID(seat.id); // React 상태에는 seat.id를 저장
    // 로컬 스토리지에는 ReservationPayment.js에서 사용하는 키인 "selectedSeatID"에 seat.num을 저장
    localStorage.setItem("selectedSeatID", seat.num.toString());
  }
};

  // 좌석 색상 함수
  const getSeatColor = (seat) => {
    if (isMyReserved(seat)) return "#ffffff"; //내 예약 색상
    if (seat.id === selectSeatID) return "#FFF098"; //현재 선택한 색상
    if (isReserved(seat)) return "#E4E3E6"; //예약 불가 색상
    return "#BD6CE3"; //예약 가능 색상
  };

  // Grid처리를 위한 seat 3개 구간으로 나누기
  const oneRow = allSeatsData.filter((seat) => {
    return seat.num >= 1 && seat.num <= 10;
  });
  const twoRow = allSeatsData.filter((seat) => {
    return seat.num >= 11 && seat.num <= 20;
  });
  const threeRow = allSeatsData.filter((seat) => {
    return seat.num >= 21 && seat.num <= 25;
  });

  // 상단 예약 가능 여부 안내 변수
  const noticeItems = [
    { label: "예약 불가능", backgroundColor: "#EFEFEF", color: "#DDDDDD" },
    {
      label: "예약 가능",
      backgroundColor: "#FFFEFF",
      color: "#BD6CE3",
      border: "1px solid #BAB6C3",
    },
    { label: "내 예약", backgroundColor: "#DCD5E8", color: "#FFFEFF" },
    { label: "현재 선택", backgroundColor: "#BD6CE3", color: "#FFF098" },
  ];

  // 예약에 따른 색상 변경
  const getSeatBackgroundColor = (seat) => {
    if (isMyReserved(seat)) return "my-reserve"; //내 예약 색상
    if (seat.id === selectSeatID) return "selected"; //현재 선택한 색상
    if (isReserved(seat)) return "reserve"; //예약 불가 색상
    return "available"; //예약 가능 색상
  };

  

  // reserveTime페이지로 넘어가는 다음으로 버튼
  const nextbtn = () => {
    if (!localStorage.getItem("selectedSeatID")) {
      setShowMsg(true);
      return;
    }
    navigate("/MobileReservation/Time");
  };


  // 선택된 자리 버튼
  // allSeatsData에서 해당 좌석을 찾아
  // 사용자에게 보여줄 num(좌석 번호)을 따로 추출함
  const selectedSeat = allSeatsData.find((seat) => {
    return seat.id === selectSeatID;
  });
  const displayNum = selectedSeat ? selectedSeat.num : "";

  // -------------------------

  useEffect(() => {
  const userStr = localStorage.getItem("park_user");
  if (!userStr) return;

  const user = JSON.parse(userStr);
  const userID = user.id; // user_id 대신 user.id (users 테이블의 고유 ID)를 사용

  if (selectedZone && selectedDate && userID) {
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    loadZoneSeats(selectedZone, formattedDate, userID).then((res) => {
      if (res.success) {
        setSelectedZoneSeats(res.data);
      }
    });
  }
}, [selectedZone, selectedDate]);

  // /////////////////////////////


  return (
    <div className="parking-select">
      <div className="top-wrapper">
        <div className="top1">
          <LuListCheck className="calendar-icon" />
          <p>{getDate(selectedDate)} {selectedZone}구역</p>
        </div>
        <div className="top2">
          <FaMapMarkerAlt className="map-icon" />
          <h2>
            <span className="zone-color">{selectedZone}구역</span> 주차 자리
            선택
          </h2>
        </div>
      </div>

      <div className="parking-wrap">
        <div className="reserve-notice">
          {noticeItems.map(({ label, backgroundColor, color, border }, idx) => {
            return (
              <div key={idx} className="notice-icon-wrap">
                <div className="notice-icon" style={{ backgroundColor, border }}>
                  <FaCarSide style={{ color }} />
                </div>
                <span>{label}</span>
              </div>
            );
          })}
        </div>

        {/* 3개 구간 나눈 변수를 map으로 뿌려주기 */}
        <div className="seat-wrapper">
          {[oneRow, twoRow, threeRow].map((row, idx) => {
            return (
              <div className="seat-grid" key={idx}>
                {row.map((seat) => {
                  return (
                    <div
                      key={seat.id}
                      className={`seat ${getSeatBackgroundColor(seat)}`}
                      onClick={() => {
                        handleSeatClick(seat);
                      }}
                    >
                      <SeatIcon color={getSeatColor(seat)} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="btn-wrap">
        <button className="select-btn">
          <span>현재 선택</span> {selectedZone}-{displayNum}
        </button>
        <button className="next-btn" onClick={nextbtn}>
          다음으로{" "}
        </button>
      </div>

      {/* 팝업 메시지 창 */}
      {showMsg && (
        <div className="popup-wrap">
          <div className="popup">
            <div className="popup-top">
              <PiWarningCircleFill className="warning-sign" />
              <p className="popup-ment1">자리가 선택되지 않았습니다</p>
              <p className="popup-ment2">자리 선택 후 이용해 주세요</p>
            </div>
            <button onClick={()=>{setShowMsg(false)}}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingSelect;
