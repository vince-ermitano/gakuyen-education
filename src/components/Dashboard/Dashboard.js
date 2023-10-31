import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTheOdyssey } from "../../features/CoursesSlice";
import { setIsPurchasedItemsLoaded } from "../../features/UserSlice";
import { setLoggedInStatus } from "../../features/LoggedInStatusSlice";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { BiBook, BiSlider, BiPalette } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../config/firebaseConfig";
// import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
// import { useDispatch } from "react-redux";
// import { setPurchasedItems } from "../../features/UserSlice";
// import { toast } from "react-toastify";
import { toast } from "sonner";



const Dashboard = () => {

    const navigate = useNavigate();

    // functions
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
                dispatch(setLoggedInStatus(false));
                toast.success("Logged out successfully!");

            })
            .catch((error) => {
                // An error happened.
                console.error(error);
                toast.error("Error logging out!");
            });
    };

    const AES = CryptoJS.AES;
    
    const dispatch = useDispatch();

    const theOdyssey = useSelector((state) => state.courses.theOdyssey);

    if (Object.keys(theOdyssey).length === 0) {
        // fetch theOdyssey from server
        fetch(`${process.env.REACT_APP_SERVER_URL}/the-odyssey`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return res.text().then((text) => {
                throw new Error(text);
            });
        })
        .then((data) => {
            console.log(data);
            dispatch(setTheOdyssey(data));
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    
    
    useEffect(() => {
        document.title = "Dashboard | Gakuyen Education";
        
        const fetchUserOwnedItems = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
    
            try {
                const docSnap = await getDoc(docRef);
    
                const userOwnedItems = docSnap.data().purchasedItems;
                const ownedItemsJson = JSON.stringify(userOwnedItems);
                const encryptedOwnedItems = AES.encrypt(ownedItemsJson, process.env.REACT_APP_SECRET_KEY).toString();
    
                // dispatch(setPurchasedItems(encryptedOwnedItems));
    
                localStorage.setItem("purchasedItems", encryptedOwnedItems);
                dispatch(setIsPurchasedItemsLoaded(true));
            } catch(err) {
                console.log(err);
                toast.error("Error fetching your owned items");
            }
        };
    
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                window.location.href = "/#/?show_login=true";
            } else {
                fetchUserOwnedItems();
            }
        });
        // const unsubscribe = auth.onAuthStateChanged((user) => {
        //     if (!user) {
        //         window.location.href = "/";
        //     }
        // });


        // fetch user owned items from firestore
        // const fetchUserOwnedItems = async () => {
        //     const docRef = doc(db, "users", auth.currentUser.uid);

        //     try {
        //         const docSnap = await getDoc(docRef);
    
        //         const userOwnedItems = docSnap.data().purchasedItems;
        //         const ownedItemsJson = JSON.stringify(userOwnedItems);
        //         const encryptedOwnedItems = AES.encrypt(ownedItemsJson, process.env.REACT_APP_SECRET_KEY).toString();
    
        //         // dispatch(setPurchasedItems(encryptedOwnedItems));

        //         localStorage.setItem("purchasedItems", encryptedOwnedItems);
        //     } catch(err) {
        //         console.log(err);
        //         toast.error("Error fetching your owned items", {
        //             position: "top-center",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             progress: undefined,
        //         });
        //     }
        // };

        // fetchUserOwnedItems();


        return () => {
            unsubscribe();
        };
    }, [AES, dispatch]);

    return (
        <div id="dashboard">
            <div id="dashboard-view">
                <div id="dashboard-sidebar">
                    <div
                        id="dashboard-sidebar-logo"
                        className="dashboard-sidebar-menu-item"
                    >
                        <Link to="/">
                            <img src="/theodysseywhite.png" alt="logo" />
                        </Link>
                    </div>
                    <div id="dashboard-sidebar-main">
                        <ul>
                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/main">
                                    <RxDashboard />
                                    <p>Dashboard</p>
                                </NavLink>
                            </li>

                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/modules">
                                    <BiBook />
                                    <p>Modules</p>
                                </NavLink>
                            </li>
                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/presets">
                                    <BiSlider />
                                    <p>Presets</p>
                                </NavLink>
                            </li>
                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/luts">
                                    <BiPalette />
                                    <p>LUTS</p>
                                </NavLink>
                            </li>
                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/transitions">
                                    <FaFilm />
                                    <p>Transitions</p>
                                </NavLink>
                            </li>
                            <li className="dashboard-sidebar-menu-item">
                                <NavLink to="/dashboard/settings">
                                    <BsGear />
                                    <p>Settings</p>
                                </NavLink>
                            </li>
                            <li className="dashboard-sidebar-menu-item mobile">
                                <NavLink to="/" onClick={handleLogout}>
                                    <TbLogout2 />
                                    <p>Logout</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="dashboard-sidebar-logout" onClick={handleLogout}>
                        <div className="dashboard-sidebar-menu-item desktop">
                            <TbLogout2 />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <section id="dashboard-content">
                    <Outlet />
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
