<template>
  <CommonLayout>
    <div class="favorite-container">
      <h2 class="title">Favorite</h2>

      <ul class="tabs">
        <li>
          <p>Flights</p>
          <span>2 marked</span>
        </li>
        <li class="active">
          <p>Places</p>
          <span>2 marked</span>
        </li>
      </ul>

      <FavoriteList :list="favoriteList" />
    </div>
  </CommonLayout>
</template>

<script>
import CommonLayout from '@/components/common/CommonLayout.vue';
import FavoriteList from '@/components/favorite/FavoriteList.vue';

export default {
  components: { CommonLayout, FavoriteList },
  data() {
    return {
      // 즐겨찾기리스트 조회 후 list 대신 쓰면됨
      favoriteList: [
        {
          fno: 1,
          price: 104,
          stars: 5,
          amenities: 12,
          reviewAvg: 4.3,
          reviewCount: 321,
          location: 'New York, USA',
          name: 'Grand Central Hotel',
          imageURL: require('@/assets/img/favorite/favorite1.png'),
        },
        {
          fno: 2,
          price: 240,
          stars: 5,
          amenities: 20,
          reviewAvg: 4.8,
          reviews: 874,
          location: 'Paris, France',
          name: 'Eiffel View Resort',
          imageURL: require('@/assets/img/favorite/favorite2.png'),
        },
        {
          fno: 3,
          price: 150,
          stars: 5,
          amenities: 8,
          reviewAvg: 3.9,
          reviewCount: 210,
          location: 'Tokyo, Japan',
          name: 'Shinjuku Stay',
          imageURL: require('@/assets/img/favorite/favorite3.png'),
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.favorite-container {
  margin-top: 48px;

  & .title {
    text-align: left;
  }

  & .tabs {
    margin-top: 24px;
    display: flex;
    width: 100%;
    box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
    padding: 17px 24px;
    position: relative;

    & .active::after {
      content: '';
      position: absolute;
      width: 101%;
      height: 3px;
      background-color: rgb(141, 211, 187);
      bottom: -17px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 4px;
    }

    & li {
      flex: 1;
      text-align: left;
      position: relative;
      & p {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        text-align: left; // 임시로 전역 수정 전까지만...
      }
      & span {
        font-size: 14px;
        color: rgb(153 155 153);
      }
    }
  }
}
</style>
