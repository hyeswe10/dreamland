import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ChangedPw = () => {
    const navigate = useNavigate();
    return (
        <div id="changed-pw">
            <div className="complete-change">
                <IoIosCheckmarkCircle className="check-sign"/>
                <h2>비밀번호가 변경되었어요</h2>
            </div>
            <div className="btn-login">
                <button className="log-b" onClick={()=>{navigate("/login")}}>로그인페이지</button>
            </div>
        </div>
    );
};

export default ChangedPw;