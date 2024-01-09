
import { useEffect } from "react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { getAccessToken } from "../helpers/localStorage";
import { setAllUser, setUserFilter } from "../reducers/users";
import { useAppSelector } from "../stores/hook";

export const useUser = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.reset.reset)
    const {
        data: user,
        error: userError,
        mutate: reloadUser
    } = useSWR(
       ((location.pathname === "/users" ) && getAccessToken()) ? 
       [search === null ? 'admin/users?page=1&limit=100' :`admin/users/?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const getUser = async ()=>{
            const newUser = await reloadUser();
         if(user){  
            if(!search){
                dispatch(setAllUser(newUser.data))
            }
     
             dispatch(setUserFilter(newUser.data))
         }
       
    
        }
        getUser();
     },[search, user, reset])
}