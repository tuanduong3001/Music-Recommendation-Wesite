import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Music{
    name:string, 

}
interface TotalMusic{
    musics: Music[],
    allMusic: Music[]
}

interface States {
    musics: Music | null,
    allMusic:Music | null,
}
const initialState: States = {
    musics: null,
    allMusic: null
  };
  
export const musicSlice: any = createSlice({
    name: 'music',
    initialState,
    reducers: {
      setMusic: (state, action: PayloadAction<TotalMusic>) => {
        state.musics = action.payload as any;
      },
      setAllMusic: (state, action: PayloadAction<TotalMusic>) => {
        state.allMusic = action.payload as any;
      },
    },
  });

export const { setMusic,setAllMusic } = musicSlice.actions;

const { reducer: musicReducer } = musicSlice;

export default musicReducer;
