import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;