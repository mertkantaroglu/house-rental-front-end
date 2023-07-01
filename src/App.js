import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './nav/NavBar';
import AppRouter from './routes/Router';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBarContainer />
        <section className="main-content">
          <AppRouter />
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;

function NavBarContainer() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return showNavBar ? (
    <section className="nav-bar-container">
      <NavBar />
    </section>
  ) : null;
}
