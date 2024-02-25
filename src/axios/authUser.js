import { loginInstance } from './api';

export const nowUser = async () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  if (!accessToken) {
    return false;
  }
  try {
    const response = await loginInstance.get('/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = {
      userid: response.data.id,
      nickname: response.data.nickname,
      isloggedin: true,
      avatar: response.data.avatar
    };
    return user;
  } catch (error) {
    console.error('error', error);
  }
};
