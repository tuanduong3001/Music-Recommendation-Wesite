import { useEffect } from "react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { getAccessToken } from "../helpers/localStorage";
import { setAllCategory, setCategory } from "../reducers/category";
import { setAllUser, setUserFilter } from "../reducers/users";
import { useAppSelector } from "../stores/hook";

export const useCategory = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.reset.reset)
    const {
        data: category,
        error: categoryError,
        mutate: reloadCategory
    } = useSWR(
       ((location.pathname === "/musics" || location.pathname === "/categories"  ) && getAccessToken()) ? 
       [search === null ? 'admin/categories?page=1&limit=100' :`admin/categories/?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const getCategory = async ()=>{
            const newCategory = await reloadCategory();
         if(category){  
            if(!search){
                dispatch(setAllCategory(newCategory.data))
            }
     
             dispatch(setCategory(newCategory.data))
         }
       
    
        }
        getCategory();
     },[search, category, reset])
}