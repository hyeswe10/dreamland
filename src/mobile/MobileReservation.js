import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScheduleSelect from "./ScheduleSelect";
import FloorSelect from "./FloorSelect";
import ParkingSelect from "./ParkingSelect";
import ReservesTime from "./ReservesTime";
import ReservesAllDay from "./ReservesAllDay";
import ReservationPayment from "./ReservationPayment";
import CompleteReservation from "./CompleteReservation";
import ProgressBar from "./ProgressBar";

const MobileReservation = () => {
  const location = useLocation(); // 현재 경로 확인

  // complete 경로일 때는 진행 바 숨김
  const hideProgressBar = location.pathname.includes("complete");

  return (
    <>
      {!hideProgressBar && <ProgressBar />}
      <Routes>
        <Route path="schedule" element={<ScheduleSelect />} />
        <Route path="floor" element={<FloorSelect />} />
        <Route path="parking" element={<ParkingSelect />} />
        <Route path="Time" element={<ReservesTime />} />
        <Route path="AllDay" element={<ReservesAllDay />} />
        <Route path="payment" element={<ReservationPayment />} />
        <Route path="complete" element={<CompleteReservation />} />
      </Routes>
    </>
  );
};

export default MobileReservation;
