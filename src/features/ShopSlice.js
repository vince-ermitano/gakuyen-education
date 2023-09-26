import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: {},
    currentProduct: null,
    totalPrice: 0,
    loginDialogVisibility: false,
};

const calculateTotalPrice = () => {
    return (dispatch, getState) => {

        const cartItems = JSON.parse(localStorage.getItem('cart')) || {};
        const products = getState().shop.products;

        let totalPrice = 0;

        // console.log(cartItems);
        // console.log(products);

        for (const itemId in cartItems) {
            if (cartItems.hasOwnProperty(itemId) && products.hasOwnProperty(itemId)) {
                totalPrice += cartItems[itemId] * products[itemId].price;
            }
        }

        // console.log(totalPrice);
        
        dispatch({
            type: 'shop/setTotalPrice',
            payload: totalPrice
        });
    };
};


const addToCart = (product) => {
    return (dispatch, getState) => {
        const updatedCart = { ...getState().shop.cart, [product]: 1 };
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch({
            type: 'shop/addProductToCart',
            payload: updatedCart
        });
    };
};

const removeFromCart = (product) => {
    return (dispatch, getState) => {
        const updatedCart = { ...getState().shop.cart };
        delete updatedCart[product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        dispatch({
            type: 'shop/removeProductFromCart',
            payload: updatedCart
        });
    };
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
        },
        addProductToCart: (state, action) => {
            state.cart = action.payload;
        },
        removeProductFromCart: (state, action) => {
            state.cart = action.payload;
        },
        setInitialTotalPrice: (state) => {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || {};
            const products = state.products;
            let totalPrice = 0;

            for (const itemId in cartItems) {
                if (cartItems.hasOwnProperty(itemId) && products.hasOwnProperty(itemId)) {
                    totalPrice += cartItems[itemId] * products[itemId].price;
                }
            }

            state.totalPrice = totalPrice;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setLoginDialogVisibility: (state, action) => {
            state.loginDialogVisibility = action.payload;
        }
    }
});

export const { setProducts, setLoading, setCurrentProduct, addProductToCart, removeProductFromCart, setInitialTotalPrice, setTotalPrice, setLoginDialogVisibility } = shopSlice.actions;
export { addToCart, removeFromCart, calculateTotalPrice };
export default shopSlice.reducer;