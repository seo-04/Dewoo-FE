<template>
  <div class="booking-item">
    <div class="booking-card">
      <div class="card-left">

        <div class="hotel-logo-container">
          <img
            :src="reservation.roomImage || defaultImage"
            alt="Room Image"
            class="profile-hotel-logo"
          >
        </div>

        <div class="checkin-checkout-dates">
          <div class="date-section-wrapper">
            <div class="date-info-group">
              <span class="date-label">Check-In</span>
              <span class="date-value">{{ formatDate(reservation.checkIn) }}</span>
            </div>
            <div class="dash-separator"></div>
            <div class="date-info-group">
              <span class="date-label">Check Out</span>
              <span class="date-value">{{ formatDate(reservation.checkOut) }}</span>
            </div>
          </div>

          <div class="profile-history-divider"></div>

          <div class="checkIO-container">
            <div class="checkIO">
              <div class="checkIO-time">
                <div class="profile-icon-wrapper">
                  <i class="fa-solid fa-clock"></i>
                </div>
                <div class="checkIO-details">
                  <span class="checkIO-label"> 체크인 </span>
                  <span class="checkIO-value"> {{reservation.checkInTime}} </span>
                </div>
              </div>

              <div class="checkIO-time">
                <div class="profile-icon-wrapper">
                  <i class="fa-solid fa-clock"></i>
                </div>
                <div class="checkIO-details">
                  <span class="checkIO-label"> 체크아웃 </span>
                  <span class="checkIO-value"> {{reservation.checkOutTime}} </span>
                </div>
              </div>
            </div>

            <div class="checkIO">
              <div class="checkIO-time">
                <div class="profile-icon-wrapper">
                  <i class="fa-solid fa-door-open"></i>
                </div>
                <div class="checkIO-details">
                  <span class="checkIO-label"> 객실번호 </span>
                  <span class="checkIO-value"> {{ reservation.roomNumber}} </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 부모(List)에서 전달받는 데이터 정의
const props = defineProps({
  reservation: {
    type: Object,
    required: true
  }
});

// 이미지가 없을 때 보여줄 기본 이미지
const defaultImage = "https://picsum.photos/seed/room/80/80";

// 날짜 포맷팅 함수 (YYYY-MM-DD -> 12.08 (Mon))
function formatDate(dateString) {
  if (!dateString) return '-';

  // 백엔드에서 받은 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 유효하지 않은 날짜 데이터일 경우 방어 코드
  if (isNaN(date.getTime())) return dateString;

  const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
  // 미국식 표기 (Dec 8, Mon)
  return date.toLocaleDateString('en-US', options);
}
</script>

<style scoped>
/* 기존 스타일 유지 */
@import "../../assets/css/UserProfile.css";
</style>