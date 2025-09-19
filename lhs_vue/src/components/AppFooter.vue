<template>
  <footer>
    <section class="subscription-box">
      <div class="subscription-content">
        <h1>구독서비스<br> 신청해보세요</h1>
        <p style="font-weight: bold; color: #374a3b; font-size: 17px">The Travel</p>
        <p>구독하고 무료, 최신 여행 정보를 받아보세요</p>
        <div class="subscription-form-container">
          <input type="email" placeholder="Your email address" style="width: 100%; padding: 10px">
          <button type="submit">Subscribe</button>
        </div>
      </div>
      <div class="subscription-image">
        <img src="@/assets/letter-box.png" height="390" width="400" alt="" />
      </div>
    </section>

    <div class="footer-bottom">
      <div class="footer-letter">
          <span>
            <img src="@/assets/facebook.png" height="19" width="18" alt="" style="margin-right: 10px;" />
            <img src="@/assets/twitter.png" height="16" width="20" alt="" style="margin-right: 10px;" />
            <img src="@/assets/youtube.png" height="14" width="20" alt="" style="margin-right: 10px;" />
            <img src="@/assets/insta.png" height="18" width="17" alt="" style="margin-right: 10px;" />
          </span>
      </div>
      <div class="footer-letter" style="margin-right: 20px">
          <span class="footer-span">
            Our Destinations<br>
          </span>
        <span class="footer-span-details">
            <span>Canada</span>
            <span>Alaska</span>
            <span>France</span>
            <span>Iceland</span>
          </span>
      </div>
      <div class="footer-letter" style="margin-right: 20px">
          <span class="footer-span">
            Our Activities<br>
          </span>
        <span class="footer-span-details">
            <span>Northern Lights</span>
            <span>Cruising & sailing</span>
            <span>Multi-activities</span>
            <span>Kayaing</span>
          </span>
      </div>
      <div class="footer-letter" style="margin-right: 20px">
          <span class="footer-span">
            Travel Blogs<br>
          </span>
        <span class="footer-span-details">
            <span>Bali Travel Guide</span>
            <span>Sri Lanks Travel Guide</span>
            <span>Peru Travel Guide</span>
            <span>Bali Travel Guide</span>
          </span>
      </div>
      <div class="footer-letter" style="margin-right: 20px">
          <span class="footer-span">
            About Us<br>
          </span>
        <span class="footer-span-details">
            <span>Our Story</span>
            <span>Work with us</span>
          </span>
      </div>
      <div class="footer-letter" style="margin-right: 20px">
          <span class="footer-span">
            Contact Us<br>
          </span>
        <span class="footer-span-details">
            <span>Our Story</span>
            <span>Work with us</span>
          </span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
.subscription-box {
  background-color: #cdeae1;
  border-radius: 10px;
  padding: 30px;
  width: 80%;
  height: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

footer {
  background-color: #8dd3bb;
  height: 422px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  margin: 0 auto;
  position: relative;
  flex-direction: column;

  padding-top: 200px;
  padding-bottom: 60px;
}

.footer-bottom {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 105px;
}

.footer-letter {
  justify-content: space-evenly;
}

.footer-span {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: clamp(1.125rem, 1vw + 0.5rem, 1.375rem);
}

.footer-span-details {
  color: #375844;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 13px;
  gap: 10px;
  font-size:clamp(0.875rem, 0.5vw + 0.5rem, 1rem);
}
</style>