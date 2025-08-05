import { FaQuestionCircle } from "react-icons/fa";

const InfoHow = () => {
  return (
    <div className="info-how">
      <div className="info-wrap">
        <div className="how-title">
          <FaQuestionCircle />
          <h3>사전 주차 이용 방법</h3>
        </div>
        <ul>
          <li>
            <p>STEP. 01</p>
            <h3>로그인</h3>
          </li>
          <li>
            <p>STEP. 02</p>
            <h3>이용 날짜 선택</h3>
          </li>
          <li>
            <p>STEP. 03</p>
            <h3>주차 구역 및 자리 선택</h3>
          </li>
          <li>
            <p>STEP. 04</p>
            <h3>시간제 or 일일권 선택</h3>
          </li>
          <li>
            <p>STEP. 05</p>
            <h3>이용 금액 사전 결제</h3>
          </li>
          <li className="how-last">
            <p>STEP. 06</p>
            <h3>예약 당일 지정석 이용!</h3>
          </li>
        </ul>
      </div>

      <img src={`${process.env.PUBLIC_URL}/images/info-background.png`} />
    </div>
  );
};

export default InfoHow;
