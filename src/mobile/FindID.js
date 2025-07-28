import { useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { findUserId } from "../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";

const FindID = ({setUserID}) => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [showPopID,setShowPopID] = useState(false);
    const [showPopEmpty,setShowPopEmpty] = useState(false);
    const fetchUserID = async ()=>{
        const { data, error } = await findUserId(name,phone);
        if(data){
            setUserID(data.user_id);
            navigate("/findidno1");
        }
        if(error){
            setShowPopID(true);
        }
    }
    const handleFind = (e)=>{
        e.preventDefault();
        if(name && phone){
            fetchUserID();
        } else{
            setShowPopEmpty(true);
        }
    }
    return (
        <div id="find-id">
            <h2>아이디를 찾기 위해<br/>개인정보가 필요해요</h2>
            <form onSubmit={handleFind} className="find-id-input">
                <div className="finding-name">
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
                <div className="finding-phone">
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
                <button type="submit">다음</button>
            </form>
            {
                showPopID && (
                    <div className="noid-popup">
                        <div className="id-pop">
                            <PiWarningCircleFill className="warning-sign"/>
                            <h3>정보가 존재하지 않습니다</h3>
                            <p>이용하시려면 회원가입을 해주세요</p>
                            <button onClick={()=>{setShowPopID(false)}}>확인</button>
                        </div>
                    </div>
                )
            }
            {
                showPopEmpty && (
                    <div className="empty-popup">
                        <div className="empty-pop">
                            <PiWarningCircleFill className="warning-sign"/>
                            <h3>정보가 입력되지 않았습니다</h3>
                            <p>정보를 전부 입력해 주세요</p>
                            <button onClick={()=>{setShowPopEmpty(false)}}>확인</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default FindID;