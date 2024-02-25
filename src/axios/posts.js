import axios from 'axios';

export const postsAPI = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

postsAPI.interceptors.request.use(function (config) {
  console.log(`서버에 게시글 데이터 요청`);
  return config;
});
postsAPI.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    alert(`데이터를 받아오지 못했습니다. 다시 시도하세요.`);
    console.log(error.message);
  }
);
