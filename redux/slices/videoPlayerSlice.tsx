import { createSlice } from "@reduxjs/toolkit";

const videoPlayerSlice = createSlice({
    name:'video-player',
    initialState: {
        toggle:false,
        videos:[],
        selectedVideo:'',
    },
    reducers: {
        setToggleVideoPlayer: (state,action) => {
            state.toggle = true;
            if (action.payload.length > 0) {
                state.videos = [...action.payload];
                state.selectedVideo = action.payload[0].key;
            }
        },
        setVideo: (state,action) => {
            state.selectedVideo = action.payload;
        },
        closeVideoPlayer:(state) => {
            state.toggle = false;
            state.videos = [];
        }
    }
});

export const { setToggleVideoPlayer,closeVideoPlayer,setVideo } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;