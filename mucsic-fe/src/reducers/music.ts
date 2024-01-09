import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface State{
    music:any | null,
    recommentSongs:any| null,
    allMusic: any | null,
    isPlaying: boolean,
    displayList: boolean,
    activeList: boolean,
    list:any | null,
    Id: number
  }

const initialState:State ={
    music:null,
    isPlaying: false,
    allMusic:null,
    displayList: false,
    activeList: true,
    recommentSongs: null,
    list:null,
    Id:-1
}

export const musicSlice:any = createSlice({
    name: "music",
    initialState,
    reducers: {
       setMusic: (state, action:PayloadAction<any>) =>{
        state.music = action.payload
       },
       setAllMusic: (state, action:PayloadAction<any>) =>{
        state.allMusic = action.payload
       },
       setRecommentMusic: (state, action:PayloadAction<any>) =>{
        state.recommentSongs = action.payload
       },
       setList: (state, action:PayloadAction<any>) =>{
        state.list = action.payload
       },
       setDisplayList: (state, action:PayloadAction<any>) =>{
        state.displayList = action.payload
       },
       setActiveList: (state, action:PayloadAction<any>) =>{
        state.activeList = action.payload
       },
       setPlaying: (state, action:PayloadAction<any>) =>{
        state.isPlaying = action.payload
       },
       setId: (state, action:PayloadAction<any>) =>{
        state.Id = action.payload
       },
    }
})

export const { setMusic,setId, setPlaying, setAllMusic,setRecommentMusic,setList,setDisplayList, setActiveList} = musicSlice.actions;
const {reducer: musicReducer} = musicSlice;
export default musicReducer