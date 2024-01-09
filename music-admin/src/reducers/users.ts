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
interface TotalUser{
    user: User[],
    allUser: User[]
}
interface States {
  users: TotalUser | null;
  allUser: TotalUser | null;
}

const initialState: States = {
    users: null,
    allUser:null
};

export const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setAllUser: (state, action: PayloadAction<TotalUser>) => {
      state.allUser = action.payload;
    },
    setUserFilter: (state, action: PayloadAction<TotalUser>) => {
        state.users = action.payload;
      },
  },
});

export const { setAllUser,setUserFilter } = userSlice.actions;

const { reducer: userReducer } = userSlice;

export default userReducer;
