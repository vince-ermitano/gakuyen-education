import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theOdyssey: {},
    currentVideo: null,
}

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setTheOdyssey: (state, action) => {
            state.theOdyssey = action.payload;
        },
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        }
    }
});

export const { setTheOdyssey, setCurrentVideo } = coursesSlice.actions;
export default coursesSlice.reducer;