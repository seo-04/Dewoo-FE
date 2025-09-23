<template>
  <div class="container">
    <div class="login-box">
      <div class="left">
        <h4>Sign up</h4>
        <p>회원가입</p>

        <div class="log_input">
          <form @submit.prevent="handleFormSubmit">
            <div class="row-input">
              <input v-model="name" type="text" placeholder="Name" />
            </div>

            <div class="row-input email-verify-row">
              <input v-model="email" type="email" placeholder="Email" />
              <button
                  type="button"
                  class="send-code-btn"
                  @click="sendVerificationCode"
                  :disabled="isVerificationSent"
              >
                {{ isVerificationSent ? '재전송' : '인증번호 보내기' }}
              </button>
            </div>

            <div class="passwordbox" v-if="isVerificationSent">
              <input
                  :type="showCode ? 'text' : 'password'"
                  v-model="verificationCode"
                  placeholder="Verification Code"
              />
              <i
                  :class="['fa-solid', showCode ? 'fa-eye' : 'fa-eye-slash']"
                  @click="toggleCodeVisibility"
              ></i>
            </div>

            <div class="row-input">
              <input v-model="dateOfBirth" type="date" placeholder="Date of Birth" />
            </div>

            <div class="row-input">
              <input v-model="address" type="text" placeholder="Address" />
              <input v-model="phone" type="text" placeholder="Phone Number" />
            </div>

            <div class="passwordbox">
              <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="8자리 이상 영문, 숫자, 특수기호 포함"
              />
              <i
                  :class="['fa-solid', showPassword ? 'fa-eye' : 'fa-eye-slash']"
                  @click="togglePassword('password')"
              ></i>
            </div>

            <div class="passwordbox">
              <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  :class="{ 'error-border': confirmPassword && password !== confirmPassword }"
              />
              <i
                  :class="['fa-solid', showConfirmPassword ? 'fa-eye' : 'fa-eye-slash']"
                  @click="togglePassword('confirm')"
              ></i>
            </div>

            <div
                v-if="confirmPassword && password !== confirmPassword"
                class="error-box"
            >
              <i class="fa-solid fa-circle-exclamation"></i>
              <span>비밀번호가 일치하지 않습니다.</span>
            </div>

            <div class="check">
              <label>
                <input type="checkbox" v-model="agree" />동의하기
              </label>
            </div>

            <button
                type="submit"
                class="loginbox"
                :class="{ disabled: !isFormValid }"
                :disabled="!isFormValid"
            >
              {{ isVerificationSent ? '인증하고 회원가입 완료' : '회원가입 진행' }}
            </button>
          </form>
        </div>

        <p class="signup">회원가입</p>

        <div class="boundary_line">
          <p>Or Sign up with</p>
        </div>

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
import axios from 'axios';

export default {
  name: "SignUpPage",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
      isVerificationSent: false,
      agree: false,
      showPassword: false,
      showConfirmPassword: false,
      showCode: false,
      currentSlide: 0,
      slides: [
        require("@/assets/img/img.jpg"),
        require("@/assets/img/img2.jpg"),
        require("@/assets/img/img3.jpg"),
      ],
    };
  },
  computed: {
    isPasswordValid() {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/]).{8,}$/;
      return regex.test(this.password) && this.password === this.confirmPassword;
    },
    isFormValid() {
      const baseValid =
          this.name &&
          this.email &&
          this.phone &&
          this.address &&
          this.dateOfBirth &&
          this.isPasswordValid &&
          this.agree;

      return this.isVerificationSent ? (baseValid && this.verificationCode) : baseValid;
    },
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
    toggleCodeVisibility() {
      this.showCode = !this.showCode;
    },
    async sendVerificationCode() {
      if (!this.email || !this.isPasswordValid) {
        alert("이메일과 유효한 비밀번호를 먼저 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post('/api/user', {
          userEmail: this.email,
          password: this.password,
          username: this.name,
          userAddress: this.address,
          userPhone: this.phone,
          userBirth: this.dateOfBirth,
        });
        if (response.data.code === 'SUCCESS') {
          alert(response.data.message);
          this.isVerificationSent = true;
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("인증번호 전송 실패:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("인증번호 전송 중 오류가 발생했습니다.");
        }
      }
    },
    async handleVerify() {
      if (!this.verificationCode) {
        alert("인증번호를 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post('/api/user/verify-email', {
          userEmail: this.email,
          verificationCode: this.verificationCode,
        });
        if (response.data.code === 'SUCCESS') {
          alert(response.data.message);
          this.$router.push(''); // 회원가입 완료 후 로그인 페이지로 이동
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("이메일 인증 실패:", error);
        alert("이메일 인증 중 오류가 발생했습니다.");
      }
    },
    async handleFormSubmit() {
      if (!this.isVerificationSent) {
        await this.sendVerificationCode();
      } else {
        await this.handleVerify();
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
/* 오른쪽 이미지 영역 */
.right {
  width: 400px;
  height: 600px;
  flex: 1;
  position: relative;
  overflow: hidden;
  margin-top: 13px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  bottom: 3%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

/* 새로운 스타일 추가 */
.email-verify-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.email-verify-row input {
  flex: 1;
}

.send-code-btn {
  background-color: #8DD3BB;
  border: none;
  border-radius: 5px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  padding: 12px 15px;
  white-space: nowrap;
}

.send-code-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>