import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  const words = [
    { term: "Transmission", meaning: "Transfers power from engine to wheels." },
    { term: "Crankshaft", meaning: "Converts piston motion into rotation." },
    { term: "Camshaft", meaning: "Controls valve timing." },
    { term: "Flywheel", meaning: "Stabilizes engine rotation." },
    { term: "Radiator", meaning: "Prevents overheating." }
  ];

  const [word, setWord] = useState("");
  const [lastModule, setLastModule] = useState("");

  /* WORD ROTATION */
  useEffect(() => {
    const updateWord = () => {
      const random = Math.floor(Math.random() * words.length);
      setWord(words[random].term + " - " + words[random].meaning);
    };

    updateWord();
    const interval = setInterval(updateWord, 6000);
    return () => clearInterval(interval);
  }, []);

  /* RESUME */
  useEffect(() => {
    const module = localStorage.getItem("lastModule");
    if (module) setLastModule(module);
  }, []);

  /* PARALLAX */
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".section").forEach(section => {
        const bg = section.querySelector(".section-image");
        if (!bg) return;

        const rect = section.getBoundingClientRect();
        const speed = 0.2;

        bg.style.transform = `translateY(${rect.top * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#1e1a16", color: "#f5f1e8" }}>

      {/* 🔥 NAVBAR */}
      <div style={navbar}>
        <div style={logoArea}>
          <img src="/logo.png" alt="logo" style={{ height: "60px" }} />
          <div style={brand}>Autodoc ENT</div>
        </div>

        <div style={navLinks}>
          <a href="/" className="nav-link">Home</a>
          <a href="/about.html" className="nav-link">About</a>
          <a href="/feedback.html" className="nav-link">Feedback</a>

          {!user && (
            <>
              <a href="/register" className="nav-link">Register</a>
              <a href="/login" className="nav-link">Login</a>
            </>
          )}

          {user && <span style={{ marginLeft: "20px" }}>Welcome {user}</span>}
        </div>
      </div>

      {/* HERO */}
      <div style={hero}>
        <h1 style={heroTitle}>Understand What Moves You</h1>

        <p style={heroText}>
          Discover the mechanical intelligence hidden beneath every vehicle.
        </p>

        <div>
          <strong>Word of the Day:</strong> {word}
        </div>

        <div style={{ marginTop: "20px" }}>
          {lastModule && user && (
            <a href={lastModule} style={btn}>Continue Learning</a>
          )}

          <div style={banner}>
            {user
              ? <>Welcome back <strong>{user}</strong></>
              : "Please login to track progress"}
          </div>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="section" style={section}>
        <div className="section-image" style={{
          ...bg,
          backgroundImage: "url(https://images.unsplash.com/photo-1493238792000-8113da705763)"
        }} />

        <div style={overlay} />

        <div style={content}>
          <h2 style={h2}>Engineering Beneath the Surface</h2>
          <p style={p}>
            Engines generate motion. Transmissions distribute torque.
            Flywheels stabilize rotation. Cooling systems regulate heat.
          </p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="section" style={section}>
        <div className="section-image" style={{
          ...bg,
          backgroundImage: "url(https://images.unsplash.com/photo-1517148815978-75f6acaaf32c)"
        }} />

        <div style={overlay} />

        <div style={{ ...content, ...darkBox }}>
          <h2 style={h2}>Why Study Car Internals?</h2>
          <p style={p}>
            Empowerment through knowledge.<br /><br />
            Safety through understanding.<br /><br />
            Innovation through curiosity.
          </p>
        </div>
      </div>

      {/* 🔥 UNDERLINE ANIMATION STYLE */}
      <style>
        {`
          .nav-link {
            position: relative;
            text-decoration: none;
            color: #f5f1e8;
            font-size: 18px;
          }

          .nav-link::after {
            content: "";
            position: absolute;
            width: 0%;
            height: 2px;
            left: 0;
            bottom: -4px;
            background: #f5f1e8;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }
        `}
      </style>

    </div>
  );
}

/* STYLES */

const navbar = {
  position: "fixed",
  top: 0,
  width: "100%",
  background: "#2a231c",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 60px",
  boxSizing: "border-box",
  zIndex: 1000
};

const logoArea = {
  display: "flex",
  alignItems: "center",
  gap: "15px"
};

const brand = {
  fontSize: "32px",
  fontWeight: "bold"
};

const navLinks = {
  display: "flex",
  gap: "30px",
  alignItems: "center"
};

const hero = {
  height: "100vh",
  background: "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70) center/cover",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "0 10% 100px"
};

const heroTitle = { fontSize: "60px" };
const heroText = { fontSize: "22px", maxWidth: "700px" };

const btn = {
  background: "#f5f1e8",
  color: "#1e1a16",
  padding: "12px 26px",
  borderRadius: "6px",
  textDecoration: "none"
};

const banner = {
  marginTop: "10px",
  background: "rgba(0,0,0,0.6)",
  padding: "10px 20px",
  borderRadius: "6px"
};

const section = {
  position: "relative",
  padding: "120px 10%",
  minHeight: "90vh",
  overflow: "hidden",
  display: "flex",
  alignItems: "flex-end"
};

const bg = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "120%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 0
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(30,26,22,0.75)",
  zIndex: 1
};

const content = {
  maxWidth: "800px",
  zIndex: 2
};

const darkBox = {
  background: "rgba(0,0,0,0.65)",
  padding: "50px",
  borderRadius: "8px"
};

const h2 = { fontSize: "45px" };
const p = { fontSize: "22px", lineHeight: "1.8" };

export default Home;