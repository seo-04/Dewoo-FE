    <template>
      <CommonLayout>
        <!-- 카드 등록시 떠 있을 토스트 알림 -->
        <transition name="toast-fade">
          <div v-if="showSuccessToast" class="success-toast">
            ✅ 카드가 성공적으로 등록되었습니다.
          </div>
        </transition>

        <div class="channel">{{paymentAccommodation.location}} &nbsp; &gt; <span
          style="font-size: 20px; color: black"> &nbsp; {{ comTitle }} </span></div>
        <div class="payment-body">

          <div class="payment-big">
            <div class="big-roomInfo">

              <div class="Reservation_Info">
                <div class="roomInfo">
                  <span class="room">{{ roomType.roomTypeName }}</span>
                  <span class="roomPrice">₩{{ formatPrice(paymentAccommodation.price*nightCount) }}~<span class="nightCount">/{{nightCount}}일</span>
                  </span>
                </div>
                <div class="hotel-link">
                  <div style="display: flex; justify-content: center;">
                    <div>
                      <img class="payment-hotel-logo" src="../assets/img/cvk_hotel_logo.png" alt="">
                    </div>
                    <div class="hotel-link-details">
                      <div style="font-size: 20px;">
                        {{ comTitle }}
                      </div>
                      <div style="font-size: 14px; color: #888888; text-align: left">
                        <img class="location-logo" src="../assets/img/location.png" alt="">
                        {{ paymentAccommodation.comAddress }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="Reservation_date">
                  <div class="date">
                    <span class="day">{{ checkIn }}</span>
                    <span class="check-IO">Check-In</span>
                  </div>
                  <div class="Reservation_image">
                    <img src="../assets/img/left_line.png" height="7" width="39" alt="" style="margin-right: 30px" />
                    <img src="../assets/img/hotel_image.png" height="45" width="42" alt="" style="margin-right: 30px" />
                    <img src="../assets/img/right_line.png" height="7" width="39" alt="" />
                  </div>
                  <div class="date">
                    <span class="day">{{ checkOut }}</span>
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
                  @click="option.key === 'simple' ? requestTossPayment() : selectPayment(option.key)"
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
                    <img src="../assets/img/trash.png" @click="deleteCard(card.id)" alt="Delete Card"
                         class="delete-card-btn"
                         style="cursor: pointer; width: 21px; height: 18px">
                    <div style="display: flex; justify-content: space-between; align-content: center;">
                      <div style="text-align: left">
                        <span>valid thru</span><br>
                        <span style="font-size: 20px; font-weight: bold;">{{ card.expDate }}</span>
                      </div>
                      <div style="align-content: center">
                        <img src="../assets/img/visa.png" height="33" width="52" alt="" />
                      </div>
                    </div>

                  </div>
                  <div class="add-card" @click="openModal">
                    <img style="position: absolute; z-index: 1; transform: translate(-50%, -50%); top: 50%; left: 50%"
                         src="../assets/img/circle.png" alt="">
                    <img style="position: absolute; z-index: 2; transform: translate(-50%, -50%); top: 50%; left: 50%"
                         src="../assets/img/plus.png" alt="">
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
                          <div v-if="expDateError" class="card-input-error">
                            {{ expDateError }}
                          </div>
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
                            style="width: 512px; height: 48px; font-weight: bold; background-color: #8dd3bb; border-radius: 5px; font-size: 14px; border: none; cursor: pointer">
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

  <!--            <div class="Reservation_sign">-->
  <!--              <span style="font-size: 20px; font-weight: bold; display: block; padding: 15px 0">Login or Sign up to book</span>-->
  <!--              <input class="Reservation_phoneNumber" placeholder="Phone Number" v-model="phoneNumber">-->
  <!--              <span style="font-size: 14px; display: block; padding: 15px 0">예약확인 문자/전화를 위해 전화번호를 남겨주세요</span>-->
  <!--              <button class="continue" :disabled="!isContinueButtonEnabled">continue</button>-->
  <!--              <div class="boundary_line_1">-->
  <!--                <p>Or</p>-->
  <!--              </div>-->
  <!--              <div class="social-login-buttons">-->
  <!--                <div class="social-button-box">-->
  <!--                  <img src="@/assets/login_facebook.png" alt="">-->
  <!--                </div>-->
  <!--                <div class="social-button-box">-->
  <!--                  <img src="@/assets/login_google.png" alt="">-->
  <!--                </div>-->
  <!--                <div class="social-button-box">-->
  <!--                  <img src="@/assets/login_apple.png" alt="">-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="continue-with-email">-->
  <!--                <img src="@/assets/email_icon.png" alt="">-->
  <!--                <span>Continue with email</span>-->
  <!--              </div>-->
  <!--            </div>-->

          <div class="payment-small">
            <div class="payment-small-body">
              <div class="hotel-details">
                <img src={{paymentAccommodation.mainImage}} height="120" width="121" alt="" />
                <div>
                  <div style="display: block; font-size: 16px; color: #888888; text-align: left">{{ comTitle }}</div>
                  <div style="font-size: 20px; font-weight: bold; text-align: left; margin-bottom: 15px">
                    {{ roomType.roomTypeName }}
                  </div>
                  <div class="mini-review">
                    <div class="review-box">{{ paymentAccommodation.reviewAvg }}</div>
                    <div style="position: relative; bottom: 1px">
                      <span style="font-weight: bold; font-size: 14px">Very good</span>
                      <span style="font-size: 12px; margin-left: 10px">{{ paymentAccommodation.reviewCount }} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="small_boundary_line">
              </div>
              <div class="reservation-protect">
                Your booking is protected by <span style="font-weight: bold">golobe</span>
              </div>
              <div class="small_boundary_line">
              </div>
              <div class="price-details">
                <div style="font-size: 16px; font-weight: bold; text-align: left; margin-bottom: 5px">Price Details</div>
                <div class="price-type">
                  <span>Base Fare</span>
                  <span class="detail-amount">₩{{ formatPrice(paymentAccommodation.price * nightCount)}} </span>
                </div>
                <div class="price-type">
                  <span>Discount</span>
                  <span class="detail-amount">₩{{ formatPrice(paymentAccommodation.discount * nightCount) }}</span>
                </div>
                <div class="price-type">
                  <span>Taxes</span>
                  <span class="detail-amount">₩{{ formatPrice(paymentAccommodation.price * 0.1 * nightCount) }}</span>
                </div>
                <div class="price-type">
                  <span>Service Fee</span>
                  <span class="detail-amount">₩5,000</span>
                </div>
              </div>
              <div class="small_boundary_line">
              </div>
              <div class="price-type">
                <span class="price-type">Total</span>
                <span class="detail-amount">₩{{ formatPrice(TotalPrice) }}</span>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </template>

    <script setup lang="js">
    import { ref, watch, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import axios from 'axios';
    import CommonLayout from '../components/common/CommonLayout.vue';

    // --- 상태 변수 ---
    const showSuccessToast = ref(false);
    const toastTimer = ref(null);
    const comTitle = ref('');
    const roomType = ref({});
    const paymentAccommodation = ref({});
    const checkIn = ref('');
    const checkOut = ref('');
    const cards = ref([]);
    const selectedPayment = ref(null);
    const isModalOpen = ref(false);
    const newCard = ref({ number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false });
    const expDateError = ref('');
    const selectedCountry = ref('United States');
    const countries = ref([
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'KR', name: 'South Korea' },
      { code: 'JP', name: 'Japan' },
      { code: 'GB', name: 'United Kingdom' },
    ]);
    const paymentOptions = ref([
      { key: 'card', title: '카드결제', subtitle: '카드 등록 후 결제가 진행됩니다.' },
      { key: 'simple', title: '간편결제', subtitle: '카드 등록 없이 간편인증으로 결제가 진행됩니다.' },
    ]);

    const route = useRoute();

    // --- Computed ---
    const nightCount = computed(() => {
      if (!checkIn.value || !checkOut.value) return 0;
      const diffTime = new Date(checkOut.value) - new Date(checkIn.value);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffTime > 0 ? diffDays : 0;
    });

    const TotalPrice = computed(() => {
      const basePrice = Number(paymentAccommodation.value.price * nightCount.value) || 0;
      const discount = Number(paymentAccommodation.value.discount * nightCount.value) || 0;
      const tax = basePrice * 0.1;
      const serviceFee = 5000;
      return basePrice - discount + tax + serviceFee;
    });

    // --- [핵심] Toss Payments SDK 로드 (안전한 방식) ---
    const loadTossPayments = () => {
      return new Promise((resolve, reject) => {
        // 1. 이미 로드되어 있다면 바로 반환
        if (window.TossPayments) {
          return resolve(window.TossPayments);
        }

        // 2. 스크립트 태그 생성
        const script = document.createElement('script');
        script.src = 'https://js.tosspayments.com/v1/payment.js';
        // ⚠️ 주의: crossOrigin 속성 절대 금지 (CORS 에러 원인)

        script.onload = () => {
          if (window.TossPayments) {
            resolve(window.TossPayments);
          } else {
            reject(new Error('TossPayments SDK 로드 실패'));
          }
        };
        script.onerror = () => reject(new Error('TossPayments 스크립트 로드 실패 (네트워크 차단 확인 필요)'));

        document.head.appendChild(script);
      });
    };

    // --- [핵심] 결제 요청 함수 ---
    const requestTossPayment = async () => {
      selectedPayment.value = 'simple'; // UI 선택 상태 변경

      // 가격이 0원 이하인지 방어 코드
      const amount = TotalPrice.value;
      if (amount <= 0) {
        alert('결제 금액이 올바르지 않습니다.');
        return;
      }

      try {
        const TossPayments = await loadTossPayments();

        // 🔥 본인의 클라이언트 키를 입력하세요 (테스트키 예시: test_ck_D5GePWvyJnrKwdP7Md5gLzN97Eoq)
        // 기존 코드에 있던 키가 서로 달랐습니다. 하나로 통일해야 합니다.
        const tossPayments = TossPayments('test_ck_EP59LybZ8BLeQDq27EjbV6GYo7pR');

        await tossPayments.requestPayment('카드', {
          amount: amount,
          orderId: `order_${new Date().getTime()}`,
          orderName: `${comTitle.value} - ${roomType.value.roomTypeName || '객실'}`,
          customerName: 'Tomhoon', // 실제 유저 이름 변수로 교체 권장
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
        });
      } catch (error) {
        console.error('결제 요청 에러:', error);
        if (error.code === 'USER_CANCEL') {
          alert('사용자가 결제를 취소했습니다.');
        } else {
          alert('결제 창을 띄우지 못했습니다. (팝업 차단/확장프로그램 확인)');
        }
      }
    };

    // --- API 데이터 통신 ---
    onMounted(() => {
      const accId = route.query.accId;
      checkIn.value = route.query.checkIn || '날짜 없음';
      checkOut.value = route.query.checkOut || '날짜 없음';

      if (accId) fetchPaymentData(accId);
      fetchCards();
    });

    async function fetchPaymentData(accId) {
      try {
        const response = await axios.get(`/api/room/${accId}`);
        if (response.data.code === 'SUCCESS') {
          const result = response.data.result;
          paymentAccommodation.value = result.paymentAccommodation;
          roomType.value = result.roomType;
          comTitle.value = result.paymentAccommodation.comTitle;
        }
      } catch (error) {
        console.error('결제 정보 로딩 실패:', error);
      }
    }

    async function fetchCards() {
      const token = localStorage.getItem('jwtToken'); // 토큰 키 이름 확인 ('token' vs 'jwtToken')
      if (!token) return;

      try {
        const response = await axios.get('/api/card', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.code === 'SUCCESS') {
          cards.value = response.data.result.map(card => ({
            id: card.cardId,
            lastFour: card.cardNumber.slice(-4),
            expDate: card.expDate,
          }));
        }
      } catch (error) {
        console.error('카드 목록 로드 실패 (로그인 필요)');
      }
    }

    // --- 카드 등록/삭제 로직 ---
    function openModal() { isModalOpen.value = true; }
    function closeModal() {
      isModalOpen.value = false;
      newCard.value = { number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false };
    }

    function validateExpDate() {
      // ... (기존 유효성 검사 로직 유지)
      const value = newCard.value.expDate;
      if(!value || value.trim().length === 0){ expDateError.value = '유효기간 입력'; return false; }
      // ... (줄여서 표기함, 기존 로직 그대로 사용하시면 됩니다)
      return true;
    }

    async function addCard() {
      // ... (기존 addCard 로직 유지)
      // validateExpDate 체크 후 axios.post 호출
    }

    async function deleteCard(cardId) {
      // ... (기존 deleteCard 로직 유지)
    }

    // --- 기타 유틸 ---
    const selectPayment = (key) => { selectedPayment.value = key; };
    const formatPrice = (price) => Number(price).toLocaleString('ko-KR');

    // --- 드래그 스크롤 ---
    const slider = ref(null);
    const isDown = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);
    // ... (handleMouseDown 등 기존 드래그 함수들 유지)

    // --- Watchers ---
    watch(() => newCard.value.number, (val) => { /* ... */ });
    watch(() => newCard.value.expDate, (val) => { /* ... */ });
    // ... (기존 Watchers 유지)

    // --- (중요) 이미지 에러 처리 ---
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
    }
    </script>

    <style scoped>
    @import '../assets/css/PaymentBody.css';

    </style>