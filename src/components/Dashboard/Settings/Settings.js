import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Settings.css";
import { setUserInfo } from "../../../features/UserSlice";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";
import { auth } from "../../../config/firebaseConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Settings = () => {
    document.title = "The Odyssey Dashboard | Settings";

    const dispatch = useDispatch();
    const user = auth.currentUser;
    const userInfo = useSelector((state) => state.user.userInfo);
    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const navigate = useNavigate();

    const onClickEdit = () => {
        const settings = document.querySelector(".personal-info");
        const inputsInEdit = settings.querySelectorAll("input");
        const saveBtn = settings.querySelector(".save-button");
        const editBtn = settings.querySelector(".edit-button");
        const hideOnEdit = settings.querySelectorAll(".hide-on-edit");

        inputsInEdit.forEach((input) => {
            input.style.display = "block";
        });

        hideOnEdit.forEach((element) => {
            element.style.display = "none";
        });

        editBtn.style.display = "none";
        saveBtn.style.display = "flex";
    };

    const onClickSave = () => {
        const settings = document.querySelector(".personal-info");
        const inputsInEdit = settings.querySelectorAll("input");
        const saveBtn = settings.querySelector(".save-button");
        const editBtn = settings.querySelector(".edit-button");
        const hideOnEdit = settings.querySelectorAll(".hide-on-edit");

        //check if name is the same as before
        if (
            firstName === userInfo.firstName &&
            lastName === userInfo.lastName
        ) {
            inputsInEdit.forEach((input) => {
                input.style.display = "none";
            });

            hideOnEdit.forEach((element) => {
                element.style.display = "block";
            });

            editBtn.style.display = "flex";
            saveBtn.style.display = "none";

            return;
        }

        const updateUserInfo = async () => {
            auth.currentUser
                .getIdToken(true)
                .then((idToken) => {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/user-info`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                        }),
                    })
                        .then((res) => {
                            if (res.ok) return res.text();
                            return res
                                .text()
                                .then((error) => Promise.reject(error));
                        })
                        .then((res) => {
                            toast.success(res);

                            inputsInEdit.forEach((input) => {
                                input.style.display = "none";
                            });

                            hideOnEdit.forEach((element) => {
                                element.style.display = "block";
                            });

                            editBtn.style.display = "flex";
                            saveBtn.style.display = "none";

                            dispatch(
                                setUserInfo({
                                    firstName: firstName,
                                    lastName: lastName,
                                })
                            );
                        })
                        .catch((e) => {
                            console.error(e);
                            toast.error(e);
                        });
                })
                .catch((e) => {
                    console.error(e.error);
                });
        };

        updateUserInfo();
    };

    return (
        <div className="my-profile-view">
            <button
                className="mobile back-to-dashboard-home-btn"
                onClick={() => navigate("/dashboard/main")}
            >
                <BiArrowBack />
                Back
            </button>

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
                        <p className="hide-on-edit">{userInfo.firstName}</p>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="last-name info-group">
                        <p>Last name</p>
                        <p className="hide-on-edit">{userInfo.lastName}</p>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="email-and-phone">
                    <div className="email info-group">
                        <p>Email</p>
                        <p>{user.email}</p>
                        {/* <input type="email" id="email" name="email" value={user.email}/> */}
                    </div>
                    {/* <div className="phone info-group">
                        <p>Phone</p>
                        <p>{user.phoneNumber ? user.phoneNumber : '-'}</p>
                        <input type="text" id="phone" name="phone" value={user.phoneNumber}/>
                    </div> */}
                    <div className="edit-button" onClick={onClickEdit}>
                        <span>Edit</span>
                        <AiOutlineEdit />
                    </div>

                    <div className="save-button" onClick={onClickSave}>
                        <span>Save</span>
                        <AiOutlineEdit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
