import React, { useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { BiBook, BiSlider, BiPalette } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { auth } from "../../config/firebaseConfig";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setPurchasedItems } from "../../features/UserSlice";



const Dashboard = () => {

    const AES = CryptoJS.AES;
    
    const dispatch = useDispatch();
    // const products = useSelector((state) => state.shop.products);


    useEffect(() => {
        document.title = "Dashboard | Gakuyen Education";

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                window.location.href = "/login";
            }
        });


        // fetch user owned items from firestore
        const fetchUserOwnedItems = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            const userOwnedItems = docSnap.data().purchasedItems;
            const ownedItemsJson = JSON.stringify(userOwnedItems);
            const encryptedOwnedItems = AES.encrypt(ownedItemsJson, process.env.REACT_APP_SECRET_KEY).toString();

            dispatch(setPurchasedItems(encryptedOwnedItems));
        };

        fetchUserOwnedItems();


        return () => {
            unsubscribe();
        };
    });

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
                                    <BiPalette />
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
                                <NavLink to="/dashboard/logout">
                                    <TbLogout2 />
                                    <p>Logout</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="dashboard-sidebar-logout">
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
