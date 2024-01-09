import React, { useEffect, useState } from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import RankingComponent from '../components/ranking/ranking';
import WrapComponents from '../components/common/WrapComponents';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../stores/hook';
import axios from 'axios';
const Ranking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(null)
  const recommendSong = useAppSelector((state:any) => state.music.recommentSongs)
  const handlePageClick = (event:any) => {
    setCurrentPage(Number(event.selected) + 1)
  }
  const getData = async () => {

    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics?page=${currentPage}&limit=10&filter=view&order=desc`)
      setData(res.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getData()
  },[currentPage])
  return <WrapComponents>
    <>
    <RankingComponent data={data && data.data} ranking={true}/>
    <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={data && data.totalPage}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className='paginate'
      />
    </>
  </WrapComponents>
};

export default Ranking;
