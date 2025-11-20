<template>
  <div class="container">
    <div class="login-box">
      <div class="lefts">
        <h4 class="centered-text">Sign up</h4>
        <p class="centered-text">회원가입</p>
        <div class="log_input">
          <form @submit.prevent="finalSubmit">

            <div class="row-input">
              <input v-model="name" type="text" placeholder="Name" />
            </div>

            <div class="row-input email-verify-row">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                :disabled="isEmailVerified"
              />
              <button
                type="button"
                class="send-code-btn"
                @click="sendVerificationCode"
                :disabled="isVerificationSent || isEmailVerified"
              >
                {{ isVerificationSent ? '전송됨' : '인증번호 보내기' }}
              </button>
            </div>

            <div class="row-input email-verify-row" v-if="isVerificationSent">
              <input
                type="text"
                v-model="verificationCode"
                placeholder="인증번호 입력"
                :disabled="isEmailVerified"
              />
              <button
                type="button"
                class="send-code-btn"
                @click="checkVerificationCode"
                :disabled="isEmailVerified"
              >
                {{ isEmailVerified ? '인증완료' : '확인' }}
              </button>
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

            <button
              type="submit"
              class="loginbox"
              :class="{ disabled: !isFormValid }"
              :disabled="!isFormValid"
            >
              회원가입 진행
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

      isVerificationSent: false, // 인증번호 발송 여부
      isEmailVerified: false,    // [추가] 이메일 인증 완료 여부 (이게 true여야 최종 가입 가능)

      agree: false,
      showPassword: false,
      showConfirmPassword: false,
      currentSlide: 0,
      slides: [0, 1, 2], // 간단히 인덱스 배열로 처리
    };
  },
  computed: {
    // 비밀번호 유효성 검사 (정규식 + 확인란 일치 여부)
    isPasswordValid() {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/]).{8,}$/;
      return regex.test(this.password) && this.password === this.confirmPassword;
    },

    // [핵심] 전체 폼 유효성 검사
    isFormValid() {
      const baseValid =
        this.name &&
        this.email &&
        this.phone &&
        this.address &&
        this.dateOfBirth &&
        this.isPasswordValid &&
        this.agree;

      // 모든 정보 입력 + 이메일 인증 완료 상태(isEmailVerified)가 true여야 함
      return baseValid && this.isEmailVerified;
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

    // 1. 인증번호 보내기
    async sendVerificationCode() {
      // 기본 검사
      if (!this.email || !this.isPasswordValid || !this.name || !this.phone) {
        alert("이메일, 이름, 전화번호, 비밀번호를 먼저 올바르게 입력해주세요.");
        return;
      }

      try {
        // 서버로 사용자 정보 전송 (인증번호 요청)
        const response = await axios.post('/api/user', {
          userEmail: this.email,
          password: this.password,
          username: this.name,
          userAddress: this.address,
          userPhone: this.phone,
          userBirth: this.dateOfBirth,
        });

        if (response.data.code === 'SUCCESS') {
          alert("인증번호가 전송되었습니다. 이메일을 확인해주세요.");
          this.isVerificationSent = true; // 입력칸 보이기
          this.isEmailVerified = false;   // 재전송 시 인증 상태 초기화
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("인증번호 전송 실패:", error);
        const msg = error.response?.data?.message || "인증번호 전송 중 오류가 발생했습니다.";
        alert(msg);
      }
    },

    // 2. [신규] 인증번호 확인하기 (중간 단계)
    async checkVerificationCode() {
      if (!this.verificationCode) {
        alert("인증번호를 입력해주세요.");
        return;
      }

      try {
        const verificationResponse = await axios.post('/api/user/verify-email', {
          userEmail: this.email,
          verificationCode: this.verificationCode,
        });

        if (verificationResponse.data.code === 'SUCCESS') {
          alert('이메일 인증이 성공했습니다!');
          this.isEmailVerified = true; // [중요] 여기서 true가 되어야 최종 버튼 활성화
        } else {
          alert(verificationResponse.data.message || "인증번호가 일치하지 않습니다.");
          this.isEmailVerified = false;
        }
      } catch (error) {
        console.error("이메일 인증 실패:", error);
        alert("이메일 인증 중 오류가 발생했습니다.");
      }
    },

    // 3. 최종 가입 완료 버튼 (단순 페이지 이동)
    finalSubmit() {
      // 버튼이 disabled 상태면 클릭 안 되겠지만, 안전장치로 한 번 더 검사
      if (!this.isFormValid) return;

      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      this.$router.push('/login');
    },

    // 슬라이드쇼 로직
    startSlideShow() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 3000);
    },
    showSlide(i) {
      this.currentSlide = i;
    },

    // 주소 찾기 (Daum Postcode)
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddress = '';
          let extraAddress = '';

          if (data.userSelectedType === 'R') {
            fullAddress = data.roadAddress;
          } else {
            fullAddress = data.jibunAddress;
          }

          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddress !== '') {
            fullAddress += ' (' + extraAddress + ')';
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