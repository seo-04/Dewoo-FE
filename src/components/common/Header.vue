<template>
  <!-- 헤더 -->
  <header>
    <nav class="nav-container">
      <!-- 왼쪽 -->
      <nav class="header_tabs">
        <div class="nav-left">
          <div class="tab active">
            <i class="fa-solid fa-bed"></i>
            hotel
          </div>
        </div>
      </nav>

      <!-- 오른쪽 -->
      <div class="item">
        <div class="flex vertical-center">
          <i class="fa-solid fa-heart"></i>
          <span>찜하기</span>
          |
          <div class="window" style="display: flex; align-items: center; gap: 7px"
               @click.stop="toggleDropdown"
               ref="dropdownTrigger"
               :class="{ 'active-dropdown': isDropdownVisible }">
          <div class="circle">
            <div class="mini-circle">
              <div class="check_box"></div>
            </div>
          </div>
          <span>Tomhoon</span>
      </div>
      </div>
      </div>
    </nav>
    <transition name="fade">
      <div v-if="isDropdownVisible" class="profile-dropdown" ref="dropdownMenu">
        <div class="dropdown-profile">
          <div class="profile-avatar"></div>
          <div class="profile-info">
            <span class="profile-name">Tomhoon</span>
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
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      isDropdownVisible: false, // 드롭다운 메뉴 표시 여부
      activeTab: 'account',     // 현재 활성화된 탭 (기본값: '계정')
    };
  },
  methods: {
    // 드롭다운 메뉴를 토글하는 메서드
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    // 활성화된 탭을 설정하는 메서드
    setActiveTab(tabName) {
      this.activeTab = tabName;
      // 필요하다면 탭 클릭 시 드롭다운을 닫을 수도 있습니다.
      // this.isDropdownVisible = false;
    },
    // 로그아웃 메서드 (임시)
    logout() {
      console.log("로그아웃 처리");
      this.isDropdownVisible = false;
    },
    // 컴포넌트 외부를 클릭했는지 감지하는 메서드
    handleOutsideClick(event) {
      const trigger = this.$refs.dropdownTrigger;
      const menu = this.$refs.dropdownMenu;

      // 트리거와 메뉴 영역이 아닌 곳을 클릭했을 때 메뉴를 닫음
      if (trigger && !trigger.contains(event.target) && menu && !menu.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    }
  },
  watch: {
    // isDropdownVisible 값이 변경될 때마다 감시
    isDropdownVisible(newValue) {
      if (newValue) {
        // 메뉴가 열리면 외부 클릭 감지 리스너 추가
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        // 메뉴가 닫히면 외부 클릭 감지 리스너 제거 (메모리 누수 방지)
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전 리스너를 확실히 제거
    document.removeEventListener('click', this.handleOutsideClick);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/Header.scss";

.window {
  position: relative; /* ::after의 기준점이 되도록 설정 */
  cursor: pointer;
  padding-bottom: 5px; /* 공간 확보 */
  top: 3px;
}

.window.active-dropdown::after {
  content: '';
  position: absolute;
  bottom: -16px; /* 위치는 .tab과 동일하게 맞춤 */
  left: 0;
  width: 100%;
  height: 3px;
  background: #46bd7b;
  border-radius: 8px 8px 0 0;
  z-index: 1101;
}

.profile-dropdown {
  position: absolute;
  top: 87px; /* 헤더 높이에 맞춰 조정 */
  right: 385px; /* nav-container의 padding 값과 맞춤 */
  width: 280px;
  background-color: #ffffff;
  border-radius: 3px 3px 12px 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  z-index: 1100;
  padding: 10px 0;
}

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
  display: block;
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
  background-color: #eef7f4; /* 활성화 배경색 */
  color: #46bd7b; /* 활성화 텍스트 및 아이콘 색상 */
  font-weight: 600;
}

.menu-item i {
  width: 20px; /* 아이콘 정렬을 위한 너비 고정 */
  text-align: center;
}

.menu-item .arrow {
  margin-left: auto; /* 화살표 아이콘을 오른쪽 끝으로 밀어냄 */
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