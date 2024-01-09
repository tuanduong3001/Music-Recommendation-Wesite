import axios from "axios";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from '../helpers/localStorage'
import { refreshAccessToken } from "./auth";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers:{
        Authorization: `Bearer ${getAccessToken}`
    }
})

axiosInstance.interceptors.request.use(
   function (config){
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
                const {accessToken, refreshToken} = await refreshAccessToken(getRefreshToken() || '');
                
                axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                return axiosInstance(originalRequest)
            }
        }
        return Promise.reject(error)
    }
)