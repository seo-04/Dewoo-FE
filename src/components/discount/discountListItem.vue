<template>
  <div class="card">
    <img
      :src="imageUrl"
      :alt="`${item.city} ${item.comTitle}`"
      @error="handleImageError"
    />
    <div class="card_text">
      <h4>{{ item.city }} - {{ item.comTitle }}</h4>
      <p class="setting">특특특가 혜택 진행 중</p>
      <p>
        {{ formatPrice(item.price) }}원
        <span v-if="discountRate > 0" style="color: red; font-weight: bold;">
          ({{ discountRate }}% {{ formatPrice(item.discountedPrice) }}원)
        </span>
      </p>
      <button @click="goToDetail">Book a Hotel</button>
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
  computed: {
    // 이미지 경로 처리 (http로 시작하지 않으면 서버 경로 붙이기)
    imageUrl() {
      if (this.item.image && !this.item.image.startsWith("http") && !this.item.image.startsWith("/")) {
        return `/hotel-images/${this.item.image}`;
      }
      return this.item.image || require('@/assets/img/construction.jpg');
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
      e.target.src = require('@/assets/img/construction.jpg');
    },
    goToDetail() {
      // 부모에게 이벤트를 올리거나, 직접 라우터 이동
      this.$router.push(`/accommodation/${this.item.comId}`);
    },
  },
};
</script>

<style scoped>

@import "../../assets/css/HotelSearch.css";
</style>