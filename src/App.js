import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./nav/NavBar";
import MobNav from './nav/MobNav'
import AppRouter from "./routes/Router";


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <section className="nav-bar-container">
          <NavBar />
          <MobNav />
        </section>
        <section className="main-content">
          <AppRouter />
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
