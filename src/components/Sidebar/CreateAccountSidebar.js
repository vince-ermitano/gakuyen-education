import React, { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    toggleCreateSidebar,
    toggleLoginSidebar,
} from "../../features/SidebarSlice";
import { auth, db } from "../../config/firebaseConfig";
import { BiArrowBack } from "react-icons/bi";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
// import { toast } from 'react-toastify';
import { toast } from "sonner";
// import 'react-toastify/dist/ReactToastify.css';

const CreateAccountSidebar = () => {
    const dispatch = useDispatch();
    const firstNameInputRef = useRef(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const isOpen = useSelector((state) => state.sidebar.createSidebarIsOpen);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // functions
    const alertMessage = (type) => {
        // if (type === 'createSuccess') {
        //     toast.success('Account created successfully!', {
        //         position: "top-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true, 
        //         progress: undefined,
        //     });
        // }
        switch (type) {
            case "createSuccess":
                toast.success("Account created successfully!");
                break;
            
            case "userAddedToDatabase":
                toast.success("Info added to account successfully!")
                break;

            case "userFailedToAddToDatabase":
                toast.error("Failed to add info to database :(");
                break;

            case "emailAlreadyExists":
                toast.error("Email already exists!");
                break;
            default:
                break;
        }

    }
    const switchSidebar = () => {
        dispatch(toggleLoginSidebar());
        dispatch(toggleCreateSidebar());
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
            .then(async (userCredential) => {
                alertMessage("createSuccess");
                // Signed in
                // dispatch(setLoggedInStatus(true));

                // Clear form
                setFirstName("");
                setLastName("");
                setEmailAddress("");
                setPassword("");
                setConfirmPassword("");

                // Add user's first and last name to their profile
                updateProfile(auth.currentUser, {
                    displayName: `${firstName} ${lastName}`,
                });

                // log user id
                console.log(userCredential.user.uid);

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: emailAddress,
                    purchasedItems: {},
                })
                    .then((docRef) => {
                        alertMessage("userAddedToDatabase");
                    })
                    .catch((error) => {
                        alertMessage("userFailedToAddToDatabase");
                        console.error("Error adding document: ", error);
                    });

                // //Add user's first and last name to the database
                // addDoc(usersCollectionRef, {
                //     firstName: firstName,
                //     lastName: lastName,
                //     email: emailAddress,
                //     purchasedItems: [],
                // })
                //     .then((docRef) => {
                //         alertMessage("userAddedToDatabase");
                //         console.log("Document written with ID: ", docRef.id);
                //     })
                //     .catch((error) => {
                //         alertMessage("userFailedToAddToDatabase");
                //         console.error("Error adding document: ", error);
                //     });
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    const emailInput = document.getElementById("email");

                    setErrorMessage("Email already in use");
                    emailInput.classList.add("error-input");

                    alertMessage('emailAlreadyExists');
                    setEmailAddress("");
                    return;
                }

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         disableScroll();
    //     } else {
    //         enableScroll();
    //     }
    // }, [isOpen]);

    useEffect(() => {
        if (isOpen && !isMobile) {
            firstNameInputRef.current.focus();
        }
    }, [isOpen, isMobile]);

    useEffect(() => {
        // DOM elements
        const emailInput = document.getElementById("email");

        const inputChangeListener = () => {
            //   setEmail(emailInput.value);
            setErrorMessage("");
            emailInput.classList.remove("error-input");
        };

        emailInput.addEventListener("input", inputChangeListener);

        return () => {
            // Clean up the event listener when the component unmounts
            emailInput.removeEventListener("input", inputChangeListener);
        };
    }, []);

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
                        required
                        maxLength={50}
                    />
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        maxLength={50}
                    />
                    <label htmlFor="email">Email</label>
                    <div id="email-error-message">{errorMessage}</div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={emailAddress}
                        maxLength={320}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <label htmlFor="confirm-password"> Confirm Password</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
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
                <button className="mobile" onClick={() => dispatch(toggleCreateSidebar())}>Back<BiArrowBack /></button>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCreateSidebar())}
            ></div>
        </div>
    );
};

export default CreateAccountSidebar;
