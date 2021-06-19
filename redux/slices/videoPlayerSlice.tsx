import { createSlice } from "@reduxjs/toolkit";

const videoPlayerSlice = createSlice({
    name:'video-player',
    initialState: {
        toggle:false,
        selectedVideoId:'',
    },
    reducers: {
        setVideoPlayer:(state,action) => {
            state.toggle = true;
            state.selectedVideoId = action.payload;
        },
        closeVideoPlayer:(state) => {
            state.toggle = false;
            state.selectedVideoId = '';
        }
    }
});

export const { setVideoPlayer,closeVideoPlayer } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;