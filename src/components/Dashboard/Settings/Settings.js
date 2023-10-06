import React from "react";
import "./Settings.css";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";

const Settings = () => {

    return (
        <div className="my-profile-view">
            <h1>My Profile</h1>
            <div className="name-and-email">
                <VscAccount />
                <div id="name-and-email-text">
                    <h3>Kai Lange</h3>
                    <p>kaibancho@gmail.com</p>
                </div>
            </div>
            <div className="personal-info">
                <h2>Personal Information</h2>
                <div className="first-and-last-name">
                    <div className="first-name info-group">
                        <p>First name</p>
                        <p>Kai</p>
                    </div>
                    <div className="last-name info-group">
                        <p>Last name</p>
                        <p>Lange</p>
                    </div>
                </div>
                <div className="email-and-phone">
                    <div className="email info-group">
                        <p>Email</p>
                        <p>kaibancho@gmail.com</p>
                    </div>
                    <div className="phone info-group">
                        <p>Phone</p>
                        <p>+1 123-456-7890</p>
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
