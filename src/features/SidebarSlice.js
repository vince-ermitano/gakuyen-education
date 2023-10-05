import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginSidebarIsOpen: false,
    createSidebarIsOpen: false,
    cartSidebarIsOpen: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        toggleLoginSidebar: (state) => {
            state.loginSidebarIsOpen = !state.loginSidebarIsOpen;
        },
        setLoginSidebar: (state, action) => {
            state.loginSidebarIsOpen = action.payload;
        },
        toggleCreateSidebar: (state) => {
            state.createSidebarIsOpen = !state.createSidebarIsOpen;
        },
        toggleCartSidebar: (state) => {
            state.cartSidebarIsOpen = !state.cartSidebarIsOpen;
        }
    }
});

export const { toggleLoginSidebar, toggleCreateSidebar, toggleCartSidebar, setLoginSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;