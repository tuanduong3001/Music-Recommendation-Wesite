import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useParams } from 'react-router-dom';
import '../css/recommendSong.css';
import WrapComponents from '../components/common/WrapComponents';
import RankingComponent from '../components/ranking/ranking';
import {
  MusicInfoTitle,
  MusicInfoWrap,
  MusicItem,
  MusicItemImage,
  MusicItemImageWrap,
  MusicItemWrap,
  MusicListWrap,
} from '../styled/MusicSection';
import { setDisplayList, setMusic, setPlaying, setRecommentMusic } from '../reducers/music';
import { LikeMusic } from '../apis/music';
import { getAccessToken } from '../helpders/localStorage';
import axios from 'axios';
import { setUser } from '../reducers/auth';
const DetailMusic = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const music = useAppSelector((state: any) => state.music.music);
  const isAuth = useAppSelector((state:any) => state.auth.isAuth);
  const [data, setData] = useState([]);
  const [recommentSongs, setRecommentSongs] = useState([]);
  const user = useAppSelector((state: any) => state.auth.user);
  const getRecommendSong = async (musicId:string) =>{
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics/getSongs/recommend/${musicId}`)
      if(res){
        setData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getSong = async () =>{
    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics?page=1&limit=10&categoryId=${music.category.id}`)
      if(res){
          setRecommentSongs(res.data.data.filter((song:any) => song.id !== music.id));
      }
    } catch (error) {
      console.log(error)
    }
  }
  useMemo(()=>{
    if(music){
      getSong()
      getRecommendSong(music.id)
    }
  },[music])

  useEffect(()=>{
    if(id) getRecommendSong(id)
    getSong()
  },[])


  return (
    <WrapComponents>
      <>
        <div className="container">
          <div className="music_details">
            <div className="music_detail_left">
              <img
                src={
                  music &&
                  `${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${music.image}`
                }
                alt=""
              />
              <span className="music_details_title">{music && music.name}</span>
              <span className="music_details_date">Cập nhật: { music && music.updatedAt.split('T')[0]}</span>
              <span className="detail_artist">
                {music && music.artist.map((artist: any) => {
                  return (
                    <a key={artist.id} className="artist-name">
                      {artist.name} ,
                    </a>
                  );
                })}
              </span>
              <span className="like">{music && music.like} người yêu thích</span>
              <div className="detail-like">
              <button
                      title='danh sách yêu thích'
                        style={{
                          cursor: "pointer",
                          background: 'transparent',
                          color:
                            (user && music) && user.liked.filter((item: any) => item.id === music.id).length > 0
                              ? '#1ed760'
                              : '#fff',
                          border: '0',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user && getAccessToken()) {
                            if (user.liked.filter((item: any) => item.id === music.id).length === 0) {
                              LikeMusic(music.id);
                              dispatch(
                                setUser({ ...user, liked: user.liked.filter((item: any) => item.id !== music.id) }),
                              );
                              alert('Đã thêm vào danh sách yêu thích');
                            } else {
                              alert('Đã tồn tại nhạc trong danh sách yêu thích');
                            }
                          } else {
                            alert('Hãy đăng nhập ');
                          }
                        }}
                      >
                        <svg
                          role="img"
                          height="16"
                          width="16"
                          fill="currentcolor"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          data-encore-id="icon"
                          className="Svg-sc-ytk21e-0 gQUQL"
                        >
                          <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                        </svg>
                      </button>
              </div>
            </div>
            <div className="music_details_right">
              <RankingComponent data={recommentSongs && recommentSongs} ranking={false}/>
            </div>
          </div>
          <div className="music-recommend-song" style={{ marginTop: '40px' }}>
            <h1 style={{ margin: '20px 0' }}>Có thể bạn quan tâm</h1>
            <MusicListWrap>
              {(data.length > 0) &&
                data
                  .map((song: any) => {
                    return (
                      <MusicItemWrap key={song.id}>
                        <MusicItem>
                          <MusicItemImageWrap>
                            <MusicItemImage className="image-wrap">
                              {song.image && (
                                <img
                                  src={`${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${song.image}`}
                                  style={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    left: '0',
                                    top: '0',
                                    borderRadius: '12px',
                                  }}
                                  alt={song.name}
                                />
                              )}

                              <div className="action-image">
                                <FavoriteBorderIcon
                                  titleAccess="Them vao danh sách yêu thích"
                                  className="action-image-svg"
                                  onClick={() => {
                                    if(isAuth && getAccessToken()){
                                      LikeMusic(song.id)
                                      alert("Đã thêm vào danh sách yêu thích")
      
                                    }
                                    else{
                                      alert("Hãy đăng nhập ")
                                    }
                                  }}
                                />
                                <PlayArrowIcon
                                  titleAccess="nghe chi tiet"
                                  style={{margin: '0 15px'}}
                                  onClick={() => {
                                    let listSongs = localStorage.getItem('currentSong');
                                    if (listSongs) {
                                      const a = JSON.parse(listSongs);
                                      const check = a.filter((item: any) => song.id === item.id);
                                      if (check.length === 0) {
                                        a.push(song);
                                      }
                                      listSongs = JSON.stringify(a);
                                    } else listSongs = JSON.stringify([song]);

                                    dispatch(setMusic(song));
                                    dispatch(setPlaying(true));
                                    localStorage.setItem('currentSong', listSongs);
                                  }}
                                />
                              <AddCircleOutlineIcon 
                                 className='action-image-svg'
                            titleAccess='Thêm vào danh sách phát'
                            onClick={(e) => {
                              e.stopPropagation();
                                  let listSongs = JSON.parse(localStorage.getItem("recommendSong")!);
                                  const songs = JSON.parse(localStorage.getItem("song")!);
                                  const checkExsit = listSongs.filter((item:any)=>item.id === song.id)
                                  if(checkExsit.length === 0){
                                    if(listSongs) {
                                      listSongs.push(song)
                                    }
                                    else listSongs = [song]
                                    
                                    if(!songs){
                                      dispatch(setMusic(song)) 
                                      dispatch(setPlaying(false))
                                      dispatch(setDisplayList(true))
                                      localStorage.setItem("song", JSON.stringify(song));
                                    }
                                    else{
                                      dispatch(setRecommentMusic(listSongs))
                                      dispatch(setDisplayList(true))
                                      localStorage.setItem("recommendSong", JSON.stringify(listSongs));
                                    }

                                  }
                                  else{
                                    alert("Nhạc đã tồn tại trong danh sách phát")
                                  }

                            }}
                            
                            />
                              </div>
                            </MusicItemImage>
                          </MusicItemImageWrap>
                          <MusicInfoWrap>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                              <MusicInfoTitle component={'span'} style={{ color: '#fff', fontSize: '22px' }}>
                                {song.name}
                              </MusicInfoTitle>
                            </Link>
                            <Link to={'/'} style={{ textDecoration: 'none', marginTop: '10px' }}>
                              <MusicInfoTitle component={'span'}>
                              {song.artist.map((item:any, index:number)=> {
                        if(index !== song.artist.length - 1){
                         return  item.name + ", "
                        }
                        else  return  item.name
                       })}
                              </MusicInfoTitle>
                            </Link>
                          </MusicInfoWrap>
                        </MusicItem>
                      </MusicItemWrap>
                    );
                  })}
            </MusicListWrap>
          </div>
        </div>
      </>
    </WrapComponents>
  );
};

export default DetailMusic;
