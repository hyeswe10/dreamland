import { useState } from "react";
import { getUserInfo } from "../../utils/LocalStorage";
import { yearlyPass } from "../../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();
  const [memNum, setMemNum] = useState('');
  const user = getUserInfo();

  const handelMembership = async () => {
    const { error } = await yearlyPass(user.id);
    if( error ){
      
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
    </div>
  );
};

export default Membership;