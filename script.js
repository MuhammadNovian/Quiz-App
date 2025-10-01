// ========================
// Daftar Soal
// ========================
const questions = [
  {
    question: "1. Siapa penemu listrik?",
    answers: ["Thomas Edison", "Albert Einstein", "Karl Benz", "Benjamin Franklin"],
    correct: 3,
  },
  {
    question: "2. Apa unsur paling ringan di alam semesta?",
    answers: ["Helium", "Hidrogen", "Oksigen", "Karbon"],
    correct: 1,
  },
  {
    question: "3. Apa nama planet yang dikenal dengan 'Red Planet'?",
    answers: ["Mars", "Venus", "Jupiter", "Saturnus"],
    correct: 0,
  },
  {
    question: "4. Apa ibu kota Prancis?",
    answers: ["Berlin", "Madrid", "Paris", "Roma"],
    correct: 2,
  },
  {
    question: "5. Siapa penulis buku 'Harry Potter'?",
    answers: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Suzanne Collins"],
    correct: 1,
  },
  {
    question: "6. Satuan internasional untuk panjang adalah?",
    answers: ["Kilogram", "Liter", "Meter", "Watt"],
    correct: 2,
  },
  {
    question: "7. Benua mana yang memiliki jumlah negara terbanyak?",
    answers: ["Asia", "Afrika", "Eropa", "Amerika"],
    correct: 1,
  },
  {
    question: "8. Siapa yang pertama kali mengelilingi dunia?",
    answers: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Marco Polo"],
    correct: 1,
  },
  {
    question: "9. Apa nama planet terbesar di tata surya kita?",
    answers: ["Mars", "Bumi", "Jupiter", "Uranus"],
    correct: 2,
  },
  {
    question: "10. Di negara mana Taj Mahal berada?",
    answers: ["Pakistan", "Bangladesh", "India", "Nepal"],
    correct: 2,
  },
  {
    question: "11. Siapa yang menemukan teori relativitas?",
    answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
    correct: 1,
  },
  {
    question: "12. Apa nama laut terbesar di dunia?",
    answers: ["Laut Kaspia", "Laut Mediterania", "Laut Karibia", "Laut Selatan"],
    correct: 0,
  },
  {
    question: "13. Mata uang yang digunakan di Jepang adalah?",
    answers: ["Dollar", "Won", "Yen", "Peso"],
    correct: 2,
  },
  {
    question: "14. Siapa yang pertama kali menciptakan mesin uap?",
    answers: ["Thomas Edison", "James Watt", "Nikola Tesla", "Henry Ford"],
    correct: 1,
  },
  {
    question: "15. Gas yang paling banyak di atmosfer Bumi adalah?",
    answers: ["Oksigen", "Karbon dioksida", "Nitrogen", "Hidrogen"],
    correct: 2,
  },
];

// ========================
// Variabel Global
// ========================
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// ========================
// DOM Elements
// ========================
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const quizContent = document.getElementById("quiz");
const reviewContent = document.getElementById("review");
const scoreEl = document.getElementById("score");
const reviewContainer = document.getElementById("review-container");
const tableEl = document.getElementById("question-table");
const themeToggle = document.getElementById("theme-toggle");

// ========================
// Render Tabel Soal
// ========================
function renderTable() {
  tableEl.innerHTML = "";
  questions.forEach((q, i) => {
    const row = document.createElement("tr");
    const cellNum = document.createElement("td");
    cellNum.textContent = i + 1;
    cellNum.className =
      userAnswers[i] !== undefined ? "answered" : "unanswered";
    cellNum.onclick = () => {
      currentQuestion = i;
      showQuestion();
    };
    row.appendChild(cellNum);
    tableEl.appendChild(row);
  });
}

// ========================
// Tampilkan Soal
// ========================
function showQuestion() {
  const question = questions[currentQuestion];
  questionContainer.textContent = question.question;

  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index, btn);

    if (userAnswers[currentQuestion] === index) {
      btn.style.backgroundColor = "#f39c12";
    }

    answersContainer.appendChild(btn);
  });

  prevBtn.style.display = currentQuestion > 0 ? "block" : "none";
  nextBtn.style.display = currentQuestion < questions.length - 1 ? "block" : "none";
  finishBtn.style.display = "block";

  renderTable();
}

// ========================
// Pilih Jawaban
// ========================
function selectAnswer(index, btn) {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((button) => (button.style.backgroundColor = "#3498db"));

  btn.style.backgroundColor = "#f39c12";
  userAnswers[currentQuestion] = index;

  renderTable();
}

// ========================
// Tombol Next & Prev
// ========================
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

// ========================
// Tombol Selesai
// ========================
finishBtn.addEventListener("click", () => {
  showReview();
});

// ========================
// Review Hasil
// ========================
function showReview() {
  quizContent.classList.add("hide");
  reviewContent.classList.remove("hide");

  score = userAnswers.filter(
    (answer, i) => answer === questions[i].correct
  ).length;
  scoreEl.textContent = `Your Total Score: ${score} / ${questions.length}`;

  reviewContainer.innerHTML = "";
  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const correctAnswer = q.correct;
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    reviewItem.innerHTML = `
      <div><strong>Q${i + 1}:</strong> ${q.question}</div>
      <div>Your Answer: <span class="${
        userAnswer === correctAnswer ? "correct" : "wrong"
      }">${q.answers[userAnswer] || "Not Answered"}</span></div>
      <div>Correct Answer: <span class="correct">${
        q.answers[correctAnswer]
      }</span></div>
    `;
    reviewContainer.appendChild(reviewItem);
  });
}

// ========================
// Restart Quiz
// ========================
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  quizContent.classList.remove("hide");
  reviewContent.classList.add("hide");

  showQuestion();
}

// ========================
// Light/Dark Mode Toggle
// ========================
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// ========================
// Hamburger Menu
// ========================
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// ========================
// Start
// ========================
showQuestion();
