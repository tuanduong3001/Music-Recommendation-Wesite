import  React,{useRef, useState} from 'react';
import { styled, Box, BoxProps, TextField,alpha,FormControl, Button, InputLabel } from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { setField } from '../../reducers/reset';

const Container = styled(Box)<BoxProps>({

    width: "50%",
    height: "80%",
    background: "#fff",
    borderRadius: "20px",
    zIndex: "100",
    overflowY: "auto",
    position:"relative"
})
const MainWrapper = styled(Box)<BoxProps>({
    margin: "20px auto",
    maxWidth: "70%",
    textAlign:"center"

})
const Label = styled(Box)<BoxProps>({
    fontWeight: "700",
    fontSize: "24px",
    color: "#252733",
    lineHeight: "150%",
    textAlign: "center"
})
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
const CloseIcon = styled(Box)<BoxProps>({
    position:"absolute",
    right: "4%",
    top: "4%",
    cursor:"pointer"

})

export const DetaiCategory = ()=>{
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state:any)=>state.reset.detail)

  return <Container>
          <MainWrapper>
              <Label>Chi tiết thể loại</Label>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
              <InputLabel shrink htmlFor="bootstrap-input">
              ID
              </InputLabel>
              <BootstrapInput disabled value={detail.id}  placeholder='ID' id="bootstrap-input" />
          </FormControl>
            <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
              <InputLabel shrink htmlFor="bootstrap-input">
              Tên
              </InputLabel>
              <BootstrapInput disabled value={detail.name}  placeholder='Tên' id="bootstrap-input" />
          </FormControl>
         
                   
          </MainWrapper>
         <CloseIcon>
          <HighlightOffOutlinedIcon onClick={()=>  dispatch(setField(null))}/>
         </CloseIcon>
  </Container>
    
}