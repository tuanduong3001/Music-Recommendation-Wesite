import { useEffect } from "react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { getAccessToken } from "../helpers/localStorage";
import { setAllCategory, setCategory } from "../reducers/category";
import { setAllUser, setUserFilter } from "../reducers/users";
import { useAppSelector } from "../stores/hook";
import { setAllMusic, setMusic } from "../reducers/music";

export const useMusic = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.reset.reset)
    const {
        data: music,
        error: musicError,
        mutate: reloadmusic
    } = useSWR(
       ((location.pathname === "/musics" ) && getAccessToken()) ? 
       [search === null ? 'musics?page=1&limit=100' :`musics/?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const getMusic = async ()=>{
            const newmusic = await reloadmusic();
         if(music){  
            if(!search){
                dispatch(setAllMusic(newmusic.data))
            }
     
             dispatch(setMusic(newmusic.data))
         }
       
    
        }
        getMusic();
     },[search, music, reset])
}