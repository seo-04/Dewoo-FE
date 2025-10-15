import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  // 🔔 중요: 백엔드 API 서버의 기본 주소를 설정합니다.
  // 예를 들어, 백엔드가 http://localhost:8085 에서 실행 중이라면 아래와 같이 설정합니다.
  // vue.config.js의 devServer.proxy 설정과 충돌하지 않도록 주의하세요.
  // 만약 proxy를 사용한다면 baseURL을 비워두거나 '/'로 설정해도 됩니다.
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8085',
  headers: {
    'Content-Type': 'application/json',
  },
});

//  요청 인터셉터 (Request Interceptor)
// : 모든 요청이 백엔드로 전송되기 전에 이 코드를 거칩니다.
instance.interceptors.request.use(
  (config) => {
    // 1. localStorage에서 토큰을 가져옵니다.
    const token = localStorage.getItem('token');

    // 2. 토큰이 존재하면, 모든 요청 헤더에 'Authorization' 헤더를 추가합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 설정 중 에러가 발생하면 여기서 처리합니다.
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Response Interceptor) - 선택 사항이지만 강력 추천!
// : 백엔드로부터 받은 모든 응답은 이 코드를 거칩니다.
instance.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드: 정상 응답이므로 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 2xx 이외의 상태 코드: 에러 응답 처리
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 에러 (토큰이 유효하지 않거나 만료됨)
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('token'); // 만료된 토큰 삭제
      // 로그인 페이지로 리디렉션
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;