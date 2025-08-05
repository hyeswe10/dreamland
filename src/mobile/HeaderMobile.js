import { useNavigate } from "react-router-dom";
import { FaCaretLeft, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/LocalStorage";

const HeaderMobile = ({ pageName }) => {
  const navigate = useNavigate();
  const [userIcon,setUserIcon] = useState(true);

  useEffect(()=>{
    if(!getUserInfo()){
      setUserIcon(false);
    }
  },[])
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);  // 이전 페이지로 이동
    } else {
      navigate('/'); // 히스토리 없으면 홈으로 이동
    }
  };
  
  const handleMypage = ()=>{
    navigate('/mypage')
  }
  return (
    <nav id="top-navbar">
      <div className="navbar-container">
        <FaCaretLeft className="arrow-icon" onClick={handleBack} />
        <p className="page-name">{pageName}</p>
        { userIcon ? <FaUser className="user-icon" onClick={handleMypage}/> : <FaUser className="fake-user"/> }
      </div>
    </nav>
  );
};

export default HeaderMobile;
