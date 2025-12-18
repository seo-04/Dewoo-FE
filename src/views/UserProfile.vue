<template>
  <CommonLayout>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <div class="main-container">

      <section class="profile-section">
        <div class="cover-image-container">
          <img
            v-for="(imageSrc, index) in coverImages"
            :key="index"
            :src="imageSrc"
            alt="Cover photo"
            class="cover-image"
            :class="{ active: index === currentCoverIndex }"
          />
        </div>
        <div class="profile-info-container">
          <div class="profile-image-wrapper">
            <img
              v-if="user.profileImage"
              :src="user.profileImage"
              :alt="`${user.name}'s profile picture`"
              class="profile-image"
            />
            <img
              v-else
              src="@/assets/img/icon/user_icon.png"
              alt="Guest"
              class="profile-image"
              style="object-fit: cover;"
            >
            <input type="file" ref="profileImageInput" @change="handleProfileImageUpload" style="display: none;" accept="image/*">
            <button class="edit-profile-btn" @click="triggerProfileImageUpload">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>
          <h1 class="user-name">{{ user.name }}</h1>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </section>

      <div class="main-content">
        <nav class="tabs">
          <a href="#" class="tab" :class="{ active: activeTab === 'account' }" @click.prevent="activeTab = 'account'">계정</a>
          <a href="#" class="tab" :class="{ active: activeTab === 'history' }" @click.prevent="activeTab = 'history'">내역</a>
          <a href="#" class="tab" :class="{ active: activeTab === 'payment' }" @click.prevent="activeTab = 'payment'">결제수단</a>
        </nav>

        <div v-if="activeTab === 'account'" class="tab-content active-force" id="account-tab">
          <h1 class="content-title">Account</h1>
          <div v-for="field in accountFields" :key="field.key" class="info-group">
            <label class="info-label">{{ field.label }}</label>
            <div class="info-value-wrapper">
              <template v-if="editingField !== field.key">
                <span class="info-value">{{ user[field.key] }}</span>
                <button v-if="field.key !== 'password' && field.key !== 'email' && field.key !== 'dob'" @click="startEditing(field.key)" class="change-btn">
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

        <div v-if="activeTab === 'history'" class="tab-content active-force" id="history-tab">
          <div class="booking-header">
            <h2 class="content-title">예약 내역</h2>
            <div class="filter-wrapper" ref="filterWrapper">
              <div class="filter-options" @click="isFilterOpen = !isFilterOpen" :class="{ expanded: isFilterOpen }">
                <span>{{ filterLabel[selectedFilter] }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
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

          <div class="booking-list-container">
            <div v-if="isLoading" style="text-align: center; padding: 20px;">Loading...</div>
            <ReservationList
              v-else
              :list="filteredReservations"
              @cancel="handleCancelReservation"
            />
          </div>
        </div>

        <div v-if="activeTab === 'payment'" class="tab-content active-force" id="payment-tab">
          <div class="content-title-1" style= "font-size: 32px; text-align: left">결제수단</div>

          <div class="card-container" ref="slider" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave" @mouseup="handleMouseUp" @mousemove="handleMouseMove">
            <div v-for="card in cards" :key="card.id" class="existing-card">
              <div style="text-align: left">
                <span style="font-size: 24px; font-weight: bold;">**** **** ****</span><br>
                <span style="font-size: 32px; font-weight: bold;">{{ card.lastFour }}</span>
              </div>
              <img src="../assets/img/trash.png" @click="deleteCard(card.id)" alt="Delete Card" class="delete-card-btn" style="cursor: pointer; width: 21px; height: 18px">
              <div style="display: flex; justify-content: space-between; align-content: center;">
                <div style="text-align: left">
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
              <label>Card Number</label>
              <input type="text" v-model="newCard.number" placeholder="1234 5678 9101 1121">
            </div>

            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="card_input half-width" style="flex: 1;">
                <label>Exp. Date</label>
                <input type="text" v-model="newCard.expDate" placeholder="MM/YY">
                <div v-if="expDateError" class="card-input-error" style="color: red; font-size: 12px; margin-top: 5px;">
                  {{ expDateError }}
                </div>
              </div>
              <div class="card_input half-width" style="flex: 1;">
                <label>CVC</label>
                <input type="text" v-model="newCard.cvc" placeholder="123">
              </div>
            </div>

            <div class="card_input">
              <label>Name on Card</label>
              <input type="text" v-model="newCard.name" placeholder="John Doe">
            </div>

            <div class="card_input">
              <label>Country or Region</label>
              <div class="select-wrapper">
                <select v-model="selectedCountry" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                  <option v-for="country in countries" :key="country.code" :value="country.name">
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>

            <button @click="addCard" style="width: 100%; height: 48px; background-color: #8dd3bb; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; margin-top: 20px;">
              Add Card
            </button>
          </div>
        </div>
      </div>

    </div>
  </CommonLayout>
</template>

<script setup>
import CommonLayout from '../components/common/CommonLayout.vue';
import ReservationList from '../components/reservation/ReservationList.vue';
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import axios from '../util/axios.js';

// --- Cover Image ---
const coverImages = ref(['/cover/animal_trip1.jpg', '/cover/animal_trip2.jpg', '/cover/animal_trip3.jpg', '/cover/animal_trip4.jpg']);
const currentCoverIndex = ref(0);

// --- Tab State ---
const activeTab = ref('account');

// --- Account (User Profile) ---
const user = reactive({
  name: '', email: '', phone: '', password: '••••••••••', address: '', dob: '',
  profileImage: null
});
const editingField = ref(null);
const tempUser = reactive({});
const accountFields = ref([
  { key: 'name', label: 'Name' }, { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' }, { key: 'phone', label: 'Phone Number', type: 'tel' },
  { key: 'address', label: 'Address' }, { key: 'dob', label: 'Date of birth' }
]);

// 🖼️ [이미지 경로 보정 함수]
function getFullImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;

  let path = imagePath;
  if (!path.startsWith('/user-images/')) {
    path = `/user-images/${path.startsWith('/') ? path.substring(1) : path}`;
  }
  return `http://localhost:8085${path}`;
}

// --- 프로필 이미지 업로드 로직 ---
const profileImageInput = ref(null);
function triggerProfileImageUpload() { profileImageInput.value.click(); }

async function handleProfileImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axios.post('/api/user/profile-image', formData, { headers: {'Content-Type': 'multipart/form-data'} });
    user.profileImage = getFullImageUrl(res.data.result) + `?t=${Date.now()}`;
    window.dispatchEvent(new CustomEvent('profile-image-updated', { detail: res.data.result }));
    alert('프로필 이미지가 변경되었습니다.');
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    alert("이미지 업로드 중 오류가 발생했습니다.");
  }
}

function startEditing(key) { Object.assign(tempUser, user); editingField.value = key; }
async function saveChanges(key) { editingField.value = null; }
function cancelEdit() { editingField.value = null; }

// --- History / Reservation Logic ---
const allReservations = ref([]);
const isLoading = ref(false);
const selectedFilter = ref('upcoming');
const isFilterOpen = ref(false);
const filterWrapper = ref(null);
const filterLabel = { upcoming: 'Upcoming', latest: '최신순', oldest: '오래된순' };

async function fetchReservations() {
  isLoading.value = true;
  try {
    const response = await axios.get('/api/reservation');
    allReservations.value = response.data.result || [];
  } catch (error) { console.error("예약 내역 조회 실패:", error); allReservations.value = []; }
  finally { isLoading.value = false; }
}

const filteredReservations = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0];
  let list = [...allReservations.value];
  if (selectedFilter.value === 'upcoming') return list.filter(r => r.checkIn >= todayStr);
  else if (selectedFilter.value === 'latest') return list.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
  else if (selectedFilter.value === 'oldest') return list.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  return list;
});
function selectFilter(filter) { selectedFilter.value = filter; isFilterOpen.value = false; }
function handleCancelReservation(id) { console.log("취소:", id); }


// --- Payment Logic (카드 관련 로직 통합) ---
const cards = ref([]);
const isModalOpen = ref(false);
const newCard = ref({ number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false });
const expDateError = ref('');
const selectedCountry = ref('South Korea');
const countries = ref([
  { code: 'KR', name: 'South Korea' },
  { code: 'US', name: 'United States' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' }
]);
const slider = ref(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// 1. 카드 목록 조회
async function fetchCards() {
  const token = localStorage.getItem('jwtToken'); // 토큰 키 통일 (jwtToken)
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
  } catch (error) { console.error('카드 목록 로딩 실패:', error); }
}

// 2. 유효기간 검증
function validateExpDate() {
  const value = newCard.value.expDate;
  if (!value || value.trim().length === 0) {
    expDateError.value = '유효기간을 입력해주세요.';
    return false;
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
    expDateError.value = '*유효기간 형식(MM/YY)을 확인해주세요.';
    return false;
  }
  expDateError.value = '';
  return true;
}

// 3. 카드 추가
async function addCard() {
  if (!validateExpDate()) return;
  const token = localStorage.getItem('jwtToken');

  if (newCard.value.number.length < 19) { alert('올바른 카드 번호를 입력하세요.'); return; }
  if (!newCard.value.cvc || newCard.value.cvc.length < 3) { alert('CVC 번호를 3자리 입력하세요.'); return; }
  if (!newCard.value.name.trim()) { alert('카드 소유자 이름을 입력하세요.'); return; }

  const cardData = {
    cardNumber: newCard.value.number.replace(/\s/g, ''),
    expDate: newCard.value.expDate,
    cvc: parseInt(newCard.value.cvc),
    name: newCard.value.name,
    country: selectedCountry.value,
  };

  try {
    const response = await axios.post('/api/card', cardData, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    if (response.data.code === 'SUCCESS') {
      alert('카드가 성공적으로 등록되었습니다.');
      closeModal();
      await fetchCards(); // 목록 갱신
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('카드 등록 실패:', error);
    alert('카드 등록 중 오류가 발생했습니다.');
  }
}

// 4. 카드 삭제
async function deleteCard(cardId) {
  const token = localStorage.getItem('jwtToken');
  if (confirm('정말 이 카드를 삭제하시겠습니까?')) {
    try {
      const response = await axios.delete(`/api/card/${cardId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.code === 'SUCCESS') {
        cards.value = cards.value.filter(card => card.id !== cardId);
        alert('카드가 삭제되었습니다.');
      }
    } catch (error) {
      console.error('카드 삭제 실패:', error);
      alert('카드 삭제에 실패했습니다.');
    }
  }
}

// --- 입력값 포맷팅 Watcher ---
watch(() => newCard.value.number, (newValue) => {
  const cleaned = newValue.replace(/[^\d]/g, '').slice(0, 16);
  newCard.value.number = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
});
watch(() => newCard.value.expDate, (newValue) => {
  let cleaned = newValue.replace(/[^\d]/g, '').slice(0, 4);
  const formatted = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
  if(newValue !== formatted) newCard.value.expDate = formatted;
  if(formatted.length === 5) validateExpDate();
  else if (expDateError.value) expDateError.value = '';
});
watch(() => newCard.value.cvc, (newValue) => {
  newCard.value.cvc = newValue.replace(/[^\d]/g, '').slice(0, 3);
});
watch(() => newCard.value.name, (newValue) => {
  newCard.value.name = newValue.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
});

// --- 드래그 스크롤 ---
function openModal() { isModalOpen.value = true; }
function closeModal() { isModalOpen.value = false; newCard.value = { number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false }; }
function handleMouseDown(e) { isDown.value = true; slider.value.style.cursor = 'grabbing'; startX.value = e.pageX - slider.value.offsetLeft; scrollLeft.value = slider.value.scrollLeft; }
function handleMouseLeave() { isDown.value = false; if(slider.value) slider.value.style.cursor = 'grab'; }
function handleMouseUp() { isDown.value = false; if(slider.value) slider.value.style.cursor = 'grab'; }
function handleMouseMove(e) { if (!isDown.value) return; e.preventDefault(); const x = e.pageX - slider.value.offsetLeft; const walk = (x - startX.value) * 2; slider.value.scrollLeft = scrollLeft.value - walk; }


// --- Lifecycle Hooks ---
const handleClickOutside = (event) => {
  if (filterWrapper.value && !filterWrapper.value.contains(event.target)) {
    isFilterOpen.value = false;
  }
};

onMounted(async () => {
  // 1. 프로필 정보 가져오기
  try {
    const res = await axios.get('/api/user/profile');
    const d = res.data;
    user.name = d.username;
    user.email = d.userEmail;
    user.phone = d.userPhone;
    user.address = d.userAddress;
    user.dob = d.userBirth;
    if (d.imageUrl) user.profileImage = getFullImageUrl(d.imageUrl);
  } catch (e) { console.error(e); }

  // 2. 예약 내역 및 카드 목록 가져오기
  fetchReservations();
  fetchCards(); // [추가됨]

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
@import "../assets/css/UserProfile.css";

/* 탭 강제 표시 */
.tab-content {
  display: block !important;
}
.tabs {
  position: relative;
  z-index: 10;
}

/* 카드 등록 모달 스타일 보강 */
.card_all {
  padding: 10px;
}
.card_input {
  margin-bottom: 15px;
  text-align: left;
}
.card_input label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
}
.card_input input, .select-wrapper select {
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}
</style>