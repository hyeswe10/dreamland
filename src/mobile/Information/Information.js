import { useState } from "react";
import InfoMap from "./InfoMap";
import InfoPrice from "./InfoPrice";
import InfoHow from "./InfoHow";

const Information = () => {
  const [activeTab, setActiveTap] = useState("map");

  return (
    <div id="information">
      <ul>
        <li 
          className={activeTab === "map" ? "active" : ""}
          onClick={()=>{setActiveTap("map")}}
        >
          <p>주차장 Map</p>
        </li>
        <li 
          className={activeTab === "price" ? "active" : ""}
          onClick={()=>{setActiveTap("price")}}
        >
          <p>요금 안내</p>
        </li>
        <li
          className={activeTab === "how" ? "active" : ""}
          onClick={()=>{setActiveTap("how")}}
        >
          <p>이용 방법</p>
        </li>
      </ul>

      { activeTab === "map" && <InfoMap /> }
      { activeTab === "price" && <InfoPrice /> }
      { activeTab === "how" && <InfoHow /> }
      
    </div> 
  );
};

export default Information;