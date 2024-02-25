// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApzJmIoQIh6CHvVxlJQkIvdJCuv2L_R7c',
  authDomain: 'gabaedo-7fda6.firebaseapp.com',
  projectId: 'gabaedo-7fda6',
  storageBucket: 'gabaedo-7fda6.appspot.com',
  messagingSenderId: '816387183671',
  appId: '1:816387183671:web:cfe441af3943655e7a9bb2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export const auth = getAuth(app);
export const db = getFirestore(app);
