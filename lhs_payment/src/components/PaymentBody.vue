<template>
  <div class="payment-body">

    <div class="payment-big">
      <div class="big-roomInfo">

        <div class = "Reservation_Info">

          <div class="roomInfo">
            <span class="room">Superior room - 1 더블베드 or 2 트윈 베드</span>
            <span class="roomPrice">₩240,000/night</span>
          </div>

          <div class="hotel-link">
            <div style="display: flex">
            <div>
              <img class="hotel-logo" src="@/assets/cvk_hotel_logo.png" alt="">
            </div>
            <div class = "hotel-link-details">
              <div style="font-size: 20px;">
                해튼호텔
              </div>
              <div style="font-size: 14px; color: #888888">
                <img class="location-logo" src="@/assets/location.png" alt="">
                Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
              </div>
            </div>
            </div>
          </div>
          <div class="Reservation_date">
            <div class="date">
                <span class = "day">Thursday, Dec 8</span>
                <span class = "check-IO">Check-In</span>
            </div>
            <div class="Reservation_image">
              <img src="../assets/left_line.png" height="7" width="39" alt="" style="margin-right: 30px"/>
              <img src="../assets/hotel_image.png" height="45" width="42" alt="" style="margin-right: 30px"/>
              <img src="../assets/right_line.png" height="7" width="39" alt=""/>
            </div>
            <div class="date">
              <span class = "day">Friday, Dec 9</span>
              <span class = "check-IO">Check-Out</span>
            </div>
          </div>
        </div>

        <div class="payment-type">
          <div
              v-for="option in paymentOptions"
              :key="option.key"
              class="option"
              :class="{ selected: selectedPayment === option.key }"
              @click="selectPayment(option.key)"
          >
            <div class="text-group">
              <span class="paymentTitle">{{ option.title }}</span>
              <span class="paymentSubtitle">{{ option.subtitle }}</span>
            </div>
            <div class="radio-icon"></div>
          </div>
        </div>

        <div class="Reservation_sign">
          <span style="font-size: 20px; font-weight: bold; display: block; padding: 15px 0">Login or Sign up to book</span>
          <input class="Reservation_phoneNumber" placeholder="Phone Number">
          <span style="font-size: 14px; display: block; padding: 15px 0">예약확인 문자/전화를 위해 전화번호를 남겨주세요</span>
          <button class="continue">continue</button>
          <div class="boundary_line_1">
            <p>Or</p>
          </div>
            <div class="social-login-buttons">
            <div class="social-button-box">
              <img src="@/assets/login_facebook.png" alt="">
            </div>
            <div class="social-button-box">
              <img src="@/assets/login_google.png" alt="">
            </div>
            <div class="social-button-box">
              <img src="@/assets/login_apple.png" alt="">
            </div>
          </div>
          <div class="continue-with-email">
            <img src="@/assets/email_icon.png" alt="">
            <span>Continue with email</span>
          </div>
        </div>
      </div>
    </div>


    <div class="payment-small">
      <div class="payment-small-body">
      <div class="hotel-details">
        <img src="../assets/cvk_hotel_photo.png" height="120" width="121" alt=""/>
        <div>
          <span style="display: block; font-size: 16px; color: #888888">CVK Park Bosphorus...</span>
          <span style="font-size: 20px; font-weight: bold;">Superior room - 1 더블베드 or 2 트윈 베드</span>
          <div class ="mini-review">
            <div class="review-box">4.2</div>
            <div style="position: relative; bottom: 1px">
              <span style="font-weight: bold; font-size: 14px">Very good</span>
              <span style="font-size: 12px; margin-left: 10px">54 reviews</span>
            </div>
          </div>
        </div>
      </div>
      <div class="boundary_line">
      </div>
      <div class="reservation-protect">
        Your booking is protected by <span style="font-weight: bold">golobe</span>
      </div>
      <div class="boundary_line">
      </div>
      <div class="price-details">
        <div style="font-size: 16px; font-weight: bold">Price Details</div>
        <div class = "price-type">
          <span>Base Fare</span>
          <span class = "detail-amount">₩240,000</span>
        </div>
        <div class = "price-type">
          <span>Discount</span>
          <span class = "detail-amount">₩0</span>
        </div>
        <div class = "price-type">
          <span>Taxes</span>
          <span class = "detail-amount">₩24,000</span>
        </div>
        <div class = "price-type">
          <span>Service Fee</span>
          <span class = "detail-amount">₩5,000</span>
        </div>
      </div>
      <div class="boundary_line">
      </div>
      <div class = "price-type">
        <span class = "price-type">Total</span>
        <span class = "detail-amount">₩265,000</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="js">

import { ref } from 'vue';

// 결제 옵션 데이터
const paymentOptions = ref([
  {
    key: 'card',
    title: '카드결제',
    subtitle: '카드 등록 후 결제가 진행됩니다.',
  },
  {
    key: 'simple',
    title: '간편결제',
    subtitle: '카드 등록 없이 간편인증으로 결제가 진행됩니다.',
  },
]);

// 현재 선택된 결제 방법을 저장하는 변수. null로 시작해 아무것도 선택되지 않게 함
const selectedPayment = ref(null); // <--- <string | null> 제거

const selectPayment = (key) => { // <--- : string 제거
  selectedPayment.value = key;
};

</script>

<style scoped>
  .payment-body{
    display: flex;
    width: 95%;
    justify-content: space-evenly;
    margin: 0 auto;
    gap: 2%;
  }

  .payment-big{
    width: 60%;
  }

  .payment-small{
    width: 30%;
  }

  .payment-small-body{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 25px 24px;
    margin-bottom: 50px;
  }

  .Reservation_Info{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 7px 24px;
    margin-bottom: 50px;

  }

  .big-roomInfo{
    justify-content: space-between;
  }

  .roomInfo{
    display: flex;
    margin-bottom: 40px;
    margin-top: 30px;
    justify-content: space-between;
    align-items: center;
  }

  .room{
    font-size: 24px;
    font-weight: bold;
  }

  .roomPrice{
    font-size: 24px;
    font-weight: bold;
    color: #FF8682;
  }

  .hotel-link{
    display: flex;
    margin-bottom: 40px;
    border: 1px solid #cdeae1;
    border-radius: 10px;
    align-items: center;
    gap: 25px;
    padding: 20px;
  }

  .hotel-logo{
    width: 63px;
    height: 63px;
    position: relative;
    top: 3px;
    margin-left: 30px;
  }

  .location-logo{
    position: relative;
    top: 3px;
  }

  .hotel-link-details{
    margin-left: 50px;
    position: relative;
    top: 7px;
  }

  .Reservation_date{
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    border-radius: 20px;
    align-items: center;
  }

  .day{
    display: block;
    font-weight: bold;
    font-size: 20px;
  }

  .check-IO{
    font-size: 14px;
    color: #888888;
  }

  .Reservation_image{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .social-login-buttons {
    display: flex;
    justify-content: space-between; /* 아이템들을 양 끝으로 벌리고 사이 간격을 균등하게 */
    gap: 15px; /* 각 박스 사이의 간격 (원하는 값으로 조절) */
    margin-top: 2px; /* 위쪽 여백 */
    margin-bottom: 30px; /* 아래쪽 여백 */
  }

  /* 각 소셜 로그인 버튼 박스 */
  .social-button-box {
    flex: 1; /* 부모 컨테이너 내에서 남은 공간을 균등하게 분배 */
    display: flex; /* 내부 이미지를 중앙 정렬하기 위해 다시 flex 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    height: 56px; /* 이미지 높이에 맞게 조절 */
    border: 1px solid #cdeae1; /* 테두리 스타일 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
    cursor: pointer; /* 클릭 가능한 요소임을 표시 */
    transition: background-color 0.2s ease; /* 호버 효과를 위한 전환 효과 */
  }

  .social-button-box:hover {
    background-color: #f0f0f0; /* 마우스 오버 시 배경색 변경 */
  }

  .continue-with-email {
    display: flex;
    align-items: center;
    justify-content: center; /* 텍스트와 아이콘을 중앙에 정렬 */
    gap: 10px; /* 아이콘과 텍스트 사이 간격 */
    margin-top: 20px;
    height: 48px;
    border: 1px solid #cdeae1;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    transition: background-color 0.2s ease;
    margin-bottom: 20px;
  }

  .continue-with-email:hover {
    background-color: #f0f0f0;
  }

  .payment-type {
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 50px;
  }

  /* 각 결제 옵션 스타일 */
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-radius: 17px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: 1px solid transparent;
  }

  .text-group {
    display: flex;
    flex-direction: column;
  }

  .paymentTitle {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .paymentSubtitle {
    font-size: 14px;
    color: #666;
  }

  /* 선택되었을 때의 스타일 */
  .option.selected {
    background-color: #8dd3bb; /* 이미지와 유사한 민트색 */
    border: 1px solid #B0E4D5;
  }

  /* 라디오 버튼 아이콘 스타일 */
  .radio-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #ccc;
    position: relative;
    transition: border-color 0.3s ease;
  }

  /* 라디오 버튼 안의 작은 원 (선택 시 표시) */
  .radio-icon::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0); /* 처음엔 안 보이게 */
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #112211;
    transition: transform 0.3s ease;
  }

  /* 옵션이 선택되었을 때 라디오 아이콘 스타일 변경 */
  .option.selected .radio-icon {
    border-color: #112211;
  }

  .option.selected .radio-icon::after {
    transform: translate(-50%, -50%) scale(1); /* 선택 시 보이게 */
  }

  .Reservation_sign{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 7px 24px;
  }

  .Reservation_phoneNumber{
    width: 100%;
    height: 56px;
    padding: 0 16px; /* 좌우 내부 여백 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 8px; /* 모서리를 둥글게 */
    box-sizing: border-box; /* padding과 border가 너비에 포함되도록 설정 (매우 중요!) */
    font-size: 16px;
  }

  .continue{
    background-color: #8dd3bb;
    font-size: 16px;
    font-weight: bold;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px none black;
  }

  .boundary_line{
    display: flex;
    align-items: center;
    color: #c3c7c3;
    font-size: 18px;
    margin: 6px 0px;
  }
  .boundary_line::before,
  .boundary_line::after{
    content: "";
    flex-grow: 1;
    background: gray;
    height: 2px;
    font-size: 0px;
    line-height: 0px;
    margin: 10px 0px;
  }

  .boundary_line_1{
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #112211;
    font-size: 18px;
    margin: 6px 0px;
  }
  .boundary_line_1::before,
  .boundary_line_1::after{
    content: "";
    flex-grow: 1;
    background: gray;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 25px 7px;
  }

  .hotel-details{
    display: flex;
    gap: 30px
  }

  .mini-review{
    display: flex;
    margin-top: 10px;
    gap: 10px;
    align-items: center;
  }

  .review-box{
    display: flex; /* 내부 이미지를 중앙 정렬하기 위해 다시 flex 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    height: 32px; /* 이미지 높이에 맞게 조절 */
    border: 2px solid #cdeae1; /* 테두리 스타일 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
    cursor: pointer; /* 클릭 가능한 요소임을 표시 */
    transition: background-color 0.2s ease; /* 호버 효과를 위한 전환 효과 */
    padding: 17px 12px;
  }

  .reservation-protect{
    font-size: 16px;
  }

  .price-details{
    display: grid;
    gap: 15px;
  }

  .price-type{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .detail-amount{
    font-weight: bold;
  }

</style>