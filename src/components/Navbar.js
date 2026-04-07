import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={navStyle}>
      
      {/* LOGO */}
      <div style={logoStyle}>
        Autodoc ENT
      </div>

      {/* RIGHT */}
      <div style={rightStyle}>
        
        {/* React Routes */}
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/assessment" className="nav-link">Assessment</NavLink>

        {/* HTML PAGES (IMPORTANT) */}
        <a href="/about.html" className="nav-link">About</a>
        <a href="/feedback.html" className="nav-link">Feedback</a>

        {!user ? (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        ) : (
          <>
            <span style={welcomeStyle}>
              Welcome <b>{user}</b>
            </span>

            <button onClick={logout} style={logoutBtn}>
              Logout
            </button>
          </>
          /*Event handling Triggers login Logic*/
        )}
      </div>
    </div>
  );
}

/* STYLES */

const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  backdropFilter: "blur(10px)",
  background: "rgba(42,35,28,0.85)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 50px",
  boxSizing: "border-box",
  zIndex: 1000,
};

const logoStyle = {
  fontSize: "34px",
  color: "#f5f1e8",
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "25px",
  flexWrap: "wrap",
};

const welcomeStyle = {
  color: "#f5f1e8",
};

const logoutBtn = {
  background: "#f5f1e8",
  color: "#1e1a16",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Navbar;