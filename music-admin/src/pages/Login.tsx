import { styled, BoxProps, TypographyProps,Typography, Box, Container, CssBaseline, Avatar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../stores/hook';
import { useForm,SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExecLogin } from '../apis/auth';
import { setAccessToken, setRefreshToken } from '../helpers/localStorage';
import { setAuthenticated } from '../reducers/auth';
import { getErrorMessage } from '../helpers/message';
import UserInput from '../Inputs/userInput';
import PasswordInput from '../Inputs/passwordInput';
import Link from '@mui/material/Link';
import { LoginSchema } from '../helpers/validation';

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
     
      const {accessToken, refreshToken} = await ExecLogin(email, password);
      
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(setAuthenticated(true));
      navigate("/users");
    } catch (error:any) {
      setError('email', {});
      setError('password', {});
      const description = getErrorMessage(error);
      const errorMsg = description === 'Sai email' ? 'Thông tin đăng nhập không chính xác!' : description;
      setSubmitErr(errorMsg);
      return error;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
                fontSize: '28px',
                lineHeight: '24px',
                alignItem: 'center',
                verticalAlign: 'top',
                letterSpacing: '.4px',
                color: 'black',
                fontWeight: 'bold'
              }}
            >
              Trang quản trị
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
              Vui lòng nhập email và mật khẩu
            </Box>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <UserInput
               
                requiredIcon
                name="email"
                label="Email"
                control={control}
                placeholder="Nhập email của bạn"
              />
              <PasswordInput name="password" label="Password" control={control} placeholder="Nhập mật khẩu" />
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
  );
};

export default Login;
