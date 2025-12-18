<template>
  <section class="travel_container">
    <h3>여행에 빠지다</h3>
    <p>특가상품으로 진행하는 여행을 예약해보세요.</p>

    <div class="travel_box_wrapper" v-if="uniqueItems.length > 0">
      <!-- 이전 버튼 -->
      <button
        class="nav_btn prev_btn"
        @click="prevPage"
        :disabled="currentPage === 0"
        v-show="totalPages > 1"
      >
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="travel_box_static">
        <Item
          v-for="item in visibleItems"
          :key="item.comId"
          :item="item"
        />
      </div>

      <!-- 다음 버튼 -->
      <button
        class="nav_btn next_btn"
        @click="nextPage"
        :disabled="currentPage >= totalPages - 1"
        v-show="totalPages > 1"
      >
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <!-- 페이지 인디케이터 -->
    <div class="page_indicator" v-if="totalPages > 1">
      <span
        v-for="page in totalPages"
        :key="page"
        class="dot"
        :class="{ active: currentPage === page - 1 }"
        @click="goToPage(page - 1)"
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
      currentPage: 0,
      itemsPerPage: 4, // 한 페이지에 보여줄 아이템 수
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
    // 총 페이지 수
    totalPages() {
      return Math.ceil(this.uniqueItems.length / this.itemsPerPage);
    },
    // 현재 페이지에 보여줄 아이템들
    visibleItems() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.uniqueItems.slice(start, end);
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
          image: data.image,
        }));
      } catch (error) {
        console.error("특가 상품 로드 실패:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/HotelSearch.css";

.travel_box_wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  position: relative;
  padding-left: 20px;
}

.travel_box_static {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  flex-wrap: wrap;
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
  font-size: 18px;
  color: #333;
  transition: all 0.3s ease;
  flex-shrink: 0;
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
  justify-content: flex-start;
  gap: 8px;
  margin-top: 20px;
  padding-left: 20px;
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
  background: #8dd3bb;
}
</style>