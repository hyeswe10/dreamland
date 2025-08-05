import { useEffect, useState } from "react";
import { findPassword } from "../../utils/ParkingAPI";
import { useNavigate } from "react-router-dom";
import { PiWarningCircleFill } from "react-icons/pi";

const ResetPw = ({ID}) => {
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [rePass,setRePass] = useState('');
    const [showPass,setShowPass] = useState(false);
    const [passColor,setPassColor] = useState('');
    const [correct,setCorrect] = useState(null);
    const [shortPass,setShortPass] = useState(false);
    const [lessInfo,setLessInfo] = useState(false);
    const changePass = async ()=>{
        const { error } = await findPassword(ID,password);
        if(!error){
            navigate("/findpw/changedpw");
        }
        if(error){
            alert("비밀번호가 변경되지않았습니다")
        }
    }
    const handleChangePw = (e)=>{
        e.preventDefault();
        if(password && rePass){
            if(password.length >= 8 && rePass.length >= 8){
                if(password === rePass){
                    changePass();
                }
            } else {
                setShortPass(true);
            }
        } else {
            setLessInfo(true);
        }
    }
    useEffect(()=>{
        if(password.length >= 8 && rePass.length >= 8){
            setShowPass(true);
            if(password === rePass){
                setCorrect(true);
                setPassColor("is-correct");
            } else {
                setCorrect(false);
                setPassColor("is-incorrect");
            }
        } else {
            setShowPass(false);
        }
    },[password,rePass])
    return (
        <div id="reset-pw">
            <div className="reset-pw-wrap">
                <form>
                <h2>변경할 비밀번호를 입력해 주세요</h2>
                    <div className="re-set-pass">
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
                    <div className="re-set-repass">
                        <div className="label-correct">
                            <label>비밀번호 재확인</label>
                        {
                            showPass && <p className={`reset-pass ${passColor}`}>{correct ? "비밀번호가 일치해요!" : "비밀번호가 일치하지 않습니다"}</p>
                        }
                        </div>
                        <input 
                            type="password"
                            value={rePass}
                            onChange={(e)=>{
                                e.preventDefault();
                                setRePass(e.target.value)}}
                            placeholder="비밀번호를 한 번 더 입력해 주세요"
                        />
                    </div>
                </form>
                    <button onClick={handleChangePw}>다음</button>
                {
                    shortPass && (
                        <div className="popup-wrap">
                            <div className="popup">
                                <div className="popup-top">
                                <PiWarningCircleFill className="warning-sign" />
                                <p className="popup-ment1">비밀번호가 너무 짧습니다</p>
                                <p className="popup-ment2">비밀번호를 8자 이상 입력해 주세요</p>
                                </div>
                                <button onClick={()=>{setShortPass(false)}}>확인</button>
                            </div>
                        </div>
                    )
                }
                {
                    lessInfo && (
                        <div className="popup-wrap">
                            <div className="popup">
                                <div className="popup-top">
                                <PiWarningCircleFill className="warning-sign" />
                                <p className="popup-ment1">입력되지 않은 항목이 있습니다</p>
                                <p className="popup-ment2">모든 항목을 입력해 주세요</p>
                                </div>
                                <button onClick={()=>{setLessInfo(false)}}>확인</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ResetPw;