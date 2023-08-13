import React from "react";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const CartSidebar = () => {

    const isOpen = useSelector((state) => state.sidebar.cartSidebarIsOpen);

    return (
        <div className="cart-sidebar">
            <div className={`right-sidebar ${isOpen ? "open" : ""} `}>
                <h2>Cart</h2>
            </div>
        </div>
    );
};

export default CartSidebar;