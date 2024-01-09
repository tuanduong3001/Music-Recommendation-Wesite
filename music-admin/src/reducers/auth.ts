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
interface States {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: States = {
  isAuthenticated: false,
  user: null
};

export const authSlice: any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthenticated,setUser } = authSlice.actions;

const { reducer: authReducer } = authSlice;

export default authReducer;
