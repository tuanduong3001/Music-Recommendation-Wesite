import { yupResolver } from '@hookform/resolvers/yup';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {
  Box,
  BoxProps,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TypographyProps,
  styled
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateFilmInput from '../../Inputs/createFilmInput';
import CreateOptionInput from '../../Inputs/createOptionInput';
import { axiosInstance } from '../../apis';
import { createMusicSchema } from '../../helpers/validation';
import { setField, setReset } from '../../reducers/reset';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import S3Upload from './s3Upload';

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
const ErrorText = styled(Typography)<TypographyProps>({
  color: '#FF6150',
  fontSize: '20px',
  marginTop: 0,
  fontWeight: 400,
});
const CloseIcon = styled(Box)<BoxProps>({
  position: 'absolute',
  right: '4%',
  top: '4%',
  cursor: 'pointer',
});
export interface Music {
  name: string;
  image: File | null;
  categoryId: string;
  source: File | null;
  artists: any[];
}
export const CreateMusic = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const reset = useAppSelector((state: any) => state.reset.reset);
  const [submitErr, setSubmitErr] = useState('');
  const artists = useAppSelector((state: any) => state.artist.allArtist);
  const category = useAppSelector((state: any) => state.category.allCategory);
  const [value, setValue] = React.useState<Music>({
    name: '',
    categoryId: '',
    source: null,
    image: null,
    artists: [],
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Music>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      categoryId: '',
      source: null,
      image: null,
      artists: [],
    },
    resolver: yupResolver(createMusicSchema),
  });

  const handleCreateMusic = async () => {
    setLoading(true);
    try {
      const ArrayIdArtist = value.artists.map((artist) => String(artist.id));
      const getData = await axiosInstance.post('/musics', {
        name: value.name,
        categoryId: Number(value.categoryId),
        source: value.source?.name,
        image: value.image?.name,
        artists: ArrayIdArtist,
      });
      const data = await axios.post(`${process.env.REACT_APP_RECOMMEND_URL}/getembedding`, {
        url: `${process.env.REACT_APP_CLOUDFRONT_URL}/${process.env.REACT_APP_MUSIC_FOLDER}/${value.source?.name}`,
        rate: 0.5,
      }).catch((err) => {
        setLoading(false);
        throw err
      });
      await axios.post(process.env.REACT_APP_API_BASE_URL + '/admin/embedding', {
        musicId: getData.data.id,
        embedding: data.data,
      });
      setLoading(false);
      dispatch(setField(null));
      dispatch(setReset(!reset));
    } catch (error: any) {
      console.log(error?.response?.data?.description);
      setSubmitErr(error?.response.data?.description);
      setLoading(false);
    }
  };

  const handleChangeArtist = (event: any, value1: any) => {
    console.log(value)
    const check = value.artists.filter((item: any) => item.id === value1.id);
    if (check.length !== 0) {
      setValue({ ...value, artists: value.artists });
    } else {
      const newArtist = [...value.artists, value1];
      setValue({ ...value, artists: newArtist as any });
      console.log('value:', newArtist);
    }
  };
  const handleChangeCategory = (event: any, value1: any) => {
    setValue({ ...value, categoryId: value1.id });
  };
  return (
    <Container>
      <MainWrapper>
        <Label>Tạo nhạc</Label>
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

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput
            onChange1={(event: any, value: any) => handleChangeCategory(event, value)}
            options={category && category}
            requiredIcon
            name="categoryId"
            label="Thể loại"
            control={control}
            placeholder="Chọn thể loại "
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput
            onChange1={(event: any, value: any) => handleChangeArtist(event, value)}
            options={artists && artists}
            requiredIcon
            name="artists"
            label="Artist"
            control={control}
            placeholder="Chọn ca sĩ"
          />
        </FormControl>
        <nav aria-label="secondary mailbox folders">
          <List>
            {value.artists.map((item: any, index: number) => (
              <ListItem disablePadding key={item.id}>
                <ListItemButton>
                  <ListItemText primary={item.label} />
                  <ListItemIcon>
                    <HighlightOffOutlinedIcon
                      onClick={() => {
                        const artists = value.artists.filter((element: any) => element.id !== item.id);
                         setValue({ ...value, artists });
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <S3Upload
          title="Nhạc"
          field="source"
          type={process.env.REACT_APP_MUSIC_FOLDER || 'musics'}
          music={value}
          setMusic={setValue}
          control={control}
        />
        <S3Upload title="Ảnh" field="image" type="images" music={value} setMusic={setValue} control={control} />
        {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
        <LoadingButton
          loading = {loading}
          variant="contained"
          disabled={!isValid}
          onClick={handleSubmit(handleCreateMusic)}
          sx={{ marginTop: '10px' }}
        >
          Tạo
        </LoadingButton>
      </MainWrapper>
      <CloseIcon>
        <HighlightOffOutlinedIcon onClick={() => dispatch(setField(null))} />
      </CloseIcon>
    </Container>
  );
};
