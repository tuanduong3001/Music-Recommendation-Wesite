import  React,{useRef, useState} from 'react';
import { styled, Box, BoxProps, TextField,alpha,FormControl, Button, InputLabel } from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { setField } from '../../reducers/reset';
import TextareaAutosize from '@mui/base/TextareaAutosize';
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

export const DetailArtist = ()=>{
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state:any)=>state.reset.detail)

  return <Container>
          <MainWrapper>
              <Label>Chi tiết ca sĩ</Label>
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
          <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
              <InputLabel shrink htmlFor="bootstrap-input">
              Giới thiệu
              </InputLabel>
              
              <BootstrapInput  multiline 
              maxRows={Infinity} 
              disabled value={detail.title}  placeholder='Giới thiệu' id="bootstrap-input" />
          </FormControl>
          <FormControl variant="standard" sx={{width: "100%", marginTop:"10px"}}>
              <InputLabel shrink htmlFor="bootstrap-input">
              Ảnh
              </InputLabel>
              <img style={{marginTop: "20px"}}
              src={`${process.env.REACT_APP_CLOUDFRONT_URL}/artists_image/` + detail.image} />
          </FormControl>
          
         
                   
          </MainWrapper>
         <CloseIcon>
          <HighlightOffOutlinedIcon onClick={()=>  dispatch(setField(null))}/>
         </CloseIcon>
  </Container>
    
}