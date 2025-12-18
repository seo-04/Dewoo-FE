<template>
  <CommonLayout>
    <div v-if="accommodation">
      <div class="accommodation-container">
        <div class="hotel-info-section">
          <div class="hotel-header-details">
            <div class="breadcrumb">
              {{ accommodation.location }} >
              {{ accommodation.category }} >
              {{ accommodation.comTitle }}
            </div>

            <div class="hotel-title-and-rating">
              <h1 class="hotel-title">{{ accommodation.comTitle }}</h1>
              <div class="hotel-rating">
                <span class="stars">
                  {{ '★'.repeat(accommodation.star) }}{{ '☆'.repeat(5 - accommodation.star) }}
                </span>
                {{ accommodation.star }} Star Hotel
              </div>
            </div>

            <div class="hotel-address">
              <i class="fa-solid fa-location-dot"></i>
              {{ accommodation.comAddress }}
            </div>

            <div class="hotel-reviews">
              <span class="rating-score">{{ accommodation.reviewAvg }}</span>
              <span class="review-text">{{ getReviewText(accommodation.reviewAvg) }}</span>
              <span class="review-count">{{ accommodation.reviewCount }} reviews</span>
            </div>
          </div>

          <div class="price-and-actions">
            <div class="price-container">
              <span class="price">
                ₩{{ (accommodation.price || 0).toLocaleString() }}
              </span>
            </div>
            <div class="action-buttons">
              <button class="icon-button"><i class="fa-regular fa-heart"></i></button>
              <button class="icon-button"><i class="fa-solid fa-share-nodes"></i></button>
              <button class="book-now-button">Book now</button>
            </div>
          </div>
        </div>

        <div class="hotel-images-section">

          <!-- 메인 이미지 -->
          <div class="main-image">
            <img
                :src="mainImageSrc"
                alt="메인 이미지"
                @click="openLightbox(mainImageSrc)"
            />
          </div>

          <div class="thumbnail-images">
            <img
                v-for="(image, index) in previewImages"
                :key="index"
                :src="image"
                @click="openLightbox(image)"
            />
            <button class="view-all-button" @click="showModal = true">
              View all photos
            </button>
          </div>
        </div>

        <div v-if="showLightbox" class="lightbox-overlay" @click.self="closeLightbox">
          <button class="lightbox-close-button" @click="closeLightbox">&times;</button>
          <img :src="currentLightboxImage" class="lightbox-image" />
        </div>
      </div>
      <hr />

      <div class="overview-section">
        <h2 class="section-title">Overview</h2>
        <p class="overview-texts">
          {{ accommodation.comDescription }}
        </p>
      </div>
      <hr />

      <div class="rooms-section">
        <h2 class="section-title-acc">잔여 객실</h2>

        <div v-if="accommodation.rooms">
          <div
              class="room-item"
              v-for="room in accommodation.rooms"
              :key="room.accId"
          >
            <div class="room-details">
              <img
                  v-if="room.roomType?.parlorImage"
                  :src="`/api/parlor/images/file/${room.roomType.parlorImage}`"
                  class="room-image"
              />
              <div v-else class="room-image placeholder-image">
                이미지 없음
              </div>

              <div class="room-info">
                <div class="room-type">
                  {{ room.roomType?.roomTypeName || '알 수 없는 객실' }}
                </div>
              </div>
            </div>

            <div class="room-price-container">
              <div class="room-price">
                <span class="price-value">
                  ₩{{ room.price.toLocaleString() }}
                </span>
                <span class="price-unit">/night</span>
              </div>
              <button class="book-now-button">Book now</button>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <MapSection
          apiKey="AIzaSyALY6qdom7_04POAxT18afRvHK84daK4FM"
          :address="accommodation.comAddress"
      />
      <hr />
      <AmenitiesAndReviews
          :amenities="accommodation.amenities"
          :review-avg="accommodation.reviewAvg"
          :review-count="accommodation.reviewCount"
          @attempt-review="handleReviewAttempt"
      />
    </div>

    <div v-if="showModal" class="image-modal-overlay" @click.self="showModal = false">
      <div class="image-modal-content">
        <button class="modal-close-button" @click="showModal = false">&times;</button>
        <h3>All Photos</h3>

        <div class="modal-image-grid">
          <img
              v-for="(image, index) in viewAllImages"
              :key="index"
              :src="image"
              @click="openLightbox(image)"
          />
        </div>
      </div>
    </div>
  </CommonLayout>
</template>

<script>
import axios from "axios";
import CommonLayout from "@/components/common/CommonLayout.vue";
import MapSection from "./MapSection.vue";
import AmenitiesAndReviews from "./AmenitiesAndReviews.vue";

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
      showModal: false,
      showLightbox: false,
      currentLightboxImage: null
    };
  },

  computed: {
    isJejuStone() {
      return this.accommodation?.comId === 3;
    },

    imageSet() {
      if (!this.isJejuStone) return null;
      return {
        main: require("@/assets/accommodation_img/one.jpg"),
        preview: [
          require("@/assets/accommodation_img/two.jpg"),
          require("@/assets/accommodation_img/three.jpg"),

        ],
        extra: [
          require("@/assets/accommodation_img/four.jpg"),
          require("@/assets/accommodation_img/five.jpg"),
          require("@/assets/accommodation_img/six.jpg"),
          require("@/assets/accommodation_img/seven.jpg"),
          require("@/assets/accommodation_img/eight.jpg"),
          require("@/assets/accommodation_img/nine.jpg"),
          require("@/assets/accommodation_img/ten.jpg"),
          require("@/assets/accommodation_img/eleven.jpg"),
          require("@/assets/accommodation_img/twelve.jpg"),
        ]
      };
    },

    mainImageSrc() {
      return this.isJejuStone
          ? this.imageSet.main
          : `/api/accommodation/images/file/${this.accommodation.mainImage}`;
    },

    previewImages() {
      return this.isJejuStone
          ? this.imageSet.preview
          : (this.accommodation.subImage || [])
              .slice(0, 3)
              .map(i => `/api/accommodation/images/file/${i}`);
    },

    viewAllImages() {
      return this.isJejuStone
          ? this.imageSet.extra
          : (this.accommodation.subImage || [])
              .slice(3, 9)
              .map(i => `/api/accommodation/images/file/${i}`);
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
      const res = await axios.get(`/api/accommodation/${this.$route.params.comId}`);
      if (res.data.code === "SUCCESS") {
        this.accommodation = res.data.result;
      }
    },
    getReviewText(score) {
      if (score >= 4.5) return "Excellent";
      if (score >= 4.0) return "Very Good";
      if (score >= 3.5) return "Good";
      return "Average";
    },
    handleReviewAttempt() {
      alert("리뷰는 로그인 후 작성 가능합니다.");
      this.$router.push("/login");
    }
  },

  mounted() {
    this.fetchAccommodationData();
  }
};
</script>

<style scoped>
@import "@/assets/css/HotelAccommodation.css";
</style>
