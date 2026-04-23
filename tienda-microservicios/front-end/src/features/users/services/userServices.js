import axios from 'axios';

const API_URL = 'http://127.0.0.1:5001';

export const userApi = axios.create({ baseURL: API_URL });

export const getUsers = async () => {
  try {
    const response = await userApi.get('/usuarios/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData ) => {
  try {
    const response = await userApi.post('/usuarios/', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

