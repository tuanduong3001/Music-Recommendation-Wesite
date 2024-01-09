import React, { useEffect, useState } from 'react';
import { MusicList } from './MusicList';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { setMusic, setRecommentMusic } from '../../reducers/music';
interface MusicSection {
  title: string;
}
const MusicRecommentSection = ({ title }: MusicSection) => {
  const recommentSongs = useAppSelector((state:any) => state.music.recommentSongs)
  const dispatch = useAppDispatch();
  return (
    <MainWrap>
      <MusicWrap>
        <MusicSectionWrap component={'section'}>
          <MusicTitleWrap>
            <MusicTitle>
              <h2>
                <Link to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
                  {title}
                </Link>
              </h2>
            </MusicTitle>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <MusicLinkShowAll component={'span'}>Xem thêm</MusicLinkShowAll>
            </Link>
          </MusicTitleWrap>
          <MusicListWrap>
            {(recommentSongs && recommentSongs.length > 0) &&
              recommentSongs.map((song: any) => {
                return (
                  <MusicItemWrap key={song.id} onClick={async ()=>{
                   dispatch(setMusic(song))
                   const listSongs = await axios.post(`${process.env.REACT_APP_RECOMMEND_URL}/recommend`, {
                    id_music: song.id,
                    num_music: 5
                  });
                  const newSongs = await Promise.all(
                    listSongs.data.map(async (songId:number) => {
                      const song = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics/${songId}`);
                      return song.data;
                    })
                  )
                  dispatch(setRecommentMusic(newSongs))
                   localStorage.setItem("currentSong", JSON.stringify(song));
                  }}>
                    <MusicItem>
                      <MusicItemImageWrap>
                        <MusicItemImage>
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
                          />
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
        </MusicSectionWrap>
      </MusicWrap>
    </MainWrap>
  );
};

export default MusicRecommentSection;
