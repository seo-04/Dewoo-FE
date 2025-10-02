<template>
  <div class="container">
    <div class="login-box">
      <div class="lefts">
        <h4 class="centered-text">Sign up</h4>
        <p class="centered-text">회원가입</p>
        <div class="log_input">
          <!-- 폼 제출은 최종 '회원가입 완료' 단계에서만 이뤄집니다 -->
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
                <!-- 인증번호를 받은 후에는 버튼이 비활성화됩니다 -->
                {{ isVerificationSent ? '전송 완료' : '인증번호 보내기' }}
              </button>
            </div>

            <!-- isVerificationSent가 true가 되면 인증번호 입력창이 나타납니다 -->
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
              <input v-model="address" type="text" placeholder="Address" readonly />
              <button type="button" class="search-address-btn" @click="searchAddress">주소찾기</button>
            </div>

            <div class="row-input">
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

            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="agree" />동의하기
              </label>
            </div>

            <!-- 최종 회원가입 버튼 -->
            <button
                type="submit"
                class="loginbox"
                :class="{ disabled: !isFormValid }"
                :disabled="!isFormValid"
            >
              회원가입 완료
            </button>
          </form>
        </div>
      </div>

      <div class="righting">
        <img src="@/assets/img/img.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 0 }" />
        <img src="@/assets/img/img2.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 1 }" />
        <img src="@/assets/img/img3.jpg" alt="hotel image" class="slide" :class="{ active: currentSlide === 2 }" />

        <div class="dots">
          <span
              v-for="(dot, i) in 3"
              :key="i"
              class="dot"
              :class="{ active: currentSlide === i }"
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
      // 모든 필드가 채워져 있고, 인증번호까지 입력된 상태인지 확인
      return (
          this.name &&
          this.email &&
          this.phone &&
          this.address &&
          this.dateOfBirth &&
          this.isPasswordValid &&
          this.agree &&
          this.isVerificationSent && // 인증번호가 전송되었는지
          this.verificationCode     // 인증번호를 입력했는지
      );
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

    // --- 핵심 수정 로직 1 ---
    // 1단계: 모든 정보를 보내서 임시 가입 및 인증번호 요청
    async sendVerificationCode() {
      // 인증번호를 받기 전, 모든 정보가 입력되었는지 확인
      if (!this.name || !this.email || !this.phone || !this.address || !this.dateOfBirth || !this.isPasswordValid) {
        alert("인증번호를 받으려면 이름, 이메일, 유효한 비밀번호 등 모든 정보를 올바르게 입력해주세요.");
        return;
      }
      try {
        // 백엔드 API 1단계 호출: 모든 회원 정보를 보낸다.
        const response = await axios.post('/api/user', {
          userEmail: this.email,
          password: this.password,
          username: this.name,
          userAddress: this.address,
          userPhone: this.phone,
          userBirth: this.dateOfBirth,
        });

        // 백엔드의 응답 메시지를 확인하여 성공 여부 처리
        if (response.data && response.data.message.includes("인증번호를 확인해주세요")) {
          alert(response.data.message);
          this.isVerificationSent = true; // 성공 시 인증번호 입력창 표시
        } else {
          alert(response.data.message || "알 수 없는 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("1단계 임시가입 및 인증요청 실패:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("인증번호 요청 중 오류가 발생했습니다.");
        }
      }
    },

    // --- 핵심 수정 로직 2 ---
    // 2단계: 인증번호를 확인하여 최종 가입 완료
    async verifyAndRegister() {
      if (!this.verificationCode) {
        alert("인증번호를 입력해주세요.");
        return;
      }
      try {
        // 백엔드 API 2단계 호출: 이메일과 인증번호만 보낸다.
        const response = await axios.post('/api/user/verify-email', {
          userEmail: this.email,
          verificationCode: this.verificationCode,
        });

        if (response.data && response.data.message.includes("완료되었습니다")) {
          alert(response.data.message);
          this.$router.push('/'); // 회원가입 성공 후 페이지 이동
        } else {
          alert(response.data.message || "인증에 실패했습니다.");
        }
      } catch (error) {
        console.error("2단계 최종가입 실패:", error);
        alert("회원가입 처리 중 오류가 발생했습니다.");
      }
    },

    // --- 핵심 수정 로직 3 ---
    // 최종 "회원가입 완료" 버튼을 눌렀을 때의 동작
    async handleFormSubmit() {
      // 1. 인증번호를 아직 받지 않았다면, 먼저 받으라고 안내
      if (!this.isVerificationSent) {
        alert('먼저 "인증번호 보내기" 버튼을 눌러 이메일 인증을 진행해주세요.');
        return;
      }

      // 2. 모든 폼이 유효한지 최종 확인
      if (!this.isFormValid) {
        alert('인증번호를 포함한 모든 정보를 올바르게 입력해주세요.');
        return;
      }

      // 3. 모든 조건이 충족되면 2단계(최종 가입) 실행
      await this.verifyAndRegister();
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
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              fullAddress += ' ' + data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
              fullAddress += (fullAddress !== '' ? ', ' + data.buildingName : data.buildingName);
            }
          }
          this.address = fullAddress;
        }
      }).open();
    },
  },
};
</script>

<style scoped>
@import '~@/assets/css/SignUp.css';
</style>
