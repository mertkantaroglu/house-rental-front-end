import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./nav/NavBar";
import AppRouter from "./routes/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
