import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: {},
    currentProduct: null,
};

const shopSlice = createSlice({
    name: "shop",
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    }
});

export const { setProducts, setLoading, setCurrentProduct } = shopSlice.actions;
export default shopSlice.reducer;