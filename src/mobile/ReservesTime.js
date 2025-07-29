import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { PiWarningFill } from "react-icons/pi";
import { getUserInfo } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";


const ReservesTime = ({reservation}) => {
  const [startTime, setStartTime] = useState(''); // 시작 시간관리
  const [endTime, setEndTime] = useState(''); // 종료 시간관리
  const [hours, setHours] = useState(0); // 선택한 시간 관리
  const [hourAndMinutes, setHourAndMinutes] = useState('0시간'); // 총 시간 관리
  const [firstPrice, setFirstPrice] = useState(2000); // 최초 1시간 요금
  const [halfPrice, setHalfPrice] = useState(1000); // 이후 30분당 요금
  const [maxPrice, setMaxPrice] = useState(15000); // 일 최대 요금
  const [total, setTotal] = useState(0); // 총 금액 관리
  const [selectArea , setSelectArea] = useState(''); // 선택한 자리 관리
   const [popUp1, setPopUp1] = useState(false); // 팝업 상태 관리 1
   const [popUp2, setPopUp2] = useState(false); // 팝업 상태 관리 2
  const navigate = useNavigate('');

  //↓↓ 소수점으로 된 시간 값을 넘겨 받아 "시간 분" 형식으로 변환하는 함수
  const formatTime = (totalHours) => {  // 시간을 받아오기
    const hours = Math.floor(totalHours); // 받아온 시간에서 정수만 출력 / floor는 소수점 아래 버리기
    const minutes = Math.round((totalHours - hours) * 60) // 남은 소수점 시간을 반올림 해주고 '분'으로 바꾸기
    if (hours === 0 && minutes === 0) {  // 만약에 시간과 분이 0이면 
      return '0시간';  // 0시간으로 리턴
    } else if (hours === 0) { // 만약에 시간만 0이면 
      return `${minutes}분`; // "몇"분으로 리턴
    } else if (minutes === 0) { // 만약에 분이 0이면
      return `${hours}시간`; //"몇"시간으로 리턴
    } else {                //시간도 있고, 분도 있다면
      return `${hours}시간 ${minutes}분`;  // "몇"시간 "몇"분으로 보여줘라
    }
  }

  // ↓↓ 시작시간, 종료시간, 이용금액 관리
  useEffect(() => { 
    if (startTime && endTime) {  // 만약에 시작 시간과 종료시간이 있다면 
      const [startHour, startMinute] = startTime.split(':'); // 시작 시간 00:00으로 표시
      const [endHour, endMinute] = endTime.split(':');       // 종료시간  00:00으로 표시
      const startTotalMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
      const endTotalMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

      if (endTotalMinutes <= startTotalMinutes) {  // 만약에 총 종료시간이 총 시작시간보다 작다면
        setPopUp2(true); // 시간 선택 안내 팝업창 띄우기
        setHours(0); // 시간 0
        setHourAndMinutes('0시간'); //화면표시 0시간
        setTotal(0); //이용요금도 0
        return //으로 리턴
      }
      const minutesDiff = endTotalMinutes - startTotalMinutes; // 종료시간-시작시간을 minutesDiff에 저장
      const hourDiff = Math.round((minutesDiff / 60) * 100) / 100; // 분을 시간단위(소수점포함)으로 바꿔주기
      setHours(hourDiff); //시간 값을 setHours에 저장

      const fTime = formatTime(hourDiff);  //앞에 계산한 시간을 사용자가 보기 좋은 형태로 변환 (1시간 30분)
      setHourAndMinutes(fTime); // 그 값을 setHourAndMinutes 시간과분에 저장

      let fee = 0; // 변할 수 있는 변수 선언
      if (hourDiff <= 1) { // 만약에 총 이용시간이 1시간 이하면
        fee = firstPrice; //fee에 최초 1시간 요금을 적용하라 (기본요금)
      } else {            // 그게 아니라면
        const extraMinutes = minutesDiff - 60; //총 이용시간 - 60분 / 남은 시간은 1시간을 제외한 초과 이용 시간 값
        const extraHalfHours = Math.ceil(extraMinutes / 30); // 30분이 몇개가 있는지 계산(1분이라도 초과면 올림처리로 계산)
        fee = parseInt(firstPrice) + (extraHalfHours * parseInt(halfPrice)); // 최초요금 + 계산된 30분 초과분 * 1000원의 값을 fee에 저장
      }
      fee = Math.min(fee, parseInt(maxPrice)); // (a,b)값 중 더 작은 값을 선택 => 더 작은 값=일 최대 요금
      setTotal(fee); // 총금액을 setTotal에 저장
    }
  }, [startTime, endTime, firstPrice, halfPrice, maxPrice]); //← 안에 있는 값중에 하나라도 바뀌면 다시 계산해라


  //↓↓ 다음 버튼을 클릭했을 때 처리
  const handleClick = ()=>{
    reservation.setSelectStartTime(startTime);
    reservation.setSelectEndTime(endTime);
    reservation.setSelectTotal(total);
    reservation.setSelectTime(hourAndMinutes);
    navigate('/') //다음페이지로 넘겨주기
  }
  console.log(startTime,endTime,total,hourAndMinutes);

  return (
    <div className="reserves-time">
      {/* 팝업창1 */}
      <div className={`pop ${popUp1 ? "active" : ''}`}>
        <div className="pop-up">
        <p><PiWarningCircleFill /></p>
        <p>결제를 처리할 수 없습니다</p>
        <button onClick={()=>{setPopUp1(false)}}>닫기</button>
         </div>
      </div>
         {/* 팝업창2 */}
      <div className={`pop ${popUp2 ? "active" : ''}`}>
        <div className="pop-up">
        <p><PiWarningCircleFill /></p>
      <p>종료 시간은<br/>시작 시간 이후로 설정해주세요!</p>
        <button onClick={()=>{setPopUp2(false)}}>닫기</button>
         </div>
      </div>
      <p className="time-date">
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
      <div className="time-seat">
        <p>선택한자리</p>
        {/* <h1>{selectArea}</h1>   // 정보 받아오면 적용해보기  */}
        <h1>{reservation.selectedZone} - {reservation.selectSeatID}</h1>
      </div>
      <div className="time-btn">
        <button><GoClockFill /> 시간제</button>
        <button
        onClick={()=>{navigate('/MobileReservation/AllDay')}}
        ><FaRegCalendarAlt /> 일일권</button>
      </div>
      <h3>주차 시간 선택</h3>
      <div className="time-time">
        <label>
          시작시간
          <select
            value={startTime}
            onChange={(e) => { setStartTime(e.target.value); }}
          >
            {  // 5시부터 24시까지의 시간은 00:00형식으로 만들고 30분 형식까지 추가한 옵션
              Array.from({ length: 20 }, (_, i) => {  // 새 배열을 구성 length가 20인 객체를 넘겨주면 빈요소를 20개 가진 배열을 만들어줌 /코드 20번 반복실행
                const Hour = String(i + 5).padStart(2, "0"); //5시부터 24시의 시간을 만드는 것 
                const options = [
                  <option key={`${Hour}:00`} value={`${Hour}:00`}>{`${Hour}:00`}</option>
                ];
                if (i + 5 < 24) { //24:30분을 만들지 않기 위해 작성
                  options.push(
                    <option key={`${Hour}:30`} value={`${Hour}:30`}>{`${Hour}:30`}</option>
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
            onChange={(e) => { setEndTime(e.target.value) }}
          >
            {
              Array.from({ length: 20 }, (_, i) => {
                const Hour = String(i + 5).padStart(2, "0");
                const options = [
                  <option key={`${Hour}:00`} value={`${Hour}:00`}>{`${Hour}:00`}</option>
                ];
                if (i + 5 < 24) {
                  options.push(
                    <option key={`${Hour}:30`} value={`${Hour}:30`}>{`${Hour}:30`}</option>
                  );
                }
                return options;
              }).flat()
            }
          </select>
        </label>
      </div>
      <h4>총 이용시간 <span>{hourAndMinutes}</span></h4>
      <div className="time-info">
        <h5><PiWarningFill /> 주차장 이용 안내</h5>
        <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
        <p>최초 1시간 2,000원 이후 30분당 1,000원이 부과돼요</p>
      </div>
      <div className="time-price">
        <p><span>{hourAndMinutes}</span> 이용 금액</p>
        <h5>{total.toLocaleString("ko-KR")}원</h5>
      </div>
      {total === maxPrice && <p className="time-max">일 최대 요금이 적용되었습니다.</p>}
      <button 
      onClick={handleClick}
      disabled={total<= 0}
      className="time-nextBtn"
      >다음으로</button>
    </div>
  );
};

export default ReservesTime;