import React from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import LikeListComponent from '../components/LikeList/LikeList';
import { useAppSelector } from '../stores/hook';
import WrapComponents from '../components/common/WrapComponents';
const ListLiked = () => {
  const isAuth = useAppSelector((state:any) => state.auth.user)
  return <WrapComponents>
    <>
    {isAuth && <LikeListComponent title={"Bài hát yêu thích"}/>}
    </>
  </WrapComponents>
};

export default ListLiked;
