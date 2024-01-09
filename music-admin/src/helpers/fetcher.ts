import { axiosInstance } from '../apis/index';
import { removeAccessToken, removeRefreshToken } from './localStorage';
export const fetcher = (url: any) => {
    if (url[0]) {
      return axiosInstance
        .get(url[0], {
          headers: { Authorization: 'Bearer ' + url[1] },
        })
        .then((res) => {    
          return res.data
        }).catch(()=>{
          removeAccessToken();
          removeRefreshToken();
        });;
    }
  };
  export const fetcherWithMethodPost = (url: string, data: any, token: string) => {

    if (url) {
      return axiosInstance
        .post(url, data, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then((res) => res);
    }
  };
  