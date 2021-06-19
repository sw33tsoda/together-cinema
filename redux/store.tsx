import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import videoPlayerSlice from './slices/videoPlayerSlice';

const store = configureStore({
    reducer: {
        "search":searchSlice,
        "video-player":videoPlayerSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;