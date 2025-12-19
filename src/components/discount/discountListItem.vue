<template>
  <div class="discount_card">
    <div class="card_image">
      <img
        :src="imageUrl"
        :alt="`${item.city} ${item.comTitle}`"
        @error="handleImageError"
      />
    </div>
    <div class="card_content">
      <h4>{{ item.city }} - {{ item.comTitle }}</h4>
      <p class="promo_tag">특특특가 혜택 진행 중</p>
      <p class="price_info">
        {{ formatPrice(item.price) }}원
        <span v-if="discountRate > 0" class="discount_price">
          ({{ discountRate }}% {{ formatPrice(item.discountedPrice) }}원)
        </span>
      </p>
      <button class="book_btn" @click="goToDetail">Book a Hotel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TravelItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imgError: false,
    };
  },
  computed: {
    // 이미지 경로 처리
    imageUrl() {
      // 이미지 로드 에러가 발생했으면 기본 호텔 이미지 사용
      if (this.imgError) {
        return require('@/assets/img/Hatton_Hotel.jpg');
      }

      // 이미지가 있는 경우
      if (this.item.image) {
        // http로 시작하면 그대로 사용
        if (this.item.image.startsWith("http")) {
          return this.item.image;
        }
        // /api로 시작하면 그대로 사용
        if (this.item.image.startsWith("/api")) {
          return this.item.image;
        }
        // 그 외에는 API 경로로 변환
        return `/api/accommodation/images/file/${this.item.image}`;
      }

      // 이미지가 없으면 기본 호텔 이미지 사용
      return require('@/assets/img/Hatton_Hotel.jpg');
    },
    // 할인율 계산 (백엔드에서 안 넘어올 경우를 대비해 프론트에서도 계산 가능하도록 처리)
    discountRate() {
      if (this.item.discountRate) return this.item.discountRate; // 백엔드 DTO에 있다면 사용
      if (this.item.price && this.item.discountedPrice) {
        return Math.round(((this.item.price - this.item.discountedPrice) / this.item.price) * 100);
      }
      return 0;
    }
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("ko-KR").format(value);
    },
    handleImageError(e) {
      this.imgError = true;
      e.target.src = require('@/assets/img/Hatton_Hotel.jpg');
    },
    goToDetail() {
      // 부모에게 이벤트를 올리거나, 직접 라우터 이동
      this.$router.push(`/accommodation/${this.item.comId}`);
    },
  },
};
</script>

<style scoped>
.discount_card {
  width: 300px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  transition: transform 0.3s ease;
}

.discount_card:hover {
  transform: translateY(-5px);
}

.card_image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.discount_card:hover .card_image img {
  transform: scale(1.05);
}

.card_content {
  padding: 16px;
}

.card_content h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.promo_tag {
  font-size: 12px;
  color: #8dd3bb;
  font-weight: 500;
  margin-bottom: 8px;
}

.price_info {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.discount_price {
  color: #e53935;
  font-weight: bold;
}

.book_btn {
  width: 100%;
  padding: 10px;
  background: #8dd3bb;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.book_btn:hover {
  background: #7ac4ab;
}
</style>