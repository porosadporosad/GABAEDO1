import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

//파이어베이스 초기 설정과 로그인 관련 코드가 있는 문서

const firebaseConfig = {
  apiKey: 'AIzaSyAU2tKuqjD6p7SmA5IzBKN7Gvxn5ddWA4w',
  authDomain: 'test-app-772b8.firebaseapp.com',
  projectId: 'test-app-772b8',
  storageBucket: 'test-app-772b8.appspot.com',
  messagingSenderId: '996959188329',
  appId: '1:996959188329:web:a1d40cef8f21d16937b9f8'
};

// 파이어베이스 초기화
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

//요기 밑에 구글 등 firebase 소셜 로그인 코드 넣어주세요..
