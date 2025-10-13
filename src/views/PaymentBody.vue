<template>
  <CommonLayout>
    <div class="channel">Turkey > Istanbul > <span style="font-size: 20px; color: black"> 해튼호텔 </span></div>
    <div class="payment-body">
      <div class="payment-big">
        <div class="big-roomInfo">
          <div class="Reservation_Info">
            <div class="roomInfo">
              <span class="room">Superior room - 1 더블베드 or 2 트윈 베드</span>
              <span class="roomPrice">₩240,000/night</span>
            </div>
            <div class="hotel-link">
              <div style="display: flex">
                <div>
                  <img class="hotel-logo" src="../assets/img/cvk_hotel_logo.png" alt="">
                </div>
                <div class="hotel-link-details">
                  <div style="font-size: 20px;">해튼호텔</div>
                  <div style="font-size: 14px; color: #888888">
                    <img class="location-logo" src="../assets/img/location.png" alt="">
                    Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                  </div>
                </div>
              </div>
            </div>
            <div class="Reservation_date">
              <div class="date">
                <span class="day">Thursday, Dec 8</span>
                <span class="check-IO">Check-In</span>
              </div>
              <div class="Reservation_image">
                <img src="../assets/img/left_line.png" height="7" width="39" alt="" style="margin-right: 30px"/>
                <img src="../assets/img/hotel_image.png" height="45" width="42" alt="" style="margin-right: 30px"/>
                <img src="../assets/img/right_line.png" height="7" width="39" alt=""/>
              </div>
              <div class="date">
                <span class="day">Friday, Dec 9</span>
                <span class="check-IO">Check-Out</span>
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
          </div>
          <div id="payment-widget" v-show="selectedPayment === 'simple'"></div>
        </div>
      </div>
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
          <div class="boundary_line"></div>
          <div class="reservation-protect">Your booking is protected by <span style="font-weight: bold">golobe</span></div>
          <div class="boundary_line"></div>
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
          <div class="boundary_line"></div>
          <div class = "price-type">
            <span class = "price-type">Total</span>
            <span class = "detail-amount">₩265,000</span>
          </div>
        </div>
      </div>
    </div>
  </CommonLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CommonLayout from '../components/common/CommonLayout.vue';

// --- 토스페이먼츠 연동 로직 ---
const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

const requestTossPayment = async () => {
  // 1. window.TossPayments가 존재하는지 확인합니다.
  if (typeof window.TossPayments === 'undefined') {
    alert("Toss Payments SDK가 로드되지 않았습니다. 페이지를 새로고침 후 다시 시도해주세요.");
    return;
  }

  // 2. TossPayments 객체를 생성합니다.
  const tossPayments = window.TossPayments(clientKey);

  try {
    // 3. 결제창을 호출합니다.
    await tossPayments.requestPayment('카드', {
      amount: 265000,
      orderId: `order-${new Date().getTime()}-${Math.random().toString(36).slice(2)}`,
      orderName: '해튼호텔 Superior room',
      customerName: '박토스',
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  } catch (error) {
    console.error("Toss Payments 에러:", error);
    if (error.code === 'USER_CANCEL') {
      alert('결제를 취소했습니다.');
    } else {
      // 그 외의 모든 오류는 토스에서 받은 메시지를 그대로 노출합니다.
      alert(`결제 요청에 실패했습니다: ${error.message || '알 수 없는 오류'}`);
    }
    selectedPayment.value = null; // 오류 발생 시 선택 초기화
  }
};
// --- 토스페이먼츠 연동 로직 끝 ---


// --- 기존 컴포넌트 로직 ---
const cards = ref([]);
const paymentOptions = ref([
  { key: 'card', title: '카드결제', subtitle: '카드 등록 후 결제가 진행됩니다.' },
  { key: 'simple', title: '간편결제', subtitle: '토스페이먼츠로 결제가 진행됩니다.' },
]);
const selectedPayment = ref(null);

const selectPayment = async (key) => {
  selectedPayment.value = key;
  if (key === 'simple') {
    await requestTossPayment();
  }
};

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

const slider = ref(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

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

function deleteCard(cardId) {
  if (confirm("정말 이 카드를 삭제하시겠습니까?")) {
    cards.value = cards.value.filter(card => card.id !== cardId);
  }
}

function handleMouseDown(e) {
  isDown.value = true;
  if (slider.value) slider.value.style.cursor = 'grabbing';
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
  if (slider.value) slider.value.scrollLeft = scrollLeft.value - walk;
}

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