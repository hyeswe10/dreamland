import { useNavigate, useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { HiTicket, HiInformationCircle } from "react-icons/hi";

const BottomNavBarMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav id="bottom-navbar">
      <div className="navbar-container">
        <div
          className={`icon ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <TiHome />
        </div>
        <div
          className={`icon ${isActive('/reservation/schedule') ? 'active' : ''}`}
          onClick={() => navigate('/reservation/schedule')}
        >
          <FaCar />
        </div>
        <div
          className={`icon ${isActive('/ticket') ? 'active' : ''}`}
          onClick={() => navigate('/ticket')}
        >
          <HiTicket />
        </div>
        <div
          className={`icon ${isActive('/info') ? 'active' : ''}`}
          onClick={() => navigate('/info')}
        >
          <HiInformationCircle />
        </div>
      </div>
    </nav>
  );
};

export default BottomNavBarMobile;
