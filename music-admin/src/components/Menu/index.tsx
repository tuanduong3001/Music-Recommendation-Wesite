import { Box, BoxProps, List, ListProps, styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useNavigate, Link } from 'react-router-dom';
import { MenuItem } from './menuItem';
import { menus } from './menus';
import React from 'react'
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })({
    width: `100%`,
    height: `calc(100vh - 5rem)`,
  
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'width 0.8s ease-in-out',
    overflow: 'unset',
    border: 'none',
    '& .MuiPaper-root': {
      position: 'unset',
      border: 'none',
      backgroundColor: 'transparent'
    },
    paddingTop: "20px",
  
    
  });

  const SlideBody = styled(Box)<BoxProps>(() => ({
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
   
  }));
  
  export const SlideMenus = () => {
    const navigate = useNavigate();
    return (
      <Drawer open={true} variant="permanent">
        <SlideBody>
          <ul>
            {menus.map(({ Icon, title, path }, i) => {
             return (
              <MenuItem
                key={i}
                onItemClick={(url:string) => {
                  navigate(url);
                }}
                Icon={Icon}
                title={title}
                path={path}
              />
            );
            })}
          </ul>
        </SlideBody>
      </Drawer>
    );
  };