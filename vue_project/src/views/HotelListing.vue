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
            <span>$50</span>
            <span>$1200</span>
          </div>
        </div>

        <!-- Rating -->
        <div class="filter_section">
          <p>Rating</p>
          <div class="rating_buttons">
            <button v-for="n in 5" :key="n" @click="setRating(n)">
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
            v-show="activeTab === tab.value"
            v-for="tab in tabs"
            :key="tab.value"
        >
          <div
              class="room_box"
              v-for="(room, index) in rooms.filter(r => r.category === tab.value)"
              :key="index"
          >
            <!-- 이미지 -->
            <div class="image">
              <img :src="room.image" :alt="room.name + ' 사진'" />
            </div>

            <!-- 오른쪽 컨텐츠 -->
            <div class="content">
              <div class="one">
                <h3>{{ room.name }}</h3>
                <div class="locate">
                  <i class="fa-solid fa-location-dot"></i>
                  <p>{{ room.location }}</p>
                </div>

                <!-- 별점 리뷰 -->
                <div class="review_container">
                  <div class="star_icon">
                    <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
                    <p>{{ room.starText }}</p>
                  </div>
                  <div class="AMinities_box">
                    <i class="fa-solid fa-mug-saucer"></i>
                    <p>Amenities</p>
                  </div>
                </div>

                <!-- 점수 리뷰 -->
                <div class="score_review_box">
                  <div class="score"><p>{{ room.score }}</p></div>
                  <div class="review_text">
                    <p>
                      <b>{{ room.reviewTitle }}</b>
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
              rooms[index].isFavorite ? 'fa-solid active-heart' : 'fa-regular',
              'fa-heart'
              ]"
                        ></i>
                      </button>
                      <button class="view">View Place</button>
                    </div>
            </div>
          </div>
        </div>

        <!-- 더보기 버튼 -->
        <div class="button_result">
          <button @click="showMoreResults">Show more results</button>
        </div>
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

      <!-- Rooms & Guests 모달 -->
      <transition name="slide-up">
        <div
            v-if="showPeopleModal"
            class="people_modal4"
            @click.self="closePeopleModal"
        >
          <div class="people_content">
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
              <p>최소 1명이상 선택해주세요.</p>
            </div>

            <div class="modal-actions">
              <button @click="closePeopleModal" class="close_btn">Close</button>
              <button @click="applyPeople" class="apply_btn">Check</button>
            </div>
          </div>
        </div>
      </transition>

  <!-- 서치 박스 마지막 div  -->
      </div>

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
      showingData: {
        호텔: "Showing 4 of 257 places",
        모텔: "Showing 4 of 51 places",
        리조트: "Showing 4 of 72 places",
      },

      showSortModal: false,
      sortOptions: ["가격 낮은순", "가격 높은순", "평점 높은순"],
      currentSort: "추천순",


      showPeopleModal: false,
      roomsCount: 1,
      guestsCount: 2,

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
          category: "모텔",
          name: "해튼모텔",
          image: require("@/assets/img/Hatton_Hotel.jpg"),
          location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
          starText: "5 Star Motel",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 371,
          isFavorite: false,
          price: "₩240,000",
        },
        {
          category: "리조트",
          name: "해튼리조트",
          image: require("@/assets/img/Hatton_Hotel.jpg"),
          location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
          starText: "5 Star Resort",
          score: "4.2",
          reviewTitle: "Very Good",
          reviewCount: 371,
          isFavorite: false,
          price: "₩240,000",
        },
      ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    toggleSortModal() {
      this.showSortModal = !this.showSortModal;
    },
    closeSortModal() {           // 👈 추가 (배경 클릭 시 닫기용)
      this.showSortModal = false;
    },
    applySort(option) {
      this.currentSort = option;
      this.showSortModal = false;
    },
    showMoreResults() {
      alert("더 많은 결과 불러오기");
    },
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
    setRating(n) {
      console.log("Rating filter:", n);
    },
    toggleHeart(index) {
      this.rooms[index].isFavorite = !this.rooms[index].isFavorite;
    },
  },


};

</script>
<style>
@import "@/assets/css/HotelListing.css";
</style>
