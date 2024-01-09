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
import { createUserSchema, editUserSchema } from '../../helpers/validation';
import CreateOptionInput from '../../Inputs/createOptionInput';
import { CreateNewUser, EditExisUser } from '../../apis/user';

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
  interface User {
    id:number;
    name: string;
    email: string;
    dayOfBirth: Dayjs | null;
    gender:string
  }
  const UserGender = [{id: 1, label: "Male"}, {id: 2, label: "Female"}]
  export const EditUser = () => {
    const dispatch = useAppDispatch();
    const reset = useAppSelector((state: any) => state.reset.reset);
    const detail = useAppSelector((state:any) => state.reset.detail)
    const [value, setValue] = React.useState<User>({
        id: detail && detail.id,
      name: detail && detail.name,
      email: detail && detail.email,
      dayOfBirth:  detail && dayjs(detail.dateOfBirth),
      gender:  detail && detail.gender
    });
    const {
      setError,
      handleSubmit,
      control,
      formState: { errors, isDirty, isValid },
    } = useForm<User>({
      mode: 'onChange',
      defaultValues: {
        name: detail && detail.name,
        email: detail && detail.email,
        dayOfBirth:  detail && dayjs(detail.dayOfBirth),
        gender:  detail && detail.gender
      },
      resolver: yupResolver(editUserSchema),
    });
  
    const handleEditUser = async () => {
      const bd1 = value.dayOfBirth!.year() + "-" + (value.dayOfBirth!.month() + 1 < 10 ? "0" +
       (value.dayOfBirth!.month() + 1) :  value.dayOfBirth!.month() + 1) + "-" +(value.dayOfBirth!.date() < 10 ? "0" + 
       value.dayOfBirth!.date()  : value.dayOfBirth!.date() )
       await EditExisUser(Number(value.id), value.name, value.email,bd1, Number(value.gender))
      dispatch(setField(null));
      dispatch(setReset(!reset));
    };
      const handleChange = (newValue: Dayjs | null) => {
        console.log("day:", newValue)
        setValue({...value, dayOfBirth: newValue});
      };
    return (
      <Container>
        <MainWrapper>
          <Label>Sửa người dùng</Label>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
            Tên
            </InputLabel>
            <CreateFilmInput
            defaultValue={value.name}
              onChange1={(e: any) => setValue({ ...value, name: e.target.value })}
              requiredIcon
              name="name"
              label="Name"
              control={control}
              placeholder="Tên"
            />
            {/* <BootstrapInput value={value.name} onChange={(e:any)=> setValue({...value,name:e.target.value})} placeholder='Enter Name' id="bootstrap-input" /> */}
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
            <InputLabel shrink htmlFor="bootstrap-input">
              Email
            </InputLabel>
            <CreateFilmInput
            defaultValue={value.email}
              onChange1={(e: any) => setValue({ ...value, email: e.target.value })}
              requiredIcon
              name="email"
              label="Email"
              control={control}
              placeholder="Email"
            />
            {/* <BootstrapInput value={value.email} onChange={(e:any)=> setValue({...value,email:e.target.value})} placeholder='Enter Email' id="bootstrap-input" /> */}
          </FormControl>
          <FormControl variant="standard" sx={{width: "100%", marginTop:"20px"}}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                    <DatePicker
                    label="Ngày sinh"
                    format="MM/DD/YYYY"
                    value={value.dayOfBirth ? value.dayOfBirth :dayjs('2022-04-17')}
                    onChange={handleChange}
                    defaultValue={value.dayOfBirth}
                    />
                </DemoContainer>
          
            </LocalizationProvider>
             </FormControl>
             <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
                <CreateOptionInput  onChange1={(event: any, item: any) => {
                    if(item){
                        setValue({...value, gender: String(item.id)})
                    }
                }} 
                options={[{id: 1, name: "Male"},{id: 2, name: "Female"}]} requiredIcon 
                name="gender" label="Giới tính" control={control} placeholder="Enter Gender " />
            </FormControl>
  
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit(handleEditUser)}
            sx={{ marginTop: '10px' }}
          >
            Sửa
          </Button>
        </MainWrapper>
        <CloseIcon>
          <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
        </CloseIcon>
      </Container>
    );
  };