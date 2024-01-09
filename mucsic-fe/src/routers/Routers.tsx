import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import SongPlayer from '../components/common/SongPlayer';

const HomePage = React.lazy(() => import('../pages/Home'))
const LoginPage = React.lazy(() => import('../pages/Login'))
const SignUpPage = React.lazy(() => import('../pages/SignUp'))
const CategoryPage = React.lazy(() => import('../pages/Category'))
const CategoryItemPage = React.lazy(() => import('../pages/CategoryItem'))
const RankingPage = React.lazy(() => import('../pages/Ranking'))
const ProfilePage = React.lazy(() => import('../pages/MyProfile'))
const ListLikedPage = React.lazy(() => import('../pages/ListLiked'))
const NotFoundPage = React.lazy(() => import('../pages/NotFound'))
const SearchPage = React.lazy(() => import('../pages/Search'))
const MusicDetailPage =React.lazy(() => import('../pages/DetailMusic'))
const AllMusicsPage =React.lazy(() => import('../pages/Musics'))
const Routers = () => {
    const routers = [
      {
        path: '/',
        element:  <HomePage />,
      },
      {
        path: '/search/:search',
        element:  <SearchPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signUp',
        element: <SignUpPage/>
      },
      {
        path: '/music/:id',
        element: <MusicDetailPage />
      },
      {
        path: '/musics/:title',
        element: <AllMusicsPage />
      },
      {
        path: '/categories',
        element: <CategoryPage/>
      },
      {
        path: '/category/:id',
        element: <CategoryItemPage/>
      },
      {
        path: '/ranking',
        element: <RankingPage/>
      },
      {
        path: '/my_profile',
        element: <ProfilePage/>
      },
      {
        path: '/liked',
        element: <ListLikedPage/>
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ];
    const elements = useRoutes(routers);
    return elements;
  };
  
  export default Routers;