
import { useNavigate } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";


const HeaderMobile = () => {
  const navigate = useNavigate();
  return (
    <nav id="top-navbar">
      <div className="navbar-container">
        <FaCaretLeft
        className="arrow-icon"  
        onClick={()=>{navigate('/')}}/>  
        <p className="page-name">예약하기</p>
        {/* user-icon 클릭시 마이페이지로 이동 설정하기 */}
        <FaUser
        className="user-icon"
         />
      </div>
      <div className="header-bar-line"/> 
    </nav>
  );
};

export default HeaderMobile;