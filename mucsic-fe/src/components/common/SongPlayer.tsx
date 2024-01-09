import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';
import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { useDispatch } from 'react-redux';
import { setDisplayList, setId, setList, setMusic, setPlaying, setRecommentMusic } from '../../reducers/music';
import { getAccessToken } from '../../helpders/localStorage';
import { LikeMusic } from '../../apis/music';
const MainWrap = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '90px',
  backgroundColor: '#130c1c',
  position: 'fixed',
  bottom: 0,
  zIndex: '100',
  padding: '0 20px',
  borderTop: '1px solid hsla(0,0%,100%,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
const PlayerControlLeft = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '30%',
  position: 'relative',
}));
const PlayerControlCenter = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  maxWidth: '40%',
}));
const PlayerControlRight = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '30%',
  position: 'relative',
}));
const SongPlayer = ({ handleRandom, changePrevSong, music1, handleRandomSong, randomSong, changeNextSong }: any) => {
  const [musics, setMusics] = useState<any>(null);
  const [run, setRun] = useState(false);
  const [time, setTime] = useState(0);
  const [volumn, setVolumn] = useState<number>(40);
  const [play, setPlay] = useState(false);
  const [off, setOff] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const myInterval = useRef<any>();
  const dispatch = useAppDispatch();
  const idx = useAppSelector((state: any) => state.music.Id);
  const timerProcess = document.getElementById('timer') as HTMLElement;
  const playing = useAppSelector((state: any) => state.music.isPlaying);
  const isAuth = useAppSelector((state: any) => state.auth.isAuth);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const updateHistoryView = async (id: number) => {
    try {
      await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/users/update-history',
        {
          musicId: id,
        },
        {
          headers: { Authorization: 'Bearer ' + getAccessToken() },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timerProcess = document.getElementById('timer') as HTMLElement;
    if (music1 && playing) {
      localStorage.setItem('idx', idx);
      // const indexCurrent = JSON.parse(localStorage.getItem("currentSong")!).map((item:any, index:number) => ({...item, index}))
      localStorage.setItem('song', JSON.stringify(music1));
      setMusics(music1);
      updateHistoryView(music1.id);
      setTime(0);
      dispatch(setMusic(music1));
      audioRef.current = document.getElementById('audio') as HTMLAudioElement;
      timerProcess.style.transform = `translateX(-100%)`;
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.autoplay = true;
        audioRef.current.currentTime = 0;
        myInterval.current = setInterval(() => {
          setTime((prevTime) => {
            let timeLine = 0;
            if (audioRef.current) {
              // console.log(audioRef.current.currentTime)
              timeLine = ((prevTime + 1) / Number(audioRef.current?.duration)) * 100;
              if (prevTime + 1 >= Math.floor(Number(audioRef.current?.duration))) {
              
                if (randomSong) handleRandom(false);
                else changeNextSong(false);
              }
            }
            const calc = -100 + timeLine;
            timerProcess.style.transform = `translateX(${calc}%)`;
            return prevTime + 1;
          });
        }, 1000);
        setPlay(true);
      }
    } else {
      setMusics(music1);
      setTime(0);
      audioRef.current = document.getElementById('audio') as HTMLAudioElement;
      timerProcess.style.transform = `translateX(-100%)`;
      audioRef.current.autoplay = false;
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      dispatch(setMusic(music1));
    }

    // if (music1) {
    //   let listSongs = localStorage.getItem('currentSong');
    //   if (listSongs) {
    //     const a = JSON.parse(listSongs);
    //     const check = a.filter((item: any) => music1.id === item.id);
    //     if (check.length === 0) {
    //       a.push(music1);
    //     }
    //     listSongs = JSON.stringify(a);
    //   } else listSongs = JSON.stringify([music1]);
    //   dispatch(setList(JSON.parse(listSongs)));

    //   localStorage.setItem('currentSong', listSongs);
    // }

    return () => clearInterval(myInterval.current);
  }, [music1]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumn / 100;
    }
  }, [volumn]);

  useEffect(() => {
    if (run) {
      handleInterval();
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
    }
  }, [run]);

  const handleInterval = () => {
    clearInterval(myInterval.current);
    dispatch(setMusic(music1));
    if(time === 0)  updateHistoryView(music1.id);
    myInterval.current = setInterval(() => {
      setTime((prevTime) => {
        const timeLine = ((prevTime + 1) / audioRef.current!.duration) * 100;
        const calc = -100 + timeLine;
        timerProcess.style.transform = `translateX(${calc}%)`;
        if (prevTime + 1 >= Math.floor(duration)) {
          if (randomSong) handleRandom(false);
          else changeNextSong(false);
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  const handleControlPlayer = () => {
    // const audio = document.querySelector('#audio')
    if (!run && audioRef.current?.currentTime !== 0) {
      (document.getElementById('audio') as HTMLAudioElement).play();
      if (time >= duration - 1) {
        setTime(0);
      }
    } else if (!run && audioRef.current?.currentTime === 0) {
      (document.getElementById('audio') as HTMLAudioElement).load();
      (document.getElementById('audio') as HTMLAudioElement).play();
    } else if (run) {
      (document.getElementById('audio') as HTMLAudioElement).pause();
    }
    setRun(!run);
    setPlay(!run);
  };

  $(document).on('click', '.process-bar', function (e) {
    // get x position in progress bar
    const timerProcess = document.getElementById('timer') as HTMLElement;

    const posX = (e.pageX - $(this).offset()!.left) as number;
    const progressWidth = $(this).outerWidth() as number;

    // create percentage from position etc
    const percentage = (posX / progressWidth) * 100;
    const calc = -100 + percentage;
    timerProcess.style!.transform = `translateX(${calc}%)`;
    setTime(Math.floor((audioRef.current?.duration as number) * (percentage / 100)));
    if (audioRef.current) {
      audioRef.current.currentTime = Math.floor((audioRef.current?.duration as number) * (percentage / 100));
    }
  });

  return (
    <MainWrap>
      <PlayerControlLeft>
        <div >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden' }}>
            <img
              src={
                musics &&
                `${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/${musics.image}`
              }
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div style={{ marginLeft: '10px' }}>
          <div>
            <div style={{ textDecoration: 'none' }} >
              {' '}
              <span style={{ color: '#fff' }}>{musics && musics.name}</span>
            </div>
          </div>
          <h3>
            {musics &&
              musics.artist.map((artist: any, index: number) => {
                return (
                  <>
                    {index === musics.artist.length - 1 ? (
                      <>
                        <a key={artist.id} style={{ textDecoration: 'none', color: 'hsla(0,0%,100%,0.5)' }}>
                          {artist.name}
                        </a>
                      </>
                    ) : (
                      <>
                        <a key={artist.id} style={{ textDecoration: 'none', color: 'hsla(0,0%,100%,0.5)' }}>
                          {artist.name}
                        </a>
                        ,
                      </>
                    )}
                  </>
                );
              })}
          </h3>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <button
            onClick={() => {
              if (isAuth && getAccessToken()) {
                LikeMusic(musics.id);
                alert('Đã thêm vào danh sách yêu thích');
              } else {
                alert('Hãy đăng nhập ');
              }
            }}
            id="likeBtn"
            style={{ marginRight: '10px', background: 'transparent', color: 'hsla(0,0%,100%,.7)', border: '0' }}
          >
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
          </button>
        </div>
      </PlayerControlLeft>

      <PlayerControlCenter>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="action"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <button
              className={randomSong ? 'random-active' : ''}
              style={{
                background: 'transparent',
                color: randomSong ? 'green' : 'hsla(0,0%,100%,.7)',
                border: 0,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              title="Random"
              onClick={() => {
                handleRandomSong();
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
                <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
                <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
              </svg>
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'hsla(0,0%,100%,.7)',
                border: 0,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              title="prev"
              onClick={() => {
                changePrevSong();
              }}
            >
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
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
              </svg>
            </button>
            <button
              style={{
                background: '#fff',
                color: '#000',
                border: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                cursor: 'pointer',
                borderRadius: '32px',
                marginRight: '20px',
                height: '32px',
              }}
              title={play ? 'stop' : 'play'}
              onClick={handleControlPlayer}
            >
              {play ? (
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
                >
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                </svg>
              )}
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'hsla(0,0%,100%,.7)',
                border: 0,
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                marginRight: '20px',
              }}
              title="next"
              onClick={() => {
                changeNextSong();
              }}
            >
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
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className="playback-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
          }}
        >
          <div className="playback-bar-process-time">{fancyTimeFormat(time)}</div>
          <div className="playback-processbar" style={{ width: '100%', margin: '0 5px' }}>
            <label
              className="label"
              style={{
                width: '1px',
                position: 'absolute',
                border: 0,
                overflow: 'hidden',
                height: '1px',
                clip: 'rect(0 0 0 0)',
              }}
            >
              <input type="range" id="process" min={0} max={duration} value={time} />
            </label>
            <div
              style={{
                height: '100%',
                overflow: 'hidden',
                width: '100%',
                touchAction: 'none',
                position: 'relative',
              }}
            >
              <div
                style={{
                  borderRadius: 'calc(4px/2)',
                  height: '4px',
                  width: '100%',
                  backgroundColor: '#5e5e5e',
                }}
              >
                <div
                  className="process-bar"
                  style={{
                    overflow: 'hidden',
                    borderRadius: 'calc(4px/2)',
                    height: '4px',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <div
                    id="timer"
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 'calc(4px/2)',
                      height: '4px',
                      width: '100%',

                      transform: `translateX(-100%)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="playback-duration">{fancyTimeFormat(Math.floor(duration))}</div>
        </div>
      </PlayerControlCenter>
      <PlayerControlRight>
        <button
          style={{
            background: 'transparent',
            color: 'hsla(0,0%,100%,.7)',
            border: 0,
            width: '32px',
            height: '32px',
            marginRight: '5px',
          }}
          onClick={() => {
            setOff(!off);
            if (audioRef.current) {
              if (off) {
                audioRef.current.volume = 1;
                setVolumn(100);
              } else {
                audioRef.current.volume = 0;
                setVolumn(0);
              }
            }
          }}
        >
          {off ? (
            <svg
              role="presentation"
              height="16"
              width="16"
              aria-hidden="true"
              aria-label="Volume off"
              fill="currentcolor"
              id="volume-icon"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              className="Svg-sc-ytk21e-0 gQUQL"
            >
              <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
              <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
            </svg>
          ) : (
            <svg
              role="presentation"
              height="16"
              width="16"
              fill="currentcolor"
              aria-hidden="true"
              aria-label="Volume high"
              id="volume-icon"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              className="Svg-sc-ytk21e-0 gQUQL"
            >
              <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
              <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
            </svg>
          )}
        </button>
        <input type="range" min={0} max={100} value={volumn} onChange={(e: any) => setVolumn(e.target.value)} />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="active-icon"
          style={{ marginLeft: '20px', cursor: 'pointer' }}
          onClick={() => {
            const status = JSON.parse(localStorage.getItem('playList')!);
            if (status === true) {
              localStorage.setItem('playList', 'false');
              dispatch(setDisplayList(false));
            } else {
              localStorage.setItem('playList', 'true');
              dispatch(setDisplayList(true));
            }
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 2.75C6.08579 2.75 5.75 3.08579 5.75 3.5C5.75 3.91421 6.08579 4.25 6.5 4.25H17.5C17.9142 4.25 18.25 3.91421 18.25 3.5C18.25 3.08579 17.9142 2.75 17.5 2.75H6.5ZM3 9.5C3 7.42893 4.67893 5.75 6.75 5.75H17.25C19.3211 5.75 21 7.42893 21 9.5V17.5C21 19.5711 19.3211 21.25 17.25 21.25H6.75C4.67893 21.25 3 19.5711 3 17.5V9.5ZM6.75 7.25C5.50736 7.25 4.5 8.25736 4.5 9.5V17.5C4.5 18.7426 5.50736 19.75 6.75 19.75H17.25C18.4926 19.75 19.5 18.7426 19.5 17.5V9.5C19.5 8.25736 18.4926 7.25 17.25 7.25H6.75ZM13.666 8.87596C13.4359 8.72253 13.14 8.70823 12.8961 8.83874C12.6522 8.96926 12.5 9.2234 12.5 9.5V13.0499C12.125 12.8581 11.7001 12.75 11.25 12.75C9.73122 12.75 8.5 13.9812 8.5 15.5C8.5 17.0188 9.73122 18.25 11.25 18.25C12.6911 18.25 13.8733 17.1415 13.9905 15.7307C13.9967 15.6916 14 15.6515 14 15.6107V15.5V10.9014L15.084 11.624C15.4286 11.8538 15.8943 11.7607 16.124 11.416C16.3538 11.0714 16.2607 10.6057 15.916 10.376L13.666 8.87596ZM12.5 15.5C12.5 14.8096 11.9404 14.25 11.25 14.25C10.5596 14.25 10 14.8096 10 15.5C10 16.1904 10.5596 16.75 11.25 16.75C11.9404 16.75 12.5 16.1904 12.5 15.5Z"
            fillOpacity="0.8"
          ></path>
        </svg>
      </PlayerControlRight>
      <div
        style={{
          width: 0,
          height: 0,
        }}
      >
        <audio
          id="audio"
          ref={audioRef}
          onTimeUpdate={onLoadedMetadata}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        >
          <source
            src={
              musics &&
              `${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_MUSIC_FOLDER}/${musics.source}`
            }
            type="audio/mpeg"
          />
        </audio>
      </div>
    </MainWrap>
  );
};

function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;

  return ret;
}
export default SongPlayer;
