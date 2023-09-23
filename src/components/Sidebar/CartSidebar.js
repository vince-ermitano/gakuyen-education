import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
// import { products } from "../../products/products";
import CartItem from "./CartItem";
import { toggleCartSidebar, toggleLoginSidebar } from "../../features/SidebarSlice";
import { calculateTotalPrice } from "../../features/ShopSlice";
import { auth } from "../../config/firebaseConfig";
import { toast } from "react-toastify";

// TODO: Add ability to add items to cart that are not Presets/Masterclasses

const CartSidebar = () => {

    const dispatch = useDispatch();

    // redux states
    const cartSidebarIsOpen = useSelector((state) => state.sidebar.cartSidebarIsOpen);
    const cartTotal =  useSelector((state) => state.shop.totalPrice);


    const cartItems = cartSidebarIsOpen ? JSON.parse(localStorage.getItem('cart')) || {} : {};


    // DOM elements
    const loginDialog = document.getElementById("login_dialog");

    // handle functions
    const handleProceedToCheckout = useCallback(() => {

        if (localStorage.getItem('cart') === '{}') {
            toast.error("Your cart is empty")
            return;
        }

        if (!auth.currentUser) {
            loginDialog.showModal();
            return;
        }

        createCheckoutSession();
        
    }, [loginDialog]);

    const createCheckoutSession = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: localStorage.getItem('cart')
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e.error)
        })
    }

    const handleProceedWithoutLogin = () => {
        loginDialog.close();
        createCheckoutSession();
    }

    const handleLogin = () => {
        loginDialog.close();
        dispatch(toggleCartSidebar());
        dispatch(toggleLoginSidebar());
    }

    const handleClickOutsideDialog = (event) => {
        if (event.target === loginDialog) {
            loginDialog.close();
        }
    }

    useEffect(() => {
        dispatch(calculateTotalPrice());

        // setup event listeners
        const handleClickOutside = (event) => {
            if (event.target === loginDialog) {
                loginDialog.close();
            }
        }

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [dispatch, loginDialog, handleProceedToCheckout]);


    return (
        <div className="cart-sidebar">
            <div
                className={`right-sidebar ${cartSidebarIsOpen ? "open" : ""} `}
            >
                <div className="cart-info">
                    <h2>Cart</h2>
                    {Object.keys(cartItems).length > 0 ? (
                        Object.keys(cartItems).map((itemId) => (
                            <CartItem key={itemId} itemId={itemId} />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>

                <div className="bottom-info">
                    <hr />
                    <div className="total">
                        <span>Total USD</span>
                        <span>${cartTotal}</span>
                    </div>
                    <br />
                    <button
                        className="darkgray-background"
                        onClick={handleProceedToCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <div
                className={`overlay ${cartSidebarIsOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCartSidebar())}
            ></div>

            <dialog id="login_dialog" onClick={handleClickOutsideDialog}>
                <div className="dialog__content">
                    <h2>Would you like to log in?</h2>
                    <p>
                        Logging in will allow you maintain access to your
                        purchases through your dashboard. <br></br>Not logging
                        in will allow you to make a one-time purchase.
                    </p>
                    <div className="selection-buttons">
                        <button id='proceed_without_btn' onClick={handleProceedWithoutLogin}>Proceed without logging in</button>
                        <button id='login_btn' onClick={handleLogin}>Log in</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CartSidebar;