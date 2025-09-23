<template>
  <div class="payment-body">

    <div class="payment-big">
      <div class="big-roomInfo">

        <div class = "Reservation_Info">

          <div class="roomInfo">
            <span class="room">Superior room - 1 더블베드 or 2 트윈 베드</span>
            <span class="roomPrice">₩240,000/night</span>
          </div>

          <div class="hotel-link">
            <div style="display: flex">
            <div>
              <img class="hotel-logo" src="@/assets/cvk_hotel_logo.png" alt="">
            </div>
            <div class = "hotel-link-details">
              <div style="font-size: 20px;">
                해튼호텔
              </div>
              <div style="font-size: 14px; color: #888888">
                <img class="location-logo" src="@/assets/location.png" alt="">
                Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
              </div>
            </div>
            </div>
          </div>
          <div class="Reservation_date">
            <div class="date">
                <span class = "day">Thursday, Dec 8</span>
                <span class = "check-IO">Check-In</span>
            </div>
            <div class="Reservation_image">
              <img src="../assets/left_line.png" height="7" width="39" alt="" style="margin-right: 30px"/>
              <img src="../assets/hotel_image.png" height="45" width="42" alt="" style="margin-right: 30px"/>
              <img src="../assets/right_line.png" height="7" width="39" alt=""/>
            </div>
            <div class="date">
              <span class = "day">Friday, Dec 9</span>
              <span class = "check-IO">Check-Out</span>
            </div>
          </div>
        </div>

        <div class="payment-type" >
          <div>
            <span>카드결제</span>
            <span>카드 등록 후 결제가 진행됩니다.</span>
          </div>
          <div>
            <span>간편결제</span>
            <span>카드 등록 없이 간편인증으로 결제가 진행됩니다.</span>
          </div>
        </div>

        <div class="Reservation_sign">
          <span>Login or Sign up to book</span>
          <input class="Reservation_phoneNumber" placeholder="Phone Number">
          <span>예약확인 문자/전화를 위해 전화번호를 남겨주세요</span>
          <button class="continue">continue</button>
          <div class="boundary_line">
            <p>Or</p>
          </div>
          <div class="Reservation_image">
            <div>
              <img src="@/assets/login_facebook.png" alt="">
            </div>
            <div>
              <img src="@/assets/login_google.png" alt="">
            </div>
            <div>
              <img src="@/assets/login_apple.png" alt="">
            </div>
          </div>
          <div>
            <img src="@/assets/email_icon.png" alt="">
            <span>Continue with email</span>
          </div>
        </div>
      </div>
    </div>


    <div class="payment-small">
      <div>
        <img>
        <div>
          <span>CVK Park Bosphorus...</span>
          <span>Superior room - 1 더블베드 or 2 트윈 베드</span>
        </div>
        <div>4.2</div>
        <span>Very good</span>
        <span>54 reviews</span>
      </div>
      <div class="boundary_line">
      </div>
      <div>
        Your booking is protected by <span>golobe</span>
      </div>
      <div class="boundary_line">
      </div>
      <div>
        <div>Price Details</div>
        <div>
          <span>Base Fare</span>
          <span>₩240,000</span>
        </div>
        <div>
          <span>Discount</span>
          <span>₩0</span>
        </div>
        <div>
          <span>Taxes</span>
          <span>₩24,000</span>
        </div>
        <div>
          <span>Service Fee</span>
          <span>₩5,000</span>
        </div>
      </div>
      <div class="boundary_line">
      </div>
      <div>
        <span>Total</span>
        <span>₩265,000</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  .payment-body{
    display: flex;
    width: 90%;
    justify-content: space-evenly;
  }

  .payment-big{
    width: 60%;
  }

  .payment-small{
    width: 20%;
  }

  .Reservation_Info{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 16px 24px;
    margin-bottom: 50px;

  }

  .big-roomInfo{
    justify-content: space-between;
  }

  .roomInfo{
    display: flex;
    margin-bottom: 30px;
    margin-top: 30px;
    justify-content: space-between;
    align-items: center;
  }

  .room{
    font-size: 24px;
    font-weight: bold;
  }

  .roomPrice{
    font-size: 24px;
    font-weight: bold;
    color: #FF8682;
  }

  .hotel-link{
    display: flex;
    margin-bottom: 30px;
    border: 1px solid #cdeae1;
    border-radius: 10px;
    align-items: center;
    gap: 25px;
    padding: 20px;
  }

  .hotel-logo{
    width: 63px;
    height: 63px;
    position: relative;
    top: 3px;
    margin-left: 30px;
  }

  .location-logo{
    position: relative;
    top: 3px;
  }

  .hotel-link-details{
    margin-left: 50px;
    position: relative;
    top: 7px;
  }

  .Reservation_date{
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    border-radius: 20px;
    align-items: center;
  }

  .day{
    display: block;
    font-weight: bold;
    font-size: 20px;
  }

  .check-IO{
    font-size: 14px;
    color: #888888;
  }

  .Reservation_image{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .payment-type{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    padding: 16px 24px;
    margin-bottom: 50px;
  }

  .Reservation_sign{
    background-color: white;
  }

  .boundary_line{
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: #112211;
    font-size: 18px;
    margin: 6px 0px;
  }
  .boundary_line::before,
  .boundary_line::after{
    content: "";
    flex-grow: 1;
    background: gray;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 25px 7px;
  }
</style>