import {BrowserRouter, Routes ,Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/User/Register/Register";
import Login from "./components/User/Login/Login";
import Navbar from "./components/Navigation/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

