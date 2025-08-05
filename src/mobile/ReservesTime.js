import { useEffect, useState } from "react";
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

const ReservesTime = ({ reservation }) => {
  const [startTime, setStartTime] = useState(""); // 시작 시간관리
  const [endTime, setEndTime] = useState(""); // 종료 시간관리
  const [hours, setHours] = useState(0); // 선택한 시간 관리
  const [hourAndMinutes, setHourAndMinutes] = useState("0시간"); // 총 시간 관리
  const [firstPrice, setFirstPrice] = useState(2000); // 최초 1시간 요금
  const [halfPrice, setHalfPrice] = useState(1000); // 이후 30분당 요금
  const [maxPrice, setMaxPrice] = useState(15000); // 일 최대 요금
  const [total, setTotal] = useState(0); // 총 금액 관리
  const [popUp1, setPopUp1] = useState(false); // 팝업 상태 관리 1
  const [popUp2, setPopUp2] = useState(false); // 팝업 상태 관리 2
  const navigate = useNavigate("");

  const getDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = date.toLocaleDateString("ko-KR", { weekday: "long" });
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  //↓↓ 소수점으로 된 시간 값을 넘겨 받아 "시간 분" 형식으로 변환하는 함수
  const formatTime = (totalHours) => {
    // 시간을 받아오기
    const hours = Math.floor(totalHours); // 받아온 시간에서 정수만 출력 / floor는 소수점 아래 버리기
    const minutes = Math.round((totalHours - hours) * 60); // 남은 소수점 시간을 반올림 해주고 '분'으로 바꾸기
    if (hours === 0 && minutes === 0) {
      // 만약에 시간과 분이 0이면
      return "0시간"; // 0시간으로 리턴
    } else if (hours === 0) {
      // 만약에 시간만 0이면
      return `${minutes}분`; // "몇"분으로 리턴
    } else if (minutes === 0) {
      // 만약에 분이 0이면
      return `${hours}시간`; //"몇"시간으로 리턴
    } else {
      //시간도 있고, 분도 있다면
      return `${hours}시간 ${minutes}분`; // "몇"시간 "몇"분으로 보여줘라
    }
  };

  // ↓↓ 시작시간, 종료시간, 이용금액 관리
  useEffect(() => {
    if (startTime && endTime) {
      // 만약에 시작 시간과 종료시간이 있다면
      const [startHour, startMinute] = startTime.split(":"); // 시작 시간 00:00으로 표시
      const [endHour, endMinute] = endTime.split(":"); // 종료시간  00:00으로 표시
      const startTotalMinutes =
        parseInt(startHour) * 60 + parseInt(startMinute);
      const endTotalMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

      if (endTotalMinutes <= startTotalMinutes) {
        // 만약에 총 종료시간이 총 시작시간보다 작다면
        setPopUp2(true); // 시간 선택 안내 팝업창 띄우기
        setHours(0); // 시간 0
        setHourAndMinutes("0시간"); //화면표시 0시간
        setTotal(0); //이용요금도 0
        return; //으로 리턴
      }
      const minutesDiff = endTotalMinutes - startTotalMinutes; // 종료시간-시작시간을 minutesDiff에 저장
      const hourDiff = Math.round((minutesDiff / 60) * 100) / 100; // 분을 시간단위(소수점포함)으로 바꿔주기
      setHours(hourDiff); //시간 값을 setHours에 저장

      const fTime = formatTime(hourDiff); //앞에 계산한 시간을 사용자가 보기 좋은 형태로 변환 (1시간 30분)
      setHourAndMinutes(fTime); // 그 값을 setHourAndMinutes 시간과분에 저장

      let fee = 0; // 변할 수 있는 변수 선언
      if (hourDiff <= 1) {
        // 만약에 총 이용시간이 1시간 이하면
        fee = firstPrice; //fee에 최초 1시간 요금을 적용하라 (기본요금)
      } else {
        // 그게 아니라면
        const extraMinutes = minutesDiff - 60; //총 이용시간 - 60분 / 남은 시간은 1시간을 제외한 초과 이용 시간 값
        const extraHalfHours = Math.ceil(extraMinutes / 30); // 30분이 몇개가 있는지 계산(1분이라도 초과면 올림처리로 계산)
        fee = parseInt(firstPrice) + extraHalfHours * parseInt(halfPrice); // 최초요금 + 계산된 30분 초과분 * 1000원의 값을 fee에 저장
      }
      fee = Math.min(fee, parseInt(maxPrice)); // (a,b)값 중 더 작은 값을 선택 => 더 작은 값=일 최대 요금
      setTotal(fee); // 총금액을 setTotal에 저장
    }
  }, [startTime, endTime, firstPrice, halfPrice, maxPrice]); //← 안에 있는 값중에 하나라도 바뀌면 다시 계산해라

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

  // 상태 설정
  const [selectedSeatID, setselectedSeatID] = useState(null);
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

  // 좌석 선택 함수
  const selectSeats = (seatID) => {
    const selectedSeat = allSeatsData.find((seat) => seat.id === seatID);

    if (selectedSeat) {
      setselectedSeatID(seatID);
      setSelectedSeatNum(selectedSeat.num);
    }
  };

  //↓↓ 다음 버튼을 클릭했을 때 처리
  const handleClick = () => {
    if (!startTime || !endTime || !total || !hourAndMinutes) {
      setPopUp1(true);
      return;
    }
    saveStartTime(startTime); // 시작 시간 로컬에 저장
    saveEndTime(endTime); // 종료 시간 로컬에 저장
    saveTotal(total); // 총 금액 로컬에 저장
    saveHourAndMinutes(hourAndMinutes); // 총 시간 로컬에 저장
    navigate("/MobileReservation/payment"); //다음페이지로 넘겨주기
  };
  return (
    <div className="reserves-time">
      {/* 팝업창1 */}
      {popUp1 && (
        <div className="popup-wrap">
          <div className="popup">
            <div className="popup-top">
              <PiWarningCircleFill className="warning-sign" />
              <p className="popup-ment1">시간이 선택되지 않았습니다</p>
              <p className="popup-ment2">시간 선택 후 이용해 주세요</p>
            </div>
            <button
              onClick={() => {
                setPopUp1(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* 팝업창2 */}
      {popUp2 && (
        <div className="popup-wrap">
          <div className="popup">
            <div className="popup-top">
              <PiWarningCircleFill className="warning-sign" />
              <p className="popup-ment1">시작 시간이 종료 시간보다 빠릅니다</p>
              <p className="popup-ment2">시간을 다시 선택해 주세요</p>
            </div>
            <button
              onClick={() => {
                setPopUp2(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}

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
        <div className="time-btn">
          <button>
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
        <div className="time-content-wrap">
          <div className="time-selcete">
            <h3>주차 시간 선택</h3>
            <div className="time-time">
              <label>
                시작시간
                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                >
                  {
                    // 5시부터 24시까지의 시간은 00:00형식으로 만들고 30분 형식까지 추가한 옵션
                    Array.from({ length: 20 }, (_, i) => {
                      // 새 배열을 구성 length가 20인 객체를 넘겨주면 빈요소를 20개 가진 배열을 만들어줌 /코드 20번 반복실행
                      const Hour = String(i + 5).padStart(2, "0"); //5시부터 24시의 시간을 만드는 것
                      const options = [
                        <option
                          key={`${Hour}:00`}
                          value={`${Hour}:00`}
                        >{`${Hour}:00`}</option>,
                      ];
                      if (i + 5 < 24) {
                        //24:30분을 만들지 않기 위해 작성
                        options.push(
                          <option
                            key={`${Hour}:30`}
                            value={`${Hour}:30`}
                          >{`${Hour}:30`}</option>
                        );
                      }
                      return options;
                    }).flat()
                  }
                </select>
              </label>
              <label>
                종료시간
                <select
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                >
                  {Array.from({ length: 20 }, (_, i) => {
                    const Hour = String(i + 5).padStart(2, "0");
                    const options = [
                      <option
                        key={`${Hour}:00`}
                        value={`${Hour}:00`}
                      >{`${Hour}:00`}</option>,
                    ];
                    if (i + 5 < 24) {
                      options.push(
                        <option
                          key={`${Hour}:30`}
                          value={`${Hour}:30`}
                        >{`${Hour}:30`}</option>
                      );
                    }
                    return options;
                  }).flat()}
                </select>
              </label>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="btn-wrap-top">
              <div className="time-info">
                <h5>
                  <PiWarningFill /> 주차장 이용 안내
                </h5>
                <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
              </div>
              <div className="time-price">
                <p>
                  <span>{hourAndMinutes}</span> 이용 금액
                </p>
                <h5>{total.toLocaleString("ko-KR")}원</h5>
              </div>
              {total === maxPrice && (
                <p className="time-max">일 최대 요금이 적용되었습니다.</p>
              )}
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

export default ReservesTime;
