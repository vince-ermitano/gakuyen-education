import React, { useRef, useEffect, useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    toggleCreateSidebar,
    toggleLoginSidebar,
} from "../../features/SidebarSlice";
import { disableScroll, enableScroll } from "../../helpers";
import { auth, db } from "../../config/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import { BiArrowBack } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { checkHeaderColor } from "../../helpers";
import { useLocation } from "react-router-dom";


const LoginSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    const emailInputRef = useRef(null);

    // states
    const isOpen = useSelector((state) => state.sidebar.loginSidebarIsOpen);
    const createSidebarIsOpen = useSelector((state) => state.sidebar.createSidebarIsOpen);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    // functions
    const createSession = async (uid) => {
        const randomId = uuidv4();

        try {
            await setDoc(doc(db, "userSessions", uid), {
                sessionToken: randomId,
            });

            localStorage.setItem("sessionToken", randomId);
        } catch (e) {
            console.error(e);
        }
    }
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);

                // create session
                createSession(user.uid);

                toast.success("Logged in successfully!");

                // clear form fields
                setEmailAddress("");
                setPassword("");

                dispatch(toggleLoginSidebar());
                checkHeaderColor(currentPath);
                // dispatch(setLoggedInStatus(true));

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);

                // toast.error("Invalid username/password", {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     progress: undefined,
                // });

                toast.error("Invalid username/password");
            });
    }

    const switchSidebar = () => {
        dispatch(toggleCreateSidebar());
        dispatch(toggleLoginSidebar());
    };

    const handleBack = () => {
        dispatch(toggleLoginSidebar());
    }

    useEffect(() => {
        if (isOpen) {
            emailInputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen || createSidebarIsOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [isOpen, createSidebarIsOpen]);

    return (
        <div className="login-sidebar">
            <div className={`sidebar ${isOpen ? "open" : ""} `}>
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        type="email"
                        value={emailAddress}
                        name="login-email"
                        id="login-email"
                        placeholder="Email"
                        ref={emailInputRef}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        autoFocus
                    />
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        name="login-password"
                        id="login-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <button type="button">Forgot Password?</button>
                    </div>
                </form>
                <div className="create-account call-to-action">
                    <span>Don't have an account? &nbsp;</span>
                    <button type="button" onClick={() => switchSidebar()}>
                        Create Account
                    </button>
                </div>
                <button className="mobile" onClick={handleBack}>Back<BiArrowBack /></button>
            </div>
            <div
                className={`overlay ${isOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleLoginSidebar())}
            ></div>
        </div>
    );
};

export default LoginSidebar;
