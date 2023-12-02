import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theOdyssey: {},
    currentVideo: null,
    currentCourseOverviewModule: "M-01",
    isLoading: true,
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
        },
        setCurrentCourseOverviewModule: (state, action) => {
            state.currentCourseOverviewModule = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setTheOdyssey, setCurrentVideo, setCurrentCourseOverviewModule, setIsLoading } = coursesSlice.actions;
export default coursesSlice.reducer;