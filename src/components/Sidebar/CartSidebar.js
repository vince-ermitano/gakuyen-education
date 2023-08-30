import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
// import { products } from "../../products/products";
import CartItem from "./CartItem";
import { toggleCartSidebar } from "../../features/SidebarSlice";
import { calculateTotalPrice } from "../../features/ShopSlice";

// TODO: Add ability to add items to cart that are not Presets/Masterclasses

const CartSidebar = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.sidebar.cartSidebarIsOpen);
    const cartTotal =  useSelector((state) => state.shop.totalPrice);

    const cartItems = isOpen ? JSON.parse(localStorage.getItem('cart')) || {} : {};

    useEffect(() => {
        dispatch(calculateTotalPrice());
    }, [dispatch]);


    return (
        <div className="cart-sidebar">
            <div className={`right-sidebar ${isOpen ? "open" : ""} `}>
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
                    <button className="darkgray-background">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCartSidebar())}
            ></div>
        </div>
    );
};

export default CartSidebar;