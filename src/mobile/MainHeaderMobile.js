import { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../utils/LocalStorage";

const MainHeaderMobile = () => {
  const navigate = useNavigate();
  const [loginCheck,setLoginCheck] = useState(null);
  useEffect(()=>{
    setLoginCheck(getUserInfo());
  },[])
  console.log(loginCheck);
  return (
    <nav id="top-main-navbar">
      <div className="navbar-container">
        <img
          onClick={() => navigate('/')}
          className="logo"
          src={`${process.env.PUBLIC_URL}/images/dreamland_logo1.png`}
        />

        <div className="user-info" onClick={() => navigate(loginCheck ? "/mypage" : "/login")}>
          {
            loginCheck ? 
            <>
            <p>{loginCheck.name}<span>님</span></p>
            <div className="user-icon">
            <FaUserLarge />
            </div>
            </> : <p>로그인</p>
          }
        </div>
      </div>
    </nav>
  );
};

export default MainHeaderMobile;
