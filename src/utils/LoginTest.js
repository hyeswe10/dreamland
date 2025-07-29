import { useState } from "react";
import { deleteUserInfo, saveUserInfo } from "../utils/LocalStorage";
import { fetchLogin } from "../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";


// 인풋에 아이디, 비밀번호 입력하시고 엔터치고 localStorage 한번 확인해보세요!
const LoginTest = () => {
    const [userID,setUserID] = useState('');
    const [userPw,setUserPw] = useState('');
    const navigate = useNavigate('');
    //로그인 
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {data,error} = await fetchLogin(userID,userPw);
        if(error){
            alert("로그인정보가 없습니다")
        }
        if(data){
            saveUserInfo(data);
            console.log("로그인성공")
        }
    }
    //로그아웃
    const testDelete =()=>{
        deleteUserInfo();
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="id-input">
                    <label>아이디</label>
                    <input 
                        type="text"
                        value={userID}
                        onChange={(e)=>{setUserID(e.target.value)}}
                    />
                </div>
                <div className="pass-input">
                    <label>비밀번호</label>
                    <input 
                        type="password"
                        value={userPw}
                        onChange={(e)=>{setUserPw(e.target.value)}}
                    />
                </div>
                <button type="submit"
                onClick={()=>{navigate('/reservesTime')}}>확인</button>
                
            </form>
            <button onClick={testDelete}>삭제하기</button>
        </div>
    );
};

export default LoginTest;