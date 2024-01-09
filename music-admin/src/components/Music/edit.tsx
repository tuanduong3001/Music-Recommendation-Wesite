import React, { useRef, useState } from 'react';
import { styled, Box, BoxProps, TextField, alpha, FormControl, Button, InputLabel, Stack, Typography, TypographyProps, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../stores/hook';
import { createArtistSchema, createCategorySchema, createMusicSchema, editMusicSchema, updateArtistSchema } from '../../helpers/validation';
import { setField, setReset } from '../../reducers/reset';
import CreateFilmInput from '../../Inputs/createFilmInput';
import { axiosInstance } from '../../apis';
import { CreateNewArtist } from '../../apis/artist';
import ImageInput from '../../Inputs/ImageInput';
import { Music } from './create';
import CreateOptionInput from '../../Inputs/createOptionInput';
import S3Upload from './s3Upload';
import axios from 'axios';


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
export const EditMusic = () => {
  const dispatch = useAppDispatch();
  const reset = useAppSelector((state: any) => state.reset.reset);
  const [submitErr, setSubmitErr] = useState('');
  const artists = useAppSelector((state:any) => state.artist.allArtist)
  const category = useAppSelector((state:any) => state.category.allCategory)
  const detail = useAppSelector((state:any)=>state.reset.detail)

  const [value, setValue] = React.useState<Music>({
    name: detail.name,
    categoryId: detail.categoryId,
    source: detail.source,
    image: detail.image,
    artists: detail.artist.map((item:any) =>  ({id:item.id, label:item.name}))
  });
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<Music>({
    mode: 'onChange',
    defaultValues: {
      name: detail.name,
    categoryId: detail.category,
    source: detail.source,
    image: detail.image,
    artists:  detail.artist.map((item:any) =>  ({id:item.id, label:item.name}))
    },
    resolver: yupResolver(editMusicSchema),
  });
  const handleUpdateMusic = async () => {
    try {
      const ArrayIdArtist = value.artists.map((artist => String(artist.id)))
       const getData = await axiosInstance.put(`/musics/${detail.id}`, {
        name: value.name,
        categoryId: Number(value.categoryId),
        source: value.source?.name ? value.source?.name : value.source,
        image: value.image?.name ? value.image?.name : value.image,
        artists: ArrayIdArtist
      })
      if(detail.source !== (value.source?.name ? value.source?.name : value.source)){
        const data = await axios.post(`${process.env.REACT_APP_RECOMMEND_URL}/getembedding`, {
          url: `${process.env.REACT_APP_CLOUDFRONT_URL}/${process.env.REACT_APP_MUSIC_FOLDER}/${value.source?.name}`,
          rate: 0.5,
        });
        await axios.post(process.env.REACT_APP_API_BASE_URL + '/admin/embedding', {
          musicId: getData.data.id,
          embedding: data.data,
        });  

      }
       dispatch(setField(null));
       dispatch(setReset(!reset));
     } catch (error:any) {
      console.log(error?.response?.data?.description);
      setSubmitErr(error?.response.data?.description);
     }
  };
  const handleChangeArtist = (event: any, value1: any) => {
    const check = value.artists.filter((item: any) => item.id === value1.id);
    if (check.length !== 0) {
      setValue({ ...value, artists: value.artists });
    } else {
      const newArtist = [...value.artists, value1];
      setValue({ ...value, artists: newArtist as any });
      console.log("value:", newArtist)
    }
  };
  const handleChangeCategory = (event: any, value1: any) => {
    setValue({ ...value, categoryId: value1.id });
  };
  return (
    <Container>
        <MainWrapper>
          <Label>Sửa nhạc</Label>
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
          </FormControl>

        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>

        <CreateOptionInput 
            defaultValue={detail.category.name}
        onChange1={(event: any, value: any) => handleChangeCategory(event, value)}
          options={category && category} requiredIcon name="categoryId" label="Category" control={control} placeholder="Enter Category " />

        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%', marginTop: '10px' }}>
          <CreateOptionInput onChange1={(event: any, value: any) => handleChangeArtist(event, value)}
          options={artists && artists} requiredIcon name="artists" label="Artist" control={control} placeholder="Enter Artist " />
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
                        const newCategory = value.artists.filter((artist: any) => artist.id !== item.id);
                        setValue({ ...value, artists: newCategory });
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <S3Upload title="Nhạc" field="source" type="music-dev"
        music={value} setMusic={setValue} control={control} />
         <S3Upload title="Ảnh" field="image" type="images"
        music={value} setMusic={setValue} control={control} />
         {submitErr && <ErrorText mt={1}>{submitErr}</ErrorText>}
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit(handleUpdateMusic)}
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
