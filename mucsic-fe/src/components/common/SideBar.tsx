import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar, NavBarWrap, BannerWrap, ListItemWrap, ListWrap, TitleItem } from '../../styled/SideBar';
import { ListItem, ListItemType } from './NavBarItem';

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <NavBar component={'nav'}>
        <NavBarWrap>
          <BannerWrap>
            <Link to={'/'} style={{ color: '#fff', padding: '0 24px', marginBottom: '18px', flex: 1 }}>
              <img src={`${process.env.REACT_APP_CLOUD_FRONT_URL}/${process.env.REACT_APP_IMAGE_FOLDER}/ute-music-high-resolution-logo-color-on-transparent-background.png`} style={{ height: '40px', width: '100%', maxWidth: '150px' }}></img>
            </Link>
          </BannerWrap>
          <ListWrap component={'ul'}>
            {ListItem.map((item: ListItemType) => {
              return (
                <ListItemWrap key={item.id} component="li">
                  <Link
                    to={item.url}
                    style={{
                      color: '#b3b3b3',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      height: '40px',
                      padding: '0 16px',
                    }}
                    className={location.pathname === item.url ? 'active' : ''}
                  >
                    <svg
                      role={'img'}
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      className={location.pathname === item.url ? 'navbar-icon' : 'active-icon'}
                    >
                     {item.svgNotSelect.map((item:string, index:number)=>{
                        return  <path fill="currentColor" d={item} key={index} ></path>
                     })}
                    </svg>
                    <svg
                      role={'img'}
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      className={location.pathname === item.url ? 'active-icon' : 'navbar-icon'}
                    >
                         {item.svgSelect.map((item:string, index:number)=>{
                        return  <path fill="currentColor" d={item} key={index}></path>
                     })}
                    </svg>
                    <TitleItem>{item.title}</TitleItem>
                  </Link>
                </ListItemWrap>
              );
            })}
          </ListWrap>
        </NavBarWrap>
      </NavBar>
    </>
  );
};

export default SideBar;
