<template>
  <div class="container">
    <div class="login-box">
      <!-- 왼쪽 -->
      <div class="left">
        <div class="back" @click="goBack">
          <i class="fa-solid fa-chevron-left"></i>
          <p class="font">
            <a href="#">Back to Login</a>
          </p>
        </div>

        <h4>비밀번호 찾기</h4>
        <p>비밀번호를 찾아보세요</p>

        <div class="log_input">
          <div class="passwordbox">
            <input type="text" v-model="email" placeholder="Email" />
          </div>
        </div>

        <button class="loginbox" @click="handleSubmit">제출</button>

        <!-- SNS 로그인 경계선 -->
        <div class="boundary_line">
          <p>Or login with</p>
        </div>

        <!-- SNS 로그인 -->
        <div class="snsbox">
          <div class="facebook"><i class="fa-brands fa-facebook"></i></div>
          <div class="google"><i class="fa-brands fa-google"></i></div>
          <div class="apple"><i class="fa-brands fa-apple"></i></div>
        </div>
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
import "@/assets/css/findp.css";

export default {
  name: "FindPasswordPage",
  data() {
    return {
      email: "",
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
    handleSubmit() {
      if (!this.email) {
        alert("이메일을 입력해주세요.");
      } else {
        alert("입력하신 이메일로 임시 비밀번호를 보냈습니다.");
        this.$router.push("/Authenticate");
      }
    },
    goBack() {
      this.$router.push("/login");
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
@import "@/assets/css/Find_Password.css";
</style>