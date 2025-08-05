import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SignUpComplete = () => {
    const navigate = useNavigate();
    return (
            <div className="signup-complete complete">
            <div className="complete-contents">
                <FaCircleCheck />
                <h2>회원가입이 완료되었어요</h2>
            </div>
            <div className="complete-btn">
                <p>지금 로그인하고 주차 예약을 시작해 보세요!</p>
                <button className="btn-1" onClick={()=>{navigate("/")}}>홈화면으로</button>
                <button className="btn-2" onClick={()=>{navigate("/login")}}>로그인 페이지</button>
            </div>
            </div>
    );
};

export default SignUpComplete;