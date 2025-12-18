<template>
  <div class="payment-processing">
    <h1>결제를 진행 중입니다...</h1>
    <p v-if="statusMessage">{{ statusMessage }}</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const statusMessage = ref('');

onMounted(async () => {
  const { paymentKey, orderId, amount } = route.query;

  // sessionStorage에서 예약 정보 가져오기
  const reservationDataStr = sessionStorage.getItem('reservationData');

  if (!reservationDataStr) {
    console.error('예약 정보가 없습니다.');
    router.push(`/payment/fail?message=${encodeURIComponent('예약 정보가 없습니다. 다시 시도해주세요.')}`);
    return;
  }

  const reservationData = JSON.parse(reservationDataStr);
  console.log('예약 정보:', reservationData);
  console.log('결제 정보 - paymentKey:', paymentKey, 'orderId:', orderId, 'amount:', amount);

  // 토큰 가져오기
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    router.push(`/payment/fail?message=${encodeURIComponent('로그인이 필요합니다.')}`);
    return;
  }

  try {
    statusMessage.value = '결제 승인 중...';

    // 백엔드로 결제 승인 요청 보내기
    const response = await axios.post('/api/payment/toss/confirm', {
      paymentKey,
      orderId,
      amount: Number(amount), // 숫자로 변환
      accId: reservationData.accId,
      checkIn: reservationData.checkIn,
      checkOut: reservationData.checkOut,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // 성공 시 로직
    console.log('결제 승인 성공:', response.data);

    // sessionStorage 정리
    sessionStorage.removeItem('reservationData');

    alert('결제가 성공적으로 완료되었습니다.');
    router.push('/'); // 메인 페이지로 이동 (또는 예약 완료 페이지)

  } catch (error) {
    // 실패 시 로직
    console.error('결제 승인 실패:', error);

    // sessionStorage 정리
    sessionStorage.removeItem('reservationData');

    const errorMessage = error.response?.data?.message || error.response?.data || '알 수 없는 오류가 발생했습니다.';
    router.push(`/payment/fail?message=${encodeURIComponent(errorMessage)}`);
  }
});
</script>

<style scoped>
.payment-processing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.payment-processing h1 {
  margin-bottom: 20px;
}

.payment-processing p {
  color: #666;
}
</style>