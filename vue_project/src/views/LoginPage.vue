<template>
  <div class="container">
    <div class="login-box">
      <!-- 왼쪽 로그인 -->
      <div class="left">
        <h4>Login</h4>
        <p class="login_text">로그인 해주세요</p>

        <div class="log_input">
          <form id="loginForm" @submit.prevent="handleSubmit">
            <div class="password">
              <input type="text" v-model="email" placeholder="Email" />
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Password"
              />
              <i
                  :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                  @click="togglePassword"
              ></i>
            </div>
          </form>
        </div>

        <div class="check">
          <label>
            <input type="checkbox" v-model="remember" /> 비밀번호 기억하기
          </label>
          <p class="text2">
            <a href="/Find_Password">Forgot Password</a>
          </p>
        </div>

        <button class="loginbox" @click="handleSubmit">Login</button>
        <p class="signup">
          <a href="/signup">회원가입</a>
        </p>

        <!-- sns 로그인 경계선 -->
        <div class="boundary_line">
          <p>Or login with</p>
        </div>

        <!-- sns 로그인 -->
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
    handleSubmit() {
      if (!this.email || !this.password) {
        alert("이메일과 비밀번호를 모두 입력해주세요!");
        return;
      }
      alert("로그인 시도!");
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
.login-box {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  display: flex;
  border-radius: 10px;
  overflow: hidden;
  width: 800px;
  max-width: 90%;
}

.right {
  width: 400px;
  height: 480px;
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  margin-top: 14px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}


/* 이미지 슬라이드 */
.right img {
  width: 500px;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.dots {
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.snsbox div {
  display: flex;
  border: 2px solid #8DD3BB;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  height: 40px;
  font-size: 15px;
  cursor: pointer;
}


</style>
