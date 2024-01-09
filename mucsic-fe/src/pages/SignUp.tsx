import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, createTheme, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';
import { Box, BoxProps, Container, TypographyProps } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../helpders/localStorage';
import { getErrorMessage } from '../helpders/message';
import { SignUpSchema } from '../helpders/validations';
import NumberInput from '../Inputs/numberInput';
import PasswordInput from '../Inputs/passwordInput';
import UserInput from '../Inputs/userInput';
import { setAuth } from '../reducers/auth';
import { useAppDispatch } from '../stores/hook';
const MainWrap = styled(Box)<BoxProps>(() => ({
  backgroundColor: '#fff',
  padding: '20px',
  border: '1px solid #DFE0EB',
  borderRadius: '8px',
  width:"100%",
  height: "fit-content"
}));
const ErrorText = styled(Typography)<TypographyProps>({
  color: '#FF6150',
  fontSize: '12px',
  marginTop: 0,
  fontWeight: 400,
});
const theme = createTheme();


interface SignUpInput {
  name: string;
  email: string;
  password: string;
  day:number;
  month:number;
  year:number;
  gender: number;
}
const SignUp = () =>{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitErr, setSubmitErr] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    day: 0,
    month: 0,
    year: 0,
    gender: 1
  })
  const {
    setError,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignUpInput>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      day: 0,
      month: 0,
      year: 0, 
      gender: 1
    },
    resolver: yupResolver(SignUpSchema),
  });
  
  const handleSignUp: SubmitHandler<SignUpInput> = async ({name,email,password, day, month, year, gender}) => {
    console.log(name,email,password, day, month, year, gender)
    const dateOfBirth = new Date(`${year}-${month}-${day}`);
    try {
      const data = await axios.post(process.env.REACT_APP_API_BASE_URL + `/auth/sign-up`, {
        email:email.trim(),
        password:password.trim(),
       name:name.trim(),
        dateOfBirth,
        gender: Number(gender)
      });
      const { accessToken, refreshToken } = data.data;
       setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      dispatch(setAuth(true));
      navigate("/");
    } catch (error:any) {
      setError('email', {});
      setError('password', {});
      const description = getErrorMessage(error);
      const errorMsg = description === 'Wrong password' ? 'Incorrect email or password!' : description;
      setSubmitErr(errorMsg);
      return error;
    }
  }
  return (
      <ThemeProvider theme={theme}>
    
      <Container component="main" maxWidth="xs" sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight: "100vh"
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
                fontSize: '25px',
                fontWeight: '800',
                lineHeight: '28px',
                alignItem: 'center',
                verticalAlign: 'top',
                letterSpacing: '.4px',
                color: 'black',
              }}
            >
              Đăng Ký
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
              Vui lòng điền thông tin
            </Box>
            <Box component="form" noValidate sx={{ mt: 1 }}>
             <UserInput 
             requiredIcon name="name" label="Name" control={control} placeholder="Nhập tên của bạn" />
              <Box sx={
                {
                  display: "flex",
                  marginTop: "10px"
                }
              }>
                {/* <TextField type="number" placeholder='Days' /> */}
                  <NumberInput requiredIcon name="day" label="Days" control={control} placeholder='Days' />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                  <Controller 
                    control={control}
                    name="month"
                    render={({ field:{onChange, value} })=>(
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      onChange={val => onChange(val)}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                      <MenuItem value="6">6</MenuItem>
                      <MenuItem value="7">7</MenuItem>
                      <MenuItem value="8">8</MenuItem>
                      <MenuItem value="9">9</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="11">11</MenuItem>
                      <MenuItem value="12">12</MenuItem>
                    </Select>
                    )}
                  />
                </FormControl>
                {/* <TextField type="number" placeholder='Year'/> */}
                <NumberInput requiredIcon name="year" label="Years" control={control} placeholder='Năm' />
              </Box>
                <Box sx={
                {
                  marginTop: "10px"
                }
              }>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                   
                    <Controller 
                    control={control}
                    name="gender"
                    render={({ field:{onChange, value} })=>(
                      <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      onChange={val => onChange(val)}
                    >
                      <MenuItem value="1">Nam</MenuItem>
                    <MenuItem value="2">Nữ</MenuItem>
                    </Select>
                    )}
                  />
                </FormControl>
                </Box>
              <UserInput requiredIcon name="email" label="Email" control={control} placeholder="Nhập email của bạn" />
              <PasswordInput name="password" label="Password" control={control} placeholder="Nhập mật khẩu của bạn" />

              
              {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
              <Button
                type="submit"
                disabled={!isValid}
                onClick={handleSubmit(handleSignUp)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </MainWrap>
      </Container>
    </ThemeProvider>
  )
}
export default SignUp;
