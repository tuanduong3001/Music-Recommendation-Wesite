import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../css/recommendSong.css';
const RecommendSong = ({ id, changeSong }: any) => {
  const [songs, setSongs] = useState<any>(null);
  const getRecommentSongs = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + '/musics');
      setSongs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecommentSongs(); 
  }, []);
  return (
    <>
      <div className="recommend-list-songs">
        <ul className="recommend-list" id='list'>
          {songs &&
            songs.map((song: any, index: number) => {
              return (
                <li className="recommend-item" id={id === song.id ? "song-active" : ""} key={index}>
                  <div className="recommend-item-info">
                    {id === song.id ? <span className="numberit">...</span>: <span>{index + 1}.</span> }
                    <span className="recommend-item-name" onClick={() => changeSong(song)}>
                      {' '}
                      {song.name}
                    </span>
                    <span> - </span>
                    <span className="recommend-item-artist-name"> 
                    {song.artist.map((item:any, index:number)=> {
                        if(index !== song.artist.length - 1){
                         return  item.name + ", "
                        }
                        else  return  item.name
                       })}
                    </span>
                  </div>
                  <div className="recommend-item-actions">
                    {id === song.id ? (
                     <svg
                     role="img"
                     height="16"
                     width="16"
                     aria-hidden="true"
                     fill="currentcolor"
                     viewBox="0 0 16 16"
                     data-encore-id="icon"
                     className="Svg-sc-ytk21e-0 gQUQL"
                   >
                     <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                   </svg>
                    ) : (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        fill="currentcolor"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="Svg-sc-ytk21e-0 gQUQL"
                        onClick={() => changeSong(song)}
                      >
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>
                    )}
                    <svg
                      role="img"
                      height="16"
                      fill="currentcolor"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                      className="Svg-sc-ytk21e-0 gQUQL"
                    >
                      <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                    </svg>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default RecommendSong;
