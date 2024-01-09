import * as React from 'react';
import { Box, BoxProps, List, ListProps, styled } from '@mui/material';

const LogoWrapper = styled(Box)<BoxProps>(()=>({
    height: '5rem',
    width: `100%`,
    border: 'none',
    display:'flex',
    alignItems: 'center',
    paddingLeft: '20px'

}))
const Name = styled(Box)<BoxProps>(()=>({
    fontSize:`19px`,
    fontWeight:`700`,
    letterSpacing:`0.4px`,
    color:` #A4A6B3`,
    opacity:`0.7`,
    marginLeft:`10px`
}))
export const Logo = () => {
  return <><LogoWrapper >
           <img
                style={{borderRadius: '50px', width: '42px', height:'36px',objectFit:'cover'}}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LLUocBuD1rchbz8NwomwiN3qTj6k-Z1bOw&usqp=CAU"
                alt=""
              />
            <Name >Quản lý nhạc</Name>
    </LogoWrapper></>;
};


