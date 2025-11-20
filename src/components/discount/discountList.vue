<template>
  <section class="travel_container">
    <h3>여행에 빠지다</h3>
    <p>특가상품으로 진행하는 여행을 예약해보세요.</p>

    <div class="travel_box">
      <div class="slide_track" v-if="travelItems.length > 0">

        <Item
          v-for="(item, i) in travelItems"
          :key="'original-' + item.comId"
          :item="item"
        />

        <Item
          v-for="(item, i) in travelItems.slice(0, 6)"
          :key="'clone-' + item.comId"
          :item="item"
        />
      </div>

      <div v-else style="text-align: center; padding: 50px;">
        <p>현재 진행 중인 특가 상품이 없습니다.</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Item from "./discountListItem.vue"; // 위에서 만든 Item 컴포넌트 import

export default {
  name: "TravelList",
  components: { Item },
  data() {
    return {
      travelItems: [],
    };
  },
  async mounted() {
    await this.fetchDiscountItems();
  },
  methods: {
    async fetchDiscountItems() {
      try {
        // [백엔드 연동] 특가 상품 API 호출
        const response = await axios.get("/api/accommodation/discount");

        // 백엔드 응답 구조(Page 객체)에 따라 content 추출
        const list = response.data.result?.content || [];

        // 필요한 데이터 매핑
        this.travelItems = list.map((data) => ({
          comId: data.comId,
          comTitle: data.comTitle,
          city: data.location, // DTO의 location 필드 사용
          price: data.price,
          discountedPrice: data.discountedPrice,
          image: data.image,
          // 백엔드 DTO에 discountRate가 없다면 여기서 계산된 값이 Item.vue에서 처리됨
        }));
      } catch (error) {
        console.error("특가 상품 로드 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 슬라이드 트랙 CSS는 기존 HotelSearch.css에 있겠지만,
   컴포넌트 분리 시 스타일 의존성을 확인해야 합니다. */
@import "../../assets/css/HotelSearch.css";
</style>