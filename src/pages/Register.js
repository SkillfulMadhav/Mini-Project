import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  /* ---------------- STATES ---------------- */

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [rules, setRules] = useState({
    lower: false,
    upper: false,
    number: false,
    length: false,
    match: false,
  });

  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState(false);

  /* ---------------- ANIMATION ---------------- */

  useEffect(() => {
    setTimeout(() => setActive(true), 200);
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    /* Autosave */
    localStorage.setItem("draft_" + name, value);
  };

  /* ---------------- LOAD DRAFT ---------------- */

  useEffect(() => {
    const newForm = { ...form };

    Object.keys(newForm).forEach((key) => {
      const saved = localStorage.getItem("draft_" + key);
      if (saved) newForm[key] = saved;
    });

    setForm(newForm);
  }, []);

  /* ---------------- PASSWORD VALIDATION ---------------- */

  useEffect(() => {
    const val = form.password;

    setRules({
      lower: /[a-z]/.test(val),
      upper: /[A-Z]/.test(val),
      number: /\d/.test(val),
      length: val.length >= 8,
      match: val === form.confirmPassword && val !== "",
    });
  }, [form.password, form.confirmPassword]);

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Check all rules */
    if (Object.values(rules).includes(false)) {
      alert("Please satisfy all password requirements.");
      return;
    }

    /* Email regex */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      alert("Enter a valid email.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    /* Duplicate check */
    if (users.find((u) => u.username === form.username)) {
      alert("Username already exists.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    /* Set session */
    document.cookie = "autodocUser=" + form.username + "; path=/";

    /* Clear drafts */
    Object.keys(form).forEach((key) =>
      localStorage.removeItem("draft_" + key)
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      style={{
        background: "#1e1a16",
        minHeight: "100vh",
        color: "#f5f1e8",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(rgba(30,26,22,0.85), rgba(30,26,22,0.85)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70') center/cover",
        }}
      >
        <div
          style={{
            background: "rgba(42,35,28,0.95)",
            padding: "50px",
            borderRadius: "18px",
            width: "650px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(40px)",
            transition: "1s ease",
          }}
        >
          {!success ? (
            <>
              <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                Create Your Account
              </h1>

              <form onSubmit={handleSubmit}>
                {[
                  "firstname",
                  "lastname",
                  "age",
                  "email",
                  "username",
                ].map((field) => (
                  <div key={field} style={{ marginBottom: "20px" }}>
                    <input
                      type={field === "age" ? "number" : "text"}
                      name={field}
                      placeholder={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                ))}

                {/* PASSWORD */}
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>

                {/* RULES */}
                <div style={{ fontSize: "13px" }}>
                  <p className={rules.lower ? "valid" : "invalid"}>
                    Lowercase letter
                  </p>
                  <p className={rules.upper ? "valid" : "invalid"}>
                    Uppercase letter
                  </p>
                  <p className={rules.number ? "valid" : "invalid"}>
                    Number
                  </p>
                  <p className={rules.length ? "valid" : "invalid"}>
                    Minimum 8 characters
                  </p>
                  <p className={rules.match ? "valid" : "invalid"}>
                    Passwords match
                  </p>
                </div>

                {/* CONFIRM */}
                <div style={{ marginBottom: "20px" }}>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <button style={buttonStyle}>Register</button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", fontSize: "28px" }}>
              Registration Successful!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#3a3027",
  color: "#f5f1e8",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#f5f1e8",
  color: "#1e1a16",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
};

export default Register;