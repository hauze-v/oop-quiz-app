import Question from "./Question.js";
import Quiz from "./Quiz.js";

/* We use an IIFE (Immediately Invoked Function Expression) to run the app */
const App = (() => {
  /* Cache the DOM */
  const quizEl = document.querySelector(".quiz");
  const quizQuestionEl = document.querySelector(".quiz__question");
  const trackerEl = document.querySelector(".quiz__tracker");
  const progressEl = document.querySelector(".progress__inner");
  const taglineEl = document.querySelector(".quiz__tagline");
  const choicesEl = document.querySelector(".quiz__choices");
  const restartButtonEl = document.querySelector(".restart");
  const nextButtonEl = document.querySelector(".next");

  /* Create the question objects and add them to the quiz initialization */
  const q1 = new Question("How old is Adam?", [25, 26, 27, 28], 1);
  const q2 = new Question("Which of the following is NOT a hobby of his?", ["Running", "Gaming", "Snowboarding", "Reading"], 0);
  const q3 = new Question("What sport did he play most growing up?", ["Baseball", "Football", "Track & Field", "Basketball"], 3);
  const q4 = new Question("What generation is he in his family lineage?", ["Jr.", "III", "IV", "V"], 3);
  const q5 = new Question("What is the profession of his soon-to-be wife?", ["Accountant", "Nurse", "Marketing Director", "Yoga Instructor"], 1);

  /* Initialize Quiz object */
  const myQuiz = new Quiz([q1, q2, q3, q4, q5]);

  /* Helper function for setting inner HTML value */
  const setValue = (elem, value) => {
    elem.innerHTML = value;
  }

  /* Render Question Function */
  const renderQuestion = () => {
    const question = myQuiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
  }

  /* Render the Choices Elements */
  const renderChoicesElements = () => {
    /* Start with empty markup string */
    let markup = "";
    const currentChoices = myQuiz.getCurrentQuestion().choices; // grab the array of choices

    /* Loop through the choices and run this function for each */
    currentChoices.forEach((elem, index) => {
      markup += `
        <li class="quiz__choice">
          <input type="radio" name="choice" class="quiz__input" id="choice${index}" checked>
          <label for="choice${index}" class="quiz__label">
            <i></i>
            <span>${elem}</span>
          </label>
        </li>
      `
    });

    /* Assign the dynamic markup to the innerHTML of choicesEl DOM element (ul) */
    setValue(choicesEl, markup);
  }

  /* Render Question Tracker */
  const renderTracker = () => {
    const index = myQuiz.currentIndex;
    setValue(trackerEl, `${index+1} of ${myQuiz.questions.length}`);
  }

  const getPercentage = (num1, num2) => {
    return Math.round((num1/num2) * 100);
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + "%";
      }
    })
  }
  /* Render Progress Bar */
  const renderProgress = () => {
    // 1. get the width
    const currentWidth = getPercentage(myQuiz.currentIndex, myQuiz.questions.length);
  
    // 2. Use launch function to setup setInterval and handle loadingBar
    launch(0, currentWidth);
  }

  /* If quiz hasn't ended, call render methods */
  const renderAll = () => {
    if (myQuiz.hasEnded()) {
      // renderEndScreen
    } else {
      renderQuestion();
      renderChoicesElements();
      renderTracker();
      renderProgress();
    }
  }

  return {
    renderAll: renderAll
  }
})();

App.renderAll();