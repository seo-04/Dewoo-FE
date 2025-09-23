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

    <!--필터 + 숙소 리스트-->
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

        <!-- 정렬 옵션 모달 -->
        <div v-if="showSortModal" class="sort_modal">
          <div class="sort_content">
            <ol
                v-for="option in sortOptions"
                :key="option"
                @click="applySort(option)"
            >
              {{ option }}
            </ol>
          </div>
        </div>

        <!-- 숙소 리스트 -->
        <div class="room_list">
          <div
              v-for="room in paginatedRooms"
              :key="room.id"
              class="room_box"
          >
            <div class="image">
              <img :src="room.image" :alt="room.name" />
            </div>
            <div class="content">
              <div class="one">
                <h3>{{ room.name }}</h3>
                <div class="locate">
                  <i class="fa-solid fa-location-dot"></i>
                  <p>{{ room.address }}</p>
                </div>
                <div class="review_container">
                  <div class="star_icon">
                    <i v-for="n in 5" :key="n" class="fa-solid fa-star"></i>
                    <p>{{ room.star }} Star Hotel</p>
                  </div>
                </div>
                <div class="score_review_box">
                  <div class="score"><p>{{ room.score }}</p></div>
                  <div class="review_text">
                    <p><b>{{ room.reviewText }}</b> {{ room.reviewCount }} reviews</p>
                  </div>
                </div>
              </div>
              <div class="price">
                <p>starting from</p>
                <h2>₩{{ room.price.toLocaleString() }}<span>/night</span></h2>
              </div>
              <div class="two">
                <button class="heart" @click="toggleFavorite(room)">
                  <i
                      :class="room.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
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
          <!-- 목적지 입력 -->
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
              {{ rooms }} Room, {{ guests }} Guest
            </button>
          </div>

          <!-- 검색 버튼 -->
          <button class="search_icon4">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <!-- Rooms & Guests 모델 -->
        <transition name="slide-up">
          <div v-if="showPeopleModal" class="people_modal" @click.self="closePeopleModal">
            <div class="people_content">
              <h3>방 개수와 인원수 선택</h3>

              <div class="counter">
                <span>Rooms</span>
                <div class="controls">
                  <button @click="decrease('room')">-</button>
                  <span>{{ rooms }}</span>
                  <button @click="increase('room')">+</button>
                </div>
              </div>

              <div class="counter">
                <span>Guests</span>
                <div class="controls">
                  <button @click="decrease('guest')">-</button>
                  <span>{{ guests }}</span>
                  <button @click="increase('guest')">+</button>
                </div>
              </div>

              <div class="warning" v-if="guests < 2">
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
  name: "HotelListing",
  data() {
    return {
      tabs: [
        { value: "hotels", label: "Hotels" },
        { value: "motels", label: "Motels" },
        { value: "resorts", label: "Resorts" },
      ],
      activeTab: "hotels",
      showingData: {
        hotels: "Showing 4 of 257 places",
        motels: "Showing 4 of 51 places",
        resorts: "Showing 4 of 72 places",
      },
      roomsData: {
        hotels: [
          { id: 1, name: "호텔 A", price: 100000, isFavorite: false },
          { id: 2, name: "호텔 B", price: 120000, isFavorite: false },
          { id: 3, name: "호텔 C", price: 90000, isFavorite: false },
          { id: 4, name: "호텔 D", price: 110000, isFavorite: false },
          { id: 5, name: "호텔 E", price: 150000, isFavorite: false },
        ],
        motels: [],
        resorts: [],
      },
      visibleCount: {
        hotels: 4,
        motels: 4,
        resorts: 4,
      },
      sortModalOpen: false,
      sortOptions: ["Price Low → High", "Price High → Low", "Rating High → Low"],
      sortOption: "추천순",
      peopleModalOpen: false,
      rooms: 1,
      guests: 2,
      currentPeople: "1 Room, 2 Guest",
    };
  },
  computed: {
    showingText() {
      return this.showingData[this.activeTab];
    },
  },
  methods: {
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
      if (type === "guest" && this.guests > 0) this.guests--;
    },
    applyPeople() {
      this.closePeopleModal();
    },
  },
};

</script>
<style scoped>
@import "@/assets/css/HotelListing.css";
</style>
