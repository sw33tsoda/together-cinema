import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'search_modal',
    initialState: {
        toggle:false,
    },
    reducers: {
        setToggleSearchModel: (state,action) => {
            switch (action.payload) {
                case 'on':
                    state.toggle = true;
                    break;
                case 'off':
                    state.toggle = false;
                    break;
                case 'toggle':
                    state.toggle = !state.toggle;
                    break;
                default:
                    break;
            }
        }
    }
});

export const { setToggleSearchModel } = searchSlice.actions;
export default searchSlice.reducer;