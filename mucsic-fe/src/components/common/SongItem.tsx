import React from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { setActiveList, setId, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';

const SongItem = ({ type, song, index, id, image, title, artist }: any) => {
  const music = useAppSelector((state: any) => state.music.music);
  const idx = useAppSelector((state: any) => state.music.Id);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={type === 'played' ? 'song-audio-wrap audio-played' : 'song-audio-wrap'}
        style={type !== "history" && music && index === Number(idx) ? { background: '#9b4de0' } : {}}
      >
        <div className="song-audio-info">
          <div
            className="song-thumb"
            onClick={() => {
              if(type === "history"){
                const recommentSong = JSON.parse(localStorage.getItem("recommendSong")!);
                const check = recommentSong.findIndex((item:any) => item.id === id);
                if(check !== -1){
                  dispatch(setId(check));
                  dispatch(setMusic(song));
                  dispatch(setPlaying(true))
                }
                else{
                  // dispatch(setId(Number(localStorage.getItem("idx")) + 1));
                  dispatch(setMusic(song));
                  dispatch(setPlaying(true))
                  const recommendSongs = JSON.parse(localStorage.getItem("recommendSong")!);
                  localStorage.setItem("recommendSong", JSON.stringify(recommendSongs.filter((item:any) => item.id !== song.id)));
                  dispatch(setRecommentMusic(recommendSongs.filter((item:any) => item.id !== song.id)))

                }
              }
              else{
                dispatch(setId(index));
                dispatch(setMusic(song));
                  const recommendSongs = JSON.parse(localStorage.getItem("recommendSong")!);
                  localStorage.setItem("recommendSong", JSON.stringify(recommendSongs.filter((item:any) => item.id !== song.id)));
                  dispatch(setRecommentMusic(recommendSongs.filter((item:any) => item.id !== song.id)))
              }
              dispatch(setPlaying(true));
              dispatch(setActiveList(true));
              // localStorage.setItem("currentSong", listSongs);
            }}
          >
            <img
              src={`${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${image}`}
              alt=""
            />
            {type !== "history" && music && index === Number(idx) && (
              <span className="numberit" style={{ position: 'absolute' }}>
                ...
              </span>
            )}
          </div>
          <div className="card-info">
            <div className="title-wrapper">
              <span>{title}</span>
            </div>
            <h3 className="artist-subtitle">
              <a href="">{artist[0].name}</a>
            </h3>
          </div>
        </div>
        <div className="song-audio-action"></div>
      </div>
    </>
  );
};

export default SongItem;
