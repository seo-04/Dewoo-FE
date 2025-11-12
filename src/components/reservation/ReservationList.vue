<template>
  <div class="booking-list-wrapper">
    <div v-if="list.length === 0" style="text-align:center; color: #888; padding: 40px 0;">
      <p>예약 내역이 없습니다.</p>
    </div>

    <transition-group v-else name="list-fade" tag="div" class="list-container">
      <ReservationItem
        v-for="(reservation, idx) in list"
        :key="reservation.id || idx"
        :reservation="reservation"
      />
    </transition-group>
  </div>
</template>

<script setup>
import ReservationItem from './ReservationItem.vue';
import { defineProps } from 'vue';

// 부모(UserProfile.vue)에서 API로 받아온 데이터를 'list'라는 이름으로 넘겨받습니다.
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  gap: 24px; /* 카드 사이 간격 */
  position: relative;
}

/* --- 리스트 애니메이션 효과 (삭제/추가 시 부드럽게) --- */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.5s ease;
}
.list-fade-leave-active {
  position: absolute;
  width: 100%;
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-fade-move {
  transition: all 0.5s ease;
}
</style>