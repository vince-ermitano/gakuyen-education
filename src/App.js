import './App.css';
import Header from './components/Header/Header_logged_out';
import Shop from './components/Shop/Shop';
import store from './store/store';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage/Homepage';
import { Routes, Route } from "react-router-dom"; 
import Footer from './components/Footer/Footer';
import PresetDescPage from './components/Presets/PresetDescPage';

function App () {

  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path='/' element={ <Homepage />}></Route>
        <Route path='/store' element={ <Shop />}></Route>
        <Route path='/preset-desc' element={ <PresetDescPage />}></Route>
      </Routes>
      <Footer />
      {/* <Header />
      <Homepage /> */}
    </Provider>
  );
}

export default App;
