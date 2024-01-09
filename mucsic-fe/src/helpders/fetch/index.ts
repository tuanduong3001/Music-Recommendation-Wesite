import { axiosInstance } from "../../apis";
import { removeAccessToken, removeRefreshToken } from "../localStorage";


export const fetcherUser = (url:any) => {

    if (url[1]) {
      return axiosInstance
        .get(process.env.REACT_APP_API_BASE_URL + url[0] , {
          headers: { Authorization: 'Bearer ' + url[1] }
        })
        .then((res) => {
          return res.data;
        }).catch(()=>{
          removeAccessToken();
          removeRefreshToken();
        });
    }
  };