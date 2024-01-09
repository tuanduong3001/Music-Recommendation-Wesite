import { axiosInstance } from './index';
import axios from 'axios';
export const getUserProfile = async () => {
  const { data } = await axiosInstance.get('/user');
  return data.data;
};
export const refreshAccessToken = async (token: string) => {
  const { data } = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/refresh-token', {
    refreshToken: token,
  });
  
  return data;
};
export const ExecLogin = async (
  email: string,
  password: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {

  const { data } = await axiosInstance.post('admin/auth/login', {
    email,
    password,
  });
  
  return data;
};
