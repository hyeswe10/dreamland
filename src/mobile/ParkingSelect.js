// floorSelect에서 ParkingSelect ParkingSelect selectedZoneSeats
import { useNavigate } 
from "react-router-dom";
import IconTitle from "./IconTitle";
import { FaCarSide } from "react-icons/fa6";
import SeatIcon from "./SeatIcon";

const ParkingSelect = ({ reservation }) => {
  const {
    selectedDate,
    selectedZone,
    selectedZoneSeats, //allSeatsData, reserveID, myReserved
    selectSeatID,
    setSelectSeatID,
  } = reservation;
  // console.log(selectedZone, selectedZoneSeats); //floorSelect에서 내가 선택한 구역의 정보가 잘 불러와짐!
  const {
    allSeatsData = [],
    reserveID = [],
    myReserved = [],
  } = selectedZoneSeats || {};

  //예약 상태 여부
  const isReserved = (seat) => reserveID.includes(seat.num); //reserveID는 이미 예약된 좌석을 의미, seat_id가 reserveID 안에 있는지 확인(있으면 true)
  const isMyReserved = (seat) => myReserved.includes(seat.num); //myReserved는 내가 예약한 좌석을 의미, seat_id가 myReserved는 안에 있는지 확인(있으면 true)

  //예약이 가능한 seat만 선택이 되게 하는 함수(예약중, 예약불가능은 클릭 안됨)
  const handleSeatClick = (seat) => {
    if (!seat.is_reserved) {
      //예약된 좌석 선택 불가
      setSelectSeatID(seat.num);
    }
  };
  //좌석 색상 함수
  const getSeatColor = (seat) => {
    if (isMyReserved(seat)) return "#ffffff"; //내 예약 색상
    if (seat.num === selectSeatID) return "#FFF098"; //현재 선택한 색상
    if (isReserved(seat)) return "#E4E3E6"; //예약 불가 색상
    return "#BD6CE3"; //예약 가능 색상
  };

  //seat 3개 구간으로 나누기
  const oneRow = allSeatsData.filter((seat) => {
    return seat.num >= 1 && seat.num <= 10;
  });
  const twoRow = allSeatsData.filter((seat) => {
    return seat.num >= 11 && seat.num <= 20;
  });
  const threeRow = allSeatsData.filter((seat) => {
    return seat.num >= 21 && seat.num <= 25;
  });

  //상단 예약 가능 여부 안내 변수
  // const noticeItems = [
  //   { label: "예약 불가능", color:"#E4E3E6"},
  //   { label: "예약 가능", color:"#BD6CE3"},
  //   { label: "내 예약", color:"#ffffff"},
  //   { label: "현재 선택", color:"#FFF098"},
  // ];

  const navigate = useNavigate();
  //reserveTime페이지로 넘어가는 다음으로 버튼
  const nextbtn = () => {
    if (!selectSeatID) {
      alert("주차 자리를 선택해주세요");
      return;
    }
    navigate("/MobileReservation/Time")
  }

  // console.log(oneRow);
  // console.log('selectedZone:', selectedZone);
console.log(allSeatsData);
  return (
    <div className="parking-select">
      
      <IconTitle title={`${selectedZone}구역 주차 자리 선택`} selectedDate={selectedDate}/>

      <div className="reserve-notice">
        {/* {noticeItems} */}
        <div>
          <FaCarSide /> 예약 불가능
        </div>
        <div>
          <FaCarSide />
          예약 가능
        </div>
        <div>
          <FaCarSide />내 예약
        </div>
        <div>
          <FaCarSide />
          현재 선택
        </div>
      </div>

{/* 3개 구간 나눈 변수를 map으로 뿌려주기 */}
      {[oneRow, twoRow, threeRow].map((row, idx) => {
        return (
          <div className="seat-grid" key={idx}>
            {row.map((seat) => {
              return (
                <div
                  key={seat.id}
                  className="seat" 
                  onClick={() => { handleSeatClick(seat)}}
                  >
                  <SeatIcon color={getSeatColor(seat)}/>
                </div>
              );
            })}
          </div>
        );
      })}

      <button className="next-btn" onClick={nextbtn}>
        다음으로
      </button>
    </div>
  );
};

export default ParkingSelect;
