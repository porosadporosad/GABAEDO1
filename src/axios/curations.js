import axios from 'axios';

export const getCurations = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_JSON_SERVER_URL}/curations`);

  return data;
};
