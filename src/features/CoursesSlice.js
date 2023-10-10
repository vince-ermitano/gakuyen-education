import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theOdyssey: {},
}

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setTheOdyssey: (state, action) => {
            state.theOdyssey = action.payload;
        }
    }
});

export const { setTheOdyssey } = coursesSlice.actions;
export default coursesSlice.reducer;