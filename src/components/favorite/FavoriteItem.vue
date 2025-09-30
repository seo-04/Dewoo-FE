<template>
  <div class="card">
    <div class="card-left">
      <img :src="info.imageURL" alt="" />
    </div>

    <div class="card-right">
      <div class="card-right-upper">
        <section class="desc-area">
          <h2 class="title">{{ info.title }}</h2>
          <p class="location">
            <img src="../../assets/img/icon/location.png" alt="" />
            {{ info.location }}
          </p>
          <ul class="desc-subInfo">
            <!-- ✅ 몇성 호텔 -->
            <li>
              <template v-for="star in info.stars">
                <img src="../../assets/img/icon/star.png" alt="" />
              </template>
              {{ info.stars }} Star Hotel
            </li>

            <!-- ✅ 어메니티 -->
            <li>
              <img src="../../assets/img/icon/coffee.png" alt="" />

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
            <span class="review-score">{{ info.reviewScore }}</span>
            <strong class="average-review">{{ info.averageReview }}</strong>
            <span class="reviews">{{ info.reviews }} reviews</span>
          </div>
        </section>

        <section class="price-area">
          <span class="price-guide1">starting from</span>
          <span class="price">
            <strong>${{ info.price }}</strong
            >/night</span
          >
          <span class="price-guide2">excl. tax</span>
        </section>
      </div>

      <div class="card-right-bottom">
        <button class="like-btn">
          <img src="../../../src/assets/img/icon/blackheart.png" alt="" />
        </button>
        <button class="go-price-btn">View Price</button>
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
};
</script>

<style scoped lang="scss">
.card-right-bottom::before {
  left: 50%;
  content: '';
  width: 94%;
  top: -40px;
  position: absolute;
  height: 1px;
  background-color:rgb(189 195 189);
  transform: translateX(-50%);
}

.card {
  display: flex;
  margin-top: 40px;

  & .card-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 48px;

    & .card-right-upper,
    .card-right-bottom {
      padding: 0 24px 24px 24px;
    }

    & .card-right-upper {
      display: flex;
      justify-content: space-between;

      p {
        text-align: left;
      }

      & .desc-area {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 10px;
        & .title {
          font-size: 20;
          font-weight: 700;
        }
        & .location {
          display: flex;
          font-size: 12px;
          color: rgba(17, 34, 17, 1);
        }

        & .desc-subInfo {
          display: flex;
          gap: 32px;
          font-size: 12px;

          & .amenity-counts {
            font-size: 12px;
            font-weight: 700;
          }
        }

        & .review-summary {
          display: flex;
          gap: 5px;
          font-size: 12px;
          align-items: center;

          & .average-review {
            font-weight: 700;
          }

          & .review-score {
            padding: 8px 11px;
            border: 1px solid rgba(141, 211, 187, 1);
            border-radius: 6px;
          }
        }
      }

      & .price-area {
        display: flex;
        flex-direction: column;
        & .price-guide1 {
          text-align: left;
          font-size: 12px;
        }
        & .price-guide2 {
          text-align: right;
          font-size: 12px;
        }

        & .price {
          color: rgba(255, 134, 130, 1);
          & strong {
            font-size: 24px;
            font-weight: 700;
          }
        }
      }
    }

    & .card-right-bottom {
      position: relative;
      display: flex;
      gap: 16px;

      & .like-btn {
        width: 48px;
        height: 48px;
        border: 1px solid rgba(141, 211, 187, 1);
        border-radius: 6px;
      }

      & .go-price-btn {
        width: 680px;
        height: 48px;
        padding: 15px 300px;
        font-size: 14px;
        font-weight: 500;
        background-color: rgba(141, 211, 187, 1);
        border-radius: 5px;
        font-weight: 600;
      }
    }

    & .info {
      display: flex;
    }
  }
}
</style>
