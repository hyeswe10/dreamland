import { useEffect, useState } from "react";
import { getFinalAmountInfo, getPaymentInfo, getUserInfo } from "../utils/LocalStorage";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { fetchReserveID } from "../utils/ParkingAPI";

const CompleteReservation = () => {
    const navigate = useNavigate();
    const [reserveDate,setReserveDate] = useState(null);
    const [year,setYear] = useState(null);
    const [month,setMonth] = useState(null);
    const [date,setDate] = useState(null);
    const [zone,setZone] = useState(null);
    const [startTime,setStartTime] = useState(null);
    const [endTime,setEndTime] = useState(null);
    const [time,setTime] = useState(null);
    const [seatID,setSeatID] = useState(null);
    const amount = localStorage.getItem("final_amount");
    const [loginID,setLoginID] = useState('');
    const [parkID,setParkID] = useState(null);
    const [reserveID,setReserveID] = useState('');
    const [fullDate,setFullDate] = useState(null);

    //시작하자마자 모든 값 불러오기
    useEffect(()=>{
        const userInfo = getUserInfo();
        const fullDate = localStorage.getItem("selectedDate");
        const year = new Date(localStorage.getItem("selectedDate")).getFullYear();
        const month = new Date(localStorage.getItem("selectedDate")).getMonth()+1;
        const date = new Date(localStorage.getItem("selectedDate")).getDate();
        const reserveDate = new Date(localStorage.getItem("selectedDate")).toLocaleDateString("ko-KR",{
            month:'long',
            day:'numeric',
            weekday: 'long'
        })
        const zone = localStorage.getItem("selectedZone");
        const fetchSt = localStorage.getItem("start_time");
        const startTime = JSON.parse(fetchSt);
        const fetchEt = localStorage.getItem("end_time");
        const endTime = JSON.parse(fetchEt);
        const fetchT = localStorage.getItem("hourAndMinutes");
        const time = JSON.parse(fetchT);
        const seatID = localStorage.getItem("selectedSeatID"); 
        const parkID = localStorage.getItem("parkID");
        if(userInfo){
            setYear(year);
            setMonth(month);
            setDate(date);
            setReserveDate(reserveDate);
            setZone(zone);
            setStartTime(startTime);
            setEndTime(endTime);
            setTime(time);
            setSeatID(seatID);
            setLoginID(userInfo.id);
            setParkID(parkID);
            setFullDate(fullDate);
        }
    },[])
    //reservation ID 불러오기
    const getReserveID = async ()=>{
        const { data, error } = await fetchReserveID(loginID,parkID,fullDate);
        if(data){
            setReserveID(data[0].id);
        }
        if(error){
            console.log("에러입니다");
        }
    }
    useEffect(()=>{
        if(!parkID) return;
        getReserveID();
    },[parkID])

    //홈으로 버튼을 누르면 localStorage 삭제 후 이동
    const handleHome = ()=>{
        localStorage.removeItem("final_amount");
        localStorage.removeItem("hourAndMinutes");
        localStorage.removeItem("selectedDate");
        localStorage.removeItem("selectedSeatID");
        localStorage.removeItem("selectedZone");
        localStorage.removeItem("selectedZoneSeats");
        localStorage.removeItem("start_time");
        localStorage.removeItem("end_time");
        localStorage.removeItem("total");
        localStorage.removeItem("parkID");
        navigate("/");
    }

    //내 예약내역 버튼을 누르면 localStorage 삭제 후 이동
    const handleReservation = ()=>{
        localStorage.removeItem("final_amount");
        localStorage.removeItem("hourAndMinutes");
        localStorage.removeItem("selectedDate");
        localStorage.removeItem("selectedSeatID");
        localStorage.removeItem("selectedZone");
        localStorage.removeItem("selectedZoneSeats");
        localStorage.removeItem("start_time");
        localStorage.removeItem("end_time");
        localStorage.removeItem("total");
        localStorage.removeItem("parkID");
        navigate("/mypage/reservation");
    }
    return (
        <div id="complete-reservation">
            <div className="top-com-re">
                <div>
                <FaCheck />
                <h2>예약이 완료되었어요!</h2>
                </div>
                
                <p className="meet-dream">DreamLand에서 만나요!</p>
            </div>
            <div className="all-the-info">
                <div className="reserve-total-info">
                    <ul className="names-reserve">
                        <li>예약번호</li>
                        <li>예약일</li>
                        <li>예약시간</li>
                        <li>결제 금액</li>
                        <li>주차 위치</li>
                    </ul>
                    <ul className="saved-reserve">
                        <li>{year}{month}{date}{reserveID}{zone}{seatID}</li>
                        <li>{reserveDate}</li>
                        <li>{startTime} - {endTime} 총 {time}</li>
                        <li>{Number(amount).toLocaleString()}원</li>
                        <li>{zone}-{seatID}</li>
                    </ul>
                </div>
                <div className="show-area">
                    <p className={`line-area ${zone === 'A' ? "selected" : ""}`}>A구역</p>
                    <p className={`line-area ${zone === 'B' ? "selected" : ""}`}>B구역</p>
                    <p className={`line-area ${zone === 'C' ? "selected" : ""}`}>C구역</p>
                    <p className={`line-area ${zone === 'D' ? "selected" : ""}`}>D구역</p>
                </div>
                <div className="warn-payment">
                    <IoIosWarning />
                    <p>예약 시간 이후 출차 시 추가 요금은 현장 결제해야 해요</p>
                </div>
            </div>
            <div className="btn-reser-home">
                <button className="reser-b" onClick={handleReservation}>내 예약 내역</button>
                <button className="tohome-b" onClick={handleHome}>홈화면으로</button>
            </div>
        </div>
    );
};

export default CompleteReservation;