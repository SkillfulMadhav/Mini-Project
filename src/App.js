import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Assessment from "./pages/Assessment";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Prevent navbar overlap */}
      <div style={{ paddingTop: "80px" }}>
        <Routes>//sdxasd
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessment" element={<Assessment />} />
        </Routes>
      </div>
    </Router>
    //React Router enables SPA(no page reload), connect all pages
  );
}

export default App;