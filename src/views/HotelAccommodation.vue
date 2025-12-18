<template>
  <CommonLayout>
    <div v-if="accommodation">

      <div class="accommodation-container">
        <div class="hotel-info-section">
          <div class="hotel-header-details">
            <div class="breadcrumb">
              {{ accommodation.location}} > {{ accommodation.category }} > {{ accommodation.comTitle }}
            </div>
            <div class="hotel-title-and-rating">
              <h1 class="hotel-title">{{ accommodation.comTitle }}</h1>
              <div class="hotel-rating">
                <span class="stars">{{ '★'.repeat(accommodation.star) }}{{ '☆'.repeat(5 - accommodation.star) }}</span>
                {{ accommodation.star }} Star Hotel
              </div>
            </div>
            <div class="hotel-address">
              <i class="fa-solid fa-location-dot"></i> {{ accommodation.comAddress }}
            </div>
            <div class="hotel-reviews">
              <span class="rating-score">{{ accommodation.reviewAvg }}</span>
              <span class="review-text">{{ getReviewText(accommodation.reviewAvg) }}</span>
              <span class="review-count">{{ accommodation.reviewCount }} reviews</span>
            </div>
          </div>
          <div class="price-and-actions">
            <div class="price-container" v-if="lowestPriceRoom">
              <template v-if="lowestPriceRoom.discountedPrice && lowestPriceRoom.discountedPrice < lowestPriceRoom.price">
                <span class="original-price" style="text-decoration: line-through; color: grey; font-size: 0.9em; margin-right: 8px;">
                  ₩{{ lowestPriceRoom.price.toLocaleString() }}
                </span>
                <span class="per-night" style="color: red; font-weight: bold;">
                  ₩{{ lowestPriceRoom.discountedPrice.toLocaleString() }}
                </span>
              </template>
              <template v-else>
                <span class="per-night">₩{{ lowestPriceRoom.price.toLocaleString() }}</span>
              </template>
              <span style="font-size: 14px; color: #666;"> /night~</span>
            </div>
            <div class="price-container" v-else>
              <span class="per-night">{{(accommodation.price || 0).toLocaleString()}} ₩</span>
            </div>
            <div class="action-buttons">
              <button class="icon-button"><i class="fa-regular fa-heart"></i></button>
              <button class="icon-button"><i class="fa-solid fa-share-nodes"></i></button>
              <button class="book-now-button" @click="goToPaymentLowest">Book now</button>
            </div>
          </div>
        </div>

        <div class="hotel-images-section">
          <div class="main-image">
            <img :src="'/api/accommodation/images/file/' + accommodation.mainImage" alt="메인 호텔 이미지" @click="openLightbox(accommodation.mainImage)" />
          </div>
          <div class="thumbnail-images">
            <img
              v-for="(image, index) in accommodation.subImage.slice(0, 4)"
              :key="index"
              :src="'/api/accommodation/images/file/' + image"
              :alt="`호텔 썸네일 ${index + 1}`"
              @click="openLightbox(image)"
            />
            <button class="view-all-button" @click="showModal = true">View all photos</button>
          </div>
        </div>

        <div v-if="showLightbox" class="lightbox-overlay" @click.self="closeLightbox">
          <button class="lightbox-close-button" @click="closeLightbox">&times;</button>
          <div class="lightbox-content">
            <img :src="'/api/accommodation/images/file/' + currentLightboxImage" class="lightbox-image" alt="Enlarged image" />
          </div>
        </div>

      </div>

      <hr>

      <div class="overview-section">
        <h2 class="section-title">Overview</h2>
        <p class="overview-texts">
          {{ accommodation.comDescription }}
        </p>
      </div>
      <hr>

      <div class="rooms-section">
        <div class="room-list">
          <h2 class="section-title-acc">잔여 객실</h2>
          <div v-if="accommodation && accommodation.rooms">
            <div class="room-item" v-for="room in accommodation.rooms" :key="room.accId">
              <div class="room-details">
                <img v-if="room && room.roomType && room.roomType.parlorImage"
                     :src="`/api/parlor/images/file/${room.roomType.parlorImage}`"
                     :alt="`${room.roomType.roomTypeName || 'Room'} Image`"
                     class="room-image" />
                <div v-else class="room-image placeholder-image">
                  <span>이미지 없음</span>
                </div>

                <div class="room-info">
                  <div class="room-type">{{ (room.roomType && room.roomType.roomTypeName) ? room.roomType.roomTypeName : '알 수 없는 객실' }}</div>
                </div>
              </div>
              <div class="room-price-container">
                <div class="room-price">
                  <template v-if="room.discountedPrice && room.discountedPrice < room.price">
              <span class="original-price" style="text-decoration: line-through; color: grey; font-size: 0.9em; margin-right: 5px;">
                ₩{{ room.price.toLocaleString() }}
              </span>
                    <span class="price-value" style="color: red;">
                ₩{{ room.discountedPrice.toLocaleString() }}
              </span>
                  </template>
                  <template v-else>
                    <span class="price-value">₩{{ room.price.toLocaleString() }}</span>
                  </template>
                  <span class="price-unit">/night</span>
                </div>
                <button class="book-now-button" @click="goToPayment(room)">Book now</button>
              </div>
            </div>
          </div>
          <div v-else>
            객실 정보를 불러오는 중입니다...
          </div>
        </div>
      </div>
      <hr>

      <MapSection
        apiKey="AIzaSyALY6qdom7_04POAxT18afRvHK84daK4FM"
        :address="accommodation.comAddress"
      />
      <hr>


      <AmenitiesAndReviews
        :amenities="accommodation.amenities"
        :review-avg="accommodation.reviewAvg"
        :review-count="accommodation.reviewCount"
        @review-submitted="fetchAccommodationData"
        @attempt-review="handleReviewAttempt"
        @review-deleted="fetchAccommodationData"
      />
    </div>

    <div v-if="showModal" class="image-modal-overlay" @click.self="showModal = false">
      <div class="image-modal-content">
        <button class="modal-close-button" @click="showModal = false">&times;</button>
        <h3>All Photos ({{ allImages.length }})</h3>
        <div class="modal-image-grid">
          <img v-for="(image, index) in allImages"
               :key="index"
               :src="'/api/accommodation/images/file/' + image"
               :alt="`Image ${index + 1}`"
               @click="openLightbox(image)" />
        </div>
      </div>
    </div>

  </CommonLayout>
</template>

<script>
// NOTE: 컴포넌트 경로 문제는 사용자가 직접 해결해야 하는 부분이므로,
// 현재 파일의 import는 사용자 파일에서 정상 동작했다고 가정하고 유지합니다.
import MapSection from './MapSection.vue';
import AmenitiesAndReviews from './AmenitiesAndReviews.vue';
// API 호출을 위해 axios 임포트
import axios from 'axios';
import CommonLayout from '@/components/common/CommonLayout.vue';

export default {
  name: "HotelAccommodation",
  components: {
    CommonLayout,
    MapSection,
    AmenitiesAndReviews
  },
  data() {
    return {
      accommodation: null,
      error: null,
      showModal: false,
      showLightbox: false,
      currentLightboxImage: null
    };
  },
  computed: { // [✅ computed 속성 추가]
    allImages() {
      if (!this.accommodation) return [];
      // 메인 이미지와 서브 이미지 배열을 합쳐서 반환
      return [this.accommodation.mainImage, ...this.accommodation.subImage];
    },
    // 최저가 객실 찾기 (할인 적용된 가격 기준)
    lowestPriceRoom() {
      if (!this.accommodation || !this.accommodation.rooms || this.accommodation.rooms.length === 0) {
        return null;
      }

      return this.accommodation.rooms.reduce((lowest, room) => {
        // 실제 결제 가격 (할인가가 있으면 할인가, 없으면 원가)
        const currentPrice = (room.discountedPrice && room.discountedPrice < room.price)
          ? room.discountedPrice
          : room.price;
        const lowestPrice = (lowest.discountedPrice && lowest.discountedPrice < lowest.price)
          ? lowest.discountedPrice
          : lowest.price;

        return currentPrice < lowestPrice ? room : lowest;
      }, this.accommodation.rooms[0]);
    }
  },
  methods: {
    openLightbox(image) {
      this.currentLightboxImage = image;
      this.showLightbox = true;
    },
    closeLightbox() {
      this.showLightbox = false;
      this.currentLightboxImage = null;
    },
    async fetchAccommodationData() {
      try {
        const comId = this.$route.params.comId;
        const checkIn = this.$route.query.checkIn;
        const checkOut = this.$route.query.checkOut;

        let apiUrl = `/api/accommodation/${comId}`;

        const params = new URLSearchParams();
        if (checkIn) params.append('checkIn', checkIn);
        if (checkOut) params.append('checkOut', checkOut);

        if (params.toString()) {
          apiUrl += `?${params.toString()}`;
        }

        console.log(`Fetching data from: ${apiUrl}`);

        // API 호출
        const response = await axios.get(apiUrl);

        if (response.data && response.data.code === 'SUCCESS') {
          this.accommodation = response.data.result;
        } else {
          throw new Error(response.data.message || "데이터 로드 실패");
        }
      } catch (err) {
        console.error("숙소 정보를 불러오는 중 오류가 발생했습니다:", err);
        this.error = "데이터를 불러오는 데 실패했습니다.";
      }
    },

    // (선택) 리뷰 점수에 따라 텍스트 반환
    getReviewText(score) {
      if (score >= 4.5) return "Excellent";
      if (score >= 4.0) return "Very Good";
      if (score >= 3.5) return "Good";
      if (score >= 3.0) return "Average";
      return "Poor";
    },

    // (필수) AccRoomTypeDto에 이미지가 없으므로 임시 이미지 반환
    getRoomPlaceholderImage(roomId) {
      return `https://placehold.co/100x80?text=Room+${roomId}`;
    },

    // 🚨 [추가] 하위 컴포넌트에서 로그인 필요 시 호출되는 핸들러
    handleReviewAttempt() {
      alert("리뷰를 작성하려면 로그인 후 이용해주세요."); // 사용자가 원한 알림창
      // 로그인 페이지로 이동 (index.js에 따르면 '/'가 LoginPage입니다.)
      this.$router.push('/');
    },

    // [추가] 결제 페이지로 이동
    goToPayment(room) {
      // 로그인 체크
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert('예약하려면 로그인이 필요합니다.');
        this.$router.push('/login');
        return;
      }

      // 체크인/체크아웃 날짜 확인
      let checkIn = this.$route.query.checkIn;
      let checkOut = this.$route.query.checkOut;

      // 날짜가 없으면 기본값 설정 (오늘, 내일)
      if (!checkIn || !checkOut) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const formatDate = (d) => d.toISOString().split('T')[0];
        checkIn = checkIn || formatDate(today);
        checkOut = checkOut || formatDate(tomorrow);
      }

      // 결제 페이지로 이동 (accId = room.accId)
      this.$router.push({
        path: '/payment',
        query: {
          accId: room.accId,
          checkIn: checkIn,
          checkOut: checkOut,
        }
      });
    },

    // [추가] 상단 Book now - 최저가 객실로 결제 페이지 이동
    goToPaymentLowest() {
      if (!this.lowestPriceRoom) {
        alert('예약 가능한 객실이 없습니다.');
        return;
      }
      this.goToPayment(this.lowestPriceRoom);
    },

    // [추가] 호텔 이미지 URL 처리
    getHotelImageUrl(image) {
      if (!image) return require('@/assets/img/Hatton_Hotel.jpg');
      if (image.startsWith('http')) return image;
      if (image.startsWith('/hotel-images')) return image;
      if (image.startsWith('/')) return image;
      return `/hotel-images/${image}`;
    },

    // [추가] 객실 이미지 URL 처리
    getRoomImageUrl(image) {
      if (!image) return require('@/assets/img/Hatton_Hotel.jpg');
      if (image.startsWith('http')) return image;
      if (image.startsWith('/parlor-images')) return image;
      if (image.startsWith('/')) return image;
      return `/parlor-images/${image}`;
    },

    // [추가] 이미지 로드 실패 시 기본 이미지로 대체
    handleImageError(e) {
      e.target.src = require('@/assets/img/Hatton_Hotel.jpg');
    }
  },
  mounted() {
    // 컴포넌트가 로드될 때 API 호출
    this.fetchAccommodationData();
  },
  watch: {
    // (선택) 라우트 파라미터(checkIn/checkOut 등)가 변경될 때 데이터를 새로고침
    '$route': 'fetchAccommodationData'
  }
};
</script>

<style scoped>
@import '../assets/css/HotelAccommodation.css';
</style>