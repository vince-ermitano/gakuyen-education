import './App.css';
import { useEffect } from 'react';
import Header from './components/Header/Header_logged_out';
import Shop from './components/Shop/Shop';
import store from './store/store';
import { Provider, useDispatch } from 'react-redux';
import Homepage from './components/Homepage/Homepage';
import { Routes, Route, useLocation } from "react-router-dom"; 
import Footer from './components/Footer/Footer';
import PresetDescPage from './components/Presets/PresetDescPage';
import Hamburger from './components/Hamburger/Hamburger';
import MasterclassDesc from './components/Masterclass/MasterclassDesc';
import LoginSidebar from './components/Sidebar/LoginSidebar';
import CreateAccountSidebar from './components/Sidebar/CreateAccountSidebar';
import CartSidebar from './components/Sidebar/CartSidebar';
// import HeaderHerov2 from './components/HeaderHerov2/HeaderHerov2';
import Dashboard from './components/Dashboard/Dashboard';
import ModuleView from './components/Dashboard/ModuleView/ModuleView';
import VideoView from './components/Dashboard/ModuleView/VideoView';
import Settings from './components/Dashboard/Settings/Settings';
import PresetLutView from './components/Dashboard/PresetLutView/PresetLutView';
import { setLoggedInStatus } from './features/LoggedInStatusSlice';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from "./config/firebaseConfig"
import { collection, getDocs } from "firebase/firestore";
import { setProducts, setLoading, setInitialTotalPrice} from './features/ShopSlice';
import { setUserInfo } from './features/UserSlice';
// import { ToastContainer, toast } from "react-toastify";
import DashboardHome from './components/Dashboard/DashboardHome/DashboardHome';
import { Toaster, toast } from "sonner";


function App () {

    /**
     * TODO: 
     * - update '/store' path to '/store/:filter' path
     */
    const location = useLocation();

    const currentPath = location.pathname;

    const dashboardPath = "/dashboard";

    const shouldHideComponents = currentPath.includes(dashboardPath);

    const dispatch = useDispatch();

    const gradientCanvas = document.getElementById("gradient-canvas");
    const header = document.querySelector(".hero");
    
    // if the current path is not the homepage, hide the gradient canvas
    if (currentPath !== "/") {
        gradientCanvas.style.display = "none";
        header.style.display = "none";
    } else {
        gradientCanvas.style.display = "block";
        header.style.display = "block";
    }
    // useEffect(() => {
    // }, [currentPath]);

    useEffect(() => {
        // Listen for authentication state changes
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
                fetch(
                    `${process.env.REACT_APP_SERVER_URL}/user-info`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((res) => {
                        if (res.ok) return res.json();
                        return res.text().then((error) => Promise.reject(error));
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
        }

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

                console.log('received products from firestore');

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
    }, [dispatch]);

    return (
        <Provider store={store}>
            {!shouldHideComponents && (
                <>
                    <Header />
                    <Hamburger />
                    <LoginSidebar />
                    <CreateAccountSidebar />
                    <CartSidebar />
                </>
            )}

            <Routes>
                <Route path="/" element={<Homepage />}></Route>
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
                <Route path="/preset-desc" element={<PresetDescPage />}></Route>
                <Route
                    path="/the-odyssey-creative-masterclass"
                    element={<MasterclassDesc />}
                ></Route>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="main" element={<DashboardHome />}></Route>
                    <Route path="modules/:moduleId/videos" element={<VideoView />}></Route>
                    <Route path="modules" element={<ModuleView />}></Route>
                    <Route path="presets" element={<PresetLutView />}></Route>
                    <Route path="luts" element={<PresetLutView />}></Route>
                    <Route path="transitions" element={<PresetLutView />}></Route>
                    <Route path="settings" element={<Settings />}></Route>
                </Route>
            </Routes>

            <Toaster position='top-center' richColors />
            {/* <ToastContainer theme="dark" style={{ width: "500px" }} /> */}
            {!shouldHideComponents && <Footer />}
        </Provider>
    );
}

export default App;
