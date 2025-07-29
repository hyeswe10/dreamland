import { supabase } from "./supabaseClient";

//혹시라도 이해안되시면 설명해드릴테니 편히 말씀주세요!


/** 회원가입 페이지 - 정우 */ 
/** 1. 로그인 **/
//필요한 정보 : input에 입력된 userID와 password

export const fetchLogin = async (userID,password)=>{
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id',userID)
        .eq('password',password)
        .single();
    return {data,error};
}

/** 2. 회원가입 **/

//중복된 아이디 확인을 위한 users테이블의  user_id 정보 가져오기
export const fetchAllUserId = async ()=>{
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
    return {data,error};
}

//필요한 정보 : 이름, 아이디, 비밀번호, 차량번호, 휴대폰번호 전부 input value
export const fetchSignUp = async ({
    username,
    userID,
    password,
    car,
    phone
})=>{
    //데이터를 가져오는 것이 아닌 집어넣는 것이라 data가 필요 없음
    const { error } = await supabase
        .from('users')
        .insert([{
            name:username,
            user_id:userID,
            password:password,
            car:car,
            phone:phone
        }]);
    return {success:!error,error};
}

/** 3. 아이디 찾기 **/
//필요한 정보 : 이름, 휴대폰번호 입력후 일치하는 users정보에서 user_id만 가져오기
export const findUserId = async (username,phone)=>{
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('name',username)
        .eq('phone',phone)
        .single();
    return {data,error};
}

/** 4. 비밀번호 찾기-변경 **/
//필요한 정보 : 이름,휴대폰,아이디로 해당되는 users정보를 찾아서 새로 입력한 비밀번호로 변경하기

// 해당 유저정보 찾아오기
export const findInfo = async (username,phone,userID)=>{
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('name',username)
        .eq('phone',phone)
        .eq('user_id',userID)
        .single();
    return {data,error};
}

// 해당 정보 비밀번호 변경
export const findPassword = async (id,newPass)=>{
    const { data, error } = await supabase
        .from('users')
        .update({password:newPass})
        .eq('id',id)
    return {data,error};
}

/** 메인페이지 */
// 예약하기 구역선택 쪽 참고 //
// 날짜만 오늘 날짜로 설정해서 실시간 업데이트되게 바꾸면 될것같습니다




/** 1. 예약내역확인 **/
export const fetchMyReserve = async (userID)=>{
    const { data, error } = await supabase
        .from('reservations')
        .select(`
            id,
            status,
            selected_date,
            start_time,
            end_time,
            parkarea (
                zone,
                num
            )
        `)
        .eq('user_id',userID);
    return {data,error};
}

/** 2. 금액 가져오기 **/
export const fetchAmount = async ()=>{
    const { data, error } = await supabase
        .from('payments')
        .select('reserve_id','amount')
    return {data,error};
}

/** 2. 예약취소 **/
export const cancelReserve = async (reserveID,parkareaZone,parkareaNum)=>{
    //reservations 상태변경
    const { error } = await supabase
        .from('reservations')
        .update({status:'canceled'})
        .eq('id',reserveID);
    if( error ){
        return {data:false,error};
    }
    //parkarea 상태변경
    const { error:parkareaError } = await supabase
        .from('parkarea')
        .update({is_reserved:false})
        .eq('num',parkareaNum)
        .eq('zone',parkareaZone);
    if( parkareaError ){
        return {data:false,error:parkareaError}
    }
    return {data:true,error};
}

/** 4. 비밀번호 변경 **/
//비밀번호 확인에서 일치하는거
export const changePassword = async ({
    oldpass,
    newpass,
    newName,
    newPhone,
    newCar
})=>{
    const { error } = await supabase
        .from('users')
        .update({
            password:newpass,
            name:newName,
            phone:newPhone,
            car:newCar
            })
        .eq('password',oldpass);
    return {error};
}

/** 5. 연간이용권 등록 **/
export const yearlyPass = async (ID)=>{
    const { error } = await supabase
        .from('users')
        .update({yearly_pass:true})
        .eq('id',ID);
    return {error};
}









/** 예약하기(효진씨 파트) **/



/** 1. 구역선택 **/

// 날짜에 따른 잔여석 변동 api
// 필요한 정보 : 날짜에 따른 예약정보, 예약정보에 들어가있는 parkarea_id, parkarea_id의 zone 정보

//날짜 yyyy-mm-dd 로 변환 후 한국시간에 맞추기
// const realDate = new Date(selectDate.getTime() + 9 * 60 * 60 * 1000)
//     .toISOString()
//     .slice(0, 10);

export const getAllseatsByDate = async (selectDate)=>{
    // 1. 모든 좌석의 id, 구역정보, 좌석번호 가져오기
    const { data: allSeats, error: seatError } = await supabase 
        .from('parkarea')
        .select('id,zone,num')
    if(seatError){
        return {success:false,error:seatError};
    }

    // 2. 해당 날짜에 예약된 좌석 정보만 추출하기
    const { data:reservedList, error:reservedError } = await supabase
        .from('reservations')
        .select('parkarea_id')
        .eq('selected_date',selectDate)
        .eq('status','active');
    if(reservedError){
        return {success:false,error:reservedError};
    }
    //객체가 아닌 값이 필요해서
    const reservedID = reservedList.map((item)=>{
        return item.parkarea_id;
    })
    //잔여석에 필요한 정보를 불러오려고 예) {total:25, available: 22}
    const zoneMap = {};
    
    // 3. 각 구역별로 집계하기
    for(const seat of allSeats){
        const { id, zone } = seat;
        if(!zoneMap[zone]){
            zoneMap[zone] = {total:0,reserved:0,available:0} //오류 방지 값을 0처리
        }
        zoneMap[zone].total +=1; // 배열을 반복하는동안 전체의 수를 센다 //length로 표기할 경우 zone의 종류가 세어질 수 있음
        if(reservedID.includes(id)){
            zoneMap[zone].reserved += 1;
        }
    }

    // 4. 남은 자리 계산
    for(const zone in zoneMap){
        zoneMap[zone].available = zoneMap[zone].total - zoneMap[zone].reserved;
    }
    return { success:true, data:zoneMap};
}





/** 2. 구역표기 **/

//필요한 정보 : 해당 구역 모든 좌석에 대한 id와 num, 구역내에 예약된 자리, 내예약자리
//모든 좌석 id,num = allSeatsData
//구역내 예약된 자리 = reservedID
//내 예약자리 = myReserved
//data로 가지고 가서 data.allSeatsData 혹은 data.reservedID 이런식으로 뽑아서 사용하면 됨.     
export const loadZoneSeats = async (selectZone,selectDate,userID)=>{
    //1. 선택한 구역의 id와 num 가져오기
    const { data:allSeatsData, error:allSeatsError } = await supabase
        .from('parkarea')
        .select('id,num')
        .eq('zone',selectZone)
        .order('id',{ascending:true})
    if(allSeatsError){
        return {success:false,error:allSeatsError};
    }
    //좌석들의 id번호 따로 불러오기 (해당 구역내에서 가져오기위함)
    const allSeatID = allSeatsData.map((item)=>{
        return item.id;
    })
    //2. 해당 날짜에 해당 구역내에서 예약된 예약의 parkarea_id, user_id불러오기
    const { data:reservedData, error:reservedError } = await supabase
        .from('reservations')
        .select('parkarea_id, user_id') //그냥 예약중뿐만 아니라 내예약도 별도 표기 해야하기때문
        .eq('selected_date',selectDate)
        .in('parkarea_id',allSeatID)
        .eq('status','active');
    if(reservedError){
        return {success:false,error:reservedError};
    }
    //parkarea_id만 따로 불러오기
    const reserveID = reservedData.map((item)=>{ 
        return item.parkarea_id;  //parkarea 테이블에서 같은 정보로 불러오기 위해서
    })
    //내예약 분리해서 내예약자리 불러오기
    const myReserved = reservedData.filter((item)=>{return (item.user_id === userID);}) // 예약들 중 내 아이디와 예약아이디가 일치하는 항목 따로 가져오기
                                   .map((item)=>{return (item.parkarea_id)}); //내 예약들의 parkarea_id 불러오기
    return {
        success:true,
        data:{
            allSeatsData,
            reserveID,
            myReserved
        }
    };
}




/** 예약하기(결제 파트) **/
// 필요한 정보 : 해당 유저의 연간회원권 보유여부
// id는 localStorage에서 가지고오기

// 연간회원권 할인
export const fetchYearlyPass = async (id)=>{
    const { data, error } = await supabase
        .from('users')
        .select('yearly_pass')
        .eq('id',id)
    return {data,error};
}

// 예약 테이블 등록하기
export const registerReservation = async ({
    userID,
    parkareaID,
    selectDate,
    startTime,
    endTime
})=>{
    // 중복된 자리 확인
    const { data:existing } = await supabase
        .from('reservations')
        .select('id')
        .eq('parkarea_id',parkareaID)
        .eq('selected_date',selectDate)
        .eq('status','active')
    if(existing && existing.length > 0){
        return { data: null, error:new Error("이미 예약된 자리입니다")};
    }
    //reservations에 추가
    const { error } = await supabase
        .from('reservations')
        .insert([{
            user_id:userID,
            parkarea_id:parkareaID,
            selected_date:selectDate,
            start_time:startTime,
            end_time:endTime
        }])
    return {error};
}

// 결제 테이블 등록하기
export const payReserve = async (userID,parkareaID,amount)=>{
    const { data:reserveData, error:reserveError } = await supabase
        .from('reservations')
        .select('id')
        .eq('user_id',userID)
        .eq('parkarea_id',parkareaID)
        .eq('status','active')
        .order('created_at', {ascending:false}) // 가장 최신항목
        .limit(1); // 한개만 가져오기
    if(reserveError){
        return {data:false,error:reserveError};
    }
    const reserveID = reserveData[0].id;
    const { data,error } = await supabase
        .from('payments')
        .insert([{
            user_id:userID,
            reserve_id:reserveID,
            amount:amount
        }])
        .select();
    return {data,error};
}


// 차량구역 예약완료 표시
export const reservedAreaUpdate = async (parkareaID)=>{
    const { error } = await supabase
        .from('parkarea')
        .update({is_reserved:true})
        .eq('id',parkareaID);
    return {error};
}