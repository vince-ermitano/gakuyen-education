import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
// import { products } from "../../products/products";
import CartItem from "./CartItem";
import { toggleCartSidebar } from "../../features/SidebarSlice";

const CartSidebar = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector((state) => state.sidebar.cartSidebarIsOpen);

    const cartItems = JSON.parse(localStorage.getItem("cart"));

    return (
        <div className="cart-sidebar">
            <div className={`right-sidebar ${isOpen ? "open" : ""} `}>
                <div className="cart-info">
                    <h2>Cart</h2>
                    {/* <CartItem item={products.presets.ultimate_preset_pack} />
                    <CartItem
                        item={products.presets.ultimate_transition_pack}
                    /> */}
                    {cartItems ? (
                        cartItems.map((item) => (
                            <CartItem key={item} itemId={item} />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )
                    }
                </div>

                <div className="bottom-info">
                    <hr />
                    <span>Total USD</span>
                    <br />
                    <button className="darkgray-background">Proceed to Checkout</button>
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