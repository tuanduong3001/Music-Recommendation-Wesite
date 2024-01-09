import React from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import Categories from '../components/categories/categories';
import WrapComponents from '../components/common/WrapComponents';
const Category = () => {
  return (
    <WrapComponents>
      <>
        <Categories />
      </>
    </WrapComponents>
  );
};

export default Category;
