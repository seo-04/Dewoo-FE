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
import img1 from '@/assets/img/img.jpg';
import img2 from '@/assets/img/img2.jpg';
import img3 from '@/assets/img/img3.jpg'; 

export default {
  name: "PasswordSettingPage",
  data() {
    return {
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirm: false,
      images: [
        img1,
        img2,
        img3  
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

/* 전체 컨테이너 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
}

/* 메인 박스 */
.login_box {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 800px;
    max-width: 90%;
}

/* 왼쪽 영역 */
.left {
    flex: 1;
    padding: 40px;
}

h4 {
    font-size: 25px;
    margin-bottom: 10px;
}

p {
    color: gray;
    font-size: 12px;
    margin-bottom: 20px;
}

/* 입력 폼 */
.form-area input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* 비밀번호 박스 */
.passwordbox {
    position: relative;
}

.passwordbox input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.passwordbox i {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: gray;
}

/* 비밀번호설정 버튼 */
.submit {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #8DD3BB;
    color: black;
    font-weight: bold;
    cursor: pointer;
}

/* 오른쪽 이미지 영역 */
.right {
    width: 400px;
    height: 290px;
    flex: 1;
    position: relative;
    overflow: hidden;
    margin-top: 17px;
    margin-right: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 이미지 슬라이드 */
.right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    border-radius: 15px;
}

.right img.active {
    opacity: 1;
}

.dots {
    position: absolute;
    bottom: 5%;
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


</style>
