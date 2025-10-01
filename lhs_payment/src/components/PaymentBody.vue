<template>
  <div class="channel">Turkey > Istanbul > <span style="font-size: 20px; color: black"> 해튼호텔 </span></div>
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

        <div class="card-chest" v-if="selectedPayment === 'card'">
          <div style="font-size: 32px; font-weight: bold; margin-bottom: 25px">카드등록</div>
          <div class="card-container" ref="slider" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave"
             @mouseup="handleMouseUp" @mousemove="handleMouseMove">
          <div v-for="card in cards" :key="card.id" class="existing-card">
            <div>
              <span style="font-size: 24px; font-weight: bold;">**** **** ****</span><br>
              <span style="font-size: 32px; font-weight: bold;">{{ card.lastFour }}</span>
            </div>
            <img src="@/assets/trash.png" @click="deleteCard(card.id)" alt="Delete Card" class="delete-card-btn"
                 style="cursor: pointer; width: 21px; height: 18px">
            <div style="display: flex; justify-content: space-between; align-content: center;">
              <div>
                <span>valid thru</span><br>
                <span style="font-size: 20px; font-weight: bold;">{{ card.expDate }}</span>
              </div>
              <div style="align-content: center">
                <img src="../assets/visa.png" height="33" width="52" alt=""/>
              </div>
            </div>

          </div>
          <div class="add-card" @click="openModal">
            <img style="position: absolute; z-index: 1; transform: translate(-50%, -50%); top: 50%; left: 50%" src="@/assets/circle.png" alt="">
            <img style="position: absolute; z-index: 2; transform: translate(-50%, -50%); top: 50%; left: 50%" src="@/assets/plus.png" alt="">
          </div>
        </div>
        <div v-if="isModalOpen" class="modal-overlay show" @click.self="closeModal">
          <div class="modal-content">
            <div class="card_all">
              <p style="font-size: 40px; font-weight: bold; margin-bottom: 20px">카드 추가</p>
              <div class="card_input">
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" v-model="newCard.number" placeholder="1234 5678 9101 1121">
              </div>
              <div class="form-row">
                <div class="card_input half-width">
                  <label for="expDate">Exp. Date</label>
                  <input type="text" id="expDate" v-model="newCard.expDate" placeholder="MM/YY">
                </div>
                <div class="card_input half-width">
                  <label for="CVC">CVC</label>
                  <input type="text" id="CVC" v-model="newCard.cvc" placeholder="123">
                </div>
              </div>
              <div class="card_input">
                <label for="nameOnCard">Name on Card</label>
                <input type="text" id="nameOnCard" v-model="newCard.name" placeholder="John Doe">
              </div>
              <div class="card_input">
                <label for="country-select">Country or Region</label>
                <div class="select-wrapper">
                  <select id="country-select" v-model="selectedCountry">
                    <option v-for="country in countries" :key="country.code" :value="country.name">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="card_input">
                <div class="checkbox-container">
                  <input type="checkbox" id="save-info-checkbox" v-model="newCard.saveInfo">
                  <label for="save-info-checkbox">정보 저장하기</label>
                </div>
              </div>
            </div>
            <button @click="addCard"
                    style="width: 512px; height: 48px; font-weight: bold; background-color: #8dd3bb; border-radius: 5px; font-size: 14px; border: none;">
              Add Card
            </button>
          </div>
        </div>
      </div>
            <div class="Reservation_sign" v-if="selectedPayment === 'simple'">

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
            </div>

      </div>
    </div>
<!--    <div class="Reservation_sign">-->
<!--      <span style="font-size: 20px; font-weight: bold; display: block; padding: 15px 0">Login or Sign up to book</span>-->
<!--      <input class="Reservation_phoneNumber" placeholder="Phone Number" v-model="phoneNumber">-->
<!--      <span style="font-size: 14px; display: block; padding: 15px 0">예약확인 문자/전화를 위해 전화번호를 남겨주세요</span>-->
<!--      <button class="continue" :disabled="!isContinueButtonEnabled">continue</button>-->
<!--      <div class="boundary_line_1">-->
<!--        <p>Or</p>-->
<!--      </div>-->
<!--      <div class="social-login-buttons">-->
<!--        <div class="social-button-box">-->
<!--          <img src="@/assets/login_facebook.png" alt="">-->
<!--        </div>-->
<!--        <div class="social-button-box">-->
<!--          <img src="@/assets/login_google.png" alt="">-->
<!--        </div>-->
<!--        <div class="social-button-box">-->
<!--          <img src="@/assets/login_apple.png" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="continue-with-email">-->
<!--        <img src="@/assets/email_icon.png" alt="">-->
<!--        <span>Continue with email</span>-->
<!--      </div>-->
<!--    </div>-->


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
import { ref, watch } from 'vue';

// 새로 추가된 카드를 저장할 배열
const cards = ref([]);

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

const selectedPayment = ref(null);

const selectPayment = (key) => {
  selectedPayment.value = key;
};

// --- 카드 추가 관련 로직 ---
const isModalOpen = ref(false);
const newCard = ref({
  number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false
});
const selectedCountry = ref('United States');
const countries = ref([
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
]);

// ======================= 스크립트 수정 부분 START =======================
// 드래그 스크롤 기능을 위한 변수 추가
const slider = ref(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
// ======================= 스크립트 수정 부분 END =========================

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  newCard.value = {number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false};
}

function addCard() {
  if (newCard.value.number.length < 19) {
    alert('올바른 카드 번호를 입력하세요.');
    return;
  }
  const cardToAdd = {
    id: Date.now(),
    lastFour: newCard.value.number.slice(-4),
    expDate: newCard.value.expDate,
  };
  cards.value.unshift(cardToAdd);

  if (!newCard.value.saveInfo) {
    closeModal();
  } else {
    isModalOpen.value = false;
  }
}

// ======================= 스크립트 수정 부분 START =======================
// 카드 삭제 함수 및 드래그 스크롤 함수 추가
function deleteCard(cardId) {
  if (confirm("정말 이 카드를 삭제하시겠습니까?")) {
    cards.value = cards.value.filter(card => card.id !== cardId);
  }
}

function handleMouseDown(e) {
  isDown.value = true;
  slider.value.style.cursor = 'grabbing';
  startX.value = e.pageX - slider.value.offsetLeft;
  scrollLeft.value = slider.value.scrollLeft;
}

function handleMouseLeave() {
  isDown.value = false;
  if (slider.value) slider.value.style.cursor = 'grab';
}

function handleMouseUp() {
  isDown.value = false;
  if (slider.value) slider.value.style.cursor = 'grab';
}

function handleMouseMove(e) {
  if (!isDown.value) return;
  e.preventDefault();
  const x = e.pageX - slider.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  slider.value.scrollLeft = scrollLeft.value - walk;
}
// ======================= 스크립트 수정 부분 END =========================


// 입력값 자동 서식 기능 (변경 없음)
watch(() => newCard.value.number, (newValue) => {
  const cleaned = newValue.replace(/[^\d]/g, '').slice(0, 16);
  let formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  newCard.value.number = formatted;
});

watch(() => newCard.value.expDate, (newValue) => {
  const cleaned = newValue.replace(/[^\d]/g, '').slice(0, 4);
  newCard.value.expDate = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
});

watch(() => newCard.value.cvc, (newValue) => {
  newCard.value.cvc = newValue.replace(/[^\d]/g, '').slice(0, 3);
});

watch(() => newCard.value.name, (newValue) => {
  newCard.value.name = newValue.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
});
</script>

<style scoped>
/* --- 기존 스타일 (대부분 변경되지 않았습니다) --- */
.payment-body{
  display: flex;
  width: 95%;
  max-width: 1280px;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2%;
  height: 100%;
}

.payment-big{
  width: 60%;
}

.payment-small{
  width: 450px;
}

.big-roomInfo{
  width: 790px;
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

.payment-type {
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 50px;
}

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

.option.selected {
  background-color: #8dd3bb;
  border: 1px solid #B0E4D5;
}

.radio-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ccc;
  position: relative;
  transition: border-color 0.3s ease;
}

.radio-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #112211;
  transition: transform 0.3s ease;
}

.option.selected .radio-icon {
  border-color: #112211;
}

.option.selected .radio-icon::after {
  transform: translate(-50%, -50%) scale(1);
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 2px solid #cdeae1;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
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

/* ======================= 스타일 수정 부분 START ======================= */
/* 카드 컨테이너를 가로 슬라이더로 변경 */
.card-container{
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  cursor: grab;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding-bottom: 10px; /* 스크롤바가 없어도 공간 확보 */
}
.card-container::-webkit-scrollbar{
  display: none; /* Chrome, Safari, and Opera */
}

/* 슬라이더 안의 각 카드 스타일 */
.existing-card{
  width: 378px;
  height: 212px;
  background-color: #8dd3bb;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  margin-right: 5px;
  flex-shrink: 0;
  padding: 20px;
  box-sizing: border-box;
  color: black;
}

/* 삭제 버튼 아이콘 스타일 */
.delete-card-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 17px;
  height: 14px;
}

/* 슬라이더 안의 '카드 추가' 버튼 스타일 */
.add-card{
  border-radius: 10px;
  width: 378px; /* 카드의 너비와 동일하게 설정 */
  flex-shrink: 0;
  height: 212px;
  border-width: 2px;
  border-color: #8dd3bb;
  border-style: dashed;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.add-card:hover{
  cursor: pointer;
  background-color: #f7fdfb;
}
/* ======================= 스타일 수정 부분 END ========================= */

/*--- 모달 스타일 (변경 없음) ---*/
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  width: 90%;
  max-width: 640px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card_all {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.card_all p {
  margin: 0;
  align-self: flex-start;
}

.form-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.card_input {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

.card_input.half-width {
  flex: 1;
}

.card_input label {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  font-size: 14px;
  color: black;
  z-index: 1;
}

.card_input input[type="text"],
.card_input select {
  width: 100%;
  height: 56px;
  padding: 0 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: transparent;
}

.card_input input::placeholder {
  font-size: 14px;
  color: #aaa;
}

.card_input select {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.card_input input:focus,
.card_input select:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.select-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.select-wrapper::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 12px;
  color: #333;
  pointer-events: none;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  align-self: flex-start;
  margin-bottom: 10px;
}

.checkbox-container label {
  font-size: 16px;
  color: #333;
  cursor: pointer;
  user-select: none;
  position: relative;
  top: -1px;
  left: -10px;
}

.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 22px;
  height: 22px;
  border: 2px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox-container input[type="checkbox"]:checked {
  background-color: #333;
  border-color: #333;
}

.checkbox-container input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 7px;
  width: 5px;
  height: 11px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.card-chest{
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 20px 20px;
  margin-bottom: 50px;
}
.Reservation_sign{
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  padding: 7px 24px;
}

.social-login-buttons {
  display: flex;
  justify-content: space-between; /* 아이템들을 양 끝으로 벌리고 사이 간격을 균등하게 */
  gap: 15px; /* 각 박스 사이의 간격 (원하는 값으로 조절) */
  margin-top: 2px; /* 위쪽 여백 */
  margin-bottom: 2px; /* 아래쪽 여백 */
}

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

.channel{
  width: 95%;
  max-width: 1280px;
  margin : 0 auto;
  padding: 20px 0;
  color:#FF8682;
}

</style>