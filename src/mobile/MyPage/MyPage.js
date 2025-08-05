import { Route, Routes, useNavigate } from "react-router-dom";
import MyPageHome from "./MyPageHome";
import Reservations from "./Reservations";
import Cancel from "./Cancel";
import CancelComplete from "./CancelComplete";
import ProfileEdit from "./ProfileEdit";
import PasswordCheck from "./PasswordCheck";
import ProfileComplete from "./ProfileComplete";
import Membership from "./Membership";
import MembershipComplete from "./MembershipComplete";
import { useState } from "react";

const MyPage = () => {
  const [uuid,setUuid] = useState('');
  const navigate = useNavigate();

  // 내 예약 내역에서 클릭한 해당 아이템의 예약 정보, 결제 정보를 받아 가져오고
  // localStorage에 저장 후 cancel 페이지로 이동
  const handleCancel = ({ item, amount }) => {
    localStorage.setItem("cancelData", JSON.stringify(item));
    localStorage.setItem("cancelAmount", JSON.stringify(amount));
    navigate("/mypage/cancel");
  };

  return (
    <div id="mypage">
      <Routes>
        <Route index element={<MyPageHome />} />

        {/* 내 예약 내역 */}
        <Route path="reservation" element={<Reservations onCancel={handleCancel} />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="cancel-complete" element={<CancelComplete />} />

        {/* 개인정보 변경 */}
        <Route path="password-check" element={<PasswordCheck setUuid={setUuid}/>} />
        <Route path="profile-edit" element={<ProfileEdit uuid={uuid}/>} />
        <Route path="profile-complete" element={<ProfileComplete />} />

        {/* 연간회원권 등록 */}
        <Route path="membership" element={<Membership />} />
        <Route path="membership-complete" element={<MembershipComplete />} />
        
      </Routes>
    </div>
  );
};

export default MyPage;
