import { collection, getDocs } from 'firebase/firestore';
import { db } from 'shared/firebase';

//파이어베이스에서 유저 정보 불러오기
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('유저 정보 불러오기 에러', error);
  }
};

//파이어베이스에서 게시글 리스트 불러오기
export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return posts;
  } catch (error) {
    console.error('게시글 리스트 불러오기 에러', error);
  }
};

//파이어베이스에서 게시글에 등록된 카페 리스트 불러오기
export const getPlaces = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'places'));
    const places = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return places;
  } catch (error) {
    console.error('카페 리스트 불러오기 에러', error);
  }
};
