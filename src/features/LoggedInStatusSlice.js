import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const loggedInStatusSlice = createSlice({
    name: 'loggedIn',
    initialState: initialState,
    reducers: {
        // toggleLoggedInStatus: (state) => {
        //     state.isLoggedIn= !state.isLoggedIn;
        // },
        setLoggedInStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const { setLoggedInStatus } = loggedInStatusSlice.actions;
export default loggedInStatusSlice.reducer;