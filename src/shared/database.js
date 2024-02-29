import { useQuery } from 'react-query';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from 'shared/firebase';

//파이어베이스에서 유저 정보 불러오기
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map((doc) => ({
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('유저 정보 불러오기 에러', error);
  }
};

// 현재유저 정보 가져오기
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }
  const getUser = {
    userId: user.email,
    nickname: user.displayName,
    avatar: user.photoURL
  };
  return getUser;
};

// 커스텀
export const useCurrentUser = () => {
  return useQuery('currentUser', getCurrentUser);
};

// 파이어스토어에서 해당 포스트 문서 삭제
export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, 'posts', postId));
  } catch (error) {
    console.error('포스트 삭제 중 오류 발생:', error);
    throw error;
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

//파이어베이스에서 북마크된 게시글 리스트 불러오기
export const getPostsForBookmarks = async (myBookmark) => {
  try {
    // myBookmark 배열을 사용하여 posts 컬렉션에서 필요한 문서를 쿼리합니다.
    const querySnapshot = await Promise.all(
      myBookmark.map(async (bookmarkId) => {
        const docRef = doc(db, 'posts', bookmarkId);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot;
      })
    );

    // 쿼리된 문서들을 가공하여 반환합니다.
    const posts = querySnapshot.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return posts;
  } catch (error) {
    console.error('게시글 리스트 불러오기 에러', error);
    return []; // 에러가 발생한 경우 빈 배열을 반환합니다.
  }
};
