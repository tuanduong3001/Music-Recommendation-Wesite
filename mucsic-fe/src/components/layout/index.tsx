import  React, {useCallback, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import SongPlayer from '../common/SongPlayer';
import { setDisplayList, setId, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';
import axios from 'axios';
import { useMusic } from '../../hooks/useMusic';
import { YoutubeSearchedFor } from '@mui/icons-material';
import ChangePassword from '../ChangePassword';

interface Props {
  name?: string;
    children: React.ReactChild; 
  }
const getRecommentSong = async (id:number) => {
  const listSongs = await axios.post(`${process.env.REACT_APP_RECOMMEND_URL}/recommend`, {
    id_music: id,
    num_music: 5,
  });
  const newSongs = await Promise.all(
    listSongs.data.map(async (songId: number) => {
      const song = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics/${songId}`);
      return song.data;
    }),
  );
  return newSongs;
};
const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const idx = useAppSelector((state:any) => state.music.Id)
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuth);
  const music = useAppSelector((state:any) => state.music.music)
  const recommendSong = useAppSelector((state:any) => state.music.recommentSongs) || JSON.parse(localStorage.getItem("recommendSong")!)
  const [randomSong, setRandomSong] = useState<boolean>(false);
  useEffect(()=>{ 
    if(localStorage.getItem("playList")){
      dispatch(setDisplayList(JSON.parse(localStorage.getItem("playList")!)))
    }
    if(localStorage.getItem("song")){
        dispatch(setMusic(JSON.parse(localStorage.getItem("song")!)))
      }
    if(localStorage.getItem("recommendSong")){
        dispatch(setRecommentMusic(JSON.parse(localStorage.getItem("recommendSong")!)))
      }
      if(localStorage.getItem("idx")){
        dispatch(setId(localStorage.getItem("idx")))
      }
  },[])
  useAuthenticated();
  useMusic()
  const changeNextSong = useCallback((changeInx=true) => {
    if (recommendSong && recommendSong.length > 0) {
      const recommendSongs = JSON.parse(localStorage.getItem("recommendSong")!);
          dispatch(setMusic(recommendSong[0]));
           dispatch(setPlaying(true))
      recommendSongs.shift()
      localStorage.setItem("recommendSong", JSON.stringify(recommendSongs));
      dispatch(setRecommentMusic(recommendSongs))
      
    }
    else{
      dispatch(setDisplayList(false))
      dispatch(setMusic(null));
    }
  }, [music]);

  const changePrevSong = useCallback(() => {
    if (recommendSong && recommendSong.length > 0) {
      const recommendSongs = JSON.parse(localStorage.getItem("recommendSong")!);
      dispatch(setPlaying(true))
      dispatch(setMusic(recommendSongs[recommendSongs.length - 1]));
      recommendSongs.splice(-1)
      localStorage.setItem("recommendSong", JSON.stringify(recommendSongs));
      dispatch(setRecommentMusic(recommendSongs))
    }
    else{
      dispatch(setDisplayList(false))
      dispatch(setMusic(null));
    }
  }, [music]);

  // const changeSong = useCallback((song: any) => {
  //   setSong(song);
  //   dispatch(setMusic(song));
  //   setTimeout(() => {
  //     const li = document.getElementById('song-active');
  //     li?.scrollIntoView();
  //   }, 500);
  // }, []);
  const handleRandom = useCallback((changeInx=true)=>{
    if(recommendSong && recommendSong.length > 0){
      const recommendSongs = JSON.parse(localStorage.getItem("recommendSong")!);
      const random = Math.floor(Math.random() * recommendSongs.length);
      dispatch(setMusic(recommendSongs[random]));
       dispatch(setPlaying(true))
      localStorage.setItem("recommendSong", JSON.stringify(recommendSongs.filter((item:any, index:number) => index !== random)));
      dispatch(setRecommentMusic(recommendSongs.filter((item:any, index:number) => index !== random)))
     }
  },[randomSong])

  const handleRandomSong = useCallback(() => {
    if(document.getElementsByClassName("random-active").length === 0){
        setRandomSong(true);
    }
    else {
      setRandomSong(false)}
  }, [randomSong]);
  const renderLayout = () => {
    if (location.pathname === '/login' || location.pathname === '/signUp') {
      return isAuthenticated !== null && !isAuthenticated ? <>{children}</> : <div>Loading...</div>;
    } else {
      return isAuthenticated !== null && isAuthenticated ? (
        <>
          {children} 
         {(music ) &&  <SongPlayer
          changePrevSong={changePrevSong}
          handleRandomSong={handleRandomSong}
          music1={music||JSON.parse(localStorage.getItem("song")!)}
          handleRandom = {handleRandom}
          randomSong={randomSong}
          changeNextSong={changeNextSong}
        />}
        </>
      ) : (
        <>
          {children}
          {(music )  &&  <SongPlayer
          changePrevSong={changePrevSong}
          handleRandomSong={handleRandomSong}
          music1={music||JSON.parse(localStorage.getItem("song")!)}
          handleRandom = {handleRandom}
          randomSong={randomSong}
          changeNextSong={changeNextSong}
        />}

        </>
      );
    }
  };
  return (
    <div style={{ position: 'relative',height: "100%" }}>
      <div style={{height: "100%", position: 'relative'}}>
        {renderLayout()}
      </div>
    </div>
  );
};

export default Layout;
