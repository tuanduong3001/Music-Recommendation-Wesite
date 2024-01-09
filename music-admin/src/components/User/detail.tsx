import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel, Stack } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { setField, setReset } from '../../reducers/reset';
import CreateFilmInput from '../../Inputs/createFilmInput';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createUserSchema } from '../../helpers/validation';
import CreateOptionInput from '../../Inputs/createOptionInput';
import { CreateNewUser } from '../../apis/user';

const Container = styled(Box)<BoxProps>({
    width: '50%',
    height: '80%',
    background: '#fff',
    borderRadius: '20px',
    zIndex: '100',
    overflowY: 'auto',
    position: 'relative',
  });
  const MainWrapper = styled(Box)<BoxProps>({
    margin: '20px auto',
    maxWidth: '70%',
    textAlign: 'center',
  
    position: 'relative',
  });
  const Label = styled(Box)<BoxProps>({
    fontWeight: '700',
    fontSize: '24px',
    color: '#252733',
    lineHeight: '150%',
    textAlign: 'center',
  });
  const CloseIcon = styled(Box)<BoxProps>({
    position: 'absolute',
    right: '4%',
    top: '4%',
    cursor: 'pointer',
  });
  const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  interface User {
    id:string
    name: string;
    email: string;
    password: string;
    dayOfBirth: string | null;
    gender:string
  }
  const UserGender = ["Male", "Female"]
  export const DetailUser = () => {
    const dispatch = useAppDispatch();
    const detail = useAppSelector((state:any) => state.reset.detail)
    const [value, setValue] = React.useState<User>({
        id: detail && String(detail.id),
      name: detail && detail.name,
      email: detail && detail.email,
      password:  detail && detail.password,
      dayOfBirth:  detail && detail.dateOfBirth.split("T")[0],
      gender:  detail && UserGender[detail.gender - 1]
    });

  

    return (
      <Container>
        <MainWrapper>
          <Label>Chi tiết người dùng</Label>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              ID
            </InputLabel>
            <BootstrapInput value={value.id} disabled id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
            Tên
            </InputLabel>
            <BootstrapInput value={value.name} disabled id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>
            <BootstrapInput value={value.email} disabled id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
            Ngày sinh
            </InputLabel>
            <BootstrapInput value={value.dayOfBirth} disabled id="bootstrap-input" />
            </FormControl>
            <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
            Giới tính
            </InputLabel>
            <BootstrapInput value={value.gender} disabled id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
            Mật khẩu
            </InputLabel>
            <BootstrapInput value={value.password} disabled id="bootstrap-input" />
          </FormControl>
        </MainWrapper>
        <CloseIcon>
          <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
        </CloseIcon>
      </Container>
    );
  };