import { useState } from "react";
import { getUserInfo } from "../../utils/LocalStorage";
import { yearlyPass } from "../../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";

const Membership = () => {
  const navigate = useNavigate();
  const [memNum, setMemNum] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const user = getUserInfo();

  const handelMembership = async () => {
    if( memNum === "" ){
      setShowPopup(true)
      return;
    }
    const { error } = await yearlyPass(user.id);
    if( error ){
      setShowPopup(true);
    }
    const updatedUser = {
      ...user,
      yearly_pass: true
    };
    localStorage.setItem("park_user", JSON.stringify(updatedUser));

    navigate("/mypage/membership-complete")
  }

  return (
    <div id="password-check">
      <div className="check-content">
        <h2>연간회원권 <br/>
            회원 번호를 입력해 주세요</h2>
        <input 
          value={memNum}
          type="text" 
          placeholder="회원 번호를 입력해 주세요  ex) 0000-0000-0000"
          onChange={(e)=>{setMemNum(e.target.value)}}
          onKeyDown={(e)=>{
            if( e.key === "Enter" ){
              handelMembership();
            }
          }}
        />
      </div>
      <button onClick={handelMembership}>다음</button>
            {showPopup && (
              <div className="popup-wrap">
                <div className="popup">
                  <div className="popup-top">
                    <PiWarningCircleFill className="warning-sign" />
                    <p className="popup-ment1">회원 번호를 입력해 주세요</p>
                  </div>
                  <button onClick={()=>{setShowPopup(false)}}>확인</button>
                </div>
              </div>
            )}
    </div>
  );
};

export default Membership;