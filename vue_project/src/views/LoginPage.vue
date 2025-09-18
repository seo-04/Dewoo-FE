<template>
  <div class="container">
    <div class="login-box">
      <!-- 왼쪽 로그인 -->
      <div class="left">
        <h4>Login</h4>
        <p class="login_text">로그인 해주세요</p>

        <div class="log_input">
          <form @submit.prevent="handleLogin">
            <div class="passwordbox">
              <input
                  type="text"
                  v-model="email"
                  placeholder="Email"
              />
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Password"
              />
              <i
                  :class="['fa-solid', showPassword ? 'fa-eye' : 'fa-eye-slash']"
                  @click="togglePassword"
              ></i>
            </div>
          </form>
        </div>

        <div class="check">
          <label>
            <input type="checkbox" v-model="remember" />
            비밀번호 기억하기
          </label>
          <p class="text2">
            <a href="#" @click.prevent="goForgot">Forgot Password</a>
          </p>
        </div>

        <button class="loginbox" @click="handleLogin">Login</button>
        <p class="signup">
          <a href="#" @click.prevent="goSignup">회원가입</a>
        </p>

        <!-- sns 로그인 경계선 -->
        <div class="boundary_line">
          <p>Or login with</p>
        </div>

        <!-- sns 로그인 창 -->
        <div class="snsbox">
          <div class="facebook">
            <i class="fa-brands fa-facebook"></i>
          </div>
          <div class="google">
            <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
            />
          </div>
          <div class="apple">
            <i class="fa-brands fa-apple"></i>
          </div>
        </div>
      </div>

      <!-- 오른쪽 이미지 -->
      <div class="right">
        <img
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide"
            :class="['slide', { active: currentSlide === i }]"
            alt="hotel image"
        />
        <div class="dots">
          <span
              v-for="(dot, i) in slides"
              :key="i"
              :class="['dot', { active: currentSlide === i }]"
              @click="setSlide(i)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      showPassword: false,
      slides: [
        require("@/assets/img/img.jpg"),
        require("@/assets/img/img2.jpg"),
        require("@/assets/img/img3.jpg"),
      ],
      currentSlide: 0,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      if (!this.email || !this.password) {
        alert("이메일과 비밀번호를 모두 입력해주세요!");
        return;
      }
      console.log("로그인 시도:", this.email, this.password, this.remember);
      // 여기에 API 연동 코드 추가 가능
    },
    goSignup() {
      this.$router.push("/SignUp");
    },
    goForgot() {
      this.$router.push("/Find_Password");
    },
    setSlide(i) {
      this.currentSlide = i;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 3000);
  },
};
</script>

<style scoped>
@import "@/assets/css/Login.css";

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: gradientBG 15s ease infinite;
  overflow: hidden;
}
</style>
