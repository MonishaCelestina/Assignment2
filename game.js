// retrieiving elements
const questionElement = document.getElementById("question");
const optionsElement = document.querySelector(".quiz-options");
const checkBtn = document.getElementById("check-answer");
const playAgainBtn = document.getElementById("play-again");
const nextQuestionBtn = document.getElementById("next-question");
const resultElement = document.getElementById("result");
const correctScoreElement = document.getElementById("correct-score");
const totalQuestionElement = document.getElementById("total-question");
const playButton = document.getElementById("play-button");

let correctAnswer = "",
  correctScore = 0,
  askedCount = 0,
  totalQuestion = 5;

function loadQuestion() {
  fetchQuestionFromAPI().then(showQuestion);
}

async function fetchQuestionFromAPI() {
  // getting questions from API
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple"
  );
  const data = await response.json(); // transforming to JSON
  return data.results[0];
}

function showQuestion(data) {
  checkBtn.disabled = true;
  nextQuestionBtn.disabled = true; // disables buttons till question is displayed
  correctAnswer = HTMLDecode(data.correct_answer); // decodes to readable format
  const optionsList = shuffle([...data.incorrect_answers, correctAnswer]); // randomizing

  questionElement.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`; // showing qn and cat
  optionsElement.innerHTML = optionsList
    .map((option, index) => `<li>${index + 1}. <span>${option}</span></li>`) // display randomizatiom as ordered list
    .join("");
  selectOption();
}

function selectOption() {
  optionsElement.addEventListener("click", function (event) {
    const selectedOption = event.target.closest("li");
    if (selectedOption) {
      optionsElement
        .querySelectorAll("li")
        .forEach((option) => option.classList.remove("selected"));
      selectedOption.classList.add("selected");
      checkBtn.disabled = false;
    }
  });
}

function setCount() {
  totalQuestionElement.textContent = totalQuestion; // showing total no of qns
  correctScoreElement.textContent = correctScore; // show current score
}

function restartQuiz() {
  correctScore = askedCount = 0;
  playAgainBtn.style.display = "none";
  checkBtn.style.display = "block";
  nextQuestionBtn.style.display = "none";
  setCount();
  resultElement.innerHTML = "";
  loadQuestion();

  const endSection = document.getElementById("end-section");
  const discountValue = document.getElementById("discount-value");
  const thankYouMessage = document.getElementById("thank-you-message");

  endSection.style.display = "none";

  if (askedCount >= totalQuestion) {
    endSection.style.display = "block";
    thankYouMessage.textContent = "Thank you for your participation!";
    discountValue.textContent = generateDiscountCode();
  }
}

function HTMLDecode(textString) {
  const doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game-container");
  const welcomeMessage = document.getElementById("welcome-message");
  gameContainer.style.display = "none";
  playButton.addEventListener("click", function () {
    playButton.style.display = "none";
    welcomeMessage.style.display = "none";
    gameContainer.style.display = "block";
    loadQuestion();
    checkBtn.style.display = "block";
    nextQuestionBtn.style.display = "block";
  });

  checkBtn.addEventListener("click", checkAnswer);
  playAgainBtn.addEventListener("click", restartQuiz);
  nextQuestionBtn.addEventListener("click", nextQuestion);
  setCount();
});

// loading bar 

const loadingBar = document.getElementById("loading-bar");
const loadingBarFill = document.getElementById("loading-bar-fill");

function showLoadingBar() {
  loadingBar.style.display = "block";
  updateLoadingBar(0);
}

function hideLoadingBar() {
  loadingBar.style.display = "none";
}

function updateLoadingBar(progress) {
  loadingBarFill.style.width = `${progress}%`;
}


function loadQuestion() {
  showLoadingBar(); // Show loading bar before fetching question
  fetchQuestionFromAPI().then(showQuestion).finally(() => {
    hideLoadingBar();
    document.querySelector('.wrapper').classList.add('quiz-active');
});
}

function nextQuestion() {
  showLoadingBar(); // Show loading bar before loading next question
  checkBtn.disabled = true;
  nextQuestionBtn.disabled = true;
  if (askedCount < totalQuestion) {
    setTimeout(loadQuestion, 300);
    resultElement.innerHTML = "";
  } else {
    resultElement.innerHTML = `<p>Your score is ${correctScore}.</p>`;
    playAgainBtn.style.display = "block";
    checkBtn.style.display = "none";
    nextQuestionBtn.style.display = "none";
    hideLoadingBar(); // Hide loading bar after the quiz is finished

    displayEndSection();
  }
}

function displayEndSection() {
  const endSection = document.getElementById("end-section");
  endSection.style.display = "block";
}

// Add these lines inside the 'checkAnswer' function
function checkAnswer() {
  showLoadingBar(); 
  nextQuestionBtn.disabled = false; // will enable the next question button
  checkBtn.disabled = true; //disabling check button
  const selectedOption = optionsElement.querySelector(".selected");

  if (selectedOption) {
    const selectedAnswer = selectedOption.querySelector("span").textContent;
    const isCorrect = selectedAnswer === correctAnswer;

    resultElement.innerHTML = `<p><i class="fas ${
      isCorrect ? "fa-check" : "fa-times"
    }"></i>${isCorrect ? "Correct" : "Incorrect"} Answer!</p>`; // checkmark if question is correct and cross if its wrong

    if (!isCorrect) {
      resultElement.innerHTML += `<small><b>Correct Answer:</b> ${correctAnswer}</small>`;
    }

    correctScore += isCorrect ? 1 : 0;
    askedCount++;
    setCount();
    hideLoadingBar(); // Hideloading bar after checking answer

    document.getElementById('result-container').classList.add('show');
  }

  function generateDiscountCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let discountCode = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      discountCode += characters.charAt(randomIndex);
    }
  
    return discountCode;
  }
  
}


