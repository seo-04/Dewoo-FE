<template>
  <header>
    <nav class="nav-container">
      <div class="nav-left">
        <div class="nav-item-container"
             @mouseenter="hoveredTab = 'hotel'"
             @mouseleave="hoveredTab = null"
             @click="activeTab = 'hotel'"
             :class="{ active: activeTab === 'hotel' || hoveredTab === 'hotel' }">
          <div class="tab">
            <i class="fa-solid fa-bed"></i>
            hotel
          </div>
        </div>
      </div>

      <div class="item">
        <div class="flex vertical-center">
          <div class="nav-item-container"
               @mouseenter="hoveredTab = 'wishlist'"
               @mouseleave="hoveredTab = null"
               @click="activeTab = 'wishlist'"
               :class="{ active: activeTab === 'wishlist' || hoveredTab === 'wishlist' }">
            <div class="tab">
              <i class="fa-solid fa-heart" style="position: relative; right: 3px"></i>
              <span style="position: relative; bottom: 1px; right: 3px">찜하기</span>
            </div>
          </div>

          <span class="separator">|</span>

          <div class="nav-item-container"
               ref="profileWrapper"
               @mouseenter="hoveredTab = 'profile'"
               @mouseleave="hoveredTab = null"
               :class="{ active: activeTab === 'profile' || hoveredTab === 'profile' }">

            <div class="window"
                 style="display: flex; align-items: center; gap: 7px; position: relative; top: 3px;"
                 @click.stop="toggleProfileDropdown">
              <div class="circle">
                <div class="mini-circle">
                  <div class="check_box"></div>
                </div>
              </div>
              <span>Tomhoon</span>
            </div>

            <transition name="fade">
              <div v-if="activeTab === 'profile'" class="profile-dropdown">
                <div class="dropdown-profile">
                  <div class="profile-avatar"></div>
                  <div class="profile-info">
                    <span class="profile-name">Tomhoon</span>
                    <span class="profile-status">Online</span>
                  </div>
                </div>
                <hr class="divider">
                <div class="dropdown-menu">
                  <div class="menu-item" :class="{ active: activeDropdownTab === 'account' }" @click="setActiveDropdownTab('account')">
                    <i class="fa-solid fa-user"></i>
                    <span>계정</span>
                    <i class="fa-solid fa-chevron-right arrow"></i>
                  </div>
                  <div class="menu-item" :class="{ active: activeDropdownTab === 'payment' }" @click="setActiveDropdownTab('payment')">
                    <i class="fa-solid fa-credit-card"></i>
                    <span>결제내역</span>
                    <i class="fa-solid fa-chevron-right arrow"></i>
                  </div>
                  <div class="menu-item" :class="{ active: activeDropdownTab === 'settings' }" @click="setActiveDropdownTab('settings')">
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
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      activeTab: 'hotel', // 클릭된 탭 ('hotel', 'wishlist', 'profile')
      hoveredTab: null,   // 마우스가 올라간 탭
      activeDropdownTab: 'account',
    };
  },
  methods: {
    toggleProfileDropdown() {
      this.activeTab = this.activeTab === 'profile' ? null : 'profile';
    },
    setActiveDropdownTab(tabName) {
      this.activeDropdownTab = tabName;
    },
    logout() {
      console.log("로그아웃 처리");
      if (this.activeTab === 'profile') {
        this.activeTab = null;
      }
    },
    handleOutsideClick(event) {
      if (this.$refs.profileWrapper && !this.$refs.profileWrapper.contains(event.target)) {
        if (this.activeTab === 'profile') {
          this.activeTab = null;
        }
      }
    }
  },
  watch: {
    activeTab(newTab, oldTab) {
      if (newTab === 'profile') {
        document.addEventListener('click', this.handleOutsideClick);
      }
      else if (oldTab === 'profile') {
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/Header.scss";
</style>