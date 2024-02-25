import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const nowUser = (user) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userNow = {
        fullEmail: user.email,
        nickname: user.displayName,
        avatar: user.photoURL
      };
      return userNow;
    } else {
      return false;
    }
  });
};
