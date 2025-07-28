import { useEffect, useState } from "react";
import { fetchAllUserId, fetchSignUp } from "../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [userID,setUserID] = useState('');
    const [password,setPassword] = useState('');
    const [rePass,setRePass] = useState('');
    const [phone,setPhone] = useState('');
    const [car,setCar] = useState('');
    const [correct,setCorrect] = useState(null);
    const [available,setAvailable] = useState(null);
    const [idColor,setIdColor] = useState('');
    const [passColor,setPassColor] = useState('');
    const [showId,setShowId] = useState(false);
    const [showPass,setShowPass] = useState(false);
    const [usersTable,setUsersTable] = useState({});
    console.log(name,userID,password,rePass,phone,car);
    //users 테이블의 모든 user_id정보
    const allUser = async ()=>{
        const { data, error } = await fetchAllUserId();
        if(error){
            console.log("유저정보가 없습니다")
        }
        if(data){
            const idOnly = data.map((item)=>{
                return item.user_id;
            });
            setUsersTable(idOnly);
        }
    }
    //회원가입 API
    const insertSignUp = async ()=>{
        const { success, error } = await fetchSignUp({username:name,userID:userID,password:password,car:car,phone:phone});
        if(error){
            alert("입력이 올바르지 않습니다.")
        }
        if(success){
            navigate("/signupComplete")
        }
    }
    //회원가입 등록
    const handleSignUp = (e)=>{
        e.preventDefault();
        if(name && userID && password && rePass && phone && car){
            if(password === rePass){
                insertSignUp();
                
            } else {
                alert("비밀번호를 재확인 해주세요")
            }
        } else {
            alert("모든 항목을 입력해 주세요")
        }
    }
    //아이디 사용가능합니다 문구관련
    useEffect(()=>{
        if(userID.length > 2){ //최소 2글자
            setShowId(true);
            if(usersTable.includes(userID)){
                setAvailable(false);
                setIdColor("is-incorrect");
            } else {
                setAvailable(true);
                setIdColor("is-correct");
            }
        } else {
            setShowId(false);
        }
    },[userID])
    //비밀번호 일치합니다 문구관련
    useEffect(()=>{
        if(rePass && password){
            setShowPass(true);
            if(rePass === password){
                setCorrect(true);
                setPassColor("is-correct");
            } else{
                setCorrect(false);
                setPassColor("is-incorrect");
            }
        } else {
            setShowPass(false);
        }
    },[rePass,password])
    //모든 유저아이디 불러오기
    useEffect(()=>{
        allUser();
    },[])
    return (
        <div id="sign-up">
            <h2>정보를 입력해 주세요</h2>
            <form onSubmit={handleSignUp}>
                <div className="sign-input-wrap">
                    <div className="setting-name">
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
                    <div className="setting-id">
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
                    <div className="setting-pass">
                        <label>비밀번호</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e)=>{
                                e.preventDefault();
                                setPassword(e.target.value)}}
                            placeholder="비밀번호를 입력해 주세요 (영문+숫자 조합 8자리 이상)"
                        />
                    </div>
                    <div className="setting-repass">
                        <label>비밀번호 재확인</label>
                        <input 
                            type="password"
                            value={rePass}
                            onChange={(e)=>{
                                e.preventDefault();
                                setRePass(e.target.value)}}
                            placeholder="비밀번호를 한 번 더 입력해 주세요"
                        />
                    </div>
                    <div className="setting-phone">
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
                    <div className="setting-car">
                        <label>차량 번호</label>
                        <input 
                            type="text"
                            value={car}
                            onChange={(e)=>{
                                e.preventDefault();
                                setCar(e.target.value)}}
                            placeholder="차량 번호를 입력해 주세요 ex)111가 1234"
                        />
                    </div>
                </div>
                <button type="submit">회원가입</button>
            </form>
            {
                showId && <p className={`pos-id ${idColor}`}>{ available ? "사용 가능한 아이디예요!" : "이미 있는 아이디입니다"}</p>
            }
            {
                showPass && <p className={`pos-pass ${passColor}`}>{correct ? "비밀번호가 일치해요!" : "비밀번호가 일치하지 않습니다"}</p>
            }
        </div>
    );
};

export default SignUp;