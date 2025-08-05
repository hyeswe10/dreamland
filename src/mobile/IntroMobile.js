
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsStars } from "react-icons/bs";

const Information = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    accessibility: false,
    arrows: false,
    draggable: false,
    beforeChange: () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  return (
    <div className="information-page">
      <div className="slider-container">
        <Slider {...settings}>
          <div >
            <img src={`${process.env.PUBLIC_URL}/images/slider1.jpg`} 
            alt="슬라이드 이미지1"/>
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/slider2.jpg`} 
            alt="슬라이드 이미지2"/>
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/slider3.jpg`}
            alt="슬라이드 이미지3" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/slider4.jpg`} 
            alt="슬라이드 이미지4"/>
          </div>
        </Slider>
      </div>


      <div className="information-section">
        <div className="title">
          <BsStars />
          <h2>드림 랜드 파크가 처음이신가요?</h2>
        </div>
        <ul className="items-wrap">
          <li className="item">
            <p>
              7만 명이 선택한
              <br />
              No.1 놀이공원
              <br />
              <span>주차장 앱</span>
            </p>
            <img src={`${process.env.PUBLIC_URL}/images/info_app.png`} alt="info_app"/>
          </li>
          <li className="item">
            <p>
              최대 500대
              <br />
              수용 가능한
              <br />
              <span>초대형 주차 공간</span>
            </p>
            <img src={`${process.env.PUBLIC_URL}/images/info_seat.png`} alt="info_seat"/>
          </li>
          <li className="item">
            <p>
              4만 개 이상의
              <br />
              진짜 리뷰로
              <br />
              <span>검증된 품질</span>
            </p>
            <img src={`${process.env.PUBLIC_URL}/images/info_handle.png`} alt="info_handle"/>
          </li>
          <li className="item">
            <p>
              주차 걱정 없이
              <br />
              <span>즐거운 하루</span>를<br />
              시작하세요
            </p>
            <img src={`${process.env.PUBLIC_URL}/images/info_att.png`} alt="info_att"/>
          </li>
        </ul>
      </div>
      <div className="information-section">
        <div className="title">
          <BsStars />
          <h2>할인을 받고 싶다면?</h2>
        </div>
        <ul className="dicount-wrap">
          <li className="item">
            <img src={`${process.env.PUBLIC_URL}/images/info_car.png`} alt="info_car"/>
            <div className="txt">
              <p>2번째 방문시</p>
              <div className="wrap"> 
                <span>2,000원</span>
                <p>할인</p>
              </div>
            </div>
          </li>
          <li className="item">
            <img src={`${process.env.PUBLIC_URL}/images/info_coupon.png`} alt="info_coupon"/>
            <div className="txt">
              <p>연간회원권 보유시</p>
              <div className="wrap"> 
                <span>20%</span>
                <p>할인</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="information-section">
        <div className="title">
          <BsStars />
          <h2>편리하고 안전한 드림랜드 주차장</h2>
        </div>
        <div className="content">
          <div className="parking-img">
            <img src={`${process.env.PUBLIC_URL}/images/info_parking.png`} alt="info_parking"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
