import axios from 'axios';

export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_JWP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

authAPI.interceptors.request.use(function (config) {
  if (config.url === 'user') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    } else {
      alert(`세션이 만료되어 재로그인 해주세요!`);
      return Promise.reject(`로그인 세션 만료`);
    }
  } else {
    return config;
  }
});

authAPI.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    alert(error);
    console.log('로그인 실패', error);
  }
);
