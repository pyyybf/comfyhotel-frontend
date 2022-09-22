import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import userSlice from "./modules/user";

export default configureStore({
    reducer: {
        user: userSlice
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
})