<template>
  <header>
    <nav class="nav-container">
      <div class="nav-left">
        <div class="nav-item-container"
             @mouseenter="hoveredTab = 'hotel'"
             @mouseleave="hoveredTab = null"
             @click="navigateTo('/'); activeTab = 'hotel';"
             :class="{ active: activeTab === 'hotel' || hoveredTab === 'hotel' }">
          <div class="header-tab">
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
               @click="navigateTo('/favorite'); activeTab = 'wishlist';"
               :class="{ active: activeTab === 'wishlist' || hoveredTab === 'wishlist' }">
            <div class="header-tab">
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
                 style="display: flex; align-items: center; gap: 7px; position: relative; top: 6px;"
                 @click.stop="toggleProfileDropdown">

              <img v-if="profileImageUrl" :src="profileImageUrl" alt="profile" class="header-profile-image-sm">
              <div v-else class="circle" style="justify-content: center; align-items: center">
                <img src="../../assets/img/icon/user_icon.png" alt="Guest" class="guest-header-profile-image-sm">
                <div class="mini-circle">
                  <div class="check_box"></div>
                </div>
              </div>
              <span style="font-weight: bold">{{ userName }}</span>
            </div>

            <transition name="fade">
              <div v-if="activeTab === 'profile'" class="profile-dropdown">

                <div v-if="isLoggedIn">
                  <div class="dropdown-profile">
                    <img v-if="profileImageUrl" :src="profileImageUrl" alt="avatar" class="profile-avatar">
                    <div v-else class="profile-avatar"></div>
                    <div class="profile-info">
                      <span class="profile-name">{{ userName }}</span>
                      <span class="profile-status">Online</span>
                    </div>
                  </div>
                  <hr class="divider">
                  <div class="dropdown-menu">
                    <div class="menu-item" :class="{ active: activeTab === 'account' }" @click="navigateTo('/profile')">
                      <i class="fa-solid fa-user"></i>
                      <span>계정</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>
                    <div class="menu-item" :class="{ active: activeTab === 'payment' }" @click="navigateTo('/profile')">
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

                <div v-else>
                  <div class="dropdown-profile">
                    <div class="profile-avatar">
                    <img class="guest-profile" src="../../assets/img/icon/user_icon.png" width="50px" height="50px"/>
                    </div>
                    <div class="profile-info">
                      <span class="profile-name">Guest</span>
                      <span class="profile-status">Online</span>
                    </div>
                  </div>
                  <div class="dropdown-menu" style="padding-top: 5px; padding-bottom: 5px;">
                    <div class="menu-item" @click="navigateTo('/login')"><i class="fa-solid fa-arrow-right-to-bracket"></i>
                      <span>로그인</span>
                      <i class="fa-solid fa-chevron-right arrow"></i>
                    </div>
                    <div class="menu-item" @click="navigateTo('/signup')"><i class="fa-solid fa-user-plus"></i>
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
    data() {
      return {
        activeTab: 'hotel',
        hoveredTab: null,
        activeDropdownTab: 'account',
        isLoggedIn: false,
        userName: 'Guest',
        profileImageUrl: null,
      };
    },

    methods: {
      // 🖼️ [이미지 경로 보정 함수]
      getFullImageUrl(imagePath) {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        let path = imagePath;
        if (!path.startsWith('/user-images/')) {
          path = `/user-images/${path.startsWith('/') ? path.substring(1) : path}`;
        }
        return `${process.env.VUE_APP_API_URL}${path}`;
      },

      // ⚡️ [추가] 이미지를 강제로 새로고침하는 함수
      // URL 뒤에 현재 시간(?t=...)을 붙여서 브라우저가 새 이미지로 인식하게 만듭니다.
      refreshProfileImage(newPath) {
        const fullUrl = this.getFullImageUrl(newPath);
        if (fullUrl) {
          this.profileImageUrl = `${fullUrl}?t=${Date.now()}`;
        }
      },

      toggleProfileDropdown() {
        this.activeTab = this.activeTab === 'profile' ? null : 'profile';
      },
      setActiveDropdownTab(tabName) {
        this.activeDropdownTab = tabName;
      },
      logout() {
        console.log('로그아웃 처리');
        localStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
        this.userName = 'Guest';
        this.profileImageUrl = null;
        this.$router.push('/');
      },
      navigateTo(path) {
        this.activeTab = null;
        this.$router.push(path);
      },
      handleOutsideClick(event) {
        if (this.$refs.profileWrapper && !this.$refs.profileWrapper.contains(event.target)) {
          if (this.activeTab === 'profile') {
            this.activeTab = null;
          }
        }
      },
      // [추가] 이벤트 핸들러 (메모리 누수 방지를 위해 분리)
      handleProfileUpdateEvent(event) {
        // event.detail에 새로운 이미지 경로가 들어옵니다.
        this.refreshProfileImage(event.detail);
      },
    },
    watch: {
      activeTab(newTab, oldTab) {
        if (newTab === 'profile') {
          document.addEventListener('click', this.handleOutsideClick);
        } else if (oldTab === 'profile') {
          document.removeEventListener('click', this.handleOutsideClick);
        }
      },
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleOutsideClick);
      // [추가] 컴포넌트가 사라질 때 리스너 제거
      window.removeEventListener('profile-image-updated', this.handleProfileUpdateEvent);
    },
    async mounted() {
      // ⭐️ [추가] 프로필 이미지 업데이트 이벤트 리스너 등록
      window.addEventListener('profile-image-updated', this.handleProfileUpdateEvent);

      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.isLoggedIn = true;
        try {
          const response = await axios.get('/api/user/profile');
          if (response.data) {
            this.userName = response.data.username;
            // 초기 로딩 시에도 캐시 방지를 위해 타임스탬프 추가 가능
            this.refreshProfileImage(response.data.imageUrl);
          }
        } catch (error) {
          console.error('헤더에서 사용자 정보를 가져오는데 실패했습니다:', error);
          localStorage.removeItem('jwtToken');
          this.isLoggedIn = false;
        }
      }
    },
  };
  </script>

  <style scoped lang="scss">
  /* 스타일은 변경되지 않았으므로 그대로 사용하시면 됩니다. */
  @use "@/assets/css/Header.scss";


  </style>