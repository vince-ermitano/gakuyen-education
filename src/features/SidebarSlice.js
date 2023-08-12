import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginSidebarIsOpen: false,
    createSidebarIsOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        toggleLoginSidebar: (state) => {
            state.loginSidebarIsOpen = !state.loginSidebarIsOpen;
        },
        toggleCreateSidebar: (state) => {
            state.createSidebarIsOpen = !state.createSidebarIsOpen;
        }
    }
});

export const { toggleLoginSidebar, toggleCreateSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;