import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  const stepMap = {
    "/MobileReservation/schedule": 2,
    "/MobileReservation/floor": 3,
    "/MobileReservation/parking": 4,
    "/MobileReservation/Time": 5,
    "/MobileReservation/AllDay": 5,
    "/MobileReservation/payment": 6,
    "/MobileReservation/complete": 7,
  };

  const currentStep = stepMap[location.pathname] ?? 1;
  const totalSteps = 7;
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const isCompletePage = location.pathname === "/MobileReservation/complete";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hidden = !isVisible || isCompletePage;

  return (
    <div className={`progress-wrap ${hidden ? "hidden" : ""}`}>
      <div
        className="progress-bar-fill"
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
