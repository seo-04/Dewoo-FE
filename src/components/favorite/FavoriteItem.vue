<template>
  <div class="card">
    <div class="card-left">
      <img :src="info.imageURL" alt="" style="width: 440px; height: 273.5px; "/>
    </div>

    <div class="card-right">
      <div class="card-right-upper">
        <section class="desc-area">
          <h2 class="title">{{ info.name }}</h2>
          <p class="location" style="display: flex; gap: 5px">
            <img src="../../assets/img/icon/location.png" alt="" />
            {{ info.location }}
          </p>
          <ul class="desc-subInfo">
            <!-- ✅ 몇성 호텔 -->
            <li style="display: flex; justify-content: center; align-items: center;">
              <template v-for="star in info.stars">
                <img src="../../assets/img/icon/star.png" alt="" style="width: 15px; height: 14px;"/>
              </template>
              <div style="font-size: 12px ; margin-left: 5px; font-weight: bold"> {{ info.stars }} Star Hotel </div>
            </li>

            <!-- ✅ 어메니티 -->
            <li style="display: flex; justify-content: center; align-items: center; gap: 3px">
              <img src="../../assets/img/icon/coffee.png" alt="" style="width: 13px; height: 12px; border-radius: 0;"/>
              <template v-if="info.amenities >= 20">
                <span class="amenity-counts"> 20+ </span>
              </template>
              <template v-else>
                <span class="amenity-counts">
                  {{ info.amenities }}
                </span>
              </template>
              Amenities
            </li>
          </ul>
          <div class="review-summary">
            <span class="review-score">{{ info.reviewAvg }}</span>
            <strong class="average-review">Very Good</strong>
            <span class="reviews">{{ info.reviews }} reviews</span>
          </div>
        </section>

        <section class="price-area">
          <span class="price-guide1">starting from</span>
            <span class="favorite-roomPrice">₩{{ formatPrice(info.price)}}~<span class="favorite-nightCount">/1일</span>
            </span>

          <span class="price-guide2">excl. tax</span>
        </section>
      </div>

      <div class="card-right-bottom">
        <button class="like-btn" @click="onUnlikeClick">
          <img src="../../../src/assets/img/icon/blackheart.png" alt="" style="border-radius: 0; width: 16.25px; height: 15px" />
        </button>
        <button class="go-price-btn" @click="gotoDetailPage">View Price</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatPrice(price) {
      if (price === undefined || price === null) return '0';
      return Number(price).toLocaleString('ko-KR');
    },
    //나중에 api를 상세 페이지로 쏠 때 쓸거임
    gotoDetailPage() {
      // 1. info 객체에서 숙소 ID(comId)를 꺼냅니다.
      // 주의: 백엔드에서 보내주는 필드명이 'comId'인지, 'accId'인지, 'id'인지 꼭 확인하세요!
      // 예: 만약 백엔드 DTO가 { "id": 15, "name": "호텔..." } 라면 -> this.info.id 로 써야 합니다.
      const comId = this.info.comId;

      if (comId) {
        // 2. 해당 ID를 경로에 붙여서 이동합니다.
        this.$router.push({
          name: 'HotelAccommodation', // 라우터에 설정된 name과 일치해야 합니다.
          params: { comId: comId }
        });

        // 또는 아래처럼 경로를 직접 적어도 됩니다.
        // this.$router.push(`/accommodation/${comId}`);
      } else {
        console.error("숙소 ID가 없습니다. info 데이터를 확인해주세요:", this.info);
        alert("숙소 정보를 찾을 수 없습니다.");
      }
    },
    //찜하기 누르면 빠지게
    onUnlikeClick(){
      this.$emit('unlike', this.info.fno);
    },
  },
};
</script>

<style scoped lang="scss">
/* 이미지 기본 스타일 재설정 */
img {
  width: auto;
  height: auto;
}

.card {
  display: flex;
  margin-top: 40px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;       /* 카드 전체 너비 확보 */
  overflow: hidden;  /* 내부 요소가 튀어나가는 것 방지 */

  /* 왼쪽 이미지 영역 (고정 크기) */
  .card-left {
    flex-shrink: 0; /* 이미지는 절대 줄어들지 않도록 설정 */
    width: 440px;
    height: 273.5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* 이미지 비율 유지하며 꽉 채우기 */
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
  }

  /* 오른쪽 텍스트 및 버튼 영역 (유동적 크기) */
  .card-right {
    flex: 1;        /* 남은 공간을 모두 차지 */
    min-width: 0;   /* [핵심] Flex 자식 요소가 컨텐츠 크기보다 작아질 수 있도록 허용 */
    display: flex;
    flex-direction: column;
    height: 273.5px;
    /* gap: 40px; -> gap 대신 flex-grow로 간격 조정 권장 */

    /* 상단: 설명 + 가격 */
    .card-right-upper {
      flex: 1;      /* 하단 버튼을 밀어내고 남은 공간 차지 */
      display: flex;
      justify-content: space-between;
      padding: 24px 24px 0 24px;

      p {
        text-align: left;
        margin: 0; /* 불필요한 마진 제거 */
      }

      /* 호텔 설명 영역 */
      .desc-area {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 11px;

        .title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        .location {
          display: flex;
          align-items: center; /* 아이콘 수직 정렬 */
          font-size: 12px;
          color: rgba(17, 34, 17, 1);

          img { width: 10px; height: 14px; margin-right: 5px;}
        }

        .desc-subInfo {
          display: flex;
          gap: 32px;
          font-size: 12px;
          padding: 0;
          margin: 0;
          list-style: none;

          li {
            display: flex;
            align-items: center;
          }

          .amenity-counts {
            font-size: 12px;
            font-weight: 700;
            margin-right: 3px;
          }
        }

        .review-summary {
          display: flex;
          gap: 5px;
          font-size: 12px;
          align-items: center;

          .average-review {
            font-weight: 700;
          }

          .review-score {
            padding: 8px 11px;
            border: 1px solid rgba(141, 211, 187, 1);
            border-radius: 6px;
          }
        }
      }

      /* 가격 영역 */
      .price-area {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* 오른쪽 정렬 */

        .price-guide1 {
          text-align: left;
          font-size: 12px;
        }
        .price-guide2 {
          text-align: right;
          font-size: 12px;
        }
      }
    }

    /* 하단: 버튼 영역 */
    .card-right-bottom {
      position: relative;
      display: flex;
      gap: 16px;
      padding: 0 24px 24px 24px; /* 상단 패딩 제거 */
      margin-top: auto; /* 위쪽 요소들과 거리를 벌려 바닥에 붙임 */

      /* 구분선 (가상 요소) */
      &::before {
        content: '';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 94%;
        height: 1px;
        background-color: rgb(189, 195, 189);
      }

      .like-btn {
        width: 48px;
        height: 48px;
        border: 1px solid rgba(141, 211, 187, 1);
        display: flex;             /* justify-items 대신 flex 사용 */
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 5px;
        background: white;
        cursor: pointer;

        img { width: 16px; height: 15px; }
      }

      .go-price-btn {
        flex: 1; /* 버튼이 남은 공간을 가득 채우도록 설정 */
        height: 48px;
        /* padding: 15px 300px; -> 삭제 (고정 패딩 때문에 터짐) */
        font-size: 14px;
        font-weight: 600;
        background-color: rgba(141, 211, 187, 1);
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}

.favorite-roomPrice{
  font-size: 27px;
  font-weight: bold;
  color: #112211;
}

.favorite-nightCount{
  font-size: 19px;
}
</style>
