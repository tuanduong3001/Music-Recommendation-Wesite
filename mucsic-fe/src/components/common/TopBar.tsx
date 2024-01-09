import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Topbar,
  TopBarBtnArrow,
  TopBarWrap,
  Background,
  BackgroundTopBar,
  BtnArrow,
  TopBarBtnAuth,
  BtnAuth,
  BtnLogin,
} from '../../styled/TopBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { removeAccessToken, removeRefreshToken } from '../../helpders/localStorage';
import { setAuth, setUser } from '../../reducers/auth';
import { setDisplayList, setId, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';
import _debounce from 'lodash/debounce';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state: any) => state.music.isPlaying);

  const user = useAppSelector((state: any) => state.auth.user);
  const music = useAppSelector((state: any) => state.music.music);
  const [listDown, setListDown] = useState(false);
  const [searchList, setSearchList] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const listRef = useRef<any>(null);
  const getSearch = async (value: string) => {
    try {
      if (value.trim() === '') {
        setData([]);
      } else {
        const data = await axios.get(
          process.env.REACT_APP_API_BASE_URL + `/musics?page=1&limit=5&search=${value.trim()}`,
        );
        setData(data.data.data);
      }
    } catch (error) {}
  };
  const debounceFn = useCallback(_debounce(getSearch, 1000), [search]);
  const closeOpenMenus = (e: any) => {
    if (listRef.current && searchList && !listRef.current.contains(e.target)) {
      setSearchList(false);
    }
  };
  document.addEventListener('mousedown', closeOpenMenus);
  return (
    <Topbar id="topbar">
      <TopBarWrap component={'header'} id="header">
        <BackgroundTopBar style={{ opacity: 1 }}>
          <Background />
        </BackgroundTopBar>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "40px"
        }}>
        <TopBarBtnArrow>
          <BtnArrow component={'button'} aria-label="Go back" onClick={() => navigate(-2)}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              fill="currentcolor"
              className="Svg-sc-ytk21e-0 lmlFMn IYDlXmBmmUKHveMzIPCF"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
            </svg>
          </BtnArrow>
          <BtnArrow component={'button'} aria-label="Go forward" onClick={() => navigate(2)}>
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              fill="currentcolor"
              className="Svg-sc-ytk21e-0 lmlFMn IYDlXmBmmUKHveMzIPCF"
              viewBox="0 0 16 16"
              data-encore-id="icon"
            >
              <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
            </svg>
          </BtnArrow>
        </TopBarBtnArrow>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid transparent',
            background: '#3F3F3F',
            borderRadius: '15px',
            padding: '8px 15px',
            position: 'relative',
          }}
          ref={listRef}
        >
          <SearchIcon
            style={{
              position: 'absolute',
              left: '10px',
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => {if(search) navigate(`/search/${search}`)}}
          />
          <input
            type="text"
            style={{
              border: 'none',
              outline: 'none',
              width: '350px',
              background: 'transparent',
              paddingLeft: '25px',
              color: '#fff',
            }}
            value={search}
            onClick={() => setSearchList(true)}
            onKeyDown={(e) => {
              var code = e.keyCode ? e.keyCode : e.which;
              if (code === 13 && search) {
                //Enter keycode
                navigate(`/search/${search}`);
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              debounceFn(e.target.value);
            }}
            placeholder="Tìm kiếm bài hát ..."
          />
          {searchList && (
            <div className="downlist">
              <h3>Gợi ý kết quả</h3>
              <ul className="search-list">
                {data.length > 0 &&
                  data.map((song: any) => {
                    return (
                      <li className="search-item" key={song.id}>
                        <a
                          onClick={() => {
                            localStorage.setItem('recommendSong', JSON.stringify(data));
                            const index = JSON.parse(localStorage.getItem('recommendSong')!).findIndex(
                              (item: any) => item.id === song.id,
                            );
                            dispatch(setId(index));
                            dispatch(setMusic(song));
                            dispatch(setPlaying(true));
                            dispatch(setRecommentMusic(data));
                            dispatch(setDisplayList(false));
                            navigate(`/music/${song.id}`);
                          }}
                        >
                          <img
                            src={
                              song &&
                              `${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${song.image}`
                            }
                            alt=""
                          />
                          <div className="search-info">
                            <div className="search-item-name">{song.name}</div>
                            <div className="search-item-artist">
                              {' '}
                              {song.artist.map((item: any, index: number) => {
                                if (index !== song.artist.length - 1) {
                                  return item.name + ', ';
                                } else return item.name;
                              })}
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
        </div>

        <TopBarBtnAuth>
          {user ? (
            <>
              <BtnAuth
                component={'button'}
                style={{ padding: '0', position: 'relative' }}
                onClick={() => setListDown(!listDown)}
              >
                <BtnLogin component={'span'} style={{ gap: '8px' }}>
                  <img src={user.avatar} alt={user.name} width={45} height={45} />
                  {user.name}
                  {!listDown ? (
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      className="Svg-sc-ytk21e-0 gQUQL eAXFT6yvz37fvS1lmt6k"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                    >
                      <path d="m14 6-6 6-6-6h12z"></path>
                    </svg>
                  ) : (
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      className="Svg-sc-ytk21e-0 gQUQL eAXFT6yvz37fvS1lmt6k"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                    >
                      <path d="M14 10 8 4l-6 6h12z"></path>
                    </svg>
                  )}
                </BtnLogin>
                {listDown && (
                  <div
                    className="scrollDownList"
                    style={{
                      backgroundColor: '#fff',
                      minWidth: '192px',
                      width: '192px',
                      position: 'absolute',
                      bottom: '-100px',
                      right: 0,
                    }}
                  >
                    <ul>
                      <li
                        className="listDown"
                        style={{
                          listStyle: 'none',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Link to="/my_profile" style={{ textDecoration: 'none' }}>
                          Tài khoản
                        </Link>
                      </li>
                      <li
                        className="listDown"
                        style={{
                          listStyle: 'none',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Link
                          to="/"
                          style={{ textDecoration: 'none' }}
                          onClick={() => {
                            dispatch(setUser(null));
                            dispatch(setAuth(false));
                            removeAccessToken();
                            removeRefreshToken();
                          }}
                        >
                          Thoát
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </BtnAuth>
            </>
          ) : (
            <>
              <BtnAuth component={'button'} onClick={() => navigate('/signUp')}>
                Đăng ký
              </BtnAuth>
              <BtnAuth component={'button'} style={{ padding: '0' }} onClick={() => navigate('/login')}>
                <BtnLogin component={'span'}>Đăng nhập</BtnLogin>
              </BtnAuth>
            </>
          )}
        </TopBarBtnAuth>
      </TopBarWrap>
    </Topbar>
  );
};

export default TopBar;
