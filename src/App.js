import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header_logged_out';
import Hamburger from './components/Hamburger/Hamburger';
import { useDispatch, useSelector} from "react-redux";
import { toggleLoggedInStatus } from "./features/LoggedInStatusSlice";
import store from './store/store';
import { Provider } from 'react-redux';
import Homepage from './components/Homepage/Homepage';

function App () {

  return (
    <Provider store={store}>
      <Header />
      <Homepage />
    </Provider>
  );
}

export default App;
