import {Header} from './index'
import {
  Box,
  BoxProps,
  styled,
} from '@mui/material';
import { useAppSelector } from '../../stores/hook';
import React from 'react'
const Container = styled(Box)<BoxProps>(() => ({
  width: "100%",
  height: "100%",
  padding: "0 2rem",
  background: "#F7F8FC"
}))

export const HeaderCommon = ({children, title}:any) => {
    const user = useAppSelector((state:any) => state.auth.user);
  return (
    <Container>
      {user && <Header title={title} avatar={user.avatar} name={user.name}/>}
      {children}
    </Container>
  );
}