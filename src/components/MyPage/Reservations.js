import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/LocalStorage";
import { fetchAmount, fetchMyReserve } from "../../utils/ParkingAPI";

const Reservations = ({ onCancel }) => {
  const [myreserve, setMyreserve] = useState([]);
  const [price, setPrice] = useState([]);

  // 페이지 첫 로드 시 정보 가져오기
  useEffect(() => {
    const user_info = getUserInfo(); // 로그인된 정보 가져오기
    if (user_info?.id) {
      const fetchData = async () => {
        // 내 예약 정보 가져오기
        const { data, error } = await fetchMyReserve(user_info.id);
        if (error) {
          alert("내 예약 정보 가져오기 실패");
        }
        if (data) {
          setMyreserve(data);
        }
      };
      const fetchPrice = async () => {
        // 전체 결제 내역 가져오기
        const { data, error } = await fetchAmount();
        if (error) {
          alert("결제 내역 불러오기 실패");
        }
        if (data) {
          setPrice(data);
        }
      };
      fetchData();
      fetchPrice();
    }
  }, []);

// 내 예약 정보 중 예약 id 받아서 '전체 결제 내역 중 id' == '내 예약 id'가 일치하면 예약 정보 반환
// 가격 숫자 그대로 반환
const getReserveAmountValue = (reserveID) => {
  const matched = price.find((item) => item.reserve_id === reserveID);
  return matched ? matched.amount : 0;
};
// 가격 문자열로 반환
const formatAmount = (amount) => amount.toLocaleString();


// 현재 시간 불러오기
const now = new Date();
const sortedReserve = [...myreserve]
  .sort((a, b) => {
    // 취소된 예약은 가장 마지막에 오도록 정렬 우선순위 설정
    if (a.status === "canceled" && b.status !== "canceled") return 1;
    if (a.status !== "canceled" && b.status === "canceled") return -1;

    // 취소되지 않은 예약은 날짜 + 시작 시간 기준으로 현재시간과의 거리 비교
    const aTime = new Date(`${a.selected_date}T${a.start_time}`);
    const bTime = new Date(`${b.selected_date}T${b.start_time}`);
    const aDiff = Math.abs(aTime - now);
    const bDiff = Math.abs(bTime - now);

    return aDiff - bDiff; // 현재와 가까운 시간순 정렬
  });

  return (
    <>
      <div id="reservation">
        <div className="reservation-box">
          <div>
            <p>이용 중</p>
            <h1 className="use">
              {myreserve.filter((r) => r.status === "").length}
            </h1>
          </div>
          <div>
            <p>예약</p>
            <h1 className="reserved">
              {myreserve.filter((r) => r.status === "active").length}
            </h1>
          </div>
          <div>
            <p>취소</p>
            <h1 className="canceled">
              {myreserve.filter((r) => r.status === "canceled").length}
            </h1>
          </div>
        </div>

        <div className="reserve-wrap">

          {sortedReserve.map((item) => {
            const amountValue = getReserveAmountValue(item.id);
            return (
              <div
                className={
                  item.status === "canceled"
                    ? "card reservation-canceled"
                    : "card reservation-reserved"
                }
              >
                <div className="card-left">
                  <h1>
                    {item.parkarea.zone}-{item.parkarea.num}
                  </h1>
                  <p>
                    {item.status === "canceled" ? "● 취소 완료" : "● 예약 중"}
                  </p>
                </div>
                <div className="card-right">
                  <div className="right-top">
                    <p>예약 번호 : {item.id}</p>
                    <h2>
                      {new Date(item.selected_date).toLocaleString("ko-KR", {
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                      })}{" "}
                      &nbsp;
                      {item.start_time.slice(0, 5)}~{item.end_time.slice(0, 5)}
                    </h2>
                  </div>
                  <div className="right-bottom">
                    <h3>{formatAmount(amountValue)}원 결제 완료</h3>
                    {item.status === "active" && (
                      <button
                        onClick={() =>
                          onCancel({
                            item,
                            amount: amountValue,
                          })
                        }
                      >
                        예약 취소
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reservations;
