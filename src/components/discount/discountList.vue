<template>
  <section class="travel_container">
    <h3>여행에 빠지다</h3>
    <p>특가상품으로 진행하는 여행을 예약해보세요.</p>

    <div class="slider_wrapper" v-if="uniqueItems.length > 0">
      <!-- 이전 버튼 -->
      <button
        class="nav_btn prev_btn"
        @click="prevSlide"
        :disabled="currentIndex === 0"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <!-- 슬라이드 컨테이너 -->
      <div class="slider_container">
        <div
          class="slider_track"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }"
        >
          <div
            v-for="item in uniqueItems"
            :key="item.comId"
            class="slide_item"
          >
            <Item :item="item" />
          </div>
        </div>
      </div>

      <!-- 다음 버튼 -->
      <button
        class="nav_btn next_btn"
        @click="nextSlide"
        :disabled="currentIndex >= maxIndex"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <!-- 페이지 인디케이터 -->
    <div class="page_indicator" v-if="uniqueItems.length > itemsPerView">
      <span
        v-for="index in indicatorCount"
        :key="index"
        class="dot"
        :class="{ active: currentIndex === index - 1 }"
        @click="goToSlide(index - 1)"
      ></span>
    </div>

    <div v-if="uniqueItems.length === 0" style="text-align: center; padding: 50px;">
      <p>현재 진행 중인 특가 상품이 없습니다.</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Item from "./discountListItem.vue";

export default {
  name: "TravelList",
  components: { Item },
  data() {
    return {
      travelItems: [],
      currentIndex: 0,
      itemsPerView: 3, // 한 화면에 보여줄 아이템 수
      itemWidth: 300, // 각 아이템 너비
      itemGap: 20, // 아이템 간격
    };
  },
  computed: {
    // 중복 제거된 아이템 목록 (comId 기준)
    uniqueItems() {
      const seen = new Set();
      return this.travelItems.filter(item => {
        if (seen.has(item.comId)) {
          return false;
        }
        seen.add(item.comId);
        return true;
      });
    },
    // 한 번에 이동하는 거리
    slideWidth() {
      return this.itemWidth + this.itemGap;
    },
    // 최대 인덱스
    maxIndex() {
      return Math.max(0, this.uniqueItems.length - this.itemsPerView);
    },
    // 인디케이터 개수
    indicatorCount() {
      return this.maxIndex + 1;
    }
  },
  async mounted() {
    await this.fetchDiscountItems();
  },
  methods: {
    async fetchDiscountItems() {
      try {
        const response = await axios.get("/api/accommodation/discount");
        const list = response.data.result?.content || [];

        this.travelItems = list.map((data) => ({
          comId: data.comId,
          comTitle: data.comTitle,
          city: data.location,
          price: data.price,
          discountedPrice: data.discountedPrice,
          discountRate: data.discountRate,
          image: data.image,
        }));
      } catch (error) {
        console.error("특가 상품 로드 실패:", error);
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
      }
    },
    goToSlide(index) {
      this.currentIndex = Math.min(index, this.maxIndex);
    }
  },
};
</script>

<style scoped>
.travel_container {
  padding: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.travel_container h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.travel_container p {
  color: #666;
  margin-bottom: 24px;
}

.slider_wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
}

.slider_container {
  flex: 1;
  overflow: hidden;
}

.slider_track {
  display: flex;
  gap: 20px;
  transition: transform 0.4s ease;
}

.slide_item {
  flex-shrink: 0;
  width: 300px;
}

.nav_btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav_btn:hover:not(:disabled) {
  background: #8dd3bb;
  border-color: #8dd3bb;
  color: white;
}

.nav_btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page_indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.page_indicator .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: background 0.3s ease;
}

.page_indicator .dot.active {
  background: #8dd3bb;
}

.page_indicator .dot:hover {
  background: #aaa;
}

.page_indicator .dot.active:hover {
  background: #8dd3bb;
}
</style>