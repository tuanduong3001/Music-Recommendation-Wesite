import {
    Box,
    BoxProps,
    Grid,
    GridProps,
    List,
    ListItem,
    ListItemProps,
    ListProps,
    styled,
    Typography,
    TypographyProps,
  } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { removeAccessToken, removeRefreshToken } from '../../helpers/localStorage';
const Container = styled(Box)<BoxProps>({
  width: '100%',
  boxSizing: 'border-box',
  height: "56px",

});

const IconBox = styled(Box)<BoxProps>({
  width: '30px',
  display: "flex",
  alignItems: "center"
});

const Header = styled(Grid)<
  GridProps & {
    isActive?: boolean;
  }
>(({ isActive }) => ({
  backgroundColor: isActive ? '#3e4049' : '#363740',
  color: isActive ? '#DDE2FF' : '#9698a4',
  borderLeft: isActive ? "1.5px solid #fff" : "0",
  height: "100%",
  width: "100%"
}));
const HeaderWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  cursor: 'pointer',
  padding: '5px 20px',
  height: "100%",
  width: "100%"
});
const Title = styled(Typography)<TypographyProps>({
  marginLeft: '15px',
  display: 'flex',
  alignItems: 'center',
});

const DropdownIcon = styled(Box)<BoxProps>({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& svg': {
    fontSize: '30px',
  },
});

const Body = styled(List)<ListProps>({
  paddingLeft: '30px',
});

const ListItemCustom = styled(ListItem)<
  ListItemProps & {
    isActive?: boolean;
  }
>(({ isActive }) => ({
  cursor: 'pointer',
  background: isActive ? '#3636ff' : '#ffff',
  color: isActive ? '#ffff' : 'unset',
  borderRadius: '8px',
}));



interface Props {
  Icon: any;
  title: string;
  path: string;
  onItemClick: (url: string) => void;
}

export const MenuItem = ({ Icon, title, onItemClick, path }: Props) => {
  const location = useLocation();
  return (
    <Container>
      <Header
        isActive={path === '/' ? location.pathname === path : location.pathname.includes(path)}
        onClick={() => {
          if(path === "/login"){
            removeAccessToken();
            removeRefreshToken();
          }
          onItemClick(path);
        }}
      >
        <HeaderWrapper>
          <IconBox>
            <Icon />
          </IconBox>
          <Title>{title}</Title>
        </HeaderWrapper>
      </Header>
    </Container>
  );
};