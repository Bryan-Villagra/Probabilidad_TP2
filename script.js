const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.getElementById("progressBar").style.width = pct + "%";
});

// Síntesis de voz
document.querySelectorAll(".speak-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no admite lectura en voz alta.");
      return;
    }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(btn.dataset.speak);
    u.lang = "es-AR";
    u.rate = 0.95;
    speechSynthesis.speak(u);
  });
});

// Simulación dado + moneda
const dieChars = ["⚀","⚁","⚂","⚃","⚄","⚅"];
document.getElementById("simulateDieCoin").addEventListener("click", () => {
  const die = Math.floor(Math.random() * 6) + 1;
  const coin = Math.random() < .5 ? "C" : "S";
  document.getElementById("dieValue").textContent = dieChars[die-1];
  document.getElementById("coinValue").textContent = coin;
  document.getElementById("dieCoinResult").textContent =
    `Resultado: (${die}, ${coin}) · ${coin === "C" ? "Cara" : "Sello"}`;
});

// Conteo
document.getElementById("checkCount").addEventListener("click", () => {
  const value = Number(document.getElementById("countAnswer").value);
  const feedback = document.getElementById("countFeedback");
  if (value === 21) {
    feedback.textContent = "✓ Correcto: 7 × 3 = 21";
    feedback.style.color = "var(--green)";
  } else {
    feedback.textContent = "Revisá el principio multiplicativo: 7 × 3.";
    feedback.style.color = "var(--red)";
  }
});

// Tabs módulo 4
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

// Tabs módulo 5
document.querySelectorAll(".var-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".var-btn").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".var-panel").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.var).classList.add("active");
  });
});

// Mini actividad conjunta
document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    const f = document.getElementById("jointFeedback");
    if (btn.dataset.joint === "correct") {
      f.textContent = "✓ Correcto. Sumando la columna X = 2: 1/24 + 1/40 = 1/15.";
      f.style.color = "var(--green)";
    } else {
      f.textContent = "No. Para P(X = 2) hay que sumar toda la columna X = 2.";
      f.style.color = "var(--red)";
    }
  });
});

// Quiz
const quiz = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quiz.addEventListener("submit", e => {
  e.preventDefault();
  const questions = [...document.querySelectorAll(".question")];
  let score = 0;
  let answered = 0;

  questions.forEach((q, i) => {
    q.classList.remove("correct","incorrect");
    const selected = document.querySelector(`input[name="q${i+1}"]:checked`);
    if (!selected) return;
    answered++;
    if (selected.value === q.dataset.correct) {
      score++;
      q.classList.add("correct");
    } else {
      q.classList.add("incorrect");
    }
  });

  if (answered < questions.length) {
    quizResult.textContent = `Respondiste ${answered} de ${questions.length}. Completá todas las preguntas.`;
    quizResult.style.color = "var(--amber)";
    return;
  }

  const pct = Math.round(score / questions.length * 100);
  if (pct === 100) {
    quizResult.textContent = `¡Excelente! ${score}/${questions.length} correctas · ${pct} %.`;
    quizResult.style.color = "var(--green)";
  } else if (pct >= 67) {
    quizResult.textContent = `Muy bien: ${score}/${questions.length} correctas · ${pct} %.`;
    quizResult.style.color = "var(--cyan)";
  } else {
    quizResult.textContent = `${score}/${questions.length} correctas · ${pct} %. Repasá los módulos y volvé a intentar.`;
    quizResult.style.color = "var(--red)";
  }
});

document.getElementById("resetQuiz").addEventListener("click", () => {
  quiz.reset();
  document.querySelectorAll(".question").forEach(q => q.classList.remove("correct","incorrect"));
  quizResult.textContent = "";
});
