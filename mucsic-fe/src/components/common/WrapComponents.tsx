import { useAppDispatch, useAppSelector } from '../../stores/hook';
import SideBar from './SideBar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TopBar from './TopBar';
import '../../css/index.css'
import ListSong from './ListSong';
import HistorySong from './HistorySong';
import { setActiveList } from '../../reducers/music';
interface Props {
  children: React.ReactChild;
}
const WrapComponents: React.FC<Props> = ({ children }) => {
    const active = useAppSelector((state:any) => state.music.activeList)
    const displayList = useAppSelector((state:any) => state.music.displayList)
    const distpatch = useAppDispatch()
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: '280px', width: 'calc(100% - 280px)',height: "fit-content",
       maxWidth: 'calc(100% - 280px)' , marginRight: "350px", transition: "all 1s ease"}} className={!displayList ? "right-bar-active" : ""}>
        <TopBar />
        {children}
      </div>
        <div className={displayList ? "list-playing-music playing-active" : "list-playing-music"}>
            <div className="list-playing-header">
                <div className="list-playing-header-left">
                    <div className={active ? "lever-header-item lever-active" : "lever-header-item"}
                    onClick={()=>distpatch(setActiveList(true))}
                    >
                        <h6>Danh sách phát</h6>
                    </div>
                    <div className={!active ? "lever-header-item lever-active" : "lever-header-item"}
                     onClick={()=>distpatch(setActiveList(false))}
                    >
                        <h6>Nghe gần đây</h6>
                    </div>
                </div>
            </div>
            <div className="list-playing-scroll">
                {active ? <ListSong /> : <HistorySong />}
            </div>
        </div>
    </div>
  );
};

export default WrapComponents;
