<template>
  <div class="favorite-card">
    <!-- 왼쪽 이미지 -->
    <div class="favorite-card-image">
      <img :src="getImageUrl(info.imageURL)" alt="숙소 이미지" @error="handleImageError"/>
    </div>

    <!-- 오른쪽 정보 -->
    <div class="favorite-card-content">
      <!-- 상단 영역 -->
      <div class="favorite-card-top">
        <!-- 왼쪽: 숙소 정보 -->
        <div class="favorite-info">
          <h3 class="favorite-title">{{ info.name }}</h3>
          <p class="favorite-location">
            <i class="fa-solid fa-location-dot"></i>
            {{ info.location }}
          </p>
          <div class="favorite-details">
            <span class="favorite-stars">
              <i v-for="n in (info.stars || 0)" :key="n" class="fa-solid fa-star"></i>
              {{ info.stars }} Star Hotel
            </span>
            <span class="favorite-amenities">
              <i class="fa-solid fa-mug-saucer"></i>
              {{ info.amenities >= 20 ? '20+' : (info.amenities || 0) }} Amenities
            </span>
          </div>
          <div class="favorite-review">
            <span class="review-score-box">{{ info.reviewAvg || 0 }}</span>
            <span class="review-text">{{ getReviewText(info.reviewAvg) }}</span>
            <span class="review-count">{{ info.reviews || 0 }} reviews</span>
          </div>
        </div>

        <!-- 오른쪽: 가격 -->
        <div class="favorite-price">
          <span class="price-label">starting from</span>
          <span class="price-amount">₩{{ formatPrice(info.price) }}~<span class="price-unit">/1일</span></span>
          <span class="price-tax">excl. tax</span>
        </div>
      </div>

      <!-- 하단 버튼 영역 -->
      <div class="favorite-card-bottom">
        <button class="favorite-heart-btn" @click="onUnlikeClick">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button class="favorite-view-btn" @click="gotoDetailPage">View Price</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formatPrice(price) {
      if (price === undefined || price === null) return '0';
      return Number(price).toLocaleString('ko-KR');
    },
    getImageUrl(image) {
      if (!image) return require('@/assets/img/Hatton_Hotel.jpg');
      if (image.startsWith('http://') || image.startsWith('https://')) return image;
      if (image.startsWith('/api')) return image;
      return `/api/accommodation/images/file/${image}`;
    },
    handleImageError(e) {
      e.target.src = require('@/assets/img/Hatton_Hotel.jpg');
    },
    getReviewText(score) {
      if (!score) return 'No reviews';
      if (score >= 4.5) return 'Excellent';
      if (score >= 4.0) return 'Very Good';
      if (score >= 3.5) return 'Good';
      if (score >= 3.0) return 'Average';
      return 'Poor';
    },
    gotoDetailPage() {
      if (this.info.comId) {
        this.$router.push(`/accommodation/${this.info.comId}`);
      }
    },
    onUnlikeClick() {
      this.$emit('unlike', this.info.fno);
    },
  },
};
</script>

<style scoped>
.favorite-card {
  display: flex;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.favorite-card-image {
  width: 300px;
  min-height: 220px;
  flex-shrink: 0;
}

.favorite-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
}

.favorite-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.favorite-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.favorite-title {
  font-size: 20px;
  font-weight: 700;
  color: #112211;
  margin: 0;
}

.favorite-location {
  font-size: 14px;
  color: #555;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.favorite-location i {
  color: #8dd3bb;
}

.favorite-details {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #333;
}

.favorite-stars i {
  color: #ff8682;
  font-size: 12px;
}

.favorite-amenities i {
  color: #333;
  margin-right: 4px;
}

.favorite-review {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.review-score-box {
  padding: 6px 10px;
  border: 1px solid #8dd3bb;
  border-radius: 4px;
  font-weight: bold;
}

.review-text {
  font-weight: bold;
}

.review-count {
  color: #666;
}

.favorite-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.price-label {
  font-size: 12px;
  color: #888;
}

.price-amount {
  font-size: 24px;
  font-weight: bold;
  color: #112211;
}

.price-unit {
  font-size: 14px;
  font-weight: normal;
}

.price-tax {
  font-size: 12px;
  color: #888;
}

.favorite-card-bottom {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
}

.favorite-heart-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #8dd3bb;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-heart-btn i {
  color: #112211;
  font-size: 18px;
}

.favorite-heart-btn:hover {
  background-color: #f5f5f5;
}

.favorite-view-btn {
  flex: 1;
  height: 48px;
  font-size: 14px;
  font-weight: 600;
  background-color: #8dd3bb;
  color: #112211;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.favorite-view-btn:hover {
  background-color: #7ac4ab;
}
</style>
