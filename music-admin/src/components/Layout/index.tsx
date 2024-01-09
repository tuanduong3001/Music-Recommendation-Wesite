import { Box, BoxProps, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useUser } from '../../hooks/useUsers';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { Logo } from '../Header/logo';
import { SlideMenus } from '../Menu';
import { CreateUser } from '../User/create';
import { DetailUser } from '../User/detail';
import { EditUser } from '../User/edit';
import React from 'react'
import { useCategory } from '../../hooks/useCategory';
import { useMusic } from '../../hooks/useMusic';
import { CreateCategory } from '../Category/create';
import { DetaiCategory } from '../Category/detail';
import { EditCategory } from '../Category/edit';
import { CreateMusic } from '../Music/create';
import { useArtist } from '../../hooks/useArtist';
import { CreateArtist } from '../Artist/create';
import { EditArtist } from '../Artist/edit';
import { DetailArtist } from '../Artist/detail';
import { EditMusic } from '../Music/edit';
import { DetailMusic } from '../Music/detail';
interface Props {
    name?: string;
    children: React.ReactChild;
  }
  
  const MainLayout = styled(Box)<BoxProps>(() => ({
    // width: '100%',
    minHeight: '100vh',
    boxSizing: 'border-box',
    width: `calc(100% - 280px)`,
    height: '100vh',
    overflow:"hidden"
  }));

  
  const Wrapper = styled(Box)<BoxProps>({
    display: 'flex',
    width: '100%',
    background: `#F7F8FC`,
    position:"relative"
  });
  const LeftWrapper = styled(Box)<BoxProps>(()=>({
    width: 280,
    height: `100vh`,
    boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.06)',
    background: '#363740',
  }));
  const PopUpLayout = styled(Box)<BoxProps>(()=>({
    width: "100%",
    height:"100%",
    position: "absolute",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    background: "rgba(217, 217, 217, 0.33)"
  }));
  const Layout: React.FC<Props> = ({ children }) => {
    
    const location = useLocation();
    const dispatch = useAppDispatch();
      const field = useAppSelector((state:any)=>state.reset.field)
    const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated); 
    useAuthenticated();
    useUser(location, dispatch);
    useCategory(location, dispatch);
    useMusic(location, dispatch);
    useArtist(location, dispatch);
   const renderLayout = () => {
      if (location.pathname === '/login') {
        return isAuthenticated !== null && !isAuthenticated ? (
          <>{children}</>
        ) : (
          <div>Loading...</div>
        );
      } else {
        return isAuthenticated !== null  && isAuthenticated && ( location.pathname === "/users" 
|| location.pathname === "/categories" || location.pathname === "/artists" || location.pathname === "/musics" )? (
          <>
            <Wrapper>
              <LeftWrapper>
                  <Logo />
                 <SlideMenus />
              </LeftWrapper>
  
            <MainLayout id="main">
              {children}
            </MainLayout>
            {field === "create" && 
            <PopUpLayout>
              {location.pathname === "/users" && <CreateUser />}
              {location.pathname === "/categories" && <CreateCategory />}
              {location.pathname === "/musics" && <CreateMusic />}
              {location.pathname === "/artists" && <CreateArtist />}
            </PopUpLayout>
            }
             {field === "edit" && 
            <PopUpLayout>
              {location.pathname === "/users" && <EditUser />}
              {location.pathname === "/categories" && <EditCategory />}
              {location.pathname === "/artists" && <EditArtist />}
              {location.pathname === "/musics" && <EditMusic />}
            </PopUpLayout>
            }
             {field === "detail" && 
            <PopUpLayout>
              {location.pathname === "/users" && <DetailUser />}
              {location.pathname === "/categories" && <DetaiCategory />}
              {location.pathname === "/artists" && <DetailArtist />} 
              {location.pathname === "/musics" && <DetailMusic />}
            </PopUpLayout>
            }

            
          </Wrapper>
          </>
        ) : (
          <div>{children}</div>
        );
      }
    };
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItem: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#363740',
        }}
      >
        
        {renderLayout()}
      </Box>
    );
  };
  
  export default Layout;