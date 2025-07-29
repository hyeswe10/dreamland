import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MembershipComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel complete">
      <div className="complete-contents">
        <FaCircleCheck />
        <h2>연간회원권이 등록되었어요</h2>
      </div>
      <div className="complete-btn">
        <button className="btn-1" onClick={()=>{navigate("/")}}>홈화면으로</button>
        <button className="btn-2">주차 예약하기</button>
      </div>
    </div>
  );
};

export default MembershipComplete;