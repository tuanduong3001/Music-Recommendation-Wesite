import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hook";
import SongItem from "./SongItem";
import { setList, setMusic, setRecommentMusic } from "../../reducers/music";

const ListSong = () =>{
    const musicsRecomment = useAppSelector((state:any) => state.music.recommentSongs)
    const musics = useAppSelector((state:any) => state.music.list)
    const music = useAppSelector((state: any) => state.music.music)
    const id = useAppSelector((state:any) => state.music.Id)
    const [displayRecommend, setDisplayRecommend] = useState<any>(null);
    const [getMusic, setGetMusic] = useState<any>(null)
    const dispatch = useAppDispatch()
 
    useMemo(()=>{
        if(!musics){
            dispatch(setList(JSON.parse(localStorage.getItem("currentSong")!)))
        }
        else{
            const songNow = JSON.parse(localStorage.getItem("song")!);
            if(songNow){
            // const remainSongs = musicsRecomment.slice(0, Number(id)+1)
                if(musicsRecomment){
                    setDisplayRecommend(musicsRecomment)
                    dispatch(setRecommentMusic(musicsRecomment))
                }
                // localStorage.setItem("currentSong", JSON.stringify(remainSongs))
            }
            // setGetMusic(remainSongs)
        }
    },[music, musicsRecomment])

    // useEffect(()=>{
    //     if(musicsRecomment){    
    //         if(id === -1){
    //             setDisplayRecommend(musicsRecomment)
    //         }
    //         else{
    //             const filterArr = musicsRecomment.slice(Number(id)+1)
    //             setDisplayRecommend(filterArr)
    //         }
    //         // localStorage.setItem("recommendSong", JSON.stringify(musicsRecomment));
    //     }
    // },[musicsRecomment])
    return (
        <>
        {displayRecommend && 
         displayRecommend.map((song:any, index:number) =>{
            return <SongItem type="playlist" index={ getMusic && index + getMusic.length} key={index}  song={song} image={song.image} title={song.name} artist={song.artist}/>
         }
        
        )
        }
        
    
        </>
    )
}

export default ListSong;