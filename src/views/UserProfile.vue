<template>
  <CommonLayout>

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
        <div class="content-title" style= "font-size: 32px; text-align: left">결제수단</div>
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
  </CommonLayout>
</template>
<script setup>
import CommonLayout from '../components/common/CommonLayout.vue';
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import axios from '../util/axios.js'; // 💡 1. axios를 import 합니다.

const activeTab = ref('account');

// --- 계정 탭 관련 로직 ---

// 💡 2. 사용자 정보를 저장할 reactive 객체를 준비합니다. 초기에는 비워둡니다.
const user = reactive({
name: '',
email: '',
phone: '',
password: '••••••••••', // 비밀번호는 보안상 직접 표시하지 않는 것이 좋습니다.
address: '',
dob: '',
coverImage: 'https://picsum.photos/seed/cover/1000/250',
profileImage: 'https://picsum.photos/seed/profile/120/120'
});

const editingField = ref(null);
const tempUser = reactive({});

// 💡 3. accountFields의 key 값을 UserEntity.java의 필드명과 일치시키거나 매핑합니다.
const accountFields = ref([
{ key: 'name', label: 'Name' },
{ key: 'email', label: 'Email', type: 'email' },
{ key: 'password', label: 'Password', type: 'password' },
{ key: 'phone', label: 'Phone Number', type: 'tel' },
{ key: 'address', label: 'Address' },
{ key: 'dob', label: 'Date of birth' }
]);

// 💡 4. onMounted 훅을 사용하여 컴포넌트가 로드될 때 백엔드에서 사용자 정보를 가져옵니다.
onMounted(async () => {
try {
// 🔔 중요: '/api/user/profile'는 실제 백엔드의 사용자 정보 API 엔드포인트로 변경해야 합니다.
const response = await axios.get('/api/user/profile');
const userData = response.data;

// 💡 5. 백엔드(UserEntity.java) 필드명에 맞춰 프론트엔드 user 객체를 업데이트합니다.
user.name = userData.username;
user.email = userData.userEmail;
user.phone = userData.userPhone;
user.address = userData.userAddress;
user.dob = userData.userBirth; // 필요시 날짜 형식을 'YYYY-MM-DD'로 변환해야 할 수 있습니다.
user.profileImage = userData.imageUrl || 'https://picsum.photos/seed/profile/120/120'; // imageUrl이 없으면 기본 이미지 사용

} catch (error) {
console.error('사용자 정보를 불러오는 데 실패했습니다:', error);
// 실제 서비스에서는 사용자에게 알림을 표시하는 등의 에러 처리를 추가하는 것이 좋습니다.
}
});

function startEditing(fieldKey) {
Object.assign(tempUser, user);
editingField.value = fieldKey;
}

// 💡 6. 정보 수정 시 백엔드 API로 업데이트 요청을 보내도록 수정합니다.
async function saveChanges(fieldKey) {
// 이메일 유효성 검사
if (fieldKey === 'email') {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(tempUser.email)) {
alert('올바른 이메일 형식을 입력해주세요. (예: user@example.com)');
return;
}
}

try {
// 🔔 중요: '/api/user/update'는 실제 백엔드의 사용자 정보 수정 API 엔드포인트로 변경해야 합니다.
// 백엔드 API가 원하는 형식에 맞춰 데이터를 전송해야 합니다. (예: { username: '새이름' })
const payload = {};
const backendFieldMap = {
name: 'username',
email: 'userEmail',
phone: 'userPhone',
address: 'userAddress',
dob: 'userBirth'
};
payload[backendFieldMap[fieldKey] || fieldKey] = tempUser[fieldKey];

await axios.put('/api/user/update', payload);

user[fieldKey] = tempUser[fieldKey];
editingField.value = null;
} catch (error) {
console.error('정보 수정에 실패했습니다:', error);
// 에러 처리 로직
}
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
const filterWrapper = ref(null);

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

// =================== 결제수단 관련 로직 START ===================
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
// =================== 결제수단 관련 로직 END =====================

// --- 공통 라이프사이클 훅 ---
const handleClickOutside = (event) => {
if (filterWrapper.value && !filterWrapper.value.contains(event.target)) {
isFilterOpen.value = false;
}
};

onMounted(() => { document.addEventListener('click', handleClickOutside); });
onBeforeUnmount(() => { document.removeEventListener('click', handleClickOutside); });
</script>

<style scoped>
@import "../assets/css/UserProfile.css";
</style>