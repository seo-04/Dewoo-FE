<template>
  <section class="travel_container">
    <h3>여행에 빠지다</h3>
    <p>특가상품으로 진행하는 여행을 예약해보세요.</p>

    <div class="travel_box">
      <div class="slide_track" v-if="displayItems.length > 0">
        <!-- 원본 -->
        <Item
            v-for="(item, index) in displayItems"
            :key="`item-${item.comId}-${index}`"
            :item="item"
        />

        <Item
            v-if="displayItems.length > 1"
            v-for="(item, index) in clonedItems"
            :key="`clone-${item.comId}-${index}`"
            :item="item"
        />
      </div>

      <div v-else class="empty">
        <p>현재 진행 중인 특가 상품이 없습니다.</p>
      </div>
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
      apiItems: [],

      hardcodedItems: [
        {
          comId: 2,
          comTitle: "해운대 오션뷰 호텔",
          city: "부산 해운대구",
          price: 130000,
          discountedPrice: 117000,
        },
        {
          comId: 3,
          comTitle: "제주 돌담 펜션",
          city: "제주 서귀포시",
          price: 120000,
          discountedPrice: 120000,
        },
        {
          comId: 4,
          comTitle: "송도 비즈니스 레지던스",
          city: "인천 연수구",
          price: 150000,
          discountedPrice: 150000,},
        {
          comId: 5,
          comTitle: "대구 동성로 게스트하우스",
          city: "대구 중구",
          price: 80000,
          discountedPrice: 80000,
        },
        {
          comId: 6,
          comTitle: "엑스포 고급 빌라",
          city: "대전 유성구",
          price: 220000,
          discountedPrice: 220000,
        },
      ],
    };
  },
  mounted() {
    this.fetchDiscountItems();
  },
  computed: {
    /* API + 하드코딩 병합 */
    displayItems() {
      const merged = [...this.apiItems, ...this.hardcodedItems];

      const map = new Map();
      merged.forEach((item) => {
        if (!map.has(item.comId)) {
          map.set(item.comId, item);
        }
      });

      return Array.from(map.values());
    },
    clonedItems() {
      const CLONE_COUNT = 5;
      return this.displayItems.slice(
          0,
          Math.min(CLONE_COUNT, this.displayItems.length)
      );
    },
  },
  methods: {
    async fetchDiscountItems() {
      try {
        const response = await axios.get("/api/accommodation/discount");

        const list = response.data?.result?.content || [];

        this.apiItems = list.map((data) => ({
          comId: data.comId,
          comTitle: data.comTitle,
          city: data.location,
          price: data.price,
          discountedPrice: data.discountedPrice,
          image: data.image,
        }));
      } catch (error) {
        console.error("API 로드 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/HotelSearch.css";

.empty {
  text-align: center;
  padding: 50px;
}
</style>
