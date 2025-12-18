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
          ({{ discountRate }}% {{ formatPrice(discountedPrice) }}원)
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
    /*
      이미지 하드코딩
       */
    imageMap() {
      return {
        2: require("@/assets/main_img/Haeundae.jpg"),
        3: require("@/assets/main_img/Jejujpg.jpg"),
        4: require("@/assets/main_img/Songdo.jpg"),
        5: require("@/assets/main_img/Daegu.jpg"),
        6: require("@/assets/main_img/Expo.jpg")
      };
    },

    imageUrl() {
      return (
          this.imageMap[this.item.comId] ||
          require("@/assets/img/construction.jpg")
      );
    },

    /*
       하드코딩 할인율
       */
    hardcodedDiscountMap() {
      return {
        3: 15,
        4: 20,
        5: 30,
        6: 10,
        7: 15,
        8: 25,
        9: 10,
        10: 20,
        11: 15,
      };
    },

    discountRate() {
      if (this.item.discountRate) return this.item.discountRate;

      if (
          this.item.price &&
          this.item.discountedPrice &&
          this.item.price > this.item.discountedPrice
      ) {
        return Math.round(
            ((this.item.price - this.item.discountedPrice) / this.item.price) *
            100
        );
      }

      return this.hardcodedDiscountMap[this.item.comId] || 0;
    },

    discountedPrice() {
      if (this.item.discountedPrice) return this.item.discountedPrice;

      if (this.discountRate > 0) {
        return Math.round(
            this.item.price * (1 - this.discountRate / 100)
        );
      }

      return this.item.price;
    },
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("ko-KR").format(value);
    },
    handleImageError(e) {
      e.target.src = require("@/assets/img/construction.jpg");
    },
    goToDetail() {
      this.$router.push(`/accommodation/${this.item.comId}`);
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/HotelSearch.css";
</style>
