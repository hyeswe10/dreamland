import { Outlet } from "react-router-dom";
import LeftNav from "./LeftNav.js";
import RightNav from "./RightNav.js";

export default function Layout() {
  return (
    <div className="layout">
      <LeftNav className='leftnav'/>
      <main className="content">
        <Outlet /> {/* 여기만 라우터로 바뀜 */}
      </main>
      <RightNav className='rightnav'/>
    </div>
  );
}