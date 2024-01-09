import * as React from 'react';
import { styled, Box, BoxProps, TextField, InputAdornment,Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector, useAppDispatch} from '../../stores/hook';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUsers';
import { useMusic } from '../../hooks/useMusic';
import { useCategory } from '../../hooks/useCategory';
import { useArtist } from '../../hooks/useArtist';


const Wrapper = styled(Box)<BoxProps>({
    display: "flex",
    alignItems: "center"
  })
  
  export const SearchView = (layout:any) => {
    const [search, setSearch] = React.useState({
      type: "search",
      value: null
    })
    const [option, setOption] = React.useState([])
    const allUser = useAppSelector((state:any)=>state.user.allUser)
    const allMusics = useAppSelector((state:any)=>state.music.allMusic)
    const allCategory = useAppSelector((state:any)=>state.category.allCategory)
    const allArtist = useAppSelector((state:any)=>state.artist.allArtist)
    const location = useLocation();
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        if(layout.layout === 'users'){
          setOption(allUser)
        }
        else if(layout.layout === "musics"){
          setOption(allMusics)

        }
        else if(layout.layout === "categories"){
          setOption(allCategory)

        }
        else if(layout.layout === "artists"){
          setOption(allArtist)

        }
    },[layout])

    if(layout.layout === 'users'){
      useUser(location, dispatch, search.type, search.value) 
    }
    else if(layout.layout === 'musics'){
      useMusic(location, dispatch, search.type, search.value) 

    }
    else if(layout.layout === 'categories'){
      useCategory(location, dispatch, search.type, search.value) 

    }
    else if(layout.layout === 'artists'){
      useArtist(location, dispatch, search.type, search.value) 

    }
  
    const handleKeyPress = (e:any)=>{
        if(e.key === "Enter"){
          setSearch({
            type:"search",
            value: e.target.value
          })
        }
      }
     
    const handleChange = (event:any, value:any)=>{
      if(event.target.value !== undefined){
       if(layout.layout === "films"){
        setSearch({
          type:"actors",
          value: value.label
        })
       }
       else if(layout.layout === "actors"){
        setSearch({
          type:"search",
          value: value.label
        })
       }
       else{
         setSearch({
          type:"search",
          value: value.label
        })
       }
      }
      else {
        setSearch({
          type:"actors",
          value: null
        })
      }
    }
  
  
   return (
      <Wrapper>
        <TextField
          label="Tìm kiếm"
          onKeyPress={handleKeyPress}
          sx={{ width: "350px", marginRight: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
         <Autocomplete
        disablePortal
        onChange={(event, value)=>handleChange(event,value)}
        id="combo-box-demo"
        options={option && option.map((item:any)=>({id: item.id, label: item.name}))}
        sx={{ width: 300 }}
        renderInput={(params:any) => <TextField {...params} label={layout.layout === "films" || layout.layout === "actors"  ? "Actor" : layout.layout} />}
      />
      </Wrapper>
    );
  }