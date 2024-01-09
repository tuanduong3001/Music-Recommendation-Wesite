import React from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import MusicSection from '../components/MusicSection/MusicSection';
import MusicRecommentSection from '../components/MusicSection/MusicRecommentSection';
import { useAppSelector } from '../stores/hook';
import WrapComponents from '../components/common/WrapComponents';
const Home = () => {
  const recommentSongs = useAppSelector((state:any) => state.music.recommentSongs)

return <WrapComponents>
      {/* <MusicRecommentSection title="Có thể bạn thích"/> */}
      <div style={{height: "100%"}}>
      <MusicSection title="Bài hát mới"/>
      <MusicSection title="Bài hát thịnh hành"/>
      <MusicSection title="Xu hướng"/>
      </div>

</WrapComponents>
 
};

export default Home;
