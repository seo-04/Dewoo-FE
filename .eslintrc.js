module.exports = {
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // 👈 allows 'import'
  },
  plugins: ["vue"],
  globals: {
    TossPayments: 'readonly',  // Toss Payments SDK 전역 변수
    daum: 'readonly',          // 다음 주소 API 전역 변수
  },
};
