import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface States {
    field: string | null,
    reset:boolean,
    detail: any | null
}

const initialState: States = {
    field: null,
    reset: false,
    detail: null
};

export const resetSlice: any = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<States>) => {
        state.field = action.payload as any;
      },
      setReset: (state, action: PayloadAction<States>) => {
        state.reset = action.payload as any;
      },
      setDetail: (state, action: PayloadAction<States>) => {
        state.detail = action.payload as any;
      },
  },
});

export const { setField,setReset,setDetail } = resetSlice.actions;

const { reducer: resetReducer } = resetSlice;

export default resetReducer;
