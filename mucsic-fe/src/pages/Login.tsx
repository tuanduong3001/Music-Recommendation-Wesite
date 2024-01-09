import { Avatar, Box, BoxProps, Button, Container, createTheme, CssBaseline, styled, ThemeProvider, Typography, TypographyProps } from '@mui/material';
import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../helpders/validations';
import UserInput from '../Inputs/userInput';
import PasswordInput from '../Inputs/passwordInput';
import axios from 'axios';
import { setAccessToken, setRefreshToken } from '../helpders/localStorage';
import { useAppDispatch } from '../stores/hook';
import { setAuth } from '../reducers/auth';
import { getErrorMessage } from '../helpders/message';
import { setPlaying } from '../reducers/music';

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

interface LoginInputs {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate =  useNavigate();
  const [submitErr, setSubmitErr] = useState('');
  const {
    setError,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<LoginInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
  });
  const handleLogin : SubmitHandler<LoginInputs> = async ({email, password}: LoginInputs) => {
    
    
    try {
     
      const data = await axios.post(process.env.REACT_APP_API_BASE_URL + `/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });
      const { accessToken, refreshToken } = data.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(setAuth(true));
      dispatch(setPlaying(false))
      navigate("/");
    } catch (error:any) {
      console.log("err:", error)
      setError('email', {});
      setError('password', {});
      const description = getErrorMessage(error);
      const errorMsg = description === 'Wrong password' ? 'Incorrect email or password!' : description;
      setSubmitErr(errorMsg);
      return error;
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
          Đăng nhập
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
          Vui lòng điền email và mật khẩu
        </Box>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <UserInput
           
            requiredIcon
            name="email"
            label="Email"
            control={control}
            placeholder="Nhập email"
          />
          <PasswordInput name="password" label="Password" control={control} placeholder="Nhập mật khẩu" />
          
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              href="#"
              variant="body2"
              sx={{
                fontSize: '10px',
                fontWeight: '400',
                lightHeight: '13px',
                letterSpacing: '0.1px',
                color: 'blue',
                textDecoration: 'none',
              }}
            >
              Bạn quên mật khẩu? 
            </Link>
          </Box>
          {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
          <Button type="submit" 
          disabled={!isValid}
          onClick={handleSubmit(handleLogin)}
          fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </MainWrap>
  </Container>
</ThemeProvider>
};

export default Login;
