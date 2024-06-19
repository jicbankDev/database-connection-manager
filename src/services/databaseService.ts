import axios from 'axios';

const API_URL = 'http://localhost:4000/databases';

export const getDatabases = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addDatabase = async (database: any) => {
  const response = await axios.post(API_URL, database);
  return response.data;
};
