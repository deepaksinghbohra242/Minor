import {BrowserRouter, Routes ,Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/User/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

