import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileComplete = () => {
  const navigate = useNavigate();
  
  return (
    <div className="cancel complete">
      <div className="complete-contents">
        <FaCircleCheck />
        <h2>개인정보가 변경되었어요</h2>
      </div>
      <div className="complete-btn">
        <button className="btn-2" onClick={()=>{navigate("/")}}>홈화면으로</button>
      </div>
    </div>
  );
};

export default ProfileComplete;