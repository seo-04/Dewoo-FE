<template>
  <footer>
    <section class="subscription-box">

      <div class="subscription-content">
        <div style="display: grid; gap: 20px">
        <span style="font-size: 44px; font-weight: bold; display: block">구독서비스<br> 신청해보세요</span>
        <span style="font-weight: bold; color: #374a3b; font-size: 20px; display: block">The Travel</span>
        <span>구독하고 무료, 최신 여행 정보를 받아보세요</span>
        <div class="subscription-form-container">
          <input class="subscription-email" type="email" placeholder="Your email address" style="width: 500px; padding: 10px">
          <button class="subscription-button" type="submit">Subscribe</button>
        </div>
        </div>
      </div>
      <div class="subscription-image">
        <img src="@/assets/letter-box.png" height="325" width="335" style="position: relative; top: 4px" alt="" />
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

<script setup lang="js">

</script>

<style scoped>
.subscription-box {
  background-color: #cdeae1;
  border-radius: 10px;
  padding: 30px;
  width: 80%;
  max-width: 1232px;
  height: 305px;
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
  margin: 0;
  position: relative;
  flex-direction: column;

  padding-top: 200px;
  padding-bottom: 60px;
}

.footer-bottom {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 1232px;
  gap: 50px;
}

.footer-letter {
  justify-content: space-evenly;
}

.footer-span {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 16px;
}

.footer-span-details {
  color: #375844;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 13px;
  gap: 10px;
  font-size:  14px;
}

.subscription-form-container{
  display: flex;
  gap: 20px;
}

.subscription-email{
  border-radius: 5px;
  height: 40px;
  border : none;
}

.subscription-button{
  border-radius: 5px;
  padding: 10px;
  border: none;
  background-color: #112211;
  color: white;
  font-size: 14px;
}

.subscription-content{
  display: flex;
}
</style>