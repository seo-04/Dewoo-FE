<template>
  <header>
    <nav class="nav-container">
      <div class="nav-left">
        <div class="tab" :class="{ active: activeMainTab === 'hotel' }" @click="setMainTab('hotel')">
          <i class="fa-solid fa-bed"></i>
          hotel
        </div>
      </div>

      <div class="item">
        <div class="flex vertical-center">
          <div class="tab" :class="{ active: activeMainTab === 'wishlist' }" @click="setMainTab('wishlist')">
            <i class="fa-solid fa-heart"></i>
            <span>찜하기</span>
          </div>
          |
          <div class="window"
               style="display: flex; align-items: center; gap: 7px"
               @click.stop="toggleDropdown"
               ref="dropdownTrigger"
               :class="{ 'active-dropdown': isDropdownVisible }">
            <div class="circle">
              <div class="mini-circle">
                <div class="check_box"></div>
              </div>
            </div>
            <span>{{userName}}</span>
          </div>
        </div>

        <transition name="fade">
          <div v-if="isDropdownVisible" class="profile-dropdown" ref="dropdownMenu">
            <div class="dropdown-profile">
              <div class="profile-avatar"></div>
              <div class="profile-info">
                <span class="profile-name">{{userName}}</span>
                <span class="profile-status">Online</span>
              </div>
            </div>

            <hr class="divider">

            <div class="dropdown-menu">
              <div class="menu-item" :class="{ active: activeTab === 'account' }" @click="setActiveTab('account')">
                <i class="fa-solid fa-user"></i>
                <span>계정</span>
                <i class="fa-solid fa-chevron-right arrow"></i>
              </div>
              <div class="menu-item" :class="{ active: activeTab === 'payment' }" @click="setActiveTab('payment')">
                <i class="fa-solid fa-credit-card"></i>
                <span>결제내역</span>
                <i class="fa-solid fa-chevron-right arrow"></i>
              </div>
              <div class="menu-item" :class="{ active: activeTab === 'settings' }" @click="setActiveTab('settings')">
                <i class="fa-solid fa-gear"></i>
                <span>설정</span>
                <i class="fa-solid fa-chevron-right arrow"></i>
              </div>
            </div>

            <hr class="divider">

            <div class="dropdown-logout">
              <div class="menu-item" @click="logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>로그아웃</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
// 💡 1. API 통신을 위해 이전에 설정한 axios를 가져옵니다.
// 경로가 다를 경우, 실제 파일 위치에 맞게 수정해주세요. (예: '../util/axios')
import axios from '@/util/axios';

export default {
  data() {
    return {
      isDropdownVisible: false,
      activeMainTab: 'hotel',
      activeTab: '',
      // 💡 2. 로그인 상태와 사용자 이름을 저장할 변수를 추가합니다.
      isLoggedIn: false,
      userName: 'Guest', // 로그인하지 않았을 때 기본값
    };
  },

  methods: {
    setMainTab(tab) {
      this.activeMainTab = tab;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleClickOutside(event) {
      if (
        this.$refs.dropdownTrigger &&
        !this.$refs.dropdownTrigger.contains(event.target) &&
        this.$refs.dropdownMenu &&
        !this.$refs.dropdownMenu.contains(event.target)
      ) {
        this.isDropdownVisible = false;
      }
    },
    // 💡 4. 프로필 페이지로 이동하는 함수를 추가합니다.
    goToLogin() {
      this.isDropdownVisible = false; // 드롭다운 닫기
      this.$router.push('/');
    },

    // 💡 기존 logout 함수는 그대로 둡니다.
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.userName = 'Guest';
      alert('로그아웃 되었습니다.');
      if (this.$route.path !== '/') {
        this.$router.push('/');
      } else {
        window.location.reload();
      }
    },ActiveTab(tab) {
      this.activeTab = tab;
      // 'Account' 메뉴 클릭 시 프로필 페이지로 이동
      if (tab === 'account') {
        this.goToProfile();
      }
    },
  },
  // 💡 3. 컴포넌트가 로드될 때 사용자 정보를 가져옵니다.
  async mounted() {
    document.addEventListener('click', this.handleClickOutside);

    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      try {
        const response = await axios.get('/api/user/profile');
        if (response.data && response.data.username) {
          this.userName = response.data.username; // API에서 받은 이름으로 교체
        }
      } catch (error) {
        console.error("헤더에서 사용자 정보를 가져오는데 실패했습니다:", error);
        localStorage.removeItem('token'); // 유효하지 않은 토큰 삭제
        this.isLoggedIn = false;
      }
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped lang="scss">
/* 사용자가 제공한 기본 스타일 파일 Import */
@import "@/assets/css/Header.scss";

/* ▼▼▼ 아래는 추가/수정된 스타일입니다 ▼▼▼ */

/* 드롭다운의 기준점이 될 부모 요소 */
.item {
  position: relative;
}

/* 프로필(.window) 영역 관련 스타일 */
.window {
  position: relative;
  cursor: pointer;
  padding-bottom: 5px;
}

.window.active-dropdown::after {
  content: '';
  position: absolute;
  bottom: -21px; /* .tab의 밑줄과 높이를 맞춤 */
  left: 0;
  width: 100%;
  height: 3px;
  background: #46bd7b;
  border-radius: 8px 8px 0 0;
}

/* 드롭다운 메뉴 포지셔닝 */
.profile-dropdown {
  position: absolute;
  top: 68px; /* 헤더 아이콘들 아래에 위치하도록 조정 */
  right: -1px;  /* 부모(.item)의 오른쪽 끝에 맞춤 */
  width: 280px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  z-index: 1100;
  padding: 10px 0;
}

/* 드롭다운 메뉴 내부 스타일 */
.dropdown-profile {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 15px;
}

.profile-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #d9d9d9;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.profile-name {
  font-weight: 600;
  font-size: 1.1em;
}

.profile-status {
  font-size: 0.9em;
  color: #666;
}

.divider {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 10px 0;
}

.dropdown-menu, .dropdown-logout {
  padding: 0 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  border-radius: 8px;
  cursor: pointer;
  gap: 15px;
  font-size: 1em;
  color: #333;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #eef7f4;
  color: #46bd7b;
  font-weight: 600;
}

.menu-item i {
  width: 20px;
  text-align: center;
}

.menu-item .arrow {
  margin-left: auto;
  font-size: 0.8em;
  color: #aaa;
}

.menu-item.active .arrow {
  color: #46bd7b;
}

/* 트랜지션 효과 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>