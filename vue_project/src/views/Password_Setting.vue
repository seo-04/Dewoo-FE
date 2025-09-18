<template>
  <div class="container">
    <div class="login_box">

      <!-- 왼쪽 영역 -->
      <div class="left">
        <h4>비밀번호 설정</h4>
        <p>비밀번호 다시 설정하기</p>

        <div class="form-area">
          <form @submit.prevent="handleSubmit">
            <!-- 비밀번호 입력 -->
            <div class="passwordbox">
              <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  placeholder="Create Password"
                  v-model="password"
              />
              <i
                  :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                  @click="togglePassword('password')"
              ></i>
            </div>

            <!-- 비밀번호 확인 -->
            <div class="passwordbox">
              <input
                  :type="showConfirm ? 'text' : 'password'"
                  id="confirmPassword"
                  placeholder="Re-enter Password"
                  v-model="confirmPassword"
              />
              <i
                  :class="showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                  @click="togglePassword('confirm')"
              ></i>
            </div>
          </form>
        </div>

        <button class="submit" @click="handleSubmit">비밀번호 설정</button>
      </div>

      <!-- 오른쪽 이미지 -->
      <div class="right">
        <img
            v-for="(image, i) in images"
            :key="i"
            :src="image"
            alt="hotel image"
            class="slide"
            :class="{ active: i === currentIndex }"
        />
        <div class="dots">
          <span
              v-for="(dot, i) in images"
              :key="i"
              class="dot"
              :class="{ active: i === currentIndex }"
              @click="showSlide(i)"
          ></span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordSettingPage",
  data() {
    return {
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirm: false,
      images: [
        require("@/assets/img/img.jpg"),
        require("@/assets/img/img2.jpg"),
        require("@/assets/img/img3.jpg"),
      ],
      currentIndex: 0,
      intervalId: null,
    };
  },
  methods: {
    togglePassword(target) {
      if (target === "password") {
        this.showPassword = !this.showPassword;
      } else if (target === "confirm") {
        this.showConfirm = !this.showConfirm;
      }
    },
    handleSubmit() {
      if (!this.password || !this.confirmPassword) {
        alert("비밀번호를 입력해주세요.");
      } else if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("비밀번호가 설정되었습니다.");
        // 페이지 이동
        setTimeout(() => {
          this.$router.push("/login"); // Vue Router 사용
        }, 600);
      }
    },
    showSlide(n) {
      this.currentIndex = n;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
  },
  mounted() {
    this.intervalId = setInterval(this.nextSlide, 3000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
@import "@/assets/css/Password_Setting.css";

</style>
