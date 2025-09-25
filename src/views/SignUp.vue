<template>
  <div class="container">
    <div class="login-box">
      <!-- 왼쪽 회원가입 -->
      <div class="left">
        <h4>Sign up</h4>
        <p>회원가입</p>

        <div class="log_input">
          <form @submit.prevent="handleSignup">
            <!-- 이름 입력 -->
            <div class="row-input">
              <input v-model="fname" type="text" placeholder="First Name" />
              <input v-model="lname" type="text" placeholder="Last Name" />
            </div>

            <!-- 이메일 & 전화번호 -->
            <div class="row-input">
              <input v-model="email" type="email" placeholder="Email" />
              <input v-model="phone" type="text" placeholder="Phone Number" />
            </div>

            <!-- 비밀번호 -->
            <div class="passwordbox">
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Password"
              />
              <i
                  :class="['fa-solid', showPassword ? 'fa-eye' : 'fa-eye-slash']"
                  @click="togglePassword('password')"
              ></i>
            </div>

            <!-- 비밀번호 확인 -->
            <div class="passwordbox">
              <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
              />
              <i
                  :class="['fa-solid', showConfirmPassword ? 'fa-eye' : 'fa-eye-slash']"
                  @click="togglePassword('confirm')"
              ></i>
            </div>

            <!-- 동의 체크박스 -->
            <div class="check">
              <label>
                <input type="checkbox" v-model="agree" /> 동의하기
              </label>
            </div>

            <button type="submit" class="loginbox">계정 생성</button>
          </form>
        </div>

        <p class="signup">회원가입</p>

        <!-- sns 로그인 경계선 -->
        <div class="boundary_line">
          <p>Or Sign up with</p>
        </div>

        <!-- sns 로그인 창 -->
        <div class="snsbox">
          <div class="facebook"><i class="fa-brands fa-facebook"></i></div>
          <div class="google">
            <img
                width="20"
                height="20"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
            />
          </div>
          <div class="apple"><i class="fa-brands fa-apple"></i></div>
        </div>
      </div>

      <!-- 오른쪽 이미지 -->
      <div class="right">
        <img
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide"
            class="slide"
            :class="{ active: i === currentSlide }"
        />
        <div class="dots">
          <span
              v-for="(dot, i) in slides"
              :key="i"
              class="dot"
              :class="{ active: i === currentSlide }"
              @click="showSlide(i)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpPage",
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
      showPassword: false,
      showConfirmPassword: false,
      currentSlide: 0,
      slides: [
        '@/assets/img.jpg',
        '@/assets/img2.jpg',
        '@/assets/img3.jpg',
      ],
    };
  },
  mounted() {
    this.startSlideShow();
  },
  methods: {
    togglePassword(type) {
      if (type === "password") {
        this.showPassword = !this.showPassword;
      } else {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    handleSignup() {
      if (!this.fname || !this.lname || !this.email || !this.phone || !this.password || !this.confirmPassword) {
        alert("모든 항목을 입력해주세요.");
      } else if (this.password !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (!this.agree) {
        alert("약관에 동의 해주세요.");
      } else {
        alert("회원가입이 완료되었습니다.");
        this.$router.push("/PaymentMethod"); // Vue Router 사용시 로그인 페이지로 이동
      }
    },
    startSlideShow() {
      setInterval(() => {
        this.nextSlide();
      }, 3000);
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    showSlide(i) {
      this.currentSlide = i;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/SignUp.css";

</style>
