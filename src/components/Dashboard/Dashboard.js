import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { BiBook, BiSlider, BiPalette } from "react-icons/bi";
import { BsGear } from "react-icons/bs";



const Dashboard = () => {
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
