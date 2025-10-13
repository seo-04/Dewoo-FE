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

    <div class="main-content">
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
        <div v-for="field in accountFields" :key="field.key" class="info-group">
          <label class="info-label">{{ field.label }}</label>
          <div class="info-value-wrapper">
            <template v-if="editingField !== field.key">
              <span class="info-value">{{ user[field.key] }}</span>
              <button @click="startEditing(field.key)" class="change-btn">
                <img src="../assets/img/Edit.svg" alt="Edit" class="edit-icon" style="position: relative; top: -1px">Change
              </button>
            </template>
            <template v-else>
              <input :type="field.type || 'text'" v-model="tempUser[field.key]" class="edit-input" @keyup.enter="saveChanges(field.key)" @keyup.esc="cancelEdit">
              <div class="edit-actions">
                <button @click="saveChanges(field.key)" class="save-btn">Save</button>
                <button @click="cancelEdit" class="cancel-btn">Cancel</button>
              </div>
            </template>
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
          <img src="../assets/img/bed.png" alt="" style="position: relative; top: 1px">
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
</template>

<script setup lang="js">
import {ref, reactive, computed, watch, onMounted, onBeforeUnmount} from 'vue';

const activeTab = ref('account');

// --- 계정 탭 관련 로직 ---
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

const editingField = ref(null);
const tempUser = reactive({});
const accountFields = ref([
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' },
  { key: 'phone', label: 'Phone Number', type: 'tel' },
  { key: 'address', label: 'Address' },
  { key: 'dob', label: 'Date of birth' }
]);

function startEditing(fieldKey) {
  Object.assign(tempUser, user);
  editingField.value = fieldKey;
}

function saveChanges(fieldKey) {
  if (fieldKey === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempUser.email)) {
      alert('올바른 이메일 형식을 입력해주세요. (예: user@example.com)');
      return;
    }
  }
  user[fieldKey] = tempUser[fieldKey];
  editingField.value = null;
}

function cancelEdit() {
  editingField.value = null;
}

// --- 내역 탭 관련 로직 ---
const allBookings = ref([
  { id: 1, roomImageSrc: "https://picsum.photos/seed/room1/80/80", checkInDate: "2025-12-08", checkInDisplay: "Thur, Dec 8", checkOutDate: "2025-12-09", checkOutDisplay: "Fri, Dec 9" },
  { id: 2, roomImageSrc: "https://picsum.photos/seed/room2/80/80", checkInDate: "2026-01-15", checkInDisplay: "Mon, Jan 15", checkOutDate: "2026-01-18", checkOutDisplay: "Thur, Jan 18" },
  { id: 3, roomImageSrc: "https://picsum.photos/seed/room3/80/80", checkInDate: "2025-09-20", checkInDisplay: "Mon, Nov 20", checkOutDate: "2025-09-22", checkOutDisplay: "Wed, Nov 22" },
]);
const selectedFilter = ref('upcoming');
const isFilterOpen = ref(false);

const filteredBookings = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0];
  switch (selectedFilter.value) {
    case 'upcoming': return allBookings.value.filter(b => b.checkInDate >= todayStr);
    case 'latest': return [...allBookings.value].sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
    case 'oldest': return [...allBookings.value].sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
    default: return [];
  }
});

function selectFilter(filter) {
  selectedFilter.value = filter;
  isFilterOpen.value = false;
}

// =================== [수정됨] 결제수단 관련 로직 START ===================
const cards = ref([]);
const isModalOpen = ref(false);
const newCard = ref({ number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false });
const selectedCountry = ref('United States');
const countries = ref([
  { code: 'US', name: 'United States' }, { code: 'CA', name: 'Canada' }, { code: 'KR', name: 'South Korea' }, { code: 'JP', name: 'Japan' }, { code: 'GB', name: 'United Kingdom' },
]);

const slider = ref(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

function openModal() { isModalOpen.value = true; }
function closeModal() {
  isModalOpen.value = false;
  newCard.value = {number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false};
}

function addCard() {
  if (newCard.value.number.length < 19) {
    alert('올바른 카드 번호를 입력하세요.');
    return;
  }
  const cardToAdd = { id: Date.now(), lastFour: newCard.value.number.slice(-4), expDate: newCard.value.expDate };
  cards.value.unshift(cardToAdd);
  if (!newCard.value.saveInfo) { closeModal(); } else { isModalOpen.value = false; }
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
  if(slider.value) slider.value.style.cursor = 'grab';
}
function handleMouseUp() {
  isDown.value = false;
  if(slider.value) slider.value.style.cursor = 'grab';
}
function handleMouseMove(e) {
  if (!isDown.value) return;
  e.preventDefault();
  const x = e.pageX - slider.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  slider.value.scrollLeft = scrollLeft.value - walk;
}

watch(() => newCard.value.number, (newValue) => {
  const cleaned = newValue.replace(/[^\d]/g, '').slice(0, 16);
  newCard.value.number = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
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
// =================== [수정됨] 결제수단 관련 로직 END =====================

// --- 공통 라이프사이클 훅 ---
const filterWrapper = ref(null);
const handleClickOutside = (event) => {
  if (filterWrapper.value && !filterWrapper.value.contains(event.target)) {
    isFilterOpen.value = false;
  }
};

onMounted(() => { document.addEventListener('click', handleClickOutside); });
onBeforeUnmount(() => { document.removeEventListener('click', handleClickOutside); });
</script>

<style scoped>
/* 기존 스타일은 변경되지 않았습니다. */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: #f7f7f7;
  color: #333;
  margin: 0;
  padding: 0;
}
.main-container {
  margin: 0 auto;
  max-width: 1232px;
}
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
.main-content {
  margin-top: 30px;
  padding: 0 20px;
  white-space: nowrap;
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
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #333;
}
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
  flex-shrink: 0;
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
  padding: 10px 15px;
  gap: 5px;
  align-items: center;
}
.change-btn:hover {
  color: #000;
}
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
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.filter-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 10;
  margin-top: 5px;
}
.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #f5f5f5;
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
}
.card-left {
  display: flex;
  align-items: center;
  gap: 24px;
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
}
.date-info-group {
  display: flex;
  flex-direction: column;
}
.date-label {
  color: #888;
  margin-bottom: 4px;
}
.date-value {
  font-size: 24px;
  font-weight: 600;
}
.dash-separator {
  width: 25px;
  height: 2px;
  background-color: #ccc;
  margin: 0 10px;
}
.room-section {
  padding: 15px 24px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}
.edit-input {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  margin-right: 10px;
}
.edit-actions {
  display: flex;
  gap: 10px;
}
.save-btn, .cancel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
.save-btn { background-color: #8dd3bb; }
.cancel-btn { background-color: #f0f0f0; }

/* =================== [수정됨] 결제수단 관련 스타일 START =================== */
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
  padding-bottom: 10px;
}
.card-container::-webkit-scrollbar{
  display: none;
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
  padding: 20px;
  box-sizing: border-box;
}
.add-card{
  border-radius: 10px;
  width: 378px;
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
.card_all p { margin: 0; align-self: flex-start; }
.form-row { display: flex; gap: 20px; width: 100%; }
.card_input { position: relative; width: 100%; margin-bottom: 10px; }
.card_input.half-width { flex: 1; }
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
.card_input input::placeholder { font-size: 14px; color: #aaa; }
.card_input select { -webkit-appearance: none; appearance: none; cursor: pointer; }
.select-wrapper { position: relative; width: 100%; height: 100%; }
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
.delete-card-btn{
  position: absolute;
  top: 20px;
  right: 20px;
  width: 17px;
  height: 14px;
}
/* =================== [수정됨] 결제수단 관련 스타일 END ===================== */
</style>