<template>
  <div class="container">
    <div class="login-box">
      <!-- 왼쪽 -->
      <div class="left">
        <div class="back" @click="goBack">
          <i class="fa-solid fa-chevron-left"></i>
          <p class="font"><a href="#">Back to Login</a></p>
        </div>

        <h4>인증하기</h4>
        <p>이메일로 받은 인증번호를 입력해주세요</p>

        <div class="log_input">
          <!-- 인증 코드 입력 -->
          <div class="codebox">
            <input
                :type="showPassword ? 'text' : 'password'"
                v-model="code"
                placeholder="code"
            />
            <i
                class="fa-solid"
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                @click="togglePassword"
            ></i>
          </div>

          <button type="button" class="resend" @click="resendCode">
            재전송하기
          </button>
        </div>

        <button class="certified" @click="handleAuthenticate">인증하기</button>
      </div>

      <!-- 오른쪽 이미지 -->
      <div class="right">
        <img
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide"
            alt="hotel image"
            class="slide"
            :class="{ active: i === index }"
        />
        <div class="dots">
          <span
              v-for="(dot, i) in slides"
              :key="'dot-' + i"
              class="dot"
              :class="{ active: i === index }"
              @click="showSlide(i)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthenticatePage",
  data() {
    return {
      code: "",
      showPassword: false,
      index: 0,
      slides: [
        require("@/assets/img/img.jpg"),
        require("@/assets/img/img2.jpg"),
        require("@/assets/img/img3.jpg"),
      ],
      timer: null,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    resendCode() {
      alert(
          "인증 된 이메일로 재전송되었습니다. 메일을 확인하시길 바랍니다.\n------공사중------"
      );
    },
    goBack() {
      this.$router.push("/login");
    },
    handleAuthenticate() {
      if (!this.code.trim()) {
        alert("인증번호를 입력해주세요.");
        return;
      }
      alert("인증되었습니다.");
      //  인증 성공 시 password_setting 페이지로 이동
      this.$router.push("/password_setting");
    },
    showSlide(n) {
      this.index = n;
    },
    nextSlide() {
      this.index = (this.index + 1) % this.slides.length;
    },
  },
  mounted() {
    this.timer = setInterval(this.nextSlide, 3000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
@import "@/assets/css/Authenticate.css";
</style>