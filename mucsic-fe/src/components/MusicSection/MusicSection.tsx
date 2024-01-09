import React, { useEffect, useState } from 'react';
import { MusicList } from './MusicList';
import 'react-loading-skeleton/dist/skeleton.css'
import {
  MainWrap,
  MusicWrap,
  MusicSectionWrap,
  MusicTitleWrap,
  MusicTitle,
  MusicLinkShowAll,
  MusicListWrap,
  MusicItemWrap,
  MusicItem,
  MusicItemImageWrap,
  MusicItemImage,
  MusicInfoWrap,
  MusicInfoTitle,
} from '../../styled/MusicSection';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import {  setDisplayList, setId, setList, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LikeMusic } from '../../apis/music';
import { getAccessToken } from '../../helpders/localStorage';
interface MusicSection {
  title: string;
}
const MusicSection = ({ title }: MusicSection) => {
  const [listMusic, setListMusic] = useState<any[]>([]); 
  const [name, setName] = useState<string | null>(null) 
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  const allMusic = useAppSelector((state:any) => state.music.allMusic)
  const isAuth = useAppSelector((state:any) => state.auth.isAuth)
 
  const getList = async () => {
    switch (title) {
      case 'Bài hát mới': {
        const listSongs = await axios.get(process.env.REACT_APP_API_BASE_URL + '/musics/home/new-songs');
        setName("new-songs");
        setListMusic(listSongs.data);
        break;
      }
      case 'Bài hát thịnh hành': {
        const listSongs = await axios.get(process.env.REACT_APP_API_BASE_URL + '/musics/home/popular-songs');
        setName("popular-songs");
        setListMusic(listSongs.data);
        break;
      }
      case 'Xu hướng': {
        const listSongs = await axios.get(process.env.REACT_APP_API_BASE_URL + '/musics/home/trending-songs');
        setName("trending-songs");
        setListMusic(listSongs.data);
        break;
      }


      default:
        break;
    }
  };
  useEffect(() => {
    setTimeout(()=>{
      getList();
    },1000)
  }, []);
  
  return (
    <MainWrap>
      <MusicWrap>
        <MusicSectionWrap component={'section'}> 
          <MusicTitleWrap>
            <MusicTitle>
             {listMusic.length > 0 ? 
             <h2>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
                  {title}
                </Link>
              </h2>:  <Skeleton count={1} duration={5} width={150} height={50}/>}
            </MusicTitle>
            <Link to={`/musics/${name}`} style={{ textDecoration: 'none' }}>
              <MusicLinkShowAll component={'span'} >Xem thêm</MusicLinkShowAll>
            </Link>
          </MusicTitleWrap>
          <MusicListWrap>
            {listMusic.length > 0 ?
              listMusic.map((song: any) => {
                return ( 
                  <MusicItemWrap className='music_card' key={song.id} 
                  onClick={async ()=>{ 

                  const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics?page=1&limit=10&categoryId=${song.category.id}`)
                  const recommendSong = res.data.data.filter((music:any) => music.id !== song.id)
                  localStorage.setItem("recommendSong", JSON.stringify(recommendSong));
                  const index = JSON.parse(localStorage.getItem("recommendSong")!).findIndex((item:any) => item.id === song.id)
                  dispatch(setId(index))
                  dispatch(setMusic(song)) 
                  dispatch(setPlaying(true))
                  dispatch(setRecommentMusic(recommendSong))
                  dispatch(setDisplayList(false))
                  // localStorage.setItem("currentSong", listSongs);
                  navigate(`/music/${song.id}`)
                  }}
                  >
                    <MusicItem>
                      <MusicItemImageWrap>
                        <MusicItemImage className='image-wrap'>
                         { song.image &&  
                         <img
                            src={`${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${song.image}`}
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              left: '0',
                              top: '0',
                              borderRadius: '12px',
                              objectFit: 'cover'
                            }}
                            alt={song.name}
                            className='image-card'
                          /> 
                      
                        }

 
                          <div className="action-image">

                            <FavoriteBorderIcon 
                            titleAccess='Thêm vào danh sách yêu thích'
                            className='action-image-svg'
                            onClick={(e) => {
                              e.stopPropagation();
                              if(isAuth && getAccessToken()){
                                LikeMusic(song.id)
                                alert("Đã thêm vào danh sách yêu thích")

                              }
                              else{
                                alert("Hãy đăng nhập ")
                              }
                            }}
                            />

                            <PlayArrowIcon titleAccess='Nghe chi tiết'
                                    style={{margin: '0 15px'}}

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
                                      dispatch(setRecommentMusic(listMusic))
                                      localStorage.setItem("recommendSong", JSON.stringify(listMusic));
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
                          <MusicInfoTitle component={'span'}> {song.artist.map((item:any, index:number)=> {
                        if(index !== song.artist.length - 1){
                         return  item.name + ", "
                        }
                        else  return  item.name
                       })}</MusicInfoTitle>
                        </Link>
                      </MusicInfoWrap>
                    </MusicItem>
                  </MusicItemWrap>
                );
              }
              ):   
              [0,1,2,3,4,5,6,7,8,9].map((item:any) => {
                return (
                  <MusicItemWrap key={item} >
                     <MusicItem>
                       <MusicItemImageWrap>
                         <MusicItemImage className='image-wrap'>
                            <Skeleton count={1} duration={5}  style={{background: "#fff"}}/>
                         </MusicItemImage>
                       </MusicItemImageWrap>
                       <MusicInfoWrap>
                         <Link to={'/'} style={{ textDecoration: 'none' }}>
                           <MusicInfoTitle component={'span'} style={{ color: '#fff', fontSize: '22px' }}>
                           <Skeleton count={1} duration={5}/>
                           </MusicInfoTitle>
                         </Link>
                         <Link to={'/'} style={{ textDecoration: 'none', marginTop: '10px' }}>
                           <MusicInfoTitle component={'span'}>
                           <Skeleton count={1} duration={5}/>
                           </MusicInfoTitle>
                         </Link>
                       </MusicInfoWrap>
                     </MusicItem>
                   </MusicItemWrap>
                 );
                
              }
              )       
            }
          </MusicListWrap>
        </MusicSectionWrap>
      </MusicWrap>
    </MainWrap>
  );
};

export default MusicSection;
