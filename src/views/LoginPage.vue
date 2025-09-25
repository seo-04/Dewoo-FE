<template>
  <div class="login_page">
    <div class="container">
      <div class="login-box">
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
            <a href="/SignUp">회원가입</a>
          </p>

          <div class="boundary_line">
            <p>Or login with</p>
          </div>

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
          alert("로그인 성공!");
          // 로그인 성공 후 리다이렉트 (예: 메인 페이지)
          // this.$router.push('/main');
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
/* 투명 로그인 박스 */
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

/* 오른쪽 이미지 영역 */
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

.right img.active {
  opacity: 1;
}

/* 이미지 하단 dot */
.dots {
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
}

.dot.active {
  opacity: 1;
  background: #8DD3BB;
}

/* SNS 로그인 버튼 */
.snsbox {
  display: flex;
  margin-top: 15px;
  justify-content: center;
  gap: 10px;
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