import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ScheduleSelect from "./ScheduleSelect";
import FloorSelect from "./FloorSelect";
import ParkingSelect from "./ParkingSelect";
import ReservesTime from "./ReservesTime";
import ReservesAllDay from "./ReservesAllDay";

const MobileReservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedZoneSeats, setSelectedZoneSeats] = useState([]);
  const [selectSeatID, setSelectSeatID] = useState(null);
  const [selectedStartTime, setSelectStartTime] = useState(null);  // 시작시간 관리
  const [selectedEndTime, setSelectEndTime] = useState(null);  // 종료시간 관리
  const [selectedTime, setSelectTime] = useState(null);  // 총 시간 관리
  const [selectedTotal, setSelectTotal] = useState(0);  // 총 금액 관리

  //날짜, 구역, 좌석 상태 관리
  const reservationState = {
    selectedDate,
    setSelectedDate,
    selectedZone,
    setSelectedZone,
    selectedZoneSeats,
    setSelectedZoneSeats,
    selectSeatID,
    setSelectSeatID, 
    selectedStartTime,
    setSelectStartTime,  
    selectedEndTime,
    setSelectEndTime,
    selectedTime,
    setSelectTime,
    selectedTotal,
    setSelectTotal  
  };


  return (
    <Routes>
      <Route
        path="schedule"
        element={
          <ScheduleSelect
          reservation={reservationState}
          />
        }
      />
      <Route
        path="floor"
        element={
          <FloorSelect
            reservation={reservationState}
          />
        }
      />
      <Route
        path="parking"
        element={
          <ParkingSelect
            reservation={reservationState}
          />
        }
      />
      <Route
        path="Time"
        element={
          <ReservesTime
            reservation={reservationState}
          />
        }
      />
      <Route
        path="AllDay"
        element={
          <ReservesAllDay
            reservation={reservationState}
          />
        }
      />
    </Routes>
  );
};

export default MobileReservation;
