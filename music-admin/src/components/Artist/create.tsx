import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { createArtistSchema, createCategorySchema } from '../../helpers/validation';
import { setField, setReset } from '../../reducers/reset';
import { CreateNewCategory } from '../../apis/category';
import CreateFilmInput from '../../Inputs/createFilmInput';
import ImageInput from '../../Inputs/ImageInput';
import { CreateNewArtist } from '../../apis/artist';

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
  title:string;
}
export const CreateArtist = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.reset.reset);
  const [value, setValue] = React.useState<Artist>({
    name: '',
    image: null,
    title: ''
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
    title: ''
    },
    resolver: yupResolver(createArtistSchema),
  });
  const handleCreateArtist = async () => {
    if(value.image){
      await CreateNewArtist(value.name, value.image?.name, value.title);
      dispatch(setField(null));
      dispatch(setReset(!reset));

    }
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Tạo ca sĩ</Label>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Tên
          </InputLabel>
          <CreateFilmInput
            onChange1={(e: any) => setValue({ ...value, name: e.target.value })}
            requiredIcon
            name="name"
            label="Name"
            control={control}
            placeholder="Tên"
          />
        </FormControl>
        <ImageInput title="Ảnh" field="image" type="artists_image"
        artist={value} setArtist={setValue} control={control} />
          <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <InputLabel shrink htmlFor="bootstrap-input">
          Giới thiệu
          </InputLabel>
          <CreateFilmInput
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
          onClick={handleSubmit(handleCreateArtist)}
          sx={{ marginTop: '10px' }}
        >
          Tạo
        </Button>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
