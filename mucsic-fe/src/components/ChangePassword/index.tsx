import { Avatar, Box, BoxProps, Button, Container, createTheme, CssBaseline, styled, ThemeProvider, Typography, TypographyProps } from '@mui/material';
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../Inputs/passwordInput';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { ChangePasswordSchema } from '../../helpders/validations';
import axios from 'axios';
import { axiosInstance } from '../../apis';
import { removeAccessToken, removeRefreshToken } from '../../helpders/localStorage';
import { setAuth, setChangePassword, setUser } from '../../reducers/auth';
import * as bcrypt from 'bcrypt';
 
const theme = createTheme();
const MainWrap = styled(Box)<BoxProps>(() => ({
  backgroundColor: '#fff',
  padding: '20px',
  border: '1px solid #DFE0EB',
  borderRadius: '8px', 
}));
const ErrorText = styled(Typography)<TypographyProps>({
  color: '#FF6150',
  fontSize: '12px',
  marginTop: 0,
  fontWeight: 400,
});

interface ChangePasswordInputs {
  password: string;
  currentPassword:string;
  confirmPassword:string;
}
const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate =  useNavigate();
  const user = useAppSelector((state:any) => state.auth.user)

  const [submitErr, setSubmitErr] = useState('');
  const {
    setError,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ChangePasswordInputs>({
    mode: 'onChange',
    defaultValues: {
        currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(ChangePasswordSchema),
  });
  const handleChange : SubmitHandler<ChangePasswordInputs> = async ({password, currentPassword,confirmPassword}: ChangePasswordInputs) => {
    
    
    try {
         await axiosInstance.put(process.env.REACT_APP_API_BASE_URL + `/users/change-password`, {
            currentPassword:currentPassword.trim(),
            newPassword: password.trim(),
            confirmedNewPassword: confirmPassword.trim()
          });
          dispatch(setChangePassword(false))
          dispatch(setUser(null))
          dispatch(setAuth(false));
          removeRefreshToken()
          removeAccessToken()
          navigate("/login");
     
    } catch (error:any) {
  
    }
  };


  return <ThemeProvider theme={theme}>
  <Container component="main" maxWidth="xs" sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight: "100vh",
       
      }}>
    <MainWrap>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box
          sx={{
            fontSize: '24px',
            lineHeight: '24px',
            alignItem: 'center',
            verticalAlign: 'top',
            letterSpacing: '.4px',
            color: 'black',
            fontWeight: '700'
          }}
        >
          Thay đổi mật khẩu
        </Box>
        <Box
          component="span"
          sx={{
            fontSize: '14px',
            lineHeight: '20px',
            alignItem: 'center',
            verticalAlign: 'top',
            letterSpacing: '.3px',
            color: '#9FA2B4',
            marginTop: '15px',
          }}
        >
          Vui lòng điền  mật khẩu
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <PasswordInput name="currentPassword" label="currentPassword" control={control} placeholder="Nhập mật khẩu cũ" />
          <PasswordInput name="password" label="Password" control={control} placeholder="Nhập mật khẩu mớii" />
          <PasswordInput name="confirmPassword" label="confirmPassword" control={control} placeholder="Nhập lai mật khẩu" />
          {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
          <Button type="submit" 
          disabled={!isValid}
          onClick={handleSubmit(handleChange)}
          fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Thay đổi
          </Button>
        </Box>
      </Box>
    </MainWrap>
  </Container>
</ThemeProvider>
};

export default ChangePassword;
