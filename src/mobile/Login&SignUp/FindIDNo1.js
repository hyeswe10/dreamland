import { useNavigate } from "react-router-dom";


const FindIDNo1 = ({userID}) => {
    const navigate = useNavigate();
    return (
        <div id="find-id-no1">
            <div className="found-id-wrap">
                <h2>입력하신 정보와<br/>일치하는 아이디를 찾았어요!</h2>
                <div className="found-id">
                    <label>일치하는 아이디</label>
                    <p>{userID}</p>
                </div>
            </div>
            <button onClick={()=>{navigate("/login")}}>확인</button>
        </div>
    );
};

export default FindIDNo1;