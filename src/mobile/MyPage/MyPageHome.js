import { FaUserEdit } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { deleteUserInfo, getUserInfo } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMyReserve } from "../../utils/ParkingAPI";

const MyPageHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(['']);  // 로그인된 유저 정보
  const [myreserve, setMyreserve] = useState([]);

  useEffect(()=>{  
      const user_info = getUserInfo();  // 로그인된 정보 가져오기
      setUser(user_info) 
      if( user_info.id ){
        const fetchData = async () => {  // 내 예약 정보 가져오기
          const {data, error} = await fetchMyReserve(user_info.id);
          if( error ){
            alert("내 예약 정보 가져오기 실패");
          }
          if( data ){
            setMyreserve( data );
          }
        }
        fetchData();
      }
  }, [])

  const handleLogout = () => {
    deleteUserInfo();
    window.location.href = "/"; // ✅ 강제 새로고침
};


  return (
    <div id="mypage-home">
      <div className="mypage-home-wrap">
        <div className="mypage-content-wrap">
          <div className="user">
            <h1>{user.name}</h1>
            <h2>님 안녕하세요!</h2>
          </div>

          <div className="reservation" onClick={()=>{navigate("reservation")}}>
            <p className="box-title">내 이용 내역</p>
            <div className="reservation-box">
              <div>
                <p>이용 중</p>
                <h1>{myreserve.filter(r => r.status === '').length}</h1>
              </div>
              <div>
                <p>예약</p>
                <h1>{myreserve.filter(r => r.status === 'active').length}</h1>
              </div>
              <div>
                <p>예약 취소</p>
                <h1>{myreserve.filter(r => r.status === 'canceled').length}</h1>
              </div>
            </div>
          </div>

<div className="recently">
  <p className="box-title">최근 예약 내역</p>

  {
    myreserve.length === 0 ? (
      <div className="recently-box empty">
        <p>최근 예약 내역이 없습니다</p>
      </div>
    ) : (
      <div className="recently-box" onClick={() => { navigate("reservation") }}>
        {
          // 예약중 먼저, 취소는 뒤로 정렬해서 상위 2개만 출력
          [...myreserve]
            .sort((a, b) => {
              // 예약 중 우선 정렬 (canceled는 뒤로)
              if (a.status === 'canceled' && b.status !== 'canceled') return 1;
              if (a.status !== 'canceled' && b.status === 'canceled') return -1;
              return 0;
            })
            .slice(0, 2)
            .map((item) => (
              <div className={item.status === 'canceled' ? 'canceled' : 'reserved'} key={item.id}>
                <p>
                  {new Date(item.selected_date).toLocaleString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })} &nbsp;
                  {item.start_time.slice(0, 5)}~{item.end_time.slice(0, 5)}
                </p>
                {item.status === 'canceled' ? <p>● 예약 취소</p> : <p>● 예약 중</p>}
              </div>
            ))
        }
      </div>
    )
  }
</div>

          <div className="profile-edit">
            <p className="box-title">내 정보 변경</p>
            <div className="edit-box">
              <div className="edit-card" onClick={()=>{navigate("password-check")}}>
                <FaUserEdit />
                <div className="card-txt">
                  <h3>개인정보 변경</h3>
                  <p>비밀번호/휴대폰번호/차량번호 변경</p>
                </div>
              </div>
              <div className="edit-card" onClick={()=>{navigate("membership")}}>
                <BiSolidDiscount />
                <div className="card-txt">
                  <h3>연간회원권 등록</h3>
                  <p>연간회원권 등록 시 할인이 적용돼요</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="logout" onClick={handleLogout}>
          <p>로그아웃</p>
          <IoLogOutOutline />
        </div>
      </div>
    </div>
  );
};

export default MyPageHome;