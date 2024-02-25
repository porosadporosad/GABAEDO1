import { collection, getDocs, addDoc } from 'firebase/firestore';
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

//회원가입, 로그인은 따로

//파이어베이스에 게시글 리스트 추가 가져다쓰기
export const addPosts = async () => {
  const newPost = {
    postId: crypto.randomUUID(),
    userId: '',
    nickname: '',
    createdAt: new Date().toISOString(),
    title: '',
    content: '',
    hashtag: []
  };
  try {
    const docRef = await addDoc(collection(db, 'posts'), newPost);

    return docRef.id;
  } catch (error) {
    console.error('게시글 추가하기 에러', error);
    throw error;
  }
};

// 파이어베이스에 장소 리스트 추가 가져다쓰기
export const addPlace = async () => {
  const newPlace = {
    postId: crypto.randomUUID(),
    placeId: '',
    lat: '',
    lng: '',
    placeComment: ''
  };
  try {
    const docRef = await addDoc(collection(db, 'places'), newPlace);

    console.log('add Place: ', docRef.id);

    return docRef.id;
  } catch (error) {
    console.error('게시글 추가하기 에러', error);
    throw error;
  }
};
