import { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { getUserInfo } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

const RightNav = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(null);
  useEffect(() => {
    setLoginCheck(getUserInfo());
  }, []);

  return (
    <div className="right-bar">
      <div
        className="user-info"
        onClick={() => navigate(loginCheck ? "/mypage" : "/login")}
      >
        {loginCheck ? (
          <>
            <p>
              {loginCheck.name}
              <span>님</span>
            </p>
            <div className="user-icon">
              <FaUserLarge />
            </div>
          </>
        ) : (
          <p>로그인</p>
        )}
      </div>

      <div className="card-wrap">
        <div
          className="card-top"
          onClick={() => navigate("/mypage/membership")}
        >
          <div className="card-title">
            <p className="title-sub">연간회원권 보유 시</p>
            <div className="title-main">
              <p>20%</p>
              <span>할인!</span>
            </div>
          </div>
          <div className="img-area">
            <img src={`${process.env.PUBLIC_URL}/images/info_coupon.png`} />
          </div>
        </div>

        <div className="card-bottom">
          <div className="qr-title">
            <p>
              QR코드 찍고
              <br />
              앱에서 자세히 보기
            </p>
            <p className="qr-sub">QR코드를 스캔해보세요</p>
          </div>
          <div className="qr-box">
            <img src={`${process.env.PUBLIC_URL}/images/QR.jpg`} alt="QR코드" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNav;
