import { useState } from "react";
import { findInfo } from "../utils/ParkingAPI";
import { PiWarningCircleFill } from "react-icons/pi";
<<<<<<< HEAD

const FindPW = ({setID}) => {
=======
import { useNavigate } from "react-router-dom";

const FindPW = ({setID}) => {
    const navigate = useNavigate();
>>>>>>> master
    const [name,setName] = useState('');
    const [userID,setUserID] = useState('');
    const [phone,setPhone] = useState('');
    const [showPopID,setShowPopID] = useState(false);
    const [showPopEmpty,setShowPopEmpty] = useState(false);
    const matchInfo = async ()=>{
        const { data, error } = await findInfo(name,phone,userID);
        if(data){
            setID(data.id);
<<<<<<< HEAD
            console.log(data.id)
=======
            navigate("/findpw/resetpw");
>>>>>>> master
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
<<<<<<< HEAD
    console.log(showPopEmpty,showPopID)
=======
>>>>>>> master
    return (
        <div id="find-pw">
            <h2>비밀번호를 재설정하기 위해<br/>개인정보가 필요해요</h2>
            <form onSubmit={handleFindPw}>
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
                    <button type="submit">다음</button>
                </form>
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
        </div>
    );
};

export default FindPW;