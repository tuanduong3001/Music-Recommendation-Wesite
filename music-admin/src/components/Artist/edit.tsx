import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { createArtistSchema, createCategorySchema, updateArtistSchema } from '../../helpers/validation';
import { setField, setReset } from '../../reducers/reset';
import CreateFilmInput from '../../Inputs/createFilmInput';
import { axiosInstance } from '../../apis';
import { CreateNewArtist } from '../../apis/artist';
import ImageInput from '../../Inputs/ImageInput';

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
});
const Label = styled(Box)<BoxProps>({
  fontWeight: '700',
  fontSize: '24px',
  color: '#252733',
  lineHeight: '150%',
  textAlign: 'center',
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
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
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
  position: 'absolute',
  right: '4%',
  top: '4%',
  cursor: 'pointer',
});

interface Artist {
  name: string;
  image: File | null;
  title: string;
}
export const EditArtist = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.reset.reset);
  const detail = useAppSelector((state: any) => state.reset.detail);
  const [value, setValue] = React.useState<Artist>({
    name: detail.name,
    image: detail.image,
    title: detail.title,
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Artist>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      image: null,
      title: '',
    },
    resolver: yupResolver(updateArtistSchema),
  });
  const handleUpdateArtist = async () => {
    if (value.image) {
      await CreateNewArtist(value.name, value.image?.name, value.title);
      dispatch(setField(null));
      dispatch(setReset(!reset));
    }
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Sửa ca sĩ</Label>
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
        <ImageInput title="Ảnh" field="image" type="artists_image"
        artist={value} setArtist={setValue} control={control} />
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Giới thiệu
          </InputLabel>
          <CreateFilmInput
          defaultValue={value.title}
            onChange1={(e: any) => setValue({ ...value, title: e.target.value })}
            requiredIcon
            name="title"
            label="Title"
            control={control}
            placeholder="Giới thiệu"
          />
        </FormControl>
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleUpdateArtist)}
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
