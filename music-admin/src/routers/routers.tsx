import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const LoginPage = React.lazy(() => import('../pages/Login'));
const UserPage = React.lazy(() => import('../pages/User'));
const CategoryPage = React.lazy(() => import('../pages/Category'));
const ArtistPage = React.lazy(() => import('../pages/Artist'));
const MusicPage = React.lazy(() => import('../pages/Music'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

const Routers = () => {
    const routers = [
      
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/users',
            element: <UserPage />,
        },
        {
          path: '/categories',
          element: <CategoryPage />,
      },
      {
        path: '/artists',
        element: <ArtistPage />,
    },
      {
        path: '/musics',
        element: <MusicPage />,
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