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
import Settings from './components/Dashboard/Settings/Settings';
import PresetLutView from './components/Dashboard/PresetLutView/PresetLutView';
import { setLoggedInStatus } from './features/LoggedInStatusSlice';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from "./config/firebaseConfig"
import { collection, getDocs } from "firebase/firestore";
import { setProducts } from './features/ShopSlice';

function App () {

  const location = useLocation();

  const currentPath = location.pathname;

  const dashboardPath = '/dashboard';

  const shouldHideComponents = currentPath.includes(dashboardPath);

  const dispatch = useDispatch();

  useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              dispatch(setLoggedInStatus(true)); // Dispatch action for logged in
          } else {
              dispatch(setLoggedInStatus(false)); // Dispatch action for logged out
          }
          console.log(user);
      });

      // Get products from Firestore
      const getProducts = async () => {
          const querySnapshot = await getDocs(collection(db, "products"));
          dispatch(setProducts(querySnapshot.docs.map((doc) => doc.data())));
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
              <Route path="/store" element={<Shop />}></Route>
              <Route path="/preset-desc" element={<PresetDescPage />}></Route>
              <Route
                  path="/the-odyssey-creative-masterclass"
                  element={<MasterclassDesc />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="main" element={<ModuleView />}></Route>
                    <Route path="modules" element={<ModuleView />}></Route>
                    <Route path="presets" element={<PresetLutView />}></Route> 
                    <Route path="luts" element={<PresetLutView />}></Route> 
                    <Route path="settings" element={<Settings />}></Route>  
              </Route>
          </Routes>

          {!shouldHideComponents && <Footer />}
      </Provider>
  );
}

export default App;
