import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    createSidebarIsOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        toggleCreateSidebar: (state) => {
            state.createSidebarIsOpen = !state.createSidebarIsOpen;
        }
    }
});

export const { toggleSidebar, toggleCreateSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;