import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../utils/ParkingAPI";

const ProfileEdit = ({uuid}) => {
  const user = getUserInfo();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordChecked, setPasswordChecked] = useState(false);
  const [phone, setPhone] = useState(user.phone);
  const [carNum, setCarNum] = useState(user.car);

  useEffect(() => {
    setPasswordChecked(password !== '' && password === passwordCheck);
  }, [password, passwordCheck]);


  const handleupdateUser = async ( e ) => {
    e.preventDefault(); // 폼 제출 방지

    if (!passwordChecked) {
      alert("비밀번호가 일치하지 않아요!");
      return;
    }
    const { error } = await changePassword({
      id: uuid,
      newPass: password,
      newName: name,
      newCar: carNum,
      newPhone: phone
    });
    if( error ){
      alert("정보 변경 실패! 입력한 정보를 다시 확인해 주세요");
      return;
    }
    
    // localstorage에 변경된 정보 업데이트
    const updatedUser = {
      ...user,
      password: password,
      name: name,
      car: carNum,
      phone: phone,
    };
    localStorage.setItem("park_user", JSON.stringify(updatedUser));
    navigate("/mypage/profile-complete");
  }


  return (
    <div id="profile-edit">
        <form className="input-wrap">
          <h2>변경할 정보를 입력해 주세요</h2>
          <div className="input-box">
            <div className="input-title">
              <p>이름</p>
            </div>
            <input 
              value={name}
              type="text" 
              placeholder="이름을 입력해 주세요" 
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="input-box">
            <div className="input-title">
              <p>비밀번호</p>
            </div>
            <input
              value={password}
              type="password"
              placeholder="비밀번호를 입력해 주세요 (영문+숫자 조합 8자리 이상)"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="input-box">
            <div className="input-title">
              <p>비밀번호 재확인</p>
              { passwordChecked && <p className="success-ment">비밀번호가 일치해요!</p> }
              
            </div>
            <input
              value={passwordCheck}
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={(e)=>{setPasswordCheck(e.target.value)}}
            />
          </div>
          <div className="input-box">
            <div className="input-title">
              <p>휴대폰 번호</p>
            </div>
            <input 
              value={phone}
              type="text" 
              placeholder="휴대폰 번호를 입력해 주세요" 
              onChange={(e)=>{setPhone(e.target.value)}}
            />
          </div>
          <div className="input-box">
            <div className="input-title">
              <p>차량 번호</p>
            </div>
            <input
              value={carNum}
              type="text"
              placeholder="차량 번호를 입력해 주세요 ex)111가 1234"
              onChange={(e)=>{setCarNum(e.target.value)}}
            />
          </div>
        </form>
        <button onClick={handleupdateUser}>변경 완료</button>
    </div>
  );
};

export default ProfileEdit;
