<template>
  <header>
    <nav class="nav-container">
      <div class="nav-left">
        <div
            class="nav-item-container"
            @mouseenter="hoveredTab = 'hotel'"
            @mouseleave="hoveredTab = null"
            @click="navigateTo('/hotelsearch'); activeTab = 'hotel'"
            :class="{ active: activeTab === 'hotel' || hoveredTab === 'hotel' }"
        >
          <div class="tab">
            <i class="fa-solid fa-bed"></i>
            hotel
          </div>
        </div>
      </div>

      <div class="item">
        <div class="flex vertical-center">

          <!-- 찜하기 -->
          <div
              class="nav-item-container"
              @mouseenter="hoveredTab = 'wishlist'"
              @mouseleave="hoveredTab = null"
              @click="navigateTo('/favorite'); activeTab = 'wishlist'"
              :class="{ active: activeTab === 'wishlist' || hoveredTab === 'wishlist' }"
          >
            <div class="tab">
              <i class="fa-solid fa-heart"></i>
              <span>찜하기</span>
            </div>
          </div>

          <span class="separator">|</span>

          <!-- 프로필 -->
          <div
              class="nav-item-container"
              ref="profileWrapper"
              @mouseenter="hoveredTab = 'profile'"
              @mouseleave="hoveredTab = null"
              :class="{ active: activeTab === 'profile' || hoveredTab === 'profile' }"
          >
            <div
                class="window"
                style="display:flex; align-items:center; gap:7px;"
                @click.stop="toggleProfileDropdown"
            >
              <!-- 로그인 상태 -->
              <img
                  v-if="profileImageUrl"
                  :src="profileImageUrl"
                  class="header-profile-image-sm"
                  alt="profile"
              />

              <!-- 게스트 -->
              <div v-else class="circle">
                <img
                    src="../../assets/img/icon/user_icon.png"
                    alt="Guest"
                    class="guest-header-profile-image-sm"
                />
              </div>

              <span style="font-weight:bold">{{ userName }}</span>
            </div>

            <transition name="fade">
              <div v-if="activeTab === 'profile'" class="profile-dropdown">

                <!-- 로그인 상태 -->
                <div v-if="isLoggedIn">
                  <div class="dropdown-profile">
                    <img
                        :src="profileImageUrl"
                        class="profile-avatar"
                        alt="avatar"
                    />
                    <div class="profile-info">
                      <span class="profile-name">{{ userName }}</span>
                      <span class="profile-status">Online</span>
                    </div>
                  </div>

                  <hr class="divider">

                  <div class="dropdown-menu">
                    <div class="menu-item" @click="navigateTo('/my-page')">
                      <i class="fa-solid fa-user"></i>
                      <span>계정</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>

                    <div class="menu-item">
                      <i class="fa-solid fa-credit-card"></i>
                      <span>결제내역</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>

                    <div class="menu-item">
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

                <!-- 게스트 -->
                <div v-else>
                  <div class="dropdown-profile">
                    <img
                        src="../../assets/img/icon/user_icon.png"
                        class="profile-avatar"
                    />
                    <div class="profile-info">
                      <span class="profile-name">Guest</span>
                      <span class="profile-status">Online</span>
                    </div>
                  </div>

                  <div class="dropdown-menu">
                    <div class="menu-item" @click="navigateTo('/login')">
                      <i class="fa-solid fa-arrow-right-to-bracket"></i>
                      <span>로그인</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>

                    <div class="menu-item" @click="navigateTo('/signup')">
                      <i class="fa-solid fa-user-plus"></i>
                      <span>회원가입</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>
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
import axios from '@/util/axios';

export default {
  name: 'Header',

  data() {
    return {
      activeTab: 'hotel',
      hoveredTab: null,
      isLoggedIn: false,
      userName: 'Guest',
      profileImageUrl: null,
    };
  },

  methods: {
    toggleProfileDropdown() {
      this.activeTab = this.activeTab === 'profile' ? null : 'profile';
    },

    navigateTo(path) {
      this.activeTab = null;
      this.$router.push(path);
    },

    logout() {
      localStorage.removeItem('jwtToken');
      this.isLoggedIn = false;
      this.userName = 'Guest';
      this.profileImageUrl = null;
      this.$router.push('/');
    },

    handleOutsideClick(e) {
      if (this.$refs.profileWrapper && !this.$refs.profileWrapper.contains(e.target)) {
        this.activeTab = null;
      }
    },
  },

  async mounted() {
    document.addEventListener('click', this.handleOutsideClick);

    const token = localStorage.getItem('jwtToken');

    if (token) {
      this.isLoggedIn = true;

      try {
        const res = await axios.get('/api/user/profile');

        this.userName = res.data.username;

        this.profileImageUrl = require('@/assets/img/login/loginimg.jpg');
      } catch (e) {
        localStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
      }
    }
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/css/Header.scss";
</style>
