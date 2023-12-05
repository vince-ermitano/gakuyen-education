import "./App.css";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header_logged_out";
import Shop from "./components/Shop/Shop";
import store from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Password from "./components/Password/Password";
import Homepage from "./components/Homepage/Homepage";
import HamburgerMenu from "./components/Hamburger/HamburgerMenu";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Receipt from "./components/Receipt/Receipt";
import DigitalDownloads from "./components/DigitalDownloads/DigitalDownloads";
import PresetDescPage from "./components/Presets/PresetDescPage";
// import Hamburger from './components/Hamburger/Hamburger_v2';
import MasterclassDesc from "./components/Masterclass/MasterclassDesc";
import LoginSidebar from "./components/Sidebar/LoginSidebar";
import CreateAccountSidebar from "./components/Sidebar/CreateAccountSidebar";
import CartSidebar from "./components/Sidebar/CartSidebar";
// import HeaderHerov2 from './components/HeaderHerov2/HeaderHerov2';
import Dashboard from "./components/Dashboard/Dashboard";
import ModuleView from "./components/Dashboard/ModuleView/ModuleView";
import VideoView from "./components/Dashboard/ModuleView/VideoView";
import Settings from "./components/Dashboard/Settings/Settings";
import PresetLutView from "./components/Dashboard/PresetLutView/PresetLutView";
import Contact from "./components/Contact/Contact";
import { setLoggedInStatus } from "./features/LoggedInStatusSlice";
import { auth } from "./config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./config/firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import {
    setProducts,
    setLoading,
    setInitialTotalPrice,
} from "./features/ShopSlice";
import { setUserInfo, setAuthorized } from "./features/UserSlice";
import { setTheOdyssey, setIsLoading } from "./features/CoursesSlice";
import { checkHeaderColor, checkIfAuthorized } from "./helpers";
// import { ToastContainer, toast } from "react-toastify";
import DashboardHome from "./components/Dashboard/DashboardHome/DashboardHome";
import { Toaster, toast } from "sonner";
import { checkIfPassedLaunchDate } from "./helpers";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function App() {
    /**
     * TODO:
     * - update '/store' path to '/store/:filter' path
     */
    const location = useLocation();

    const currentPath = location.pathname;

    const dashboardPath = "/dashboard";

    const shouldHideComponents = currentPath.includes(dashboardPath);

    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(
        false || auth.currentUser || checkIfPassedLaunchDate()
    );

    const authorized = useSelector((state) => state.user.authorized);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
            anchorPlacement: "bottom-bottom",
        });
    }, []);

    // * Enable/disable session check for development
    const enableSessionCheck = false;

    // const checkHeaderColor = useCallback(() => {

    //     if (currentPath.includes(dashboardPath)) {
    //         return;
    //     }

    //     const userDirectoryLinks = document.querySelectorAll(
    //         ".user-directory span"
    //     );
    //     const logo = document.querySelector(".header .logo img");
    //     const cartSvg = document.querySelector(".header .user-directory svg");

    //     if (currentPath !== "/") {
    //         userDirectoryLinks.forEach((link) => {
    //             link.style.color = "black";
    //         });
    //         logo.src = "/theodyssey_s.png";
    //         cartSvg.style.color = "black";
    //     } else {
    //         userDirectoryLinks.forEach((link) => {
    //             link.style.color = "white";
    //         });
    //         logo.src = "/theodysseywhite_s.png";
    //         cartSvg.style.color = "white";
    //     }
    // }, [currentPath]);

    // useEffect(() => {
    // }, [currentPath]);
    useEffect(() => {
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
                dispatch(setIsLoading(false));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch]);

    useEffect(() => {
        // TODO: might need to move this into a useEffect hook
        const gradientCanvas = document.getElementById("gradient-canvas");
        const header = document.querySelector(".hero");
        const heroVideo = header.querySelector(".video-container");
        const heroTitleContainer = header.querySelector(".hero-title-container");

        // if the current path is not the homepage, hide the gradient canvas
        if (currentPath !== "/" || !authenticated) {
            gradientCanvas.style.display = "none";
            header.style.display = "none";
        } else {
            gradientCanvas.style.display = "block";
            header.style.display = "grid";
            heroVideo.style.display = "block";
            
            if (document.querySelector('.countdown-timer')) return;
            const div = document.createElement("div");
            const root = createRoot(div);
            root.render(<CountdownTimer />);
            heroTitleContainer.appendChild(div);
        }
    }, [authenticated, currentPath]);

    useEffect(() => {
        if (!authenticated) return;

        // const userDirectoryLinks = document.querySelectorAll(
        //     ".user-directory span"
        // );
        // const logo = document.querySelector(".header .logo img");
        // const cartSvg = document.querySelector(".header .user-directory svg");

        // if (currentPath.includes(dashboardPath)) {
        //     return;
        // }

        // if (currentPath !== "/") {
        //     userDirectoryLinks.forEach((link) => {
        //         link.style.color = "black";
        //     });
        //     logo.src = "/theodyssey_s.png";
        //     cartSvg.style.color = "black";
        // } else {
        //     userDirectoryLinks.forEach((link) => {
        //         link.style.color = "white";
        //     });
        //     logo.src = "/theodysseywhite_s.png";
        //     cartSvg.style.color = "white";
        // }

        console.log("route changed");

        checkHeaderColor(currentPath);
    }, [authenticated, currentPath]);

    useEffect(() => {
        if (!authenticated) return;

        const checkSession = async () => {
            const user = auth.currentUser;

            if (user) {
                if (
                    localStorage.getItem("sessionToken") === null ||
                    localStorage.getItem("sessionToken") === ""
                ) {
                    console.log("No session token found. Logging out.");
                    signOut(auth)
                        .then(() => {
                            // Sign-out successful.
                            dispatch(setLoggedInStatus(false));
                            toast.success(
                                "Please log back in to refresh your session."
                            );
                        })
                        .catch((error) => {
                            // An error happened.
                            console.error(error);
                            toast.error("Error logging out!");
                        });

                    return;
                }
                try {
                    const docSnapshot = await getDoc(
                        doc(db, "userSessions", user.uid)
                    );

                    if (!docSnapshot.exists()) {
                        return;
                    }

                    const storedSessionId = docSnapshot.data().sessionToken;

                    console.log("storedSessionId:", storedSessionId);

                    // Compare stored session ID with locally stored session ID
                    const localSessionId = localStorage.getItem("sessionToken");

                    if (storedSessionId !== localSessionId) {
                        // Session ID mismatch, log out the user
                        console.log("Session ID mismatch. Logging out.");
                        signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                localStorage.removeItem("sessionToken");

                                dispatch(setLoggedInStatus(false));
                                toast.success(
                                    "You have been logged out due to being logged in on another device."
                                );
                            })
                            .catch((error) => {
                                // An error happened.
                                console.error(error);
                                toast.error("Error logging out!");
                            });
                    } else {
                        // Valid session
                        console.log("Valid session.");
                    }
                } catch (error) {
                    console.error("Error checking session ID:", error.message);
                }
            }
        };

        if (enableSessionCheck) {
            checkSession();
        }
    }, [authenticated, dispatch, currentPath, enableSessionCheck]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
                if (checkIfAuthorized(user.email)) {
                    dispatch(setAuthorized(true));

                }
            } else {
                dispatch(setAuthorized(false));
            }
        });

        return () => {
            unsubscribe();
        }
    })

    useEffect(() => {
        
        if (!authenticated) return;
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            checkHeaderColor(currentPath);
        });


        return () => {
            unsubscribe();
        };
    }, [authenticated, currentPath]);

    useEffect(() => {
        // Listen for authentication state changes
        if (!authenticated) return;

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserInfo();
                dispatch(setLoggedInStatus(true)); // Dispatch action for logged in
            } else {
                dispatch(setLoggedInStatus(false)); // Dispatch action for logged out
            }
        });

        const getUserInfo = async () => {
            auth.currentUser
                .getIdToken(true)
                .then((idToken) => {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/user-info`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => {
                            if (res.ok) return res.json();
                            return res
                                .text()
                                .then((error) => Promise.reject(error));
                        })
                        .then((res) => {
                            dispatch(setUserInfo(res));
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

        // Get products from Firestore
        const getProducts = async () => {
            dispatch(setLoading(true));

            try {
                const querySnapshot = await getDocs(collection(db, "products"));

                const productsObject = {};
                querySnapshot.forEach((doc) => {
                    productsObject[doc.id] = doc.data();
                });

                dispatch(setProducts(productsObject));
                dispatch(setInitialTotalPrice());
                dispatch(setLoading(false));

                console.log("received products from firestore");
            } catch (error) {
                console.log(error);
                // toast.error("Error getting products", {
                //     position: "top-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     progress: undefined,
                // });

                toast.error("Error getting products");
            }
            // dispatch(setLoading(false));
        };

        getProducts();
        return () => {
            // Unsubscribe when the component unmounts
            unsubscribe();
        };
    }, [authenticated, dispatch]);

    if (!authenticated) {
        return <Password setAuthenticated={setAuthenticated} />;
    }

    return (
        <Provider store={store}>
            {!shouldHideComponents && (
                <>
                    <Header />
                    <HamburgerMenu />
                    {/* <Hamburger /> */}
                    <LoginSidebar />
                    <CreateAccountSidebar />
                    <CartSidebar />
                </>
            )}

            <Routes>
                <Route path="/" element={<Homepage />}></Route>

                {authorized && (
                    <>
                        <Route path="/success" element={<Homepage />}></Route>
                        <Route
                            path="/store/presets/:name"
                            element={<PresetDescPage />}
                        ></Route>
                        <Route
                            path="store/luts/:name"
                            element={<PresetDescPage />}
                        ></Route>
                        <Route
                            path="store/transitions/:name"
                            element={<PresetDescPage />}
                        ></Route>
                        <Route
                            path="/store/masterclass/:masterclassName"
                            element={<MasterclassDesc />}
                        ></Route>
                        {/* <Route path="/store/:filter" element={<Shop />}></Route> */}
                        <Route path="/store" element={<Shop />}></Route>
                        <Route
                            path="/preset-desc"
                            element={<PresetDescPage />}
                        ></Route>
                        <Route
                            path="/the-odyssey-creative-masterclass"
                            element={<MasterclassDesc />}
                        ></Route>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route
                                path="main"
                                element={<DashboardHome />}
                            ></Route>
                            <Route
                                path="modules/:moduleId/videos"
                                element={<VideoView />}
                            ></Route>
                            <Route
                                path="modules"
                                element={<ModuleView />}
                            ></Route>
                            <Route
                                path="presets"
                                element={<PresetLutView />}
                            ></Route>
                            <Route
                                path="luts"
                                element={<PresetLutView />}
                            ></Route>
                            <Route
                                path="transitions"
                                element={<PresetLutView />}
                            ></Route>
                            <Route
                                path="settings"
                                element={<Settings />}
                            ></Route>
                        </Route>
                        <Route path="/contact" element={<Contact />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/receipt" element={<Receipt />}></Route>
                        <Route
                            path="/digital-downloads"
                            element={<DigitalDownloads />}
                        ></Route>
                    </>
                )}
            </Routes>

            <Toaster position="top-center" richColors />
            {/* <ToastContainer theme="dark" style={{ width: "500px" }} /> */}
            {!shouldHideComponents && <Footer />}
        </Provider>
    );
}

export default App;
