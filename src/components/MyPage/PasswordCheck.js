import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/LocalStorage";
import { useState } from "react";

const PasswordCheck = () => {
  const navigate = useNavigate();
  const user = getUserInfo();
  const [password, setPassword] = useState('');

  const handlePasswordCheck = () => {
    if( password === user.password ) {
      navigate("/mypage/profile-edit")
    }
    else { alert("비밀번호가 일치하지 않아요!")}
  }

  return (
    <div id="password-check">
      <div className="check-content">
        <h2>개인정보 변경을 위해 <br/>
            비밀번호 재확인이 필요해요</h2>
        <input 
          value={password}
          type="password" 
          placeholder="비밀번호를 입력해 주세요"
          onChange={(e)=>{setPassword(e.target.value)}}
          onKeyDown={(e)=>{
            if( e.key === "Enter" ){
              handlePasswordCheck();
            }
          }}
        />
      </div>
      <button onClick={handlePasswordCheck}>다음</button>
    </div>
  );
};

export default PasswordCheck;