import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const loggedInStatusSlice = createSlice({
    name: 'loggedIn',
    initialState: initialState,
    reducers: {
        toggleLoggedInStatus: (state) => {
            state.isLoggedIn= !state.isLoggedIn;
        }
    }
});

export const { toggleLoggedInStatus } = loggedInStatusSlice.actions;
export default loggedInStatusSlice.reducer;