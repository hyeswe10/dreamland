import { useEffect, useState } from "react";
import { fetchAllZoneStatus } from "../utils/ParkingAPI";
import { fetchParkArea } from "../utils/ParkingAPI";

const Tester2 = () => {
    const [zoneStatus, setZoneStatus] = useState({});
    const [selectedZone,setSelectedZone] = useState('A');
    const [selectedArray,setSelectedArray] = useState([]);
    //구역 선택용 배열
    const zones = ['A','B','C','D'];
    useEffect(()=>{
        const loadZoneStatus = async ()=>{
            const result = await fetchAllZoneStatus(); //설정한 배열 가져오기
            setZoneStatus(result);
        }
        loadZoneStatus();
    },[])
    //자리 출력하기
    const listArea = async (zone)=>{
        setSelectedZone(zone);
        const { data, error } = await fetchParkArea(zone);
        setSelectedArray(data);
    }
    return (
        <div>
            {
                zones.map((value)=>{
                    const status = zoneStatus[value] || {total: 0, reserved: 0,available: 0}; //값이 없을 경우 전부 0 처리(안하면 오류남)
                    return <button onClick={()=>{listArea(value)}} key={value}>{value}구역<br/>잔여석 {status.available}/{status.total}</button>
                })
            }
            <div>
                {
                    selectedArray.map((item)=>{
                        return (
                        <button 
                            key={item.id}
                            className={`parking-area`}
                        >
                            {item.zone}-{item.num}
                        </button>
                    )})
                }
            </div>
        </div>
    );
};

export default Tester2;