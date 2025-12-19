<template>
  <div class="amenities-reviews-section">
    <div class="amenities-section-acc">
      <h2 class="section-title">Amenities</h2>
      <div class="amenity-flex-container">
        <div class="amenity-feature" v-for="amenity in visibleAmenities" :key="amenity.amId">
          <i :class="getIconClass(amenity.iconName)"></i>
          <span>{{ amenity.amCategory }}</span>
        </div>
      </div>
      <div class="more-amenities">
        <a href="#" @click.prevent="showMoreAmenities" v-if="hiddenAmenitiesCount > 0">+{{ hiddenAmenitiesCount }} more</a>
        <a href="#" @click.prevent="showLessAmenities" v-else-if="amenities.length > initialVisibleCount">Show less</a>
      </div>
    </div>

    <hr>

    <div class="reviews-section">
      <div class="reviews-header">
        <h2 class="section-title">Reviews</h2>
        <button class="review-button" @click="openReviewForm">Give your review</button>
      </div>
      <div class="review-summary">
        <div class="rating-score">{{ reviewAvg != null ? reviewAvg.toFixed(1) : 'N/A' }}</div>
        <span class="rating-text">{{ getReviewText(reviewAvg) }}</span>
        <span class="review-count">{{ reviewCount }} verified reviews</span>
      </div>

      <div v-if="error" class="review-error-message">{{ error }}</div>

      <div v-else-if="reviews.length > 0" class="review-list">
        <div class="review-item" v-for="review in reviews" :key="review.reviewId">
          
          <!-- 본인 리뷰: 수정/삭제 버튼 -->
          <div class="review-actions" v-if="loggedInUserId === review.userId">
            <button class="action-btn edit-btn" @click="openEditForm(review)" title="수정">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="action-btn delete-btn" @click="deleteReview(review.reviewId)" title="삭제">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          
          <!-- 다른 사람 리뷰: 신고 버튼 -->
          <div class="review-actions" v-else-if="loggedInUserId && loggedInUserId !== review.userId">
            <button class="action-btn report-btn" @click="reportReview(review.reviewId)" title="신고">
              <i class="fa-solid fa-flag"></i>
            </button>
          </div>

          <div class="review-content-wrapper">
            <img :src="getProfileImageUrl(review.profileImageUrl)" alt="profile" class="reviewer-avatar" @error="handleImageError">
            <div class="review-body">
              <div class="reviewer-info">
                <div class="reviewer-rating">{{ review.score }} {{ getRatingAdjective(review.score) }}</div>
                <span class="reviewer-divider">|</span>
                <div class="reviewer-name">{{ review.username || '익명 사용자' }}</div>
              </div>
              <p class="review-text">{{ review.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-reviews">
        아직 작성된 리뷰가 없습니다.
      </div>

      <div class="pagination">
        <button class="pagination-btn" @click="previousPage" :disabled="currentPage === 0">&lt;</button>
        <span>{{ currentPage + 1 }} of {{ totalPages }}</span>
        <button class="pagination-btn" @click="nextPage" :disabled="currentPage >= totalPages - 1">&gt;</button>
      </div>
    </div>

    <!-- 리뷰 작성 모달 -->
    <div v-if="showReviewForm" class="review-modal-overlay" @click.self="closeReviewForm">
      <div class="review-modal-content">
        <button class="modal-close-button" @click="closeReviewForm">&times;</button>
        <h3>리뷰 작성하기</h3>
        <form @submit.prevent="handleSubmitReview">
          <div class="review-form-group">
            <label>별점:</label>
            <div class="star-rating">
              <span v-for="star in 5" :key="star" @click="setRating(star)">
                <i :class="getStarClass(star)"></i>
              </span>
            </div>
          </div>
          <div class="review-form-group">
            <label for="reviewContent">내용:</label>
            <textarea id="reviewContent" v-model.trim="newReview.content" rows="5" required></textarea>
          </div>
          <div v-if="reviewError" class="review-error-message">{{ reviewError }}</div>
          <button type="submit" :disabled="reviewLoading" class="review-button submit-btn">
            {{ reviewLoading ? '등록 중...' : '리뷰 등록' }}
          </button>
        </form>
      </div>
    </div>

    <!-- 리뷰 수정 모달 -->
    <div v-if="showEditForm" class="review-modal-overlay" @click.self="closeEditForm">
      <div class="review-modal-content">
        <button class="modal-close-button" @click="closeEditForm">&times;</button>
        <h3>리뷰 수정하기</h3>
        <form @submit.prevent="handleUpdateReview">
          <div class="review-form-group">
            <label>별점:</label>
            <div class="star-rating">
              <span v-for="star in 5" :key="star" @click="setEditRating(star)">
                <i :class="getEditStarClass(star)"></i>
              </span>
            </div>
          </div>
          <div class="review-form-group">
            <label for="editReviewContent">내용:</label>
            <textarea id="editReviewContent" v-model.trim="editReview.content" rows="5" required></textarea>
          </div>
          <div v-if="editError" class="review-error-message">{{ editError }}</div>
          <button type="submit" :disabled="editLoading" class="review-button submit-btn">
            {{ editLoading ? '수정 중...' : '리뷰 수정' }}
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AmenitiesAndReviews',
  props: {
    amenities: { type: Array, default: () => [] },
    reviewAvg: { type: Number, default: null },
    reviewCount: { type: Number, default: 0 }
  },
  data() {
    return {
      initialVisibleCount: 9,
      visibleAmenitiesCount: 9,
      reviews: [],
      error: null,
      
      // 리뷰 작성
      showReviewForm: false,
      newReview: { content: '', score: 0 },
      reviewLoading: false,
      reviewError: null,
      
      // 리뷰 수정
      showEditForm: false,
      editReview: { reviewId: null, content: '', score: 0 },
      editLoading: false,
      editError: null,
      
      // 페이징
      currentPage: 0,
      totalPages: 1,
      pageSize: 5,
      
      loggedInUserId: null,
      defaultAvatar: require('@/assets/img/icon/user_icon.png')
    };
  },
  computed: {
    visibleAmenities() { return this.amenities.slice(0, this.visibleAmenitiesCount); },
    hiddenAmenitiesCount() { const hc = this.amenities.length - this.visibleAmenitiesCount; return hc > 0 ? hc : 0; }
  },
  methods: {
    // Amenities 관련
    showMoreAmenities() { this.visibleAmenitiesCount = this.amenities.length; },
    showLessAmenities() { this.visibleAmenitiesCount = this.initialVisibleCount; },
    getIconClass(iconName) { return iconName ? `fa-solid fa-${iconName}` : 'fa-solid fa-question-circle'; },
    
    // 텍스트 변환
    getReviewText(score) {
      if (score === null || score === undefined) return "No Rating";
      if (score >= 4.5) return "Excellent";
      if (score >= 4.0) return "Very Good";
      if (score >= 3.5) return "Good";
      if (score >= 3.0) return "Average";
      return "Poor";
    },
    getRatingAdjective(score) {
      if (score >= 4.5) return "Amazing";
      if (score >= 4.0) return "Great";
      if (score >= 3.5) return "Good";
      if (score >= 3.0) return "Okay";
      return "Poor";
    },

    // 프로필 이미지 URL 변환
    getProfileImageUrl(imagePath) {
      if (!imagePath) return this.defaultAvatar;
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
      
      let filename = imagePath;
      if (imagePath.includes('/user-images/')) {
        filename = imagePath.split('/user-images/')[1];
      } else if (imagePath.startsWith('/')) {
        filename = imagePath.substring(1);
      }
      return `/api/user/file/user-images/${filename}`;
    },
    
    handleImageError(e) {
      e.target.src = this.defaultAvatar;
    },

    // 리뷰 목록 로드
    async fetchReviews(page = 0) {
      this.error = null;
      try {
        const comId = this.$route.params.comId;
        if (!comId) throw new Error("ID not found.");
        const token = localStorage.getItem('jwtToken');

        const response = await axios.get(`/api/accommodation/${comId}/review`, {
          params: { page: page, size: this.pageSize },
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });

        if (response.data?.code === 'SUCCESS' && response.data.result) {
          const pageData = response.data.result;
          this.reviews = pageData.content || [];
          this.currentPage = pageData.number;
          this.totalPages = pageData.totalPages > 0 ? pageData.totalPages : 1;
        } else {
          throw new Error(response.data.message || "리뷰 로드 실패");
        }
      } catch (err) {
        console.error("리뷰 로드 오류:", err);
        this.error = `리뷰 로드 실패: ${err.response?.data?.message || err.message}`;
        this.reviews = [];
        this.currentPage = 0;
        this.totalPages = 1;
      }
    },
    
    // 페이지 이동
    previousPage() { if (this.currentPage > 0) this.fetchReviews(this.currentPage - 1); },
    nextPage() { if (this.currentPage < this.totalPages - 1) this.fetchReviews(this.currentPage + 1); },

    // ========== 리뷰 작성 ==========
    openReviewForm() {
      const token = localStorage.getItem('jwtToken');
      if (!token) { this.$emit('attempt-review'); return; }
      this.newReview = { content: '', score: 0 };
      this.reviewError = null;
      this.showReviewForm = true;
    },
    closeReviewForm() { this.showReviewForm = false; },
    setRating(star) { this.newReview.score = (this.newReview.score === star) ? star - 0.5 : star; },
    getStarClass(val) {
      return this.newReview.score >= val ? 'fa-solid fa-star filled' :
        (this.newReview.score >= val - 0.5 ? 'fa-solid fa-star-half-stroke filled' : 'fa-regular fa-star');
    },

    async handleSubmitReview() {
      if (this.newReview.score === 0 || !this.newReview.content?.trim()) {
        this.reviewError = "별점과 내용을 모두 입력해주세요.";
        return;
      }
      this.reviewLoading = true;
      this.reviewError = null;
      
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) { alert("로그인이 필요합니다."); this.reviewLoading = false; return; }

        const comId = this.$route.params.comId;
        const response = await axios.post(`/api/accommodation/${comId}/review`, {
          content: this.newReview.content.trim(),
          score: this.newReview.score,
          comId: comId
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.code === 'SUCCESS') {
          this.closeReviewForm();
          await this.fetchReviews(0);
          this.$emit('review-submitted');
          alert('리뷰가 등록되었습니다.');
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.error("리뷰 등록 실패:", err);
        this.reviewError = err.response?.data?.message || "오류 발생";
      } finally {
        this.reviewLoading = false;
      }
    },

    // ========== 리뷰 수정 ==========
    openEditForm(review) {
      this.editReview = {
        reviewId: review.reviewId,
        content: review.content,
        score: parseFloat(review.score) || 0
      };
      this.editError = null;
      this.showEditForm = true;
    },
    closeEditForm() { this.showEditForm = false; },
    setEditRating(star) { this.editReview.score = (this.editReview.score === star) ? star - 0.5 : star; },
    getEditStarClass(val) {
      return this.editReview.score >= val ? 'fa-solid fa-star filled' :
        (this.editReview.score >= val - 0.5 ? 'fa-solid fa-star-half-stroke filled' : 'fa-regular fa-star');
    },

    async handleUpdateReview() {
      if (this.editReview.score === 0 || !this.editReview.content?.trim()) {
        this.editError = "별점과 내용을 모두 입력해주세요.";
        return;
      }
      this.editLoading = true;
      this.editError = null;
      
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) { alert("로그인이 필요합니다."); this.editLoading = false; return; }

        const comId = this.$route.params.comId;
        const response = await axios.patch(
          `/api/accommodation/${comId}/review/${this.editReview.reviewId}`,
          {
            content: this.editReview.content.trim(),
            score: this.editReview.score
          },
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );

        if (response.data.code === 'SUCCESS') {
          this.closeEditForm();
          await this.fetchReviews(this.currentPage);
          this.$emit('review-submitted');
          alert('리뷰가 수정되었습니다.');
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.error("리뷰 수정 실패:", err);
        this.editError = err.response?.data?.message || "수정 중 오류가 발생했습니다.";
      } finally {
        this.editLoading = false;
      }
    },

    // ========== 리뷰 삭제 ==========
    async deleteReview(reviewId) {
      if (!confirm("이 리뷰를 정말 삭제하시겠습니까?")) return;
      
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) { alert("삭제 권한이 없습니다."); return; }

        const response = await axios.delete(`/api/accommodation/review/${reviewId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.code === 'SUCCESS') {
          const pageToFetch = (this.reviews.length === 1 && this.currentPage > 0) 
            ? this.currentPage - 1 
            : this.currentPage;
          await this.fetchReviews(pageToFetch);
          this.$emit('review-deleted');
          alert('리뷰가 삭제되었습니다.');
        } else {
          throw new Error(response.data.message || "삭제 실패");
        }
      } catch (err) {
        console.error("리뷰 삭제 실패:", err);
        alert(`리뷰 삭제 오류: ${err.response?.data?.message || err.message}`);
      }
    },

    // ========== 리뷰 신고 ==========
    reportReview(reviewId) {
      if (!confirm("이 리뷰를 정말 신고하시겠습니까?")) return;

      const token = localStorage.getItem('jwtToken');
      if (!token) {
        alert("신고 권한이 없습니다. 로그인이 필요합니다.");
        return;
      }

      console.log(`Reporting review ID: ${reviewId}`);
      alert('신고가 정상적으로 접수되었습니다.');
    }
  },
  
  async mounted() {
    // localStorage에서 userId 확인
    let userIdFromStorage = localStorage.getItem('userId');

    // userId가 없으면 API로 가져오기
    if (!userIdFromStorage) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const response = await axios.get('/api/user/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.data && response.data.userId) {
            userIdFromStorage = response.data.userId;
            localStorage.setItem('userId', userIdFromStorage);
            console.log('API에서 userId 가져옴:', userIdFromStorage);
          }
        } catch (err) {
          console.error('userId 가져오기 실패:', err);
        }
      }
    }

    this.loggedInUserId = userIdFromStorage ? parseInt(userIdFromStorage) : null;
    console.log('loggedInUserId:', this.loggedInUserId);

    this.fetchReviews();
  }
};
</script>

<style scoped>
.amenities-reviews-section {
  padding: 20px 0;
  text-align: left;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: left;
}

/* Amenities */
.amenity-flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.amenity-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  width: 120px;
  height: 100px;
  font-size: 0.9em;
  color: #333;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}

.amenity-feature i {
  font-size: 2.2em;
  color: #555;
}

.more-amenities {
  text-align: right;
  margin-top: 20px;
}

.more-amenities a {
  color: #c94029;
  text-decoration: none;
  font-weight: bold;
}

/* Reviews Section */
.reviews-section {
  margin-top: 30px;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-button {
  background-color: #8DD3BB;
  border: 1px solid #8DD3BB;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.review-button:hover {
  background-color: #7ac4ab;
}

.review-summary {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #e6f7ef;
  padding: 5px 12px;
  border-radius: 5px;
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 20px;
}

.review-summary .rating-score {
  font-weight: bold;
  font-size: 1.1em;
}

.review-summary .rating-text {
  color: #333;
}

.review-summary .review-count {
  color: #555;
  font-size: 0.9em;
}

/* Review List */
.review-list {
  margin-top: 40px;
}

.review-item {
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.review-content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding-right: 80px;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
  flex-shrink: 0;
  background-color: #f5f5f5;
}

.review-body {
  flex: 1;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reviewer-divider {
  color: #ccc;
}

.reviewer-rating {
  font-weight: bold;
}

.reviewer-name {
  color: #555;
  font-weight: bold;
}

.review-text {
  margin-top: 10px;
  line-height: 1.6;
  color: #333;
  text-align: left;
}

.no-reviews {
  text-align: center;
  padding: 40px;
  color: #888;
}

/* Review Actions (수정/삭제/신고 버튼) */
.review-actions {
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn i {
  font-size: 14px;
}

.edit-btn {
  color: #8DD3BB;
  border-color: #8DD3BB;
}

.edit-btn:hover {
  background-color: #8DD3BB;
  color: white;
}

.delete-btn {
  color: #e74c3c;
  border-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #e74c3c;
  color: white;
}

.report-btn {
  color: #f39c12;
  border-color: #f39c12;
}

.report-btn:hover {
  background-color: #f39c12;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-btn {
  background-color: transparent;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  border-color: #eee;
}

/* Modal */
.review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.review-modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-close-button:hover {
  color: #333;
}

.review-modal-content h3 {
  margin-top: 0;
  margin-bottom: 25px;
  text-align: center;
  font-size: 1.5rem;
}

.review-form-group {
  margin-bottom: 20px;
}

.review-form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.review-form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  resize: vertical;
}

/* Star Rating */
.star-rating {
  font-size: 2rem;
  cursor: pointer;
}

.star-rating span {
  margin-right: 5px;
}

.star-rating i {
  transition: color 0.2s;
}

.star-rating .filled {
  color: #f39c12;
}

.star-rating .fa-regular.fa-star {
  color: #ccc;
}

/* Submit Button */
.review-modal-content .review-button.submit-btn {
  width: 100%;
  font-size: 1.1rem;
}

.review-modal-content .review-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Error Message */
.review-error-message {
  color: red;
  margin-bottom: 15px;
  text-align: center;
}
</style>
