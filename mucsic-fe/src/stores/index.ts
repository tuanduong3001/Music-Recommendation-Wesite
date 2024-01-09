import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import musicReducer from "../reducers/music";



const store = configureStore({
    reducer: {
        auth: authReducer,
        music: musicReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store; 
export default store;