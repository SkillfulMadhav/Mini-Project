import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  /* ---------------- LOGIN CHECK ---------------- */
  useEffect(() => {
    const cookies = document.cookie.split(";");
    let user = null;

    cookies.forEach((c) => {
      let [key, value] = c.trim().split("=");
      if (key === "autodocUser") user = value;
    });

    if (!user) {
      alert("Please login to access this module.");
      navigate("/login");
    }
  }, [navigate]);

  /* ---------------- QUESTION BANK ---------------- */

  const baseQuestions = [
    {
      q: "Which component is called the heart of the car?",
      options: ["Battery", "Engine", "Radiator", "Alternator"],
      answer: 1,
      hint: "It converts fuel into mechanical energy.",
    },
    {
      q: "What does a transmission system do?",
      options: [
        "Cool engine",
        "Transfer power to wheels",
        "Store fuel",
        "Lubricate pistons",
      ],
      answer: 1,
      hint: "It connects engine output to the drivetrain.",
    },
    {
      q: "What reduces exhaust noise?",
      options: ["Muffler", "Radiator", "Flywheel", "Camshaft"],
      answer: 0,
      hint: "Part of exhaust system.",
    },
    {
      q: "Camshaft controls:",
      options: [
        "Fuel quality",
        "Valve timing",
        "Oil pressure",
        "Wheel rotation",
      ],
      answer: 1,
      hint: "It opens and closes intake and exhaust valves.",
    },
    {
      q: "Flywheel stores:",
      options: [
        "Fuel",
        "Coolant",
        "Rotational energy",
        "Air pressure",
      ],
      answer: 2,
      hint: "It smoothens crankshaft rotation.",
    },
  ];

  /* Expand to ~50 */
  let questionBank = [...baseQuestions];
  while (questionBank.length < 50) {
    questionBank = [...questionBank, ...baseQuestions];
  }

  /* ---------------- STATES ---------------- */

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [result, setResult] = useState(null);

  /* ---------------- GENERATE QUIZ ---------------- */

  const generateQuiz = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    setQuestions(selected);
    setAnswers({});
    setShowHints({});
    setResult(null);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  /* ---------------- HANDLE ANSWERS ---------------- */

  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [qIndex]: optionIndex,
    });
  };

  /* ---------------- SHOW HINT ---------------- */

  const handleHint = (index) => {
    setShowHints({
      ...showHints,
      [index]: true,
    });
  };

  /* ---------------- SUBMIT QUIZ ---------------- */

  const submitQuiz = () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) score++;
    });

    let percentage = (score / 5) * 100;

    let level = "";
    if (percentage === 100) level = "Master Level 🏆";
    else if (percentage >= 80) level = "Advanced Level 🚀";
    else if (percentage >= 60) level = "Intermediate Level";
    else level = "Beginner Level";

    setResult({ score, percentage, level });
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      style={{
        background: "#1e1a16",
        color: "#f5f1e8",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#2a231c",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "60px", margin: 0 }}>
          Automobile Master Assessment
        </h1>
        <p style={{ fontSize: "22px", opacity: 0.8 }}>
          Randomized Evaluation Across All Modules
        </p>
      </div>

      {/* QUIZ */}
      <div
        style={{
          maxWidth: "900px",
          margin: "60px auto",
          padding: "40px",
          background: "#2a231c",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        {questions.map((item, index) => (
          <div key={index} style={{ marginBottom: "35px" }}>
            <div style={{ fontSize: "24px" }}>
              {index + 1}. {item.q}
            </div>

            <div style={{ marginTop: "15px" }}>
              {item.options.map((opt, i) => (
                <label key={i} style={{ display: "block", marginBottom: "10px" }}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={i}
                    checked={answers[index] === i}
                    onChange={() => handleOptionChange(index, i)}
                  />
                  {" " + opt}
                </label>
              ))}
            </div>

            <button onClick={() => handleHint(index)}>
              Show Hint
            </button>

            {showHints[index] && (
              <div style={{ marginTop: "10px", opacity: 0.7 }}>
                {item.hint}
              </div>
            )}
          </div>
        ))}

        {/* BUTTONS */}
        <button onClick={submitQuiz}>Submit Assessment</button>
        <button onClick={generateQuiz} style={{ marginLeft: "10px" }}>
          Retake (New Questions)
        </button>

        {/* RESULT */}
        {result && (
          <div style={{ marginTop: "40px", fontSize: "24px" }}>
            Assessment Completed <br />
            Score: {result.score}/5 <br />
            Percentage: {result.percentage}% <br />
            Level: {result.level}
          </div>
        )}

        {/* PROGRESS BAR */}
        <div
          style={{
            height: "20px",
            background: "#444",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: result ? result.percentage + "%" : "0%",
              background: "#6becc7",
              transition: "1s",
            }}
          ></div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          marginTop: "50px",
          background: "#2a231c",
        }}
      >
        © Autodoc ENT | Adaptive Assessment Engine
      </div>
    </div>
  );
}

export default Assessment;