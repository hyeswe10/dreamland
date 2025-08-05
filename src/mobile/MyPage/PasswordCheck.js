import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/LocalStorage";
import { PiWarningCircleFill } from "react-icons/pi";
import { useState } from "react";

const PasswordCheck = ({setUuid}) => {
  const navigate = useNavigate();
  const user = getUserInfo();
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordCheck = () => {
    if (password === user.password) {
      setUuid(user.id);
      navigate("/mypage/profile-edit");
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div id="password-check">
      <div className="check-content">
        <h2>
          개인정보 변경을 위해 <br />
          비밀번호 재확인이 필요해요
        </h2>
        <input
          value={password}
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePasswordCheck();
            }
          }}
        />
      </div>
      <button onClick={handlePasswordCheck}>다음</button>
      {showPopup && (
        <div className="popup-wrap">
          <div className="popup">
            <div className="popup-top">
              <PiWarningCircleFill className="warning-sign" />
              <p className="popup-ment1">비밀번호가 일치하지 않습니다</p>
              <p className="popup-ment2">비밀번호를 다시 입력해 주세요</p>
            </div>
            <button onClick={()=>{setShowPopup(false)}}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordCheck;
