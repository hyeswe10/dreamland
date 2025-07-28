import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignUpComplete = () => {
    const navigate = useNavigate();
    return (
        <div id="complete-signup">
            <div className="complete">
                <IoIosCheckmarkCircle className="check-sign"/>
                <h2>회원가입이 완료되었어요</h2>
            </div>
            <p>지금 로그인하고 주차 예약을 시작해 보세요!</p>
            <div className="btn-home-login">
                <button className="home-b" onClick={()=>{navigate("/")}}>홈화면으로</button>
                <button className="log-b" onClick={()=>{navigate("/login")}}>로그인페이지</button>
            </div>
        </div>
    );
};

export default SignUpComplete;