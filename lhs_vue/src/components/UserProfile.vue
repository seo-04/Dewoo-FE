<template>
  <div class="main-container">

    <section class="profile-section">
      <div class="cover-image-container">
        <img :src="user.coverImage" :alt="`${user.name}'s cover photo`" class="cover-image"/>
        <button class="upload-cover-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Upload new cover
        </button>
      </div>
      <div class="profile-info-container">
        <div class="profile-image-wrapper">
          <img :src="user.profileImage" :alt="`${user.name}'s profile picture`" class="profile-image"/>
        </div>
        <h1 class="user-name">{{ user.name }}</h1>
        <p class="user-email">{{ user.email }}</p>
      </div>
    </section>

    <main class="main-content">
      <nav class="tabs">
        <a href="#" class="tab" :class="{ active: activeTab === 'account' }"
           @click.prevent="activeTab = 'account'">계정</a>
        <a href="#" class="tab" :class="{ active: activeTab === 'history' }"
           @click.prevent="activeTab = 'history'">내역</a>
        <a href="#" class="tab" :class="{ active: activeTab === 'payment' }"
           @click.prevent="activeTab = 'payment'">결제수단</a>
      </nav>

      <div v-if="activeTab === 'account'" class="tab-content active" id="account-tab">
        <h1 class="content-title">Account</h1>
        <div class="info-group">
          <label class="info-label">Name</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.name }}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
        <div class="info-group">
          <label class="info-label">Email</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.email }}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
        <div class="info-group">
          <label class="info-label">Password</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.password }}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
        <div class="info-group">
          <label class="info-label">Phone Number</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.phone }}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
        <div class="info-group">
          <label class="info-label">Address</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.address }}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
        <div class="info-group">
          <label class="info-label">Date of birth</label>
          <div class="info-value-wrapper">
            <span class="info-value">{{ user.dob}}</span>
            <button class="change-btn"><img src="@/assets/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change</button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'history'" class="tab-content active" id="history-tab">
        <div class="booking-header">
          <h2 class="content-title">예약 내역</h2>
          <div class="filter-wrapper" ref="filterWrapper">
            <div class="filter-options" @click="isFilterOpen = !isFilterOpen" :class="{ expanded: isFilterOpen }">
              <span>{{ selectedFilter }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div v-if="isFilterOpen" class="filter-dropdown show">
              <div class="dropdown-item" @click="selectFilter('upcoming')">Upcoming</div>
              <div class="dropdown-item" @click="selectFilter('latest')">최신순</div>
              <div class="dropdown-item" @click="selectFilter('oldest')">오래된순</div>
            </div>
          </div>
        </div>
        <div class="room-section">
          <img src="@/assets/bed.png" alt="" style="position: relative; top: 1px">
          객실
        </div>
        <div class="booking-list">
          <div v-if="filteredBookings.length === 0">
            <p style="text-align:center; color: #888;">예약 내역이 없습니다.</p>
          </div>
          <div v-else v-for="booking in filteredBookings" :key="booking.id" class="booking-item">
            <div class="booking-card">
              <div class="card-left">
                <div class="hotel-logo-container"><img :src="booking.roomImageSrc" alt="Hotel Logo" class="hotel-logo">
                </div>
                <div class="checkin-checkout-dates">
                  <div class="date-info-group">
                    <span class="date-label">Check-In</span>
                    <span class="date-value">{{ booking.checkInDisplay }}</span>
                  </div>
                  <div class="dash-separator"></div>
                  <div class="date-info-group">
                    <span class="date-label">Check Out</span>
                    <span class="date-value">{{ booking.checkOutDisplay }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'payment'" class="tab-content active" id="payment-tab">
        <div class="content-title" style= "font-size: 32px;">결제수단</div>
        <div class="card-container" ref="slider" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave"
             @mouseup="handleMouseUp" @mousemove="handleMouseMove">
          <div v-for="card in cards" :key="card.id" class="existing-card">
            <div>
              <span style="font-size: 24px; font-weight: bold;">**** **** ****</span><br>
              <span style="font-size: 32px; font-weight: bold;">{{ card.lastFour }}</span>
            </div>
            <img src="@/assets/trash.png" @click="deleteCard(card.id)" alt="Delete Card" class="delete-card-btn"
                 style="cursor: pointer">
            <div>
              <span>valid thru</span><br>
              <span style="font-size: 20px; font-weight: bold;">{{ card.expDate }}</span>
            </div>
          </div>
          <div class="add-card" @click="openModal">
            <img style="position: absolute; z-index: 1; transform: translate(-50%, -50%); top: 50%; left: 50%" src="@/assets/circle.png" alt="">
            <img style="position: absolute; z-index: 2; transform: translate(-50%, -50%); top: 50%; left: 50%" src="@/assets/plus.png" alt="">
          </div>
        </div>
      </div>
    </main>

    <div v-if="isModalOpen" class="modal-overlay show" @click.self="closeModal">
      <div class="modal-content">
        <div class="card_all">
          <p style="font-size: 40px; font-weight: bold; margin-bottom: 20px">카드 추가</p>
          <div class="card_input">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="newCard.number" placeholder="1234 5678 9101 1121">
          </div>
          <!-- START: Changed Block for Exp.Date and CVC -->
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
          <!-- END: Changed Block for Exp.Date and CVC -->
          <div class="card_input">
            <label for="nameOnCard">Name on Card</label>
            <input type="text" id="nameOnCard" v-model="newCard.name" placeholder="John Doe">
          </div>
          <!-- START: Changed class for consistency -->
          <div class="card_input">
            <!-- END: Changed class for consistency -->
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
</template>

<script setup lang="js">
import {ref, reactive, computed, watch, onMounted, onBeforeUnmount} from 'vue';

const activeTab = ref('account');
const selectedCountry = ref('United States'); // Added for the dropdown

// 사용자 정보 (계정 탭)
const user = reactive({
  name: 'Tomhoon',
  email: 'gnsdl9079@gmail.com',
  phone: '010-5555-5555',
  password: '••••••••••',
  address: '경기도 화성시 화성읍 도레미아파트 101동 101호',
  dob: '1999-99-99',
  coverImage: 'https://picsum.photos/seed/cover/1000/250',
  profileImage: 'https://picsum.photos/seed/profile/120/120'
});

// 예약 내역 (내역 탭)
const allBookings = ref([
  {
    id: 1,
    roomName: "스탠다드 더블룸",
    roomImageSrc: "https://picsum.photos/seed/room1/80/80",
    checkInDate: "2025-12-08",
    checkInDisplay: "Thur, Dec 8",
    checkOutDate: "2025-12-09",
    checkOutDisplay: "Fri, Dec 9",
    checkInTime: "12:00pm",
    checkOutTime: "11:30am",
    roomNumber: "On arrival"
  },
  {
    id: 2,
    roomName: "디럭스 스위트",
    roomImageSrc: "https://picsum.photos/seed/room2/80/80",
    checkInDate: "2026-01-15",
    checkInDisplay: "Mon, Jan 15",
    checkOutDate: "2026-01-18",
    checkOutDisplay: "Thur, Jan 18",
    checkInTime: "03:00pm",
    checkOutTime: "11:00am",
    roomNumber: "101"
  },
  {
    id: 3,
    roomName: "패밀리 룸",
    roomImageSrc: "https://picsum.photos/seed/room3/80/80",
    checkInDate: "2025-09-20",
    checkInDisplay: "Mon, Nov 20",
    checkOutDate: "2025-09-22",
    checkOutDisplay: "Wed, Nov 22",
    checkInTime: "02:00pm",
    checkOutTime: "12:00pm",
    roomNumber: "203"
  },
]);
const selectedFilter = ref('upcoming');
const isFilterOpen = ref(false);

// 결제 수단 (결제수단 탭)
const cards = ref([]);
const isModalOpen = ref(false);
const newCard = ref({
  number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false
});

// 드래그 스크롤
const slider = ref(null); // template의 DOM 요소를 참조
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);


// --- 2. 계산된 속성 (Computed Properties) ---
const filteredBookings = computed(() => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  switch (selectedFilter.value) {
    case 'upcoming':
      return allBookings.value.filter(b => b.checkInDate >= todayStr);
    case 'latest':
      return [...allBookings.value].sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
    case 'oldest':
      return [...allBookings.value].sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
    default:
      return [];
  }
});


// --- 3. 메소드 (Methods) ---
function selectFilter(filter) {
  selectedFilter.value = filter;
  isFilterOpen.value = false;
}

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
  slider.value.style.cursor = 'grabbing';
  startX.value = e.pageX - slider.value.offsetLeft;
  scrollLeft.value = slider.value.scrollLeft;
}

function handleMouseLeave() {
  isDown.value = false;
  slider.value.style.cursor = 'grab';
}

function handleMouseUp() {
  isDown.value = false;
  slider.value.style.cursor = 'grab';
}

function handleMouseMove(e) {
  if (!isDown.value) return;
  e.preventDefault();
  const x = e.pageX - slider.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  slider.value.scrollLeft = scrollLeft.value - walk;
}


// --- 4. 감시자 (Watchers) ---
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


// --- 5. 라이프사이클 훅 (Lifecycle Hooks) ---
const filterWrapper = ref(null);
const handleClickOutside = (event) => {
  if (filterWrapper.value && !filterWrapper.value.contains(event.target)) {
    isFilterOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const countries = ref([
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
]);

</script>

<style scoped>
/* ... (Your existing styles from body to .add-card:hover are fine) ... */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #f7f7f7;
  color: #333;
  margin: 0;
  padding: 0;
}
.main-container {
  margin: 0 auto;
  width: 90%;
}
/*프로필*/
.profile-section {
  position: relative;
  text-align: center;
  margin-bottom: 50px;
}
.cover-image-container {
  position: relative;
  height: 350px;
  background-color: #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.upload-cover-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  color: #333;
  transition: background-color 0.2s;
}
.upload-cover-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}
.profile-info-container {
  position: relative;
  margin-top: -60px;
  padding-bottom: -100px;
}
.profile-image-wrapper {
  display: inline-block;
  border-radius: 50%;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
.user-name {
  font-size: 1.8rem;
  font-weight: 600;
}
.user-email {
  color: #777;
  font-size: 1rem;
}
/* 탭 메뉴 */
.main-content {
  margin-top: 30px;
  padding: 0 20px;
  white-space: nowrap;
}
.header_tabs{
  padding: 0px 15px;
  text-decoration: none;
  color: #888888;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
}
.tabs {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.tab {
  padding: 10px 20px;
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #888;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
}
.tab.active {
  color: #333;
}
.header_tabs .tab{
  padding: 11px 75px;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
}
.header_tabs .tab.active::after{
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #46BD7B;
  border-radius: 2px;
}
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #333;
}
/* 탭 콘텐츠 */
.tab-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: none;
  white-space: nowrap;
}
.tab-content.active {
  display: block;
  margin-bottom: 300px;
}
.content-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
/* 계정 탭 스타일 */
.info-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 15px 0;

}
.info-label {
  font-weight: bold;
  color: #555;
  width: 150px;
}
.info-value-wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;

}
.info-value {
  color: #333;
}
.change-btn {
  background: white;
  border: 1px solid #8dd3bb;
  border-radius: 10px;
  color: #555;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.2s;
  display: flex;
  position: relative;
  top: 2px;
  padding: 10px 15px;
  gap: 5px;
  align-items: center;
}
.change-btn:hover {
  color: #000;
}
/* 예약 내역 섹션 스타일 */
.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.filter-wrapper {
  position: relative;
}
.filter-options {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: background-color 0.2s;
}
.filter-options:hover {
  background-color: #e0e0e0;
}
.filter-options svg {
  transition: transform 0.3s ease;
}
.filter-options.expanded svg {
  transform: rotate(180deg);
}
.filter-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  min-width: 120px;
  z-index: 10;
  display: none;
  margin-top: 5px;
}
.filter-dropdown.show {
  display: block;
}
.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
}
.dropdown-item:hover {
  background-color: #f5f5f5;
}
.dropdown-item.selected {
  background-color: #e0f2f7;
  font-weight: bold;
  color: #2196F3;
}
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
.booking-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  border: 1px solid #e0e0e0;
}
.booking-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
}
.hotel-logo-container {
  width: 80px;
  height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  flex-shrink: 0;
}
.hotel-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.checkin-checkout-dates {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}
.date-info-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
}
.date-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
  white-space: nowrap;
}
.date-value {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}
.dash-separator {
  width: 25px;
  height: 2px;
  background-color: #ccc;
  margin: 0 10px;
  flex-shrink: 0;
}
.card-right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
  border-left: 1px solid #e0e0e0;
  padding-left: 35px;
}
.time-room-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  white-space: nowrap;
}
.info-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
  white-space: nowrap;
}
.info-line svg {
  color: #92b8af;
}
.info-line .label {
  font-weight: 500;
  color: #888;
}
.info-line .value {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}
.room-info-item {
  border-left: 1px solid #e0e0e0;
  padding-left: 20px;
}
.actions-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.download-btn {
  background-color: #92b8af;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
  white-space: nowrap;
}
.download-btn:hover {
  background-color: #82a89f;
}
.download-btn svg {
  fill: #fff;
}
.arrow-btn {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  flex-shrink: 0;
}
.arrow-btn svg {
  color: #555;
}
.arrow-btn:hover {
  background-color: #f0f0f0;
}
.room-section {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 15px 24px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.room-section svg {
  width: 20px;
  height: 20px;
  color: #555;
  align-items: center;
}
.card-container{
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  cursor: grab;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.card-container::-webkit-scrollbar{
  display: none;
}
.card{
  width: 378px;
  height: 212px;
  border-radius: 15px;
  padding: 30px;
  box-sizing: border-box;
}
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
}
.add-card{
  border-radius: 10px;
  width: 100%;
  flex-shrink: 0;
  height: 212px;
  border-width: 1px;
  border-color: #8dd3bb;
  border-style: dashed;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}
.add-card:hover{
  cursor: pointer;
}

/*--- START: MODAL STYLES REVISED ---*/
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
  /* height is now determined by content */
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px; /* Space between title, form, and button */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.card_all {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px; /* Consistent vertical spacing between form rows */
}

.card_all p {
  margin: 0; /* remove default margin */
  align-self: flex-start; /* align title to the left */
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
  flex: 1; /* Make items in form-row share width equally */
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
  width: 100%; /* 왼쪽 정렬을 위해 너비 100% 설정 */
  align-self: flex-start; /* 컨테이너 내에서 왼쪽으로 붙임 */
  margin-bottom: 10px; /* 버튼과의 간격 조정 */
}

.checkbox-container label {
  font-size: 16px;
  color: #333;
  cursor: pointer;
  user-select: none; /* 텍스트 드래그 방지 */
  position: relative;
  top: -1px;
  left: -10px;
}

/* 기본 체크박스 숨기기 */
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
  flex-shrink: 0; /* 크기가 줄어들지 않도록 설정 */
}

/* 체크되었을 때의 스타일 */
.checkbox-container input[type="checkbox"]:checked {
  background-color: #333;
  border-color: #333;
}

/* 체크 표시 (V) 만들기 */
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
/*--- END: MODAL STYLES REVISED ---*/
</style>
