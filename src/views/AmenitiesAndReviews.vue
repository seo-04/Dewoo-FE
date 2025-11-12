<template>
    <div class="amenities-reviews-section">
      <div class="amenities-section">
        <h2 class="section-title">Amenities</h2>
        <div class="amenity-flex-container">
          <div class="amenity-feature" v-for="amenity in visibleAmenities" :key="amenity.name">
            <i :class="amenity.icon"></i>
            <span>{{ amenity.name }}</span>
          </div>
        </div>
        <div class="more-amenities">
          <a href="#" @click.prevent="showMoreAmenities" v-if="hiddenAmenitiesCount > 0">+{{ hiddenAmenitiesCount }} more</a>
          <a href="#" @click.prevent="showLessAmenities" v-else>Show less</a>
        </div>
      </div>

    <hr>

    <div class="reviews-section">
      <div class="reviews-header">
        <h2 class="section-title">Reviews</h2>
        <button class="review-button">Give your review</button>
      </div>
      <div class="review-summary">
        <div class="rating-score">4.2</div>
        <div class="rating-text-and-count">
          <span class="rating-text">Very good</span>
          <span class="review-count">371 verified reviews</span>
        </div>
      </div>
      <div class="review-list">
        <div class="review-item" v-for="review in reviews" :key="review.id">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-rating">{{ review.rating }} Amazing</div>
              <div class="reviewer-name">{{ review.name }}</div>
            </div>
            <i class="fa-solid fa-flag"></i>
          </div>
          <p class="review-text">{{ review.text }}</p>
        </div>
      </div>
      <div class="pagination">
        <button class="pagination-btn">&lt;</button>
        <span>1 of 40</span>
        <button class="pagination-btn">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmenitiesAndReviews',
  data() {
    return {
      allAmenities: [
        // 모든 편의시설 목록
        { name: "Outdoor pool", icon: "fa-solid fa-person-swimming" },
        { name: "Indoor pool", icon: "fa-solid fa-person-swimming" },
        { name: "Spa and wellness center", icon: "fa-solid fa-spa" },
        { name: "Restaurant", icon: "fa-solid fa-utensils" },
        { name: "Room service", icon: "fa-solid fa-bell-concierge" },
        { name: "Fitness center", icon: "fa-solid fa-dumbbell" },
        { name: "Bar/Lounge", icon: "fa-solid fa-martini-glass-citrus" },
        { name: "Free Wi-Fi", icon: "fa-solid fa-wifi" },
        { name: "Tea/coffee machine", icon: "fa-solid fa-mug-hot" },
        { name: "24-hour front desk", icon: "fa-solid fa-bell-concierge" },
        { name: "Locker room", icon: "fa-solid fa-door-open" },
        { name: "Concierge service", icon: "fa-solid fa-concierge-bell" },
        { name: "Family rooms", icon: "fa-solid fa-users" },
        { name: "Non-smoking rooms", icon: "fa-solid fa-smoking-ban" },
        { name: "Car park", icon: "fa-solid fa-car" },
        { name: "Airport shuttle", icon: "fa-solid fa-shuttle-van" },
        { name: "Dry cleaning", icon: "fa-solid fa-tshirt" },
        { name: "Baggage storage", icon: "fa-solid fa-suitcase-rolling" },
        { name: "Elevator", icon: "fa-solid fa-elevator" },
        { name: "Wheelchair accessible", icon: "fa-solid fa-wheelchair" },
        { name: "ATM on site", icon: "fa-solid fa-money-bill-transfer" },
        { name: "Business center", icon: "fa-solid fa-briefcase" },
        { name: "Meeting rooms", icon: "fa-solid fa-handshake" },
        { name: "Currency exchange", icon: "fa-solid fa-money-bill-transfer" },
        { name: "Laundry service", icon: "fa-solid fa-soap" },
        { name: "Safe deposit boxes", icon: "fa-solid fa-vault" },
        { name: "Multilingual staff", icon: "fa-solid fa-globe" }
      ],
      initialVisibleCount: 10,
      visibleAmenitiesCount: 10,
      reviews: [
        { id: 1, rating: 5.0, name: "김성민", text: "정말 깔끔하고 직원분들이 친절해서 좋았습니다. 다시 방문하고 싶어요." },
        { id: 2, rating: 5.0, name: "이혜정", text: "위치가 좋고 시설이 깨끗해요. 조식이 맛있고 수영장도 잘 관리되어 있어요." },
        { id: 3, rating: 5.0, name: "이예서", text: "훌륭한 조식 뷔페, 쇼핑몰과 식당이 가까운 위치, 헬스장과 인피니티 수영장에서의 멋진 전망, 그리고 친절한 스태프가 특히 만족스러웠다고 했습니다." },
        { id: 4, rating: 5.0, name: "진서연", text: "우아하고 럭셔리한 분위기, 역사적인 건축미와 전통 스파 경험" },
        { id: 5, rating: 5.0, name: "권우정", text: "중심가에 위치해 있어 접근성이 매우 높으며, 수영장과 헬스장도 매우 잘 관리되어 있습니다. 직원들도 매우 친절합니다." },
      ]
    };
  },
  computed: {
    visibleAmenities() {
      return this.allAmenities.slice(0, this.visibleAmenitiesCount);
    },
    hiddenAmenitiesCount() {
      return this.allAmenities.length - this.visibleAmenitiesCount;
    }
  },
  methods: {
    showMoreAmenities() {
      this.visibleAmenitiesCount = this.allAmenities.length;
    },
    showLessAmenities() {
      this.visibleAmenitiesCount = this.initialVisibleCount;
    }
  }
};
</script>

<style scoped>
.amenities-reviews-section {
  padding: 20px 0;
}
.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: left;
}
.amenity-flex-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 20px;
}
.amenity-feature {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  color: #333;
  width: calc(50% - 25px);
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}
.amenity-feature i {
  font-size: 20px;
  color: #000;
  flex-shrink: 0;
}
.more-amenities {
  text-align: right;
  margin-top: 20px;
}
.more-amenities a {
  color: #c94029;
  text-decoration: none;
  font-weight: bold;
}
.reviews-section {
  margin-top: 30px;
}
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-button {
  background-color: #8DD3BB;
  border: 1px solid #8DD3BB;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.review-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
.rating-score {
  font-size: 48px;
  font-weight: bold;
}
.rating-text-and-count {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
}
.rating-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.review-count {
  font-size: 14px;
  color: #777;
}
.review-list {
  margin-top: 60px;
}
.review-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.reviewer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.reviewer-rating {
  font-weight: bold;
  color: #007bff;
}
.reviewer-name {
  color: #555;
  font-weight: bold;
}
.review-item .fa-solid.fa-flag {
  color: #ccc;
  cursor: pointer;
}
.review-text {
  margin-top: 10px;
  line-height: 1.6;
  color: #333;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}
.pagination-btn {
  background-color: transparent;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>