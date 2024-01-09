import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
  email:string,
  password:string,
  avatar:string,
  id: number,
  createAt: string,
  updateAt: string,
  name:string
}
interface State{
    isAuth:boolean,
    changePassword:boolean,
    user:User | null
  }

const initialState:State ={
    user:null,
    isAuth:false,
    changePassword:false

}

export const authSlice:any = createSlice({
    name: "auth",
    initialState,
    reducers: {
      
       setAuth: (state, action:PayloadAction<boolean>) =>{
        state.isAuth = action.payload as boolean
       },
       setUser: (state, action:PayloadAction<User>) =>{
        state.user = action.payload
       },
       setChangePassword: (state, action:PayloadAction<boolean>) =>{
        state.changePassword = action.payload as boolean
       },
    }
})

export const { setUser,setAuth, setChangePassword} = authSlice.actions;
const {reducer: authReducer} = authSlice;
export default authReducer