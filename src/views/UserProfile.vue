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
            <img :src="user.profileImage" :alt="`${user.name}'s profile picture`" class="profile-image"/>
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
                <div><span>valid thru</span><br><span style="font-size: 20px; font-weight: bold;">{{ card.expDate }}</span></div>
                <div style="align-content: center"><img src="../assets/img/visa.png" height="33" width="52" alt=""/></div>
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
            <div class="card_input"><label>Card Number</label><input type="text" v-model="newCard.number"></div>
            <button @click="addCard" style="width: 512px; height: 48px; background-color: #8dd3bb; border: none;">Add Card</button>
          </div>
        </div>
      </div>

    </div>
  </CommonLayout>
</template>

<script setup>
import CommonLayout from '../components/common/CommonLayout.vue';
import ReservationList from '../components/reservation/ReservationList.vue'; // List 컴포넌트 import
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from '../util/axios.js';

// --- Cover Image ---
const coverImages = ref(['/cover/animal_trip1.jpg', '/cover/animal_trip2.jpg', '/cover/animal_trip3.jpg', '/cover/animal_trip4.jpg']);
const currentCoverIndex = ref(0);

// --- Tab State ---
const activeTab = ref('account');

// --- Account (User Profile) ---
const user = reactive({
  name: '', email: '', phone: '', password: '••••••••••', address: '', dob: '',
  profileImage: 'https://picsum.photos/seed/profile/120/120'
});
const editingField = ref(null);
const tempUser = reactive({});
const accountFields = ref([
  { key: 'name', label: 'Name' }, { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' }, { key: 'phone', label: 'Phone Number', type: 'tel' },
  { key: 'address', label: 'Address' }, { key: 'dob', label: 'Date of birth' }
]);

// 프로필 이미지 업로드 로직 (기존 유지)
const profileImageInput = ref(null);
function triggerProfileImageUpload() { profileImageInput.value.click(); }
async function handleProfileImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  try {
    const res = await axios.post('/api/user/profile-image', formData, { headers: {'Content-Type': 'multipart/form-data'} });
    user.profileImage = res.data.result;
    alert('프로필 이미지가 변경되었습니다.');
  } catch (error) { console.error(error); }
}

function startEditing(key) { Object.assign(tempUser, user); editingField.value = key; }
async function saveChanges(key) { /* 수정 로직 (생략) */ editingField.value = null; }
function cancelEdit() { editingField.value = null; }


// --- ⭐️ [HISTORY TAB] 예약 내역 로직 (Booking 제거 -> 백엔드 API 사용) ---
const allReservations = ref([]); // 백엔드에서 받아온 전체 데이터
const isLoading = ref(false);
const selectedFilter = ref('upcoming');
const isFilterOpen = ref(false);
const filterWrapper = ref(null);

const filterLabel = {
  upcoming: 'Upcoming',
  latest: '최신순',
  oldest: '오래된순'
};

// 1. 백엔드 API 호출 함수
async function fetchReservations() {
  isLoading.value = true;
  try {
    // ⭐️ 실제 백엔드 API 엔드포인트 (컨트롤러에 맞춰 수정 필요)
    // 예: ReservationController의 유저 예약 조회 API
    const response = await axios.get('/api/reservation');

    // 응답 데이터가 배열이라고 가정
    allReservations.value = response.data.result || [];
  } catch (error) {
    console.error("예약 내역 조회 실패:", error);
    allReservations.value = []; // 에러 시 빈 배열
  } finally {
    isLoading.value = false;
  }
}

// 2. 필터링 로직 (ReservationItem에서 쓰는 checkIn 변수명과 통일)
const filteredReservations = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0];
  // 원본 보호를 위해 복사
  let list = [...allReservations.value];

  // ⚠️ 주의: 백엔드 DTO의 날짜 필드명이 'checkIn'이라고 가정했습니다.
  // 만약 'checkInDate'라면 아래 코드를 b.checkInDate 등으로 바꿔야 합니다.
  if (selectedFilter.value === 'upcoming') {
    return list.filter(r => r.checkIn >= todayStr);
  } else if (selectedFilter.value === 'latest') {
    return list.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
  } else if (selectedFilter.value === 'oldest') {
    return list.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  }
  return list;
});

function selectFilter(filter) {
  selectedFilter.value = filter;
  isFilterOpen.value = false;
}

function handleCancelReservation(id) {
  console.log("취소할 예약 ID:", id);
  // 여기서 axios.delete 호출 등을 구현
}


// --- Payment Logic (기존 유지) ---
const cards = ref([{ id: 1, lastFour: '4242', expDate: '12/28' }]);
const isModalOpen = ref(false);
const newCard = ref({ number: '', expDate: '', cvc: '', name: '', country: 'us', saveInfo: false });
const slider = ref(null);
// (드래그 관련 변수 및 함수 생략 - 기존 코드 사용)
function openModal() { isModalOpen.value = true; }
function closeModal() { isModalOpen.value = false; }
function addCard() { closeModal(); }
function deleteCard(id) { }
function handleMouseDown(e) { /* ... */ }
function handleMouseLeave() { /* ... */ }
function handleMouseUp() { /* ... */ }
function handleMouseMove(e) { /* ... */ }


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
    user.name = d.username; user.email = d.userEmail; user.phone = d.userPhone;
    user.address = d.userAddress; user.dob = d.userBirth;
    user.profileImage = d.imageUrl || user.profileImage;
  } catch (e) { console.error(e); }

  // 2. 예약 내역 가져오기 (백엔드 연동)
  fetchReservations();

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
@import "../assets/css/UserProfile.css";

/* 탭 강제 표시 (CSS 충돌 방지용) */
.tab-content {
  display: block !important;
}

.tabs {
  position: relative;
  z-index: 10;
}
</style>