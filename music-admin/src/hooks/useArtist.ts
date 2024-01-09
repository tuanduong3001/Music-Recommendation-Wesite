import { useEffect } from "react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { getAccessToken } from "../helpers/localStorage";
import { useAppSelector } from "../stores/hook";
import { setAllArtist, setArtist } from "../reducers/artist";

export const useArtist = (location:any ,dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    const reset = useAppSelector((state:any)=>state.reset.reset)
    const {
        data: artist,
        error: artistError,
        mutate: reloadArtist
    } = useSWR(
       ((location.pathname === "/musics" || location.pathname === "/artists"  ) && getAccessToken()) ? 
       [search === null ? 'artists?page=1&limit=100' :`artists/?page=1&limit=100&${type}=${search}`, getAccessToken()] : null ,fetcher)
       useEffect(()=>{
        const getArtist = async ()=>{
            const newArtist = await reloadArtist();
         if(artist){  
            if(!search){
                dispatch(setAllArtist(newArtist.data))
            }
     
             dispatch(setArtist(newArtist.data))
         }
       
    
        }
        getArtist();
     },[search, artist, reset])
}