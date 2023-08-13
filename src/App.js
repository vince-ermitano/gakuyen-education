import './App.css';
import Header from './components/Header/Header_logged_out';
import Shop from './components/Shop/Shop';
import store from './store/store';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage/Homepage';
import { Routes, Route } from "react-router-dom"; 
import Footer from './components/Footer/Footer';
import PresetDescPage from './components/Presets/PresetDescPage';
import Hamburger from './components/Hamburger/Hamburger';
import MasterclassDesc from './components/Masterclass/MasterclassDesc';
import LoginSidebar from './components/Sidebar/LoginSidebar';
import CreateAccountSidebar from './components/Sidebar/CreateAccountSidebar';
import CartSidebar from './components/Sidebar/CartSidebar';

function App () {

  return (
    <Provider store={store}>
      <Header />
      <Hamburger />
      <LoginSidebar />
      <CreateAccountSidebar />
      <CartSidebar />
      <Routes>
        <Route path='/' element={ <Homepage />}></Route>
        <Route path='/store' element={ <Shop />}></Route>
        <Route path='/preset-desc' element={ <PresetDescPage />}></Route>
        <Route path='/the-odyssey-creative-masterclass' element={ <MasterclassDesc />}></Route>
      </Routes>
      <Footer />
      {/* <Header />
      <Homepage /> */}
    </Provider>
  );
}

export default App;
