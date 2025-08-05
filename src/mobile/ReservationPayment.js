import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/LocalStorage";
import {
  fetchParkID,
  fetchReserveID,
  fetchYearlyPass,
  payReserve,
  registerReservation,
  reservedAreaUpdate,
} from "../utils/ParkingAPI";
import {
  FaCreditCard,
  FaDotCircle,
  FaRegCircle,
} from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { WiStars } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { LuListCheck } from "react-icons/lu";

const ReservationPayment = () => {
  const navigate = useNavigate();
  const [loginID, setLoginID] = useState("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [yearlyPass, setYearlyPass] = useState(false);
  const [date, setDate] = useState(null);
  const [selected, setSelected] = useState("card");
  const [zone, setZone] = useState(null);
  const [num, setNum] = useState(null);
  const [parkID, setParkID] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [saveDate, setSaveDate] = useState(null);

  //시작하자마자 불러올 값들 : localStorageid, 금액, 날짜, 구역, 시작시간, 종료시간, 좌석번호
  useEffect(() => {
    const id = getUserInfo().id;
    setLoginID(id);
    const total = localStorage.getItem("total");
    const oriDate = new Date(localStorage.getItem("selectedDate"));
    const krDate = new Date(
      localStorage.getItem("selectedDate")
    ).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    const zone = localStorage.getItem("selectedZone");
    const fetchSt = localStorage.getItem("start_time");
    const startTime = JSON.parse(fetchSt);
    const fetchEt = localStorage.getItem("end_time");
    const endTime = JSON.parse(fetchEt);
    const seatID = localStorage.getItem("selectedSeatID");
    if (total) {
      setAmount(total);
    }
    if (krDate) {
      setDate(krDate);
    }
    if (zone) {
      setZone(zone);
      setStartTime(startTime);
      setEndTime(endTime);
      setNum(seatID);
      setSaveDate(oriDate);
    }
  }, []);

  //연간회원권 보유여부
  useEffect(() => {
    if (!loginID) return; //id값이 없을때 진행X
    const fetchYearInfo = async () => {
      const { data, error } = await fetchYearlyPass(loginID);
      if (data) {
        setYearlyPass(data[0].yearly_pass);
      }
      if (error) {
        console.log("못찾아왔습니다");
      }
    };
    fetchYearInfo();
  }, [loginID]);

  //reservations 테이블정보를 위한 parkarea_id가져오기
  useEffect(() => {
    if (!zone && !num) return;
    const fetchID = async () => {
      const { data, error } = await fetchParkID(zone, num);
      if (data) {
        setParkID(data[0].id);
        localStorage.setItem("parkID", data[0].id);
      }
      if (error) {
        console.log("id없음");
      }
    };
    fetchID();
  }, [zone, num]);

  //클릭된 결제방법 저장하기
  const handleSelect = (way) => {
    setSelected(way);
  };

  //연간회원권 할인
  useEffect(() => {
    if (!amount && !yearlyPass) return; //둘다 값이 없을때 진행X
    const finalAmount = yearlyPass ? Number(amount) * 0.8 : Number(amount);
    setTotal(finalAmount);
  }, [amount, yearlyPass]);

  // 모든 정보 reservation 테이블로 올리기
  const saveReservation = async () => {
    const { error } = await registerReservation({
      userID: loginID,
      parkareaID: parkID,
      selectDate: saveDate,
      startTime: startTime,
      endTime: endTime,
    });
    if (!error) {
      saveFinalPayments();
    }
    if (error) {
      console.log("완료되지않았습니다");
    }
  };

  // 결제 테이블 등록하기
  const saveFinalPayments = async () => {
    const { data, error } = await payReserve(loginID, parkID, total);
    if (!error) {
      reserveSeat();
    }
    if (error) {
      console.log("저장실패");
    }
  };

  //차량구역 예약완료 표시
  const reserveSeat = async () => {
    const { error } = await reservedAreaUpdate(parkID);
    if (!error) {
      navigate("/MobileReservation/complete");
    }
    if (error) {
      console.log("완료실패");
    }
  };
  //최종금액 옮겨주기
  const handlePayment = () => {
    const saved = JSON.stringify(total);
    localStorage.setItem("final_amount", saved);
    saveReservation();
  };
  return (
    <div id="reservation-payment">
      <div className="payment-top-wrap">
        <div className="top-wrapper">
          <div className="top1">
            <LuListCheck className="calendar-icon" />
            <p>{date} {zone}-{num} {startTime}-{endTime}</p>
          </div>
          <div className="top2">
            <FaCreditCard className="map-icon" />
            <h2>결제 수단 선택</h2>
          </div>
        </div>
        <div className="payment-way">
          <div className="how-to-pay">
            <div
              className={`credit-check ${
                selected === "card" ? "selected" : ""
              }`}
              onClick={() => {
                handleSelect("card");
              }}
            >
              {selected === "card" ? (
                <FaDotCircle className="color-i" />
              ) : (
                <FaRegCircle className="color-i" />
              )}
              <FaCreditCard className="credit-i" />
              <p>신용/체크 카드</p>
            </div>
            <div
              className={`kakao-pay ${selected === "kakao" ? "selected" : ""}`}
              onClick={() => {
                handleSelect("kakao");
              }}
            >
              {selected === "kakao" ? (
                <FaDotCircle className="color-i" />
              ) : (
                <FaRegCircle className="color-i" />
              )}
              <RiKakaoTalkFill className="kakao-i" />
              <p>카카오페이</p>
            </div>
            <div
              className={`toss-pay ${selected === "toss" ? "selected" : ""}`}
              onClick={() => {
                handleSelect("toss");
              }}
            >
              {selected === "toss" ? (
                <FaDotCircle className="color-i" />
              ) : (
                <FaRegCircle className="color-i" />
              )}
              <p>토스페이</p>
            </div>
          </div>
        </div>

        <ul className="reserve-aware">
          <li>
            <p>예약 시 주의사항</p>
            <IoIosArrowForward />
          </li>
          <li>
            <p>서비스 이용약관</p>
            <IoIosArrowForward />
          </li>
        </ul>
        <p className="agree-check">위 내용을 확인했으며 결제에 동의합니다</p>
      </div>

      <div className="payment-bottom-wrap">
        <div className="amount-wrap">
          {yearlyPass && (
            <div className="year-true">
              <WiStars />
              <p>
                회원님은 연간회원권으로 <span>20%</span> 할인되었어요!
              </p>
              <WiStars />
            </div>
          )}
          {!yearlyPass && (
            // 빈칸용
            <div className="year-false"></div>
          )}
          <div className="total-amount">
            <p>총 결제 금액</p>
            <h2>{total.toLocaleString()}원</h2>
          </div>
        </div>
        <div className="btn-wrap">
          <button className="amount-pay" onClick={handlePayment}>
            {total.toLocaleString()}원 결제하기
          </button>
      </div>
      </div>
    </div>
  );
};

export default ReservationPayment;
