import axios from 'axios';

export const getPosts = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/posts`);

  return data;
};
