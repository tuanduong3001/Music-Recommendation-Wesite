import React, { useEffect, useState } from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import RankingComponent from '../components/ranking/ranking';
import WrapComponents from '../components/common/WrapComponents';
import LikeListComponent from '../components/LikeList/LikeList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Musics = () => {
  const {title} = useParams()
  const [getTitle, setGetTitle] = useState('');
  const [data, setData] = useState<any>(null)
  const getData = async (filter:string) => {
    try {
      const data = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics?page=1&limit=1000&filter=${filter}&order=desc`)
      console.log(data.data)
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(title){
      if(title === 'new-songs'){
        setGetTitle("Bài hát mới nhất")
        getData("createdAt")
      }
      else  if(title === 'popular-songs'){
        setGetTitle("Bài hát thịnh hành")
        getData("view")
      }
      else{
        setGetTitle("Xu hướng")
        getData("like")
      }
    }
  },[])
  return <WrapComponents>
    <>
    {data && <LikeListComponent title={getTitle && getTitle} list={data && data.data}/>}
    </>
  </WrapComponents>
};

export default Musics;
