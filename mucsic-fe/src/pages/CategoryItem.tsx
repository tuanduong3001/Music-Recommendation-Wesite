import React from 'react';
import SideBar from '../components/common/SideBar';
import TopBar from '../components/common/TopBar';
import LikeListComponent from '../components/LikeList/LikeList';
import { useAppSelector } from '../stores/hook';
import CategoryItemComponent from '../components/categories/categoryItem';
import WrapComponents from '../components/common/WrapComponents';
const CategoryItem = () => {
  return  <WrapComponents>
  <>
  <CategoryItemComponent />
  </>
</WrapComponents>
};

export default CategoryItem;
