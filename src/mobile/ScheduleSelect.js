import { useNavigate } from "react-router-dom";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeaderMobile from "./HeaderMobile";
import BottomNavBarMobile from "./BottomNavBarMobile";
import { FaRegCalendarAlt } from "react-icons/fa";
import "../styles//mobile/CalendarStyle.scss";

const ScheduleSelect = ({ reservation }) => {
  const navigate = useNavigate();
    const {
    selectedDate,
    setSelectedDate
  } = reservation;


  const handleReserve = () => {
    navigate("/MobileReservation/floor");
  };

  const today = new Date();
  const maxDate = moment(today).add(30, "days").toDate();

  return (
    <div className="ScheduleSelect">
      <h2 className="title">
        <FaRegCalendarAlt />
        예약 날짜 선택
      </h2>

      <Calendar
        onChange={(date) => setSelectedDate(date)}
        value={selectedDate || today}
        minDate={today}
        maxDate={maxDate}
        defaultActiveStartDate={today}
        view="month"
        maxDetail="month"
        minDetail="month"
        prev2Label={null}
        next2Label={null}
        calendarType="gregory"
        showNeighboringMonth={false}
        formatDay={(locale, date) => moment(date).format("DD")}
        // 오늘 날짜 밑에 "오늘" 표시
        tileContent={({ date, view }) => {
          if (
            view === "month" &&
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            return <div className="today-text">오늘</div>;
          }
          return null;
        }}
      />

      <ul className="state">
        <li>
          <span></span>예약 가능
        </li>
        <li>
          <span></span>잔여 수량 없음
        </li>
        <li>
          <span></span>미운영/준비중
        </li>
      </ul>
      <button className="reserve-btn" onClick={handleReserve}>
        예약하기
      </button>
      <BottomNavBarMobile />
    </div>
  );
};

export default ScheduleSelect;
