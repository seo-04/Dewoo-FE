<template>
  <CommonLayout>
    <!-- Hero 섹션 -->
    <section class="hero">
      <div class="image">
        <img src="@/assets/img/header.jpg" alt="메인" />
      </div>
      <div class="hero_content">
        <div class="box">
          <h2>플러스 호텔 및 다양한<br />숙소를 확인하세요!</h2>
          <p>
            검색을 통해 요금을 비교하고 무료 취소를<br />
            포함한 특가도 확인하세요!
          </p>
        </div>
      </div>

      <!-- 검색 박스 -->
      <div class="search_box">
        <h3 class="search_title">어디에서 숙박하시나요?</h3>

        <div class="search_inputs">
          <div class="input-group">
            <label for="destination">Enter Destination</label>
            <input
                type="text"
                id="destination"
                v-model="destination"
                placeholder="Enter Destination"
            />
          </div>

          <div class="input-group">
            <label for="checkin">Check-in</label>
            <input
                type="date"
                id="checkin"
                v-model="checkin"
                :min="todayDate"
            />
          </div>

          <div class="input-group">
            <label for="checkout">Check-out</label>
            <input
                type="date"
                id="checkout"
                v-model="checkout"
                :min="checkin || todayDate"
            />
          </div>

          <!-- Rooms & Guests -->
          <div class="input-group dropdown-container">
            <label>Rooms & Guests</label>
            <button class="number_people" @click="openPeopleModal">
              {{ rooms }} Room, {{ guests }} Guest
            </button>
          </div>

          <button class="search_icon" @click="handleSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Rooms & Guests 모달 -->
    <transition name="slide-up">
      <div
          v-if="showPeopleModal"
          class="people_modal"
          @click.self="closePeopleModal"
      >
        <div class="people_content">
          <h3>객실과 인원을 선택하세요</h3>

          <div class="counter">
            <span>객실 수</span>
            <div class="controls">
              <button @click="decrease('room')">-</button>
              <span>{{ rooms }}</span>
              <button @click="increase('room')">+</button>
            </div>
          </div>

          <div class="counter">
            <span>인원 수</span>
            <div class="controls">
              <button @click="decrease('guest')">-</button>
              <span>{{ guests }}</span>
              <button @click="increase('guest')">+</button>
            </div>
          </div>

          <div class="warning" v-if="guests < 2">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p>최소 2명 이상 선택해주세요.</p>
          </div>

          <div class="modal-actions">
            <button @click="closePeopleModal" class="close_btn">닫기</button>
            <button @click="applyPeople" class="apply_btn">확인</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 여행 섹션 -->
    <section class="travel_container">
      <h3>여행에 빠지다</h3>
      <p>특가상품으로 진행하는 여행을 예약해보세요.</p>

      <div class="travel_box">
        <div class="slide_track">
          <div
              class="card"
              v-for="(item, i) in travelItems.slice(0, 5)"
              :key="'original-' + (item.comId || i)"
          >
            <img
                :src="require('@/assets/img/construction.jpg')"
                :alt="`${item.city} ${item.comtitle}`"
            />
            <div class="card_text">
              <h4>{{ item.city }} - {{ item.comtitle }}</h4>
              <p class="setting">특특특가 혜택 진행 중</p>
              <p>
                {{ formatPrice(item.price) }}원
                <span v-if="item.discount_rate > 0">
                  ({{ item.discount_rate }}% {{ discountedPrice(item) }}원)
                </span>
              </p>
              <button>Book a Hotel</button>
            </div>
          </div>

          <!-- 카드 복제하여 무한 캐러셀 -->
          <div
              class="card"
              v-for="(item, i) in travelItems.slice(0, 5)"
              :key="'clone-' + (item.comId || i)"
          >
            <img
                :src="require('@/assets/img/construction.jpg')"
                :alt="`${item.city} ${item.comtitle}`"
            />
            <div class="card_text">
              <h4>{{ item.city }} - {{ item.comtitle }}</h4>
              <p class="setting">특특특가 혜택 진행 중</p>
              <p>
                {{ formatPrice(item.price) }}원
                <span v-if="item.discount_rate > 0">
                  ({{ item.discount_rate }}% {{ discountedPrice(item) }}원)
                </span>
              </p>
              <button>Book a Hotel</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 여행 더보기 섹션 -->
    <section class="tour_container">
      <h3>여행 더보기</h3>
      <p>
        이번 시즌 어디로 떠나시나요? 특별한 여행을 위한 다양한 숙소를 찾아보세요.
      </p>

      <div class="tour_box">
        <div class="tour_images">
          <div class="one_block">
            <img src="@/assets/img/malacca_img.jpg" alt="말라카1" />
            <img src="@/assets/img/malacca_img2.jpg" alt="말라카2" />
          </div>
          <div class="two_block">
            <img src="@/assets/img/malacca_img3.jpg" alt="말라카3" />
            <img src="@/assets/img/malacca_img4.jpg" alt="말라카4" />
          </div>
        </div>

        <div class="tour_text_box">
          <div class="tour_header">
            <h1>말라카 투어</h1>
            <div class="free">
              <p>From<br /><b>$700</b></p>
            </div>
          </div>
          <p>
            오래된 시간의 숨결이 머무는 도시, 말라카(Melaka).<br />
            세계문화유산으로 지정된 매혹적인 여행지입니다.<br />
            저희 여행사가 준비한 특별한 말라카 투어상품과 함께 그 여정을 시작해보세요.
          </p>
          <button class="book">항공권 예약</button>
        </div>
      </div>
    </section>
  </CommonLayout>
</template>

<script>
import "@/assets/css/HotelSearch.css";
import CommonLayout from "@/components/common/CommonLayout.vue";
import axios from "axios";

export default {
  name: "HotelSearch",
  components: { CommonLayout },
  data() {
    return {
      destination: "",
      checkin: "",
      checkout: "",
      rooms: 1,
      guests: 2,
      showPeopleModal: false,
      travelItems: [],
    };
  },
  computed: {
    todayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },
  async mounted() {
    await this.fetchTravelItems();
  },
  methods: {
    async fetchTravelItems() {
      try {
        const response = await axios.get("/api/accommodation");
        const list = response.data.result?.accommodations?.content || [];
        this.travelItems = list.map((item) => ({
          comId: item.comId,
          comtitle: item.comTitle,
          city: item.comAddress,
          price: item.price,
          discount_rate: item.discount_rate || 0,
        }));
      } catch (error) {
        console.error("숙소 데이터 로드 실패", error);
      }
    },
    formatPrice(value) {
      return new Intl.NumberFormat("ko-KR").format(value);
    },
    discountedPrice(item) {
      const price = Number(item.price) || 0;
      const discount = Number(item.discount_rate) || 0;
      return new Intl.NumberFormat("ko-KR").format(
          Math.round(price * (1 - discount / 100))
      );
    },
    openPeopleModal() {
      this.showPeopleModal = true;
    },
    closePeopleModal() {
      this.showPeopleModal = false;
    },
    increase(type) {
      if (type === "room") this.rooms++;
      if (type === "guest") this.guests++;
    },
    decrease(type) {
      if (type === "room" && this.rooms > 1) this.rooms--;
      if (type === "guest" && this.guests > 1) this.guests--;
    },
    applyPeople() {
      if (this.guests < 2) {
        alert("최소 2명 이상 선택해주세요.");
        return; // 1명일 경우 모달 닫히지 않게 함
      }
      this.closePeopleModal();
    },
    async handleSearch() {
      if (!this.destination) {
        alert("목적지를 입력해주세요.");
        return;
      }
      if (!this.checkin) {
        alert("체크인 날짜를 선택해주세요.");
        return;
      }
      if (!this.checkout) {
        alert("체크아웃 날짜를 선택해주세요.");
        return;
      }
      if (this.guests < 2) {
        alert("최소 2명 이상 선택해주세요.");
        return;
      }

      try {
        const response = await axios.get("/api/accommodation");
        const list = response.data.result?.accommodations?.content || [];

        const keyword = this.destination.trim();
        const found = list.find(
            (item) =>
                item.comAddress.includes(keyword) ||
                item.comTitle.includes(keyword)
        );

        if (!found) {
          alert("해당하는 숙소가 없습니다.");
          return;
        }

        this.$router.push({
          name: "HotelListing",
          query: {
            destination: this.destination,
            checkin: this.checkin,
            checkout: this.checkout,
            rooms: this.rooms,
            guests: this.guests,
          },
        });
      } catch (error) {
        console.error("숙소 검색 중 오류 발생:", error);
        alert("숙소 정보를 불러오는 중 오류가 발생했습니다.");
      }
    },
  },
};
</script>
