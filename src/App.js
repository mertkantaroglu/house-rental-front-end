import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavBar from './nav/NavBar';
import AppRouter from './routes/Router';

const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <NavBarContainer />
      <section className="main-content">
        <AppRouter />
      </section>
      <ToastContainer />
    </BrowserRouter>
  </div>
);

function NavBarContainer() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return showNavBar ? (
    <section className="nav-bar-container">
      <NavBar />
    </section>
  ) : null;
}

export default App;
