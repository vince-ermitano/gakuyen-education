import React from "react";
import './Header_logged_out.css';
import Hamburger from '../Hamburger/Hamburger';
import { useSelector, useDispatch } from "react-redux";
import { toggleLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { Link } from "react-router-dom";

const Header = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);

    const headerLoggedOut = (
        <div className="header">
                <div className="logo">
                    <Link to="/"><span>GAKUYEN EDUCATION</span></Link>
                </div>
                <Hamburger />
                <div className="user-directory">
                    <span>LOGIN</span>
                    <span className="darkgray-background">GET STARTED</span>
                </div>
            </div>
    );
    
    const headerLoggedIn = (
        <div className="header">
                <div className="logo">
                    <span>GAKUYEN EDUCATION</span>
                </div>
                <Hamburger />
                <div className="user-directory">
                    <span>MY ACCOUNT</span>
                    <span>CART</span>
                </div>
            </div>
    );

    return (
        <div>
            {isLoggedIn ? headerLoggedIn : headerLoggedOut}
            <button id='mock-log' onClick={() => { dispatch(toggleLoggedInStatus()); }}>Toggle Logged In Status</button>
            {/* {isLoggedIn ? <span>Logged In</span> : <span>Logged Out</span>} */}
        </div>
    );
}

export default Header;