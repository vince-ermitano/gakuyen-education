import React, { useRef, useEffect, useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    toggleCreateSidebar,
    toggleLoginSidebar,
} from "../../features/SidebarSlice";
import { auth, db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toggleLoggedInStatus } from "../../features/LoggedInStatusSlice";

const CreateAccountSidebar = () => {
    const dispatch = useDispatch();
    const firstNameInputRef = useRef(null);

    // Firebase
    const usersCollectionRef = collection(db, "users");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isOpen = useSelector((state) => state.sidebar.createSidebarIsOpen);

    const switchSidebar = () => {
        dispatch(toggleCreateSidebar());
        dispatch(toggleLoginSidebar());
    };

    const createAccount = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setPassword("");
            setConfirmPassword("");
            return;
        }
        createUserWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => {
                // Signed in
                dispatch(toggleLoggedInStatus());
                const user = userCredential.user;
                console.log(user);

                // Add user's first and last name to their profile
                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`,
                });

                // Add user's first and last name to the database
                addDoc(usersCollectionRef, {
                    firstName: firstName,
                    lastName: lastName,
                    email: emailAddress,
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    }
                    )
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    }
                    );

                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };



    useEffect(() => {
        if (isOpen) {
            firstNameInputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="create-sidebar">
            <div className={`sidebar ${isOpen ? "open" : ""} `}>
                <h2>Create Account</h2>
                <form onSubmit={createAccount}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        placeholder="First Name"
                        ref={firstNameInputRef}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirm-password"> Confirm Password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="button-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <div className="login-to-account call-to-action">
                    <span>Already have an account? &nbsp;</span>
                    <button type="button" onClick={() => switchSidebar()}>
                        Login
                    </button>
                </div>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCreateSidebar())}
            ></div>
        </div>
    );
};

export default CreateAccountSidebar;
