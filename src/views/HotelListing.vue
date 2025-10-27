<template>
  <CommonLayout>
    <div>
      <div class="tab_menu">
        <div
            v-for="tab in tabs"
            :key="tab.value"
            class="tab_item"
            :class="{ active: activeTab === tab.value }"
            @click="setActiveTab(tab.value)"
        >
          <h4>{{ tab.label }}</h4>
          <p>{{ showingText(tab.value) }}</p>
        </div>
      </div>

      <div class="listing_layout">
        <div class="filter_box">
          <p class="filter_text">Filters</p>

          <div class="filter_section">
            <p>Price</p>
            <vue-slider
                v-model="priceRange"
                :min="0"
                :max="3000000"
                :step="10000"
                :enable-cross="false"
            ></vue-slider>

            <div class="price_labels">
              <span>{{ formattedMinPrice }}</span>
              <span>~</span>
              <span>{{ formattedMaxPrice }}</span>
            </div>
          </div>

          <div class="filter_section">
            <p>Rating</p>
            <div class="rating_buttons">
              <button
                  v-for="n in 5"
                  :key="n"
                  @click="setRating(n)"
                  :class="{ active: selectedRating === n }"
              >
                {{ n - 1 }}+
              </button>
            </div>
          </div>

          <div class="filter_section">
            <p>Freebies</p>
            <label><input type="checkbox" value="조식포함" v-model="selectedFreebies" /> 조식포함</label><br />
            <label><input type="checkbox" value="무료주차" v-model="selectedFreebies" /> 무료주차</label><br />
            <label><input type="checkbox" value="WIFI" v-model="selectedFreebies" /> WIFI</label><br />
            <label><input type="checkbox" value="취사 가능" v-model="selectedFreebies" /> 취사 가능</label><br />
            <label><input type="checkbox" value="에어컨" v-model="selectedFreebies" /> 에어컨</label>
          </div>

          <div class="filter_section">
            <p>Amenities</p>
            <label><input type="checkbox" value="24시 프론트데스크" v-model="selectedAmenities" /> 24시 프론트데스크</label><br />
            <label><input type="checkbox" value="피트니스" v-model="selectedAmenities" /> 피트니스</label><br />
            <label><input type="checkbox" value="수영장" v-model="selectedAmenities" /> 수영장</label><br/>
            <label><input type="checkbox" value="반려동물 동반 가능" v-model="selectedAmenities" /> 반려동물 동반 가능</label><br />
            <label><input type="checkbox" value="욕조" v-model="selectedAmenities" /> 욕조</label>
          </div>
        </div>

        <div class="content_box">
          <div class="showing">
            <div class="place">
              <p>{{ showingText(activeTab) }}</p>
            </div>
            <button class="menu" @click="toggleSortModal">
              <p>Sort by <span>{{ currentSort }}</span></p>
              <i class="fa-solid fa-up-down"></i>
            </button>
          </div>

          <transition name="slide-up">
            <div
                v-if="showSortModal"
                class="sort_modal"
                @click.self="closeSortModal"
            >
              <div class="sort_content">
                <ol
                    v-for="option in sortOptions"
                    :key="option"
                    :class="{ active: option === currentSort }"
                    @click="applySort(option)"
                >
                  {{ option }}
                </ol>
              </div>
            </div>
          </transition>

          <div
              class="room_list"
              v-for="tab in tabs"
              :key="tab.value"
              v-show="activeTab === tab.value"
          >
            <div
                class="room_box"
                v-for="(room) in getVisibleRooms(tab.value)"
                :key="room.comId"
            >
              <div class="image">
                <img :src="room.image" :alt="room.comTitle + ' 사진'" />
              </div>
              <div class="content">
                <div class="one">
                  <h3>{{ room.comTitle }}</h3>
                  <div class="locate">
                    <i class="fa-solid fa-location-dot"></i>
                    <p>{{ room.comAddress }}</p>
                  </div>
                  <div class="review_container">
                    <div class="star_icon">
                      <template v-for="n in 5" :key="n">
                        <i
                            v-if="n <= Math.round(room.star)"
                            class="fa-solid fa-star filled"
                        ></i>
                        <i
                            v-else
                            class="fa-regular fa-star empty"
                        ></i>
                      </template>
                      <p>{{ room.star }} Star Hotel</p>
                    </div>

                    <div class="AMinities_box">
                      <i class="fa-solid fa-mug-saucer"></i>
                      <p>Amenities</p>
                    </div>
                  </div>
                  <div class="score_review_box">
                    <div class="score"><p>{{ room.reviewAvg }}</p></div>
                    <div class="review_text">
                      <p>
                        <b>{{ room.reviewTitle || '리뷰 없음' }}</b>
                        {{ room.reviewCount }} reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="price">
                  <p>starting from</p>
                  <h2>{{ room.price }}<span>/night</span></h2>
                  <small>excl. tax</small>
                </div>
                <div class="two">
                  <button class="heart" @click="toggleHeart(room)">
                    <i
                        :class="[room.isFavorite ? 'fa-solid active-heart' : 'fa-regular', 'fa-heart']"
                    ></i>
                  </button>
                  <button class="view">View Place</button>
                </div>
              </div>
            </div>

            <div v-if="getVisibleRooms(tab.value).length === 0" class="no-results">
              해당하는 숙소가 없습니다.
            </div>

            <div class="button_result" v-if="hasMoreRooms(tab.value)">
              <button @click="showMoreResults(tab.value)">Show more results</button>
            </div>
          </div>
        </div>
      </div>

      <!--  검색 -->
      <div class="search_box1">
        <div class="search_inputs2">
          <div class="input-group3">
            <label for="destination">Enter Destination</label>
            <input
                v-model="destination"
                type="text"
                id="destination"
                placeholder="Enter Destination"
            />
          </div>

          <div class="input-group3">
            <label for="checkin">Check-in</label>
            <input
                v-model="checkin"
                type="date"
                id="checkin"
                :min="todayDate"
                placeholder="Check-in"
            />
          </div>

          <div class="input-group3">
            <label for="checkout">Check-out</label>
            <input
                v-model="checkout"
                type="date"
                id="checkout"
                :min="checkin || todayDate"
                placeholder="Check-out"
            />
          </div>

          <div class="input-group3 dropdown-container">
            <label>Rooms & Guests</label>
            <button class="number_people4" @click="openPeopleModal">
              {{ roomsCount }} Room, {{ guestsCount }} Guest
            </button>
          </div>

          <button class="search_icon4" @click="performSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      <!-- 인원수 선택 모달 -->
      <transition name="slide-up">
        <div
            v-if="showPeopleModal"
            class="people_modal4"
            @click.self="closePeopleModal"
            role="dialog"
            aria-modal="true"
        >
          <div class="people_content2" @click.stop>
            <h3>방 개수와 인원수 선택</h3>

            <div class="counter">
              <span>Rooms</span>
              <div class="controls">
                <button @click="decrease('room')">-</button>
                <span>{{ roomsCount }}</span>
                <button @click="increase('room')">+</button>
              </div>
            </div>

            <div class="counter">
              <span>Guests</span>
              <div class="controls">
                <button @click="decrease('guest')">-</button>
                <span>{{ guestsCount }}</span>
                <button @click="increase('guest')">+</button>
              </div>
            </div>

            <div v-if="guestsCount === 1" class="warning">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p>최소 2명이상 선택해주세요.</p>
            </div>

            <div class="modal-actions">
              <button @click="closePeopleModal" class="close_btn">Close</button>
              <button @click="applyPeople" class="apply_btn">Check</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </CommonLayout>
</template>

<script>
import bTeamApi from "@/util/axios";
import CommonLayout from "@/components/common/CommonLayout.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  components: { CommonLayout, VueSlider },

  data() {
    return {
      tabs: [
        { value: "호텔", label: "Hotels" },
        { value: "모텔", label: "Motels" },
        { value: "리조트", label: "Resorts" },
      ],
      activeTab: "호텔",
      totalCounts: { 호텔: 0, 모텔: 0, 리조트: 0 },
      visibleCount: { 호텔: 4, 모텔: 4, 리조트: 4 },
      rooms: [],
      allRooms: [],
      priceRange: [0, 3000000],
      priceMin: 0,
      priceMax: 3000000,
      priceTimer: null,
      showSortModal: false,
      sortOptions: ["저가순", "고가순", "리뷰 많은순"],
      currentSort: "선택",
      showPeopleModal: false,
      roomsCount: 1,
      guestsCount: 2,
      selectedRating: null,
      selectedFreebies: [],
      selectedAmenities: [],
      destination: "",
      checkin: "",
      checkout: "",
    };
  },

  computed: {
    formattedMinPrice() {
      return new Intl.NumberFormat("ko-KR").format(this.priceRange[0]) + "원";
    },
    formattedMaxPrice() {
      return new Intl.NumberFormat("ko-KR").format(this.priceRange[1]) + "원";
    },
    todayDate() {
      const today = new Date();
      return today.toISOString().split("T")[0];
    },
  },

  async mounted() {
    await this.loadAllRooms();
  },

  methods: {
    showingText(tabValue) {
      const visible = this.getVisibleRooms(tabValue).length;
      const total = this.totalCounts?.[tabValue] || 0;
      return `Showing ${visible} of ${total} places`;
    },

    async loadAllRooms() {
      try {
        const response = await bTeamApi.get(`/api/accommodation`);
        const list = response.data.result?.accommodations?.content || [];

        this.allRooms = list.map(item => ({
          category: item.category || "호텔",
          comId: item.comId,
          comTitle: item.comTitle,
          comAddress: item.comAddress,
          star: item.star || 0,
          price: item.price ? `₩${Number(item.price).toLocaleString()}` : "가격 정보 없음",
          reviewAvg: item.reviewAvg || 0,
          reviewCount: item.reviewCount || 0,
          reviewTitle:
              item.reviewAvg >= 4 ? "Very Good" :
                  item.reviewAvg >= 3 ? "Good" :
                      item.reviewAvg >= 2 ? "SoSo" :
                          item.reviewAvg >= 1 ? "Bad" : "리뷰 없음",
          image: item.image || require("@/assets/img/Hatton_Hotel.jpg"),
          isFavorite: item.isFavorite || false,
        }));

        this.rooms = [...this.allRooms];
        this.updateTotalCounts();
      } catch (error) {
        console.error("API 실패", error);
      }
    },

    performSearch() {
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
      if (this.guestsCount < 2) {
        alert("최소 2명 이상 선택해주세요.");
        return;
      }

      this.filterRooms();
    },

    filterRooms() {
      const keyword = this.destination.trim().toLowerCase();

      let filtered = this.allRooms.filter(r =>
          r.comTitle?.toLowerCase().includes(keyword)
      );

      if (filtered.length === 0) {
        this.rooms = [];
        this.updateTotalCounts();
        return;
      }

      filtered = filtered.filter(r => {
        const priceNum = parseInt(String(r.price).replace(/[₩,]/g, "")) || 0;
        return priceNum >= this.priceMin && priceNum <= this.priceMax;
      });

      if (this.selectedRating) {
        filtered = filtered.filter(r => r.star >= this.selectedRating);
      }

      this.rooms = filtered;
      this.updateTotalCounts();
    },

    updateTotalCounts() {
      this.totalCounts = this.tabs.reduce((acc, tab) => {
        acc[tab.value] = this.rooms.filter(r => r.category === tab.value).length;
        return acc;
      }, {});
    },

    setActiveTab(tab) { this.activeTab = tab; },
    toggleSortModal() { this.showSortModal = !this.showSortModal; },
    closeSortModal() { this.showSortModal = false; },

    applySort(option) {
      this.currentSort = option;
      this.showSortModal = false;
      const getPrice = (r) => parseInt(String(r.price).replace(/[₩,]/g, "")) || 0;
      if (option === "저가순") this.rooms.sort((a, b) => getPrice(a) - getPrice(b));
      else if (option === "고가순") this.rooms.sort((a, b) => getPrice(b) - getPrice(a));
      else if (option === "리뷰 많은순") this.rooms.sort((a, b) => b.reviewCount - a.reviewCount);
    },

    getVisibleRooms(category) {
      return this.rooms.filter(r => r.category === category).slice(0, this.visibleCount[category]);
    },

    hasMoreRooms(category) {
      return this.rooms.filter(r => r.category === category).length > this.visibleCount[category];
    },

    showMoreResults(category) { this.visibleCount[category] += 4; },
    openPeopleModal() { this.showPeopleModal = true; },
    closePeopleModal() { this.showPeopleModal = false; },
    increase(type) { if(type==='room') this.roomsCount++; if(type==='guest') this.guestsCount++; },
    decrease(type) { if(type==='room' && this.roomsCount>1) this.roomsCount--; if(type==='guest' && this.guestsCount>1) this.guestsCount--; },
    applyPeople() { this.closePeopleModal(); },
    setRating(n) { this.selectedRating = this.selectedRating === n ? null : n; },
    toggleHeart(room) { const target = this.rooms.find(r => r.comId===room.comId); if(target) target.isFavorite = !target.isFavorite; }
  },
};
</script>

<style>
@import "@/assets/css/HotelListing.css";


</style>
