import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_JWP_API_URL
});

instance.interceptors.request.use(
  (config) => {
    console.log('요청 성공');
    return config;
  },
  (error) => {
    console.log('요청 에러');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    console.log('응답');
    return config;
  },
  (error) => {
    console.log('응답 에러');
    return Promise.reject(error);
  }
);

export default instance;
