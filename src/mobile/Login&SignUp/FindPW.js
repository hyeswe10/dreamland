import { useState } from "react";
import { findInfo } from "../../utils/ParkingAPI";
import { PiWarningCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const FindPW = ({setID}) => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [userID,setUserID] = useState('');
    const [phone,setPhone] = useState('');
    const [showPopID,setShowPopID] = useState(false);
    const [showPopEmpty,setShowPopEmpty] = useState(false);
    const matchInfo = async ()=>{
        const { data, error } = await findInfo(name,phone,userID);
        if(data){
            setID(data.id);
            navigate("/findpw/resetpw");
        }
        if(error){
            setShowPopID(true);
        }
    } 
    const handleFindPw = (e)=>{
        e.preventDefault();
        if(name && userID && phone){
            matchInfo();
        } else {
            setShowPopEmpty(true);
        }
    }
    return (
        <div id="find-pw">
            <div className="find-pw-wrap">
                <form>
                <h2>비밀번호를 재설정하기 위해<br/>개인정보가 필요해요</h2>
                    <div className="pass-name">
                        <label>이름</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setName(e.target.value)}}
                                placeholder="이름을 입력해 주세요"
                            />
                        </div>
                        <div className="pass-id">
                            <label>아이디</label>
                            <input 
                                type="text"
                                value={userID}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setUserID(e.target.value)}}
                                placeholder="아이디를 입력해 주세요"
                            />
                        </div>
                        <div className="pass-phone">
                            <label>휴대폰 번호</label>
                            <input 
                                type="text"
                                value={phone}
                                onChange={(e)=>{
                                    e.preventDefault();
                                    setPhone(e.target.value)}}
                                placeholder="휴대폰 번호를 입력해 주세요"
                            />
                        </div>
                    </form>
                    <button onClick={handleFindPw}>다음</button>
                    {
                    showPopEmpty && (
                            <div className="popup-wrap">
                                <div className="popup">
                                    <div className="popup-top">
                                    <PiWarningCircleFill className="warning-sign" />
                                    <p className="popup-ment1">정보가 입력되지 않았습니다</p>
                                    <p className="popup-ment2">정보를 전부 입력해 주세요</p>
                                    </div>
                                    <button onClick={()=>{setShowPopEmpty(false)}}>확인</button>
                                </div>
                            </div>
                    )
                }
                    {
                    showPopID && (
                            <div className="popup-wrap">
                                <div className="popup">
                                    <div className="popup-top">
                                    <PiWarningCircleFill className="warning-sign" />
                                    <p className="popup-ment1">정보가 존재하지 않습니다</p>
                                    <p className="popup-ment2">이용하시려면 회원가입을 해주세요</p>
                                    </div>
                                    <button onClick={()=>{setShowPopID(false)}}>확인</button>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default FindPW;