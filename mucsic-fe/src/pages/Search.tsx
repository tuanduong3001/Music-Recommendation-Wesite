import React, { useEffect, useState } from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import WrapComponents from '../components/common/WrapComponents';
import { useParams } from 'react-router-dom';
import RankingComponent from '../components/ranking/ranking';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
const Search = () => {
  const {search} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>(null)
  const handlePageClick = (event:any) => {
    setCurrentPage(Number(event.selected) + 1)
  }
  const getData = async () => {
    try {
     if(search) {
      const data =await axios.get(process.env.REACT_APP_API_BASE_URL + `/musics?page=${currentPage}&limit=10&search=${search.trim()}`);
      setData(data.data);
     }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getData()
  },[currentPage])
  return <WrapComponents>
    <>
      <RankingComponent data={data && data.data} ranking={false}/>
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

export default Search;
