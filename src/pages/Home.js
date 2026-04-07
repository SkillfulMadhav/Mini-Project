import { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  // ✅ FIXED (memoized words)
  const words = useMemo(() => [
    { term: "Transmission", meaning: "Transfers power from engine to wheels." },
    { term: "Crankshaft", meaning: "Converts piston motion into rotation." },
    { term: "Camshaft", meaning: "Controls valve timing." },
    { term: "Flywheel", meaning: "Stabilizes engine rotation." },
    { term: "Radiator", meaning: "Prevents overheating." }
  ], []);

  const [word, setWord] = useState("");
  const [lastModule, setLastModule] = useState("");

  // WORD ROTATION
  useEffect(() => {
    const updateWord = () => {
      if (!words || words.length === 0) return;

      const random = Math.floor(Math.random() * words.length);
      setWord(words[random].term + " - " + words[random].meaning);
    };

    updateWord();
    const interval = setInterval(updateWord, 6000);

    return () => clearInterval(interval);
  }, [words]); // ✅ now valid

  // RESUME
  useEffect(() => {
    const module = localStorage.getItem("lastModule");
    if (module) setLastModule(module);
  }, []);

  // PARALLAX
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".section").forEach((section) => {
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

      {/* NAVBAR */}
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

    </div>
  );
}

export default Home;