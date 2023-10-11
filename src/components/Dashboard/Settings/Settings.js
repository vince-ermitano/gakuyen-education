import React from "react";
import { useSelector } from "react-redux";
import "./Settings.css";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";
import { auth } from "../../../config/firebaseConfig";

const Settings = () => {

    const user = auth.currentUser;
    const userInfo = useSelector((state) => state.user.userInfo);

    return (
        <div className="my-profile-view">
            <h1>My Profile</h1>
            <div className="name-and-email">
                <VscAccount />
                <div id="name-and-email-text">
                    <h3>{user.displayName}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className="personal-info">
                <h2>Personal Information</h2>
                <div className="first-and-last-name">
                    <div className="first-name info-group">
                        <p>First Name</p>
                        <p>{userInfo.firstName}</p>
                    </div>
                    <div className="last-name info-group">
                        <p>Last name</p>
                        <p>{userInfo.lastName}</p>
                    </div>
                </div>
                <div className="email-and-phone">
                    <div className="email info-group">
                        <p>Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="phone info-group">
                        <p>Phone</p>
                        <p>{user.phoneNumber ? user.phoneNumber : '-'}</p>
                    </div>
                    <div className="edit-button">

                        <span>Edit</span>
                        <AiOutlineEdit />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
