import "./App.scss";
import { useEffect, useState } from "react";
import MobilePage from "./pages/MobilePage";
import DesktopPage from "./pages/DesktopPage";
import { HashRouter } from "react-router-dom";

const App = () => {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 1024);
  useEffect(()=>{
    const handleSize = ()=>{
      setIsMobile( window.innerWidth <= 1024 );
    }
    handleSize();
    window.addEventListener("resize",handleSize);
    return ()=>{
      window.removeEventListener("resize",handleSize);
    }
  },[]);
  return (
    <HashRouter>
    <div id="app">
      {
        isMobile ? <MobilePage /> : <DesktopPage />
      }
    </div>
    </HashRouter>
  );
};

export default App;