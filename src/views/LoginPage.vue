<template>
  <div class="login_page">
    <div class="container">
      <div class="login-area">
        <div class="left">
          <h4>Login</h4>
          <p class="login_text">로그인 해주세요</p>

          <div class="log_input">
            <form id="loginForm" @submit.prevent="handleSubmit">
              <div class="input-container">
                <input type="text" v-model="email" placeholder="Email" />
                <i class="fa-solid fa-envelope"></i> </div>

              <div class="password">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Password"
                />
                <i class="fa-solid fa-lock left-icon"></i>
                <i
                    :class="[showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash', 'right-icon']"
                    @click="togglePassword"
                ></i>
              </div>
            </form>
          </div>

          <div class="check2">
            <label>
              <input type="checkbox" v-model="remember" /> 비밀번호 기억하기
            </label>
            <p class="text2" @click ="$router.push('/findPassword');">
              Forgot Password </p>
          </div>

          <button class="loginbox" @click="handleSubmit">Login</button>
          <p class="signup" @click ="$router.push('/SignUp');">
           회원가입
          </p>

          <div class="boundary_line">
            <p>Or login with</p>
          </div>

          <div class="snsbox">
            <a href="http://localhost:8085/oauth2/authorization/google" class="google sns-button">
              <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/color/48/google-logo.png"
                  alt="google-logo"
              />
            </a>

            <a href="http://localhost:8085/oauth2/authorization/kakao" class="kakao sns-button">
              <img
                  width="20"
                  height="20"
                  src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                  alt="kakao-logo"
              />
            </a>

            <a href="http://localhost:8085/oauth2/authorization/naver" class="naver sns-button">
              <img
                  width="20"
                  height="20"
                  src="@/assets/img/naver_icon.png"
                  alt="naver-logo"
              />
            </a>
          </div>
        </div>

        <div class="Img_right">
          <img src="@/assets/img/img.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 0 }" />
          <img src="@/assets/img/img2.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 1 }" />
          <img src="@/assets/img/img3.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 2 }" />

          <div class="dots">
          <span
              v-for="(dot, i) in 3"
              :key="i"
              class="dot"
              :class="{ active: currentSlide === i }"
              @click="setSlide(i)"
          ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      showPassword: false,
      currentSlide: 0,
      slideInterval: null,
    };
  },
  mounted() {
    this.startSlideShow();
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      if (!this.email || !this.password) {
        alert("이메일과 비밀번호를 모두 입력해주세요!");
        return;
      }

      try {
        const response = await axios.post('/api/user/login', {
          userEmail: this.email,
          password: this.password,
        });

        if (response.data.code === 'SUCCESS') {
          // 💡 일반 로그인 성공 시, JWT 토큰을 localStorage에 저장하는 로직이 추가되어야 합니다.
          // 현재는 Alert 후 바로 리다이렉션하지만, 실제 JWT를 받으면 저장 로직이 필요합니다.
          alert("로그인 성공!");
          this.$router.push('/hotelsearch');
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    },
    startSlideShow() {
      this.slideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 3000);
    },
    setSlide(index) {
      this.currentSlide = index;
    },
  },
};
</script>

<style scoped>
@import '~@/assets/css/Login.css';
</style>