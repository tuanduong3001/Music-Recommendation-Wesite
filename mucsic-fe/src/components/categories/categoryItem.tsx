import React, { useEffect, useRef, useState } from 'react';
import { MainWrap } from '../../styled/CategorySection';
import { MusicList } from '../MusicSection/MusicList';
import { axiosInstance } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import moment from 'moment';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { setDisplayList, setId, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';
import { getAccessToken } from '../../helpders/localStorage';
import { LikeMusic } from '../../apis/music';
import { setUser } from '../../reducers/auth';
const CategoryItemComponent = () => {
  const [categoryItem, setCategoryItem] = useState<any>(null);
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.auth.user);

  const dispatch = useAppDispatch();
  const getData = async () => {
    try {
      const getCategorySongs = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/musics?page=${currentPage}&limit=10&categoryId=${id}`,
      );
      const getCategories = await axios.get(process.env.REACT_APP_API_BASE_URL + `/categories/${id}`);
      setCategory(getCategories.data.name);
      console.log(getCategorySongs);
      setCategoryItem(getCategorySongs.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [currentPage]);
  const handlePageClick = (event: any) => {
    setCurrentPage(Number(event.selected) + 1);
  };
  return (
    <MainWrap>
      <div style={{ width: '100%', padding: '30px' }}>
        <div className="categories-title" style={{ marginBottom: '20px', color: '#fff', fontSize: '24px' }}>
          {category && category}
        </div>
        <div style={{ padding: '0 32px' }}>
          <div
            className="column-title"
            style={{
              position: 'sticky',
              zIndex: 2,
              height: '36px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                gridTemplateColumns: '[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)',
                display: 'grid',
                height: '36px',
                gridGap: '16px',
                borderBottom: '1px solid hsla(0,0%,100%,.1)',
                color: '#b3b3b3',
              }}
            >
              <div>#</div>
              <div>
                <span>Tiêu đề</span>
              </div>
              <div>
                <span>Lượt xem</span>
              </div>
              <div>
                <span>Ngày tạo</span>
              </div>
              <div>
                <span>Thao tác</span>
              </div>
            </div>
          </div>
          <div className="rows">
            {categoryItem &&
              categoryItem.data.map((song: any, index: number) => {
                return (
                  <div
                    className="row-item"
                    key={song.id}
                    style={{
                      gridTemplateColumns: '[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)',
                      display: 'grid',
                      height: '56px',
                      position: 'relative',
                      gridGap: '16px',
                    }}
                    onClick={async () => {
                      console.log('a');
                      // let listSongs = localStorage.getItem("currentSong");
                      // if (listSongs) {
                      //     const a = JSON.parse(listSongs);
                      //     const check = a.filter((item: any) => song.id === item.id)
                      //     if (check.length === 0) {
                      //         a.push(song)
                      //     }
                      //     listSongs = JSON.stringify(a);
                      // }
                      // else listSongs = JSON.stringify([song])
                      // localStorage.setItem("currentSong", listSongs);
                      localStorage.setItem(
                        'recommendSong',
                        JSON.stringify(categoryItem.data.filter((item: any) => item.id !== song.id)),
                      );
                      const index = JSON.parse(localStorage.getItem('recommendSong')!).findIndex(
                        (item: any) => item.id === song.id,
                      );
                      dispatch(setId(index));
                      dispatch(setMusic(song));
                      dispatch(setPlaying(true));
                      dispatch(setRecommentMusic(categoryItem.data.filter((item: any) => item.id !== song.id)));
                      dispatch(setDisplayList(false));
                      navigate(`/music/${song.id}`);
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {Number(index + 1)}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        className="image"
                        style={{
                          marginRight: '10px',
                        }}
                        onClick={async () => {
                          dispatch(setMusic(song));
                          localStorage.setItem('currentSong', JSON.stringify(song));
                          // const listSongs = await axios.post(`${process.env.REACT_APP_RECOMMEND_URL}/recommend`, {
                          //   id_music: song.id,
                          //   num_music: 5
                          // });
                          // const newSongs = await Promise.all(
                          //   listSongs.data.map(async (songId:number) => {
                          //     const song = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics/${songId}`);
                          //     return song.data;
                          //   })
                          // )
                          // dispatch(setRecommentMusic(newSongs))
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${song.image}`}
                          style={{ width: '40px' }}
                        />
                      </div>
                      <div className="title">
                        <div className="name" style={{ color: '#fff', fontSize: '1rem' }}>
                          {song.name}
                        </div>
                        <div className="artist" style={{ fontSize: '.85rem' }}>
                          {song.artist.map((item: any, index: number) => {
                            if (index !== song.artist.length - 1) {
                              return item.name + ', ';
                            } else return item.name;
                          })}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {song.view}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {moment(song.createdAt.split('T')[0], 'YYYYMMDD').fromNow()}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <button
                        style={{
                          background: 'transparent',
                          cursor: 'pointer',
                          color:
                            user && user.liked.filter((item: any) => item.id === song.id).length > 0
                              ? '#1ed760'
                              : '#fff',
                          border: '0',
                        }}
                        title="danh sách yêu thích"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user && getAccessToken()) {
                            if (user.liked.filter((item: any) => item.id === song.id).length === 0) {
                              LikeMusic(song.id);
                              dispatch(
                                setUser({ ...user, liked: user.liked.filter((item: any) => item.id !== song.id) }),
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
                      <PlayArrowIcon
                        titleAccess="Nghe chi tiết"
                        style={{ margin: '0 15px' }}

                        // onClick={() => {
                        //           let listSongs = localStorage.getItem("currentSong");
                        //           if(listSongs) {
                        //           const a = JSON.parse(listSongs);
                        //           const check = a.filter((item:any) => song.id === item.id)
                        //           if(check.length === 0) {
                        //             a.push(song)
                        //           }
                        //           listSongs = JSON.stringify(a);
                        //         }
                        //         else listSongs = JSON.stringify([song])

                        //         dispatch(setMusic(song))
                        //         dispatch(setPlaying(true))
                        //         // dispatch(setRecommentMusic(listMusic))
                        //         dispatch(setDisplayList(false))
                        //         localStorage.setItem("currentSong", listSongs);
                        //         // localStorage.setItem("recommendSong", JSON.stringify(listMusic));
                        //         navigate(`/music/${song.id}`)
                        // }}
                      />
                      <AddCircleOutlineIcon
                        className="action-image-svg"
                        titleAccess="Thêm vào danh sách phát"
                        onClick={(e) => {
                          e.stopPropagation();
                          let listSongs = JSON.parse(localStorage.getItem('recommendSong')!);
                          const songs = JSON.parse(localStorage.getItem('song')!);
                          const checkExsit = listSongs.filter((item: any) => item.id === song.id);
                          if (checkExsit.length === 0) {
                            if (listSongs) {
                              listSongs.push(song);
                            } else listSongs = [song];

                            if (!songs) {
                              dispatch(setMusic(song));
                              dispatch(setPlaying(false));
                              dispatch(setDisplayList(true));
                              // dispatch(setRecommentMusic(listMusic))
                              // localStorage.setItem("recommendSong", JSON.stringify(listMusic));
                              localStorage.setItem('song', JSON.stringify(song));
                            } else {
                              dispatch(setRecommentMusic(listSongs));
                              dispatch(setDisplayList(true));
                              localStorage.setItem('recommendSong', JSON.stringify(listSongs));
                            }
                          } else {
                            alert('Nhạc đã tồn tại trong danh sách phát');
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={categoryItem && categoryItem.totalPage}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className="paginate"
      />
    </MainWrap>
  );
};

export default CategoryItemComponent;
