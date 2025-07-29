import { useState } from 'react';
import { fetchLogin } from '../utils/ParkingAPI';
import { saveUserInfo } from '../utils/LocalStorage';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userID,setUserID] = useState('');
    const [userPw,setUserPw] = useState('');
    //로그인 
    const handleLogin = async (e)=>{
        e.preventDefault();
        const {data,error} = await fetchLogin(userID,userPw);
        if(error){
            alert("회원정보가 없습니다") //나중에 시간여유가 된다면 팝업창 변경 고려
        }
        if(data){ 
            saveUserInfo(data);
            navigate("/")
        }
    }
    return (
        <div id="login-page">
            <div className='login-logo'>
                <img className='logo' src={`${process.env.PUBLIC_URL}/images/dreamland_logo1.png`}/>
            </div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={userID}
                    onChange={(e)=>{setUserID(e.target.value)}}
                    placeholder="아이디"
                />
                <input
                    type="password"
                    value={userPw}
                    onChange={(e)=>{setUserPw(e.target.value)}}
                    placeholder="비밀번호"
                />
                <div className="auto-find">
                    <div className="auto">
                        <input type="checkbox" id="auto-login"/>
                        <label htmlFor="auto-login">자동로그인</label>
                    </div>
                    <div className="find">
                        <Link to="/findid">아이디찾기</Link>
<<<<<<< HEAD
                        <Link to="/findpw">비밀번호변경</Link>
=======
                        <Link to="/findpw">비밀번호찾기/변경</Link>
>>>>>>> master
                    </div>
                </div>
                <button className='login-btn' type="submit">로그인</button>
            </form>
            <button className='signup-btn' onClick={()=>{navigate("/agreement")}}>회원가입</button>
            <p>드림랜드와 함께 편리한 주차를 경험하세요!</p>
        </div>
    );
};

export default Login;