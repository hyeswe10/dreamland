import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { PiWarningFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";

const ReservesAllDay = ({reservation}) => {
  const [startTime, setStartTime] = useState('00:00'); // 시작 시간관리
  const [endTime, setEndTime] = useState('23:59'); // 종료 시간관리
  const [hourAndMinutes, setHourAndMinutes] = useState("24시간")
  const [maxPrice, setMaxPrice] = useState(15000); // 일 최대 요금
  const [popUp, setPopUp] = useState(false); // 팝업 상태 관리
  const navigate = useNavigate('');

   //↓↓ 다음 버튼을 클릭했을 때 처리
  const handleClick = ()=>{
    reservation.setSelectStartTime(startTime);
    reservation.setSelectEndTime(endTime);
    reservation.setSelectTotal(maxPrice);
    reservation.setSelectTime(hourAndMinutes);
    navigate('/') //다음페이지로 넘겨주기
  }
  console.log(startTime,endTime,maxPrice,hourAndMinutes);

  const selectDay = (()=>{
    return reservation.selectedDate ? 
            reservation.selectedDate.toLocaleDateString("ko-KR",{
            month: 'long', 
            day: 'numeric'
            })
          : ""
  })

  return (
    <div className="reserves-day">
      <div className={`pop ${popUp ? "active" : ''}`}>
        <div className="pop-up">
        <p><PiWarningCircleFill /></p>
        <p>결제를 처리할 수 없습니다</p>
        <button onClick={()=>{setPopUp(false)}}>닫기</button>
         </div>
      </div>
      <p className="day-date">
        <FaRegCalendarAlt />  {reservation.selectedDate ? 
        reservation.selectedDate.toLocaleDateString("ko-KR",{
           year: 'numeric', 
           month: 'long', 
          day: 'numeric',
          weekday: 'long'
        })
         : "날짜를 선택해주세요"}
       </p>
      <h2><span><GoClockFill /></span> 이용시간 선택</h2>
      <div className="day-seat">
        <p>선택한자리</p>
        <h1>{reservation.selectedZone} - {reservation.selectSeatID}</h1>
      </div>
      <div className="day-btn">
        <button
        onClick={()=>{navigate('/MobileReservation/Time')}}
        ><GoClockFill /> 시간제</button>
        <button
          onClick={() => { navigate('/MobileReservation/AllDay') }}
        ><FaRegCalendarAlt /> 일일권</button>
      </div>
      <div className="day-day">
        <p>선택한 날짜</p>
        <p>
          {reservation.selectedDate ? 
          reservation.selectedDate.toLocaleDateString("ko-KR",{
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
            })
          : ""} 
        </p>
      </div>
      <div className="day-time">
        <p>이용시간</p>
        <p>{selectDay()} {startTime} - {selectDay()} {endTime}</p>
      </div>
      <div className="day-info">
        <h5><PiWarningFill /> 주차장 이용 안내</h5>
        <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
        <p>최초 1시간 2,000원 이후 30분당 1,000원이 부과돼요</p>
      </div>
      <div className="day-price">
        <p><span>일일권</span> 이용 금액</p>
        <h5>{maxPrice.toLocaleString("ko-KR")}원</h5>
      </div>
      <button
        onClick={handleClick}
        className="day-nextBtn"
      >다음으로</button>
    </div>
  );
};

export default ReservesAllDay;
