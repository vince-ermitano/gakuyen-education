import React from 'react';
import './Receipt.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
import { BiArrowBack } from "react-icons/bi";


const Receipt = () => {
    document.title = "Thank You For Your Order! | The Odyssey"
    window.scrollTo(0, 0);

    const navigate = useNavigate();

    return (
        <section id="receipt-section">
            <div className="receipt-header">
                <Logo />
                <h1>Thank you for your order!</h1>
                <p>
                    Order ID <span>134098134</span>
                </p>
            </div>
            <div className='order-details'>
                <h2>Order Details</h2>
                <hr></hr>
                <div className='order-details-item'>
                    <p>Product Name</p>
                    <p>$10</p>
                </div>
                <div className='order-details-item'>
                    <p>Product Name</p>
                    <p>$10</p>
                </div>
                <div className='order-details-item'>
                    <p>Product Name</p>
                    <p>$10</p>
                </div>
                <hr></hr>
                <div className='order-details-item total'>
                    <p>Total</p>
                    <p>$30</p>
                </div>
            </div>
            <button onClick={() => navigate("/")}><BiArrowBack />Back to Home</button>
        </section>
    );
}

export default Receipt;