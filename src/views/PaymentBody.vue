<template>
  <CommonLayout>
  <div class="channel">Istanbul &nbsp; &gt; <span style="font-size: 20px; color: black"> &nbsp; 해튼호텔 </span></div>
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
                <img class="payment-hotel-logo" src="../assets/img/cvk_hotel_logo.png" alt="">
              </div>
              <div class = "hotel-link-details">
                <div style="font-size: 20px;">
                  해튼호텔
                </div>
                <div style="font-size: 14px; color: #888888">
                  <img class="location-logo" src="../assets/img/location.png" alt="">
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
              <img src="../assets/img/left_line.png" height="7" width="39" alt="" style="margin-right: 30px"/>
              <img src="../assets/img/hotel_image.png" height="45" width="42" alt="" style="margin-right: 30px"/>
              <img src="../assets/img/right_line.png" height="7" width="39" alt=""/>
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
          <div style="font-size: 32px; font-weight: bold; margin-bottom: 25px; text-align: left">카드등록</div>
          <div class="card-container" ref="slider" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave"
             @mouseup="handleMouseUp" @mousemove="handleMouseMove">
          <div v-for="card in cards" :key="card.id" class="existing-card">
            <div style="text-align: left">
              <span style="font-size: 24px; font-weight: bold;">**** **** ****</span><br>
              <span style="font-size: 32px; font-weight: bold;">{{ card.lastFour }}</span>
            </div>
            <img src="../assets/img/trash.png" @click="deleteCard(card.id)" alt="Delete Card" class="delete-card-btn"
                 style="cursor: pointer; width: 21px; height: 18px">
            <div style="display: flex; justify-content: space-between; align-content: center;">
              <div>
                <span>valid thru</span><br>
                <span style="font-size: 20px; font-weight: bold;">{{ card.expDate }}</span>
              </div>
              <div style="align-content: center">
                <img src="../assets/img/visa.png" height="33" width="52" alt=""/>
              </div>
            </div>

          </div>
          <div class="add-card" @click="openModal">
            <img style="position: absolute; z-index: 1; transform: translate(-50%, -50%); top: 50%; left: 50%" src="../assets/img/circle.png" alt="">
            <img style="position: absolute; z-index: 2; transform: translate(-50%, -50%); top: 50%; left: 50%" src="../assets/img/plus.png" alt="">
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
                  <img src="../assets/img/login_facebook.png" alt="">
                </div>
                <div class="social-button-box">
                  <img src="../assets/img/login_google.png" alt="">
                </div>
                <div class="social-button-box">
                  <img src="../assets/img/login_apple.png" alt="">
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
          <img src="../assets/img/cvk_hotel_photo.png" height="120" width="121" alt=""/>
          <div>
            <div style="display: block; font-size: 16px; color: #888888; text-align: left">CVK Park Bosphorus...</div>
            <div style="font-size: 20px; font-weight: bold; text-align: left; margin-bottom: 15px">Superior room - 1 더블베드 or 2 트윈 베드</div>
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
  </CommonLayout>
</template>

<script setup lang="js">
import { ref, watch } from 'vue';
import CommonLayout from "../components/common/CommonLayout.vue";

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
@import '../assets/css/PaymentBody.css';

</style>