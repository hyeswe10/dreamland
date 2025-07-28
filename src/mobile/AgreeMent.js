import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";


const AgreeMent = () => {
    const navigate = useNavigate();
    const agreeArray = [
        {id:1, title: "[필수] 14세 이상입니다.",desc:(<>
        본 서비스는 만 14세 이상 사용자만 이용하실 수 있습니다. <br/>만 14세 미만 아동의 경우, 개인정보 보호법에 따라 가입이 제한됩니다. <br/>가입 전 본인의 연령을 정확히 확인해 주세요.
        </>)},
        {id:2, title: "[필수] 이용 약관 동의",desc:(
            <>
            서비스 이용과 관련된 전반적인 권리와 의무에 대한 내용을 담고 있습니다. <br/>회원 가입, 서비스 제공, 이용 제한 등 기본적인 운영 정책이 포함되어 있습니다.<br/>약관을 충분히 숙지하신 후 동의해 주세요.
            </>
        )},
        {id:3, title: "[필수] 개인정보 수집 및 이용 동의",desc:(
            <>
            서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.<br/>수집 항목에는 이름, 연락처, 차량번호 등이 포함되며, 목적 외 사용은 하지 않습니다.<br/>관련 법령에 따라 안전하게 보관 및 처리됩니다.
            </>
        )},
        {id:4, title: "[선택] 할인 및 이벤트 소식 알림 동의",desc:(
            <>
            이벤트, 혜택, 신규 서비스 안내 등 마케팅 정보를 제공받을 수 있습니다.<br/>동의하지 않아도 서비스 이용에는 제한이 없습니다.<br/>언제든지 수신 동의를 철회하실 수 있습니다.
            </>
        )}
    ]
    //체크된 항목들의 배열
    const [checked,setChecked] = useState([false,false,false,false]);

    //설명이 열려있는 항목
    const [opened,setOpened] = useState(null);

    //동의가 완료되지않음 state관리
    const [agreeNeed,setagreeNeed] = useState(false);

    //체크가 반드시 되어야하는 필수 항목
    const allRequiredCheck = checked[0] && checked[1] && checked[2]; //1~3번까지

    //전체선택
    const handlecheckAll = (e)=>{
        const isChecked = e.target.checked;
        setChecked(checked.map(()=>{
            return isChecked;
        }))
    }
    const handleCheck = (idx)=>{
        //체크된 항목들
        const newChecked = [...checked]
        //배열로 만들었기 때문이 눌리는것마다 값이 바뀌게 처리
        //예) 1번이 체크되면 [true,false,false,false]
        newChecked[idx] = !newChecked[idx]; //안되면 되게 되면 안되게
        setChecked(newChecked);
    }
    const handleOpenClose = (id)=>{
        //열려있으면 닫고 닫혀있으면 열기 (토글처리)
        setOpened((prev)=>prev === id ? null : id);
    }
    const handleNextBtn = ()=>{
        if(allRequiredCheck){
            navigate("/signup");
        }
        if(!allRequiredCheck){
            setagreeNeed(true);
        }
    }
    
    return (
        <div id="agree-ment">
            <h2>이용 약관에 동의해 주세요</h2>
            <div className="list-all">
                {
                agreeArray.map((item,idx)=>{
                    return (
                        <div key={item.id}  className="list-allwrap">
                            <div className={`agree-list ${checked[idx] ? "isClicked" : ""}`}>
                                <div className="agree">
                                    <input type="checkbox"
                                    id={item.id}
                                    value={checked[idx]}
                                    checked={checked[idx]}
                                    onChange={()=>{handleCheck(idx)}}
                                    />
                                    <label htmlFor={item.id}>{item.title}</label>
                                </div>
                                <button onClick={()=>{handleOpenClose(item.id)}}>{opened === item.id ? <IoIosArrowUp className="arrow-icon" /> : <IoIosArrowDown className="arrow-icon" />}</button>
                            </div>
                            {
                                (opened === item.id) &&
                                <p className="agree-desc">  {item.desc}</p>
                            }
                        </div>
                    )
                })
            }
            </div>
            <div className={allRequiredCheck ? "all-check isChecked" : "all-check"}>
                <input 
                    type="checkbox"
                    id="checkall"
                    onChange={handlecheckAll}
                />
                <label htmlFor="checkall">전체 동의합니다</label>
            </div>
            {
                agreeNeed && (
                    <div className="agree-popup">
                        <div className="center-pop">
                            <PiWarningCircleFill className="warning-sign"/>
                            <h3>필수 약관에 동의해 주세요</h3>
                            <p>동의하지 않으면 가입이 어렵습니다</p>
                            <button onClick={()=>{setagreeNeed(false)}}>확인</button>
                        </div>
                    </div>
                )
            }
            <button
            className="agree-to-next" onClick={handleNextBtn}>다음</button>
        </div>
    );
};

export default AgreeMent;