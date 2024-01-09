import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth';
import categoryReducer from '../reducers/category';
import resetReducer from '../reducers/reset';
import userReducer from '../reducers/users';
import musicReducer from '../reducers/music';
import artistReducer from '../reducers/artist';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    reset: resetReducer,
    category: categoryReducer,
    music: musicReducer,
    artist: artistReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;
