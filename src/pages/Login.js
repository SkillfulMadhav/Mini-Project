import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ correct usage

  /* Animation on load */
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => setActive(true), 200);
  }, []);

  /* LOGIN LOGIC */
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userMatch = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userMatch) {
      login(username); // ✅ correct (replaces cookie line)

      setError("");
      setSuccess(true);

      setTimeout(() => {
        navigate("/"); // go to home
      }, 1500);
    } else {
      setError("Invalid username or password.");
      setSuccess(false);
    }
  };

  return (
    <div style={{ background: "#1e1a16", minHeight: "100vh", color: "#f5f1e8" }}>
      
      {/* LOGIN SECTION */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "120px",
          background:
            "linear-gradient(rgba(30,26,22,0.85), rgba(30,26,22,0.85)), url('https://images.unsplash.com/photo-1492724441997-5dc865305da7') center/cover",
        }}
      >
        <div
          style={{
            background: "rgba(42,35,28,0.95)",
            padding: "50px",
            borderRadius: "18px",
            width: "400px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(40px)",
            transition: "1s ease",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            Welcome Back
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#3a3027",
                color: "#f5f1e8",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "#3a3027",
                color: "#f5f1e8",
              }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                fontSize: "13px",
                display: "block",
                textAlign: "right",
                marginTop: "5px",
                color: "#aaa",
              }}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </span>
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#f5f1e8",
              color: "#1e1a16",
              cursor: "pointer",
            }}
          >
            Log In
          </button>

          {error && (
            <div style={{ color: "#ff6b6b", marginTop: "10px" }}>{error}</div>
          )}

          {success && (
            <div style={{ color: "#6becc7", marginTop: "10px" }}>
              Login successful! Redirecting...
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "#2a231c",
          textAlign: "center",
          padding: "30px 0",
        }}
      >
        © Autodoc | Designed by Madhav Tiwary
      </div>
    </div>
  );
}

export default Login;