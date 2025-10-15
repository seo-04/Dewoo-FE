<template>
  <div>
    <!-- 헤더 -->
    <header>
      <nav class="nav-container">
        <!-- 왼쪽 -->
        <nav class="header_tabs">
          <div class="nav-left">
            <div class="tab active">
              <i class="fa-solid fa-bed"></i>
              hotel
            </div>
          </div>
        </nav>

        <!-- 오른쪽 -->
        <div class="item">
          <div class="flex vertical-center">
            <i class="fa-solid fa-heart"></i>
            <span>찜하기</span>
            |
            <div class="circle">
              <div class="mini-circle">
                <div class="check"></div>
              </div>
            </div>
            <span>Tomhoon</span>
          </div>
        </div>
      </nav>
    </header>

    <!-- 호텔 , 모텔, 리조트 탭 메뉴-->
    <div class="tab_menu">
      <div
          v-for="tab in tabs"
          :key="tab.value"
          class="tab_item"
          :class="{ active: activeTab === tab.value }"
          @click="setActiveTab(tab.value)"
      >
        <h4>{{ tab.label }}</h4>
        <p>{{ showingData[tab.value] }}</p>
      </div>
    </div>

    <!-- 필터 + 숙소 리스트 -->
    <div class="listing_layout">
      <!-- Filters -->
      <div class="filter_box">
        <p class="filter_text">Filters</p>

        <!-- Price -->
        <div class="filter_section">
          <p>Price</p>
          <input
              type="range"
              min="50"
              max="1200"
              v-model="priceFilter"
              class="slider"
          />
          <div class="price_labels">
            <option value="50">$50</option>
            <option value="300">$300</option>
            <option value="100">$1200</option>
          </div>
        </div>

        <!-- Rating -->
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
        <!-- Freebies -->
        <div class="filter_section">
          <p>Freebies</p>
          <label><input type="checkbox" /> 조식포함</label><br />
          <label><input type="checkbox" /> 무료주차</label><br />
          <label><input type="checkbox" /> WIFI</label><br />
          <label><input type="checkbox" /> 공항셔틀버스</label><br />
          <label><input type="checkbox" /> 무료취소</label>
        </div>

        <!-- Amenities -->
        <div class="filter_section">
          <p>Amenities</p>
          <label><input type="checkbox" /> 24시 프론트데스크</label><br />
          <label><input type="checkbox" /> 에어컨</label><br />
          <label><input type="checkbox" /> 피트니스</label><br />
          <label><input type="checkbox" /> 수영장</label>
        </div>
      </div>

      <!-- 호텔 리스트 -->
      <div class="content_box">
        <!-- Sort bar -->
        <div class="showing">
          <div class="place">
            <p>{{ showingData[activeTab] }}</p>
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

        <!-- 숙소 리스트 -->
        <div
            class="room_list"
            v-for="tab in tabs"
            :key="tab.value"
            v-show="activeTab === tab.value"
        >
          <div
              class="room_box"
              v-for="(room, index) in getVisibleRooms(tab.value)"
              :key="index"
          >
            <!-- 이미지 -->
            <div class="image">
              <img :src="room.image" :alt="room.comTitle + ' 사진'" />
            </div>

            <!-- 오른쪽 컨텐츠 -->
            <div class="content">
              <div class="one">
                <h3>{{ room.comTitle }}</h3>
                <div class="locate">
                  <i class="fa-solid fa-location-dot"></i>
                  <p>{{ room.comAddress }}</p>
                </div>

                <!-- 별점 리뷰 -->
                <div class="review_container">
                  <div class="star_icon">
                    <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
                    <p>{{ room.star }} Star Hotel</p>
                  </div>
                  <div class="AMinities_box">
                    <i class="fa-solid fa-mug-saucer"></i>
                    <p>Amenities</p>
                  </div>
                </div>

                <!-- 점수 리뷰 -->
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

              <!-- 가격 -->
              <div class="price">
                <p>starting from</p>
                <h2>{{ room.price }}<span>/night</span></h2>
                <small>excl. tax</small>
              </div>

              <!-- 버튼 -->
              <div class="two">
                <button class="heart" @click="toggleHeart(index)">
                  <i
                      :class="[
                room.isFavorite ? 'fa-solid active-heart' : 'fa-regular',
                'fa-heart'
              ]"
                  ></i>
                </button>
                <button class="view">View Place</button>
              </div>
            </div>
          </div>

          <!-- 더보기 버튼 -->
          <div class="button_result" v-if="hasMoreRooms(tab.value)">
            <button @click="showMoreResults(tab.value)">Show more results</button>
          </div>

          <!-- room list 마지막 /div  -->
        </div>
    <!-- content_box 마지막 /div -->
      </div>

    </div>

    <!-- 검색 박스 -->
    <div class="search_box1">
      <div class="search_inputs2">
        <!-- 여행지 입력 -->
        <div class="input-group3">
          <label for="destination">Enter Destination</label>
          <input type="text" id="destination" placeholder="Enter Destination" />
        </div>

        <div class="input-group3">
          <label for="checkin">Check-in</label>
          <input type="date" id="checkin" placeholder="Check-in" />
        </div>

        <div class="input-group3">
          <label for="checkout">Check-out</label>
          <input type="date" id="checkout" placeholder="Check-out" />
        </div>

        <!-- Rooms & Guests -->
        <div class="input-group3 dropdown-container">
          <label>Rooms & Guests</label>
          <button class="number_people4" @click="openPeopleModal">
            {{ roomsCount }} Room, {{ guestsCount }} Guest
          </button>
        </div>

        <!-- 검색 버튼 -->
        <button class="search_icon4">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <!-- 서치 박스 마지막 div  -->
      </div>

    <!-- Rooms & Guests 모달 -->
    <transition name="slide-up">
      <div
          v-if="showPeopleModal"
          class="people_modal4"
          @click.self="closePeopleModal"
          role="dialog"
          aria-modal="true"
      >

        <transition name="slide-up">
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
        </transition>
      </div>
    </transition>

    <!-- footer -->
    <footer>
      <section class="subscription-box">
        <div class="subscription-content">
          <h1>구독서비스<br /> 신청해보세요</h1>
          <p>The Travel</p>
          <p>구독하고 무료, 최신 여행 정보를 받아보세요</p>
          <div class="subscription-form-container">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
        <div class="subscription-image">
          <img src="@/assets/img/letter-box.png" height="330" width="400" alt="" />
        </div>
      </section>

      <!-- footer-bottom -->
      <div class="footer-bottom">
        <div class="footer-letter">
          <span>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-instagram"></i>
          </span>
        </div>
        <div class="footer-letter">
          <span class="footer-span">Our Destinations</span>
          <span class="footer-span-details">
            <span>Canada</span>
            <span>Alaska</span>
            <span>France</span>
            <span>Iceland</span>
          </span>
        </div>
        <div class="footer-letter">
          <span class="footer-span">Our Activities</span>
          <span class="footer-span-details">
            <span>Northern Lights</span>
            <span>Cruising & sailing</span>
            <span>Multi-activities</span>
            <span>Kayaing</span>
          </span>
        </div>
        <div class="footer-letter">
          <span class="footer-span">Travel Blogs</span>
          <span class="footer-span-details">
            <span>Bali Travel Guide</span>
            <span>Sri Lanka Travel Guide</span>
            <span>Peru Travel Guide</span>
          </span>
        </div>
        <div class="footer-letter">
          <span class="footer-span">About Us</span>
          <span class="footer-span-details">
            <span>Our Story</span>
            <span>Work with us</span>
          </span>
        </div>
        <div class="footer-letter">
          <span class="footer-span">Contact Us</span>
          <span class="footer-span-details">
            <span>Email</span>
            <span>Support</span>
          </span>
        </div>
      </div>
    </footer>

<!--  텝플릿 아래 마지막 div 마침  -->
  </div>
</template>
<script>
import bTeamApi from '@/util/axios';

export default {
  data() {
    return {
      // 탭
      tabs: [
        { value: "호텔", label: "Hotels" },
        { value: "모텔", label: "Motels" },
        { value: "리조트", label: "Resorts" },
      ],
      activeTab: "호텔",

      // Showing 문구
      showingData: {
        호텔: "Showing 24 of 257 places",
        모텔: "Showing 16 of 51 places",
        리조트: "Showing 20 of 72 places",
      },

      // 정렬
      showSortModal: false,
      sortOptions: ["저가순", "고가순", "리뷰 많은순"],
      currentSort: "선택",

      // 인원수 모달
      showPeopleModal: false,
      roomsCount: 1,
      guestsCount: 2,

      // 더보기: 카테고리별 표시 개수
      visibleCount: {
        호텔: 4,
        모텔: 4,
        리조트: 4,
      },

      // 숙소 리스트
      rooms: [
        {
          category: "호텔",
          name: "해튼호텔",
          image: require("@/assets/img/Hatton_Hotel.jpg"),
          location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
          starText: "5 Star Hotel",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 371,
          isFavorite: false,
          price: "₩240,000",
        },
        {
          category: "호텔",
          name: "마제스틱 말라카 호텔",
          image: require("@/assets/img/Malacca.jpg"),
          location: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
          starText: "5 Star Hotel",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 54,
          isFavorite: false,
          price: "₩120,000",
        },
        {
          category: "호텔",
          name: "카나델 리오 호텔",
          image: require("@/assets/img/Canardel.jpg"),
          location: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
          starText: "5 Star Hotel",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 54,
          isFavorite: false,
          price: "₩130,000",
        },
        {
          category: "호텔",
          name: "베이뷰 호텔",
          image: require("@/assets/img/Bayview.jpg"),
          location: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
          starText: "5 Star Hotel",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 54,
          isFavorite: false,
          price: "₩104,000",
        },
      ],

      selectedRating: null,
    };
  },

  async mounted() {
    try {
      const response = await bTeamApi.get("/api/accommodation");
      console.log("API 응답:", response.data);

      const resultData = response.data.result.accommodations.content || [];

      // 백엔드 데이터 매핑
      const mappedRooms = resultData.map((item) => ({
        category: "호텔", // 현재는 호텔 탭만 사용하므로 고정
        comId: item.comId,
        comTitle: item.comTitle,
        comAddress: item.comAddress,
        star: item.star || 0,
        price: item.price ? `₩${item.price.toLocaleString()}` : "가격 정보 없음",
        reviewAvg: item.reviewAvg || 0,
        reviewCount: item.reviewCount || 0,
        reviewTitle: item.reviewAvg > 0 ? "Very Good" : "No Reviews",
        //  이미지가 null일 경우 기본 이미지 사용
        image: item.image
            ? item.image
            : require("@/assets/img/Hatton_Hotel.jpg"),
        isFavorite: false,
      }));

      this.rooms = mappedRooms;
      console.log("숙소 데이터 적용 완료:", this.rooms);
    } catch (error) {
      console.error("숙소 데이터 로드 실패:", error);

      //  실패 시 더미 데이터 (백엔드 응답 없을 때)
      this.rooms = [
        {
          category: "호텔",
          comTitle: "해튼호텔",
          comAddress: "Istanbul 34437",
          star: 5,
          reviewAvg: 4.2,
          reviewCount: 371,
          price: "₩240,000",
          image: require("@/assets/img/Hatton_Hotel.jpg"),
          isFavorite: false,
        },
      ];
    }
  },
  methods: {
    // 탭 변경
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    //  정렬 모달
    toggleSortModal() {
      this.showSortModal = !this.showSortModal;
    },
    closeSortModal() {
      this.showSortModal = false;
    },
    applySort(option) {
      this.currentSort = option;
      this.showSortModal = false;

      // 저가순, 고가순, 리뷰 많은 순으로 클릭
      if (option === "저가순") {
        this.rooms.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[₩,]/g, "")) || 0;
          const priceB = parseInt(b.price?.replace(/[₩,]/g, "")) || 0;
          return priceA - priceB;
        });
      } else if (option === "고가순") {
        this.rooms.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[₩,]/g, "")) || 0;
          const priceB = parseInt(b.price?.replace(/[₩,]/g, "")) || 0;
          return priceB - priceA;
        });
      } else if (option === "리뷰 많은순") {
        this.rooms.sort((a, b) => b.reviewCount - a.reviewCount);
      }
    },

    // 더보기 관련
    getVisibleRooms(category) {
      // image가 null인 경우 Hatton_Hotel.jpg로 대체
      return this.rooms
          .filter((r) => r.category === category)
          .map((r) => ({
            ...r,
            image:
                r.image ||
                require("@/assets/img/Hatton_Hotel.jpg"), // 기본 이미지 처리
          }))
          .slice(0, this.visibleCount[category]);
    },

    hasMoreRooms(category) {
      return (
          this.rooms.filter((r) => r.category === category).length >
          this.visibleCount[category]
      );
    },

    showMoreResults(category) {
      this.visibleCount[category] += 4;
    },

    // 인원 선택 모달
    openPeopleModal() {
      this.showPeopleModal = true;
    },
    closePeopleModal() {
      this.showPeopleModal = false;
    },
    increase(type) {
      if (type === "room") this.roomsCount++;
      if (type === "guest") this.guestsCount++;
    },
    decrease(type) {
      if (type === "room" && this.roomsCount > 1) this.roomsCount--;
      if (type === "guest" && this.guestsCount > 1) this.guestsCount--;
    },
    applyPeople() {
      this.closePeopleModal();
    },

    //  Rating 버튼 하나씩 클릭
    setRating(n) {
      if (this.selectedRating === n) {
        this.selectedRating = null;
      } else {
        this.selectedRating = n;
      }
      console.log("Rating filter:", this.selectedRating);
    },


    // 하트 찜하기 (하트)
    toggleHeart(index) {
      this.rooms[index].isFavorite = !this.rooms[index].isFavorite;
    },
  },
};
</script>
<style>
@import "@/assets/css/HotelListing.css";
</style>
