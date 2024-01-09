import axios from "axios";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from '../helpders/localStorage'
import { refreshAccessToken } from "./auth";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers:{
        Authorization: `Bearer ${getAccessToken}`
    }
})

axiosInstance.interceptors.request.use(
   function (config){
    // console.log(getRefreshToken())
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
    },
    function (error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function (response){
       
        return response;
    },
    async function (error){
        
        const originalRequest = error.config;
        
        const isRefreshTokenErrorApi = error.config.url.includes("refresh-token");
        if(getAccessToken()){
            if(error.response.status === 401 && !originalRequest._retry && !isRefreshTokenErrorApi){               
                originalRequest._retry = true;
                const getToken = await refreshAccessToken(getRefreshToken() || '');
                axios.defaults.headers.common.Authorization = 'Bearer ' + getToken.data.accessToken;
                setAccessToken(getToken.data.accessToken);
                setRefreshToken(getToken.data.refreshToken);
                return axiosInstance(originalRequest)
            }
        }
        return Promise.reject(error)
    }
)