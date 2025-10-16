<template>
  <div>
    <header>
      <nav class="nav-container">
        <nav class="header_tabs">
          <div class="nav-left">
            <div class="tab active">
              <i class="fa-solid fa-bed"></i>
              hotel
            </div>
          </div>
        </nav>
        <div class="item">
          <div class="flex vertical-center">
            <i class="fa-solid fa-heart"></i>
            <span>찜하기</span>
            |
            <div class="circle">
              <div class="mini-circle">
                <div class="check_box"></div>
              </div>
            </div>
            <span>Tomhoon</span>
          </div>
        </div>
      </nav>
    </header>

    <div class="accommodation-container">
      <div class="hotel-info-section">
        <div class="hotel-header-details">
          <div class="breadcrumb">Turkey > Istanbul > 해튼호텔</div>
          <div class="hotel-title-and-rating">
            <h1 class="hotel-title">해튼호텔</h1>
            <div class="hotel-rating">
              <span class="stars">★★★★★</span> 5 Star Hotel
            </div>
          </div>
          <div class="hotel-address">
            <i class="fa-solid fa-location-dot"></i> Gümüşsuyu Mah. İnönü Cad. No:8, İstanbul 34437
          </div>
          <div class="hotel-reviews">
            <span class="rating-score">4.2</span>
            <span class="review-text">Very Good</span>
            <span class="review-count">371 reviews</span>
          </div>
        </div>
        <div class="price-and-actions">
          <div class="price-container">
            <span class="price">₩240,000</span><span class="per-night">/night</span>
          </div>
          <div class="action-buttons">
            <button class="icon-button"><i class="fa-regular fa-heart"></i></button>
            <button class="icon-button"><i class="fa-solid fa-share-nodes"></i></button>
            <button class="book-now-button">Book now</button>
          </div>
        </div>
      </div>

      <div class="hotel-images-section">
        <div class="main-image">
          <img :src="mainImage" alt="메인 호텔 이미지" />
        </div>
        <div class="thumbnail-images">
          <img :src="thumbnail1" alt="호텔 썸네일 1" />
          <img :src="thumbnail2" alt="호텔 썸네일 2" />
          <img :src="thumbnail3" alt="호텔 썸네일 3" />
          <img :src="thumbnail4" alt="호텔 썸네일 4" />
          <button class="view-all-button">View all photos</button>
        </div>
      </div>

      <hr>

      <div class="overview-section">
        <h2 class="section-title">Overview</h2>
        <p class="overview-text">
          반다르 힐리르 지역에 위치한 대형 호텔로 쇼핑몰과 관광지가 가까워 접근성이 뛰어납니다. 실외 수영장, 스파, 피트니스 센터, 그리고 가족 단위 여행객을 위한 키즈 풀까지 갖추고 있어 편리하고 실속 있는 여행을 원하는 분들에게 적합합니다. 넓은 객실과 모던한 시설은 물론, 비즈니스 센터와 회의실도 완비되어 있어 단체 관광이나 기업 연수에도 어울립니다.
          반다르 힐리르 지역에 위치한 대형 호텔로 쇼핑몰과 관광지가 가까워 접근성이 뛰어납니다. 실외 수영장, 스파, 피트니스 센터, 그리고 가족 단위 여행객을 위한 키즈 풀까지 갖추고 있어 편리하고 실속 있는 여행을 원하는 분들에게 적합합니다. 넓은 객실과 모던한 시설은 물론, 비즈니스 센터와 회의실도 완비되어 있어 단체 관광이나 기업 연수에도 어울립니다.
          반다르 힐리르 지역에 위치한 대형 호텔로 쇼핑몰과 관광지가 가까워 접근성이 뛰어납니다. 실외 수영장, 스파, 피트니스 센터, 그리고 가족 단위 여행객을 위한 키즈 풀까지 갖추고 있어 편리하고 실속 있는 여행을 원하는 분들에게 적합합니다. 넓은 객실과 모던한 시설은 물론, 비즈니스 센터와 회의실도 완비되어 있어 단체 관광이나 기업 연수에도 어울립니다.
          반다르 힐리르 지역에 위치한 대형 호텔로 쇼핑몰과 관광지가 가까워 접근성이 뛰어납니다. 실외 수영장, 스파, 피트니스 센터, 그리고 가족 단위 여행객을 위한 키즈 풀까지 갖추고 있어 편리하고 실속 있는 여행을 원하는 분들에게 적합합니다. 넓은 객실과 모던한 시설은 물론, 비즈니스 센터와 회의실도 완비되어 있어 단체 관광이나 기업 연수에도 어울립니다.
          반다르 힐리르 지역에 위치한 대형 호텔로 쇼핑몰과 관광지가 가까워 접근성이 뛰어납니다. 실외 수영장, 스파, 피트니스 센터, 그리고 가족 단위 여행객을 위한 키즈 풀까지 갖추고 있어 편리하고 실속 있는 여행을 원하는 분들에게 적합합니다. 넓은 객실과 모던한 시설은 물론, 비즈니스 센터와 회의실도 완비되어 있어 단체 관광이나 기업 연수에도 어울립니다.
        </p>
        <div class="overview-details">
          <div class="rating-box">
            <div class="rating-score">4.2</div>
            <div class="rating-text">Very good</div>
            <div class="review-count">371 reviews</div>
          </div>
          <div class="amenity-list">
            <div class="amenity-item">
              <span class="amenity-icon">★</span>
              <span class="amenity-text">Near park</span>
            </div>
            <div class="amenity-item">
              <span class="amenity-icon">★</span>
              <span class="amenity-text">Near nightlife</span>
            </div>
            <div class="amenity-item">
              <span class="amenity-icon">★</span>
              <span class="amenity-text">Near theater</span>
            </div>
            <div class="amenity-item">
              <span class="amenity-icon">★</span>
              <span class="amenity-text">Clean Hotel</span>
            </div>
          </div>
        </div>
      </div>
      <hr>


      <div class="room-section">
        <h2 class="section-title">객실</h2>
        <div class="room-list">
          <div class="room-item" v-for="room in rooms" :key="room.id">
            <div class="room-details">
              <img :src="room.image" alt="Room Image" class="room-image" />
              <div class="room-info">
                <div class="room-type">{{ room.type }}</div>
              </div>
            </div>
            <div class="room-price-container">
              <div class="room-price">
                <span class="price-value">₩{{ room.price.toLocaleString() }}</span>
                <span class="price-unit">/night</span>
              </div>
              <button class="book-now-button">Book now</button>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <MapSection
          apiKey="AIzaSyALY6qdom7_04POAxT18afRvHK84daK4FM"
          address="Gümüşsuyu Mah. İnönü Cad. No:8, İstanbul 34437"
      />
      <hr>

      <AmenitiesAndReviews />
    </div>




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
  </div>


</template>

<script>
import MapSection from './MapSection.vue';
import AmenitiesAndReviews from './AmenitiesAndReviews.vue';

export default {
  name: "HotelAccommodation",
  components: {
    MapSection,
    AmenitiesAndReviews
  },
  data() {
    return {
      mainImage: 'https://placehold.co/800x600?text=Main+Hotel+Image',
      thumbnail1: 'https://placehold.co/400x300?text=Thumbnail+1',
      thumbnail2: 'https://placehold.co/400x300?text=Thumbnail+2',
      thumbnail3: 'https://placehold.co/400x300?text=Thumbnail+3',
      thumbnail4: 'https://placehold.co/400x300?text=Thumbnail+4',
      rooms: [
        { id: 1, type: "Superior room - 1 double bed or 2 twin beds", price: 240000, image: 'https://placehold.co/100x80?text=Room+1' },
        { id: 2, type: "Superior room - City view - 1 double bed or 2 twin beds", price: 240000, image: 'https://placehold.co/100x80?text=Room+2' },
        { id: 3, type: "Superior room - City view - 1 double bed or 2 twin beds", price: 240000, image: 'https://placehold.co/100x80?text=Room+3' },
        { id: 4, type: "Superior room - City view - 1 double bed or 2 twin beds", price: 240000, image: 'https://placehold.co/100x80?text=Room+4' },
      ]
    };
  }
};
</script>

<style scoped>
@import '@/assets/css/HotelAccommodation.css';
</style>