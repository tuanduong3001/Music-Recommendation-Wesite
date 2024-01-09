import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Artist{
    name:string, 
    image:string,
    title:string

}
interface TotalArtist{
    artist: Artist[],
    allArtist: Artist[]
}

interface States {
    artist: Artist | null,
    allArtist:Artist | null,
}
const initialState: States = {
    artist: null,
    allArtist: null
  };
  
export const artistSlice: any = createSlice({
    name: 'artist',
    initialState,
    reducers: {
      setArtist: (state, action: PayloadAction<TotalArtist>) => {
        state.artist = action.payload as any;
      },
      setAllArtist: (state, action: PayloadAction<TotalArtist>) => {
        state.allArtist = action.payload as any;
      },
    },
  });

export const { setArtist,setAllArtist } = artistSlice.actions;

const { reducer: artistReducer } = artistSlice;

export default artistReducer;
