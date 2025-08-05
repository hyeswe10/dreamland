import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelReserve } from "../../utils/ParkingAPI";

const Cancel = () => {
  const navigate = useNavigate();

  // localStorage에 저장된 예약 정보, 결제 정보를 가져옴
  const stored = localStorage.getItem("cancelData");
  const SelectCancel = stored ? JSON.parse(stored) : null;
  const amount = localStorage.getItem("cancelAmount");
  const SelectAmount = amount ? JSON.parse(amount) : null;

  // 예약 정보의 요일을 수요일 -> (수) 형식으로 바꾸기
  const selected_date = SelectCancel.selected_date;
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(selected_date);
  const day = dayNames[dateObj.getDay()];
  const result = `(${day})`;

  // 동의사항 3개 상태 관리
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cancelPolicy: false,
  });
  // 전체 동의 체크 상태
  const allChecked = Object.values(agreements).every(Boolean);
  // 동의 버튼 개별 클릭 시 토글
  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  // 전체 동의 버튼 누르면 동의 버튼 전부 클릭
  const handleAllCheck = () => {
    const newValue = !allChecked;
    setAgreements({
      terms: newValue,
      privacy: newValue,
      cancelPolicy: newValue,
    });
  };

  // 예약 취소
  const handleCancel = async (reserveID, parkareaZone, parkareaNum) => {
    const {error} = await cancelReserve(reserveID, parkareaZone, parkareaNum);
    if( error ){
      console.log( "취소 중 에러 :", error )
      alert("예약 취소 오류")
      return;
    }
    // localstorage에 저장된 취소 
    localStorage.removeItem("cancelData");
    localStorage.removeItem("cancelAmount");
    navigate("/mypage/cancel-complete")
  }

  return (
    <div id="cancel">
      <div className="cancel-top">
        <div className="cancel-reserve">
          <div className="reserve-left">
            <h1>{SelectCancel.parkarea.zone}-{SelectCancel.parkarea.num}</h1>
            <p>● 예약 중</p>
          </div>
          <div className="reserve-right">
            <h2>
              {new Date(SelectCancel.selected_date).toLocaleString("ko-KR", {
                month: "long",
                day: "numeric",
              })}{" "}
              {result} &nbsp;
              {SelectCancel.start_time.slice(0, 5)}~
              {SelectCancel.end_time.slice(0, 5)}
            </h2>
            <h3>{SelectAmount.toLocaleString()}원</h3>
          </div>

        </div>
        <div className="cancel-confirm">
          <h2>
            예약을 취소하려면
            <br />
            약관 동의가 필요해요
          </h2>
          <div className="agree-wrap">
            <label className={`agree-label ${agreements.terms ? "checked" : ""}`}>
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={() => handleAgreementChange("terms")}
              />
              <span>[필수] 이용 약관 동의</span>
            </label>

            <label className={`agree-label ${agreements.privacy ? "checked" : ""}`}>
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleAgreementChange("privacy")}
              />
              <span>[필수] 개인정보 수집 및 이용 동의</span>
            </label>

            <label className={`agree-label ${agreements.cancelPolicy ? "checked" : ""}`}>
              <input
                type="checkbox"
                checked={agreements.cancelPolicy}
                onChange={() => handleAgreementChange("cancelPolicy")}
              />
              <span>[필수] 예약 취소 약관</span>
            </label>
          </div>
          <p>
            예약을 취소하시면 주차 공간은 다른 고객에게 배정되며, <br />
            이후 복구나 재예약은 어려울 수 있습니다. <br />
            <br />위 내용을 확인하고 동의하시겠습니까?
          </p>
        </div>
      </div>
        <div className="btn-wrap">
          <label className={`agree-label ${allChecked ? "checked" : ""}`}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheck}
            />
            <span>전체 동의합니다</span>
          </label>

          <button 
            disabled={!allChecked}
            onClick={()=>{handleCancel(SelectCancel.id, SelectCancel.parkarea.zone, SelectCancel.parkarea.num)}}
          >취소하기</button>
        </div>
    </div>
  );
};

export default Cancel;
