import { useNavigate } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";

const HeaderMobile = ({ pageName }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);  // 이전 페이지로 이동
    } else {
      navigate('/'); // 히스토리 없으면 홈으로 이동
    }
  };

  return (
    <nav id="top-navbar">
      <div className="navbar-container">
        <div className="arrow-icon" onClick={handleBack}>
          <FaCaretLeft />
        </div>
        <p className="page-name">{pageName}</p>
      </div>
    </nav>
  );
};

export default HeaderMobile;
