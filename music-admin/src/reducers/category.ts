import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category{
    name:string, 

}
interface TotalCategory{
    categories: Category[],
    allCategory: Category[]
}

interface States {
    categories: Category | null,
    allCategory:Category | null,
}
const initialState: States = {
    categories: null,
    allCategory: null
  };
  
export const categorySlice: any = createSlice({
    name: 'category',
    initialState,
    reducers: {
      setCategory: (state, action: PayloadAction<TotalCategory>) => {
        state.categories = action.payload as any;
      },
      setAllCategory: (state, action: PayloadAction<TotalCategory>) => {
        state.allCategory = action.payload as any;
      },
    },
  });

export const { setCategory,setAllCategory } = categorySlice.actions;

const { reducer: categoryReducer } = categorySlice;

export default categoryReducer;
