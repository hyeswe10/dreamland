import { RiYoutubeFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-top">
        <p>경기 수원시 팔달구 덕영대로 899 (매산로1가) 웹디물산(주)</p>
        <div className="company-info">
          <p>대표이사 : 아무개</p>
          <p>사업자번호 113-91-12270</p>
        </div>
        <p>통신판매업번호제 2014-수원팔달-0189호</p>
        <p>
          copyright ⓒ DreamLand Parking.
          <br />
          All right reserved.
        </p>
      </div>
      <div className="line"></div>
      <div className="footer-bottom">
        <img src={`${process.env.PUBLIC_URL}/images/DreamLand_logo2.svg`} alt="logo" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
        <ul className="icon-list">
          <li><RiYoutubeFill /></li>
          <li><FaFacebookSquare /></li>
          <li><FaSquareXTwitter /></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
