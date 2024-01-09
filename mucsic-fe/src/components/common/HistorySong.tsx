import React from "react";
import { useAppSelector } from "../../stores/hook";
import SongItem from "./SongItem";

const HistorySong = () =>{
    const userHistory = useAppSelector((state:any) => state.auth.user)
    return (
        <>
        {userHistory ?
         userHistory.history.map((song:any,index:number) =>{
            return <SongItem type="history" key={index} index={index} song={song} id={song.id} image={song.image} title={song.name} artist={song.artist}/>
         }
        
        )
        : <span>Hay dang nhap</span>
        }          
        </>
    )
}

export default HistorySong;