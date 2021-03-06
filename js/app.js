import Question from "./Question.js";
import Quiz from "./Quiz.js";

/* We use an IIFE (Immediately Invoked Function Expression) to run the app */
/* This is also called the 'revealing module design pattern' where we only expose two functions at the end */
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
  const q1 = new Question("How old is he?", [25, 26, 27, 28], 1);
  const q2 = new Question("Which of the following is NOT a hobby of his?", ["Running", "Gaming", "Snowboarding", "Reading"], 0);
  const q3 = new Question("What sport did he play most growing up?", ["Baseball", "Football", "Track & Field", "Basketball"], 3);
  const q4 = new Question("What generation is he in his family lineage?", ["Jr.", "III", "IV", "V"], 3);
  const q5 = new Question("What company does he work for?", ["IBM", "PWC", "Delliote", "Accenture"], 0);

  /* Initialize Quiz object */
  const myQuiz = new Quiz([q1, q2, q3, q4, q5]);

  /* Event Listener Functions */
  const listeners = () => {
    nextButtonEl.addEventListener("click", function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked'); // this grabs all inputs with attribute name of "choice" and pulls the one that's checked

      // If a choice IS selected, AKA it exists (otherwise, maybe implement a modal pop-up here?)
      if (selectedRadioElem) {
        const choiceKey = Number(selectedRadioElem.getAttribute("data-order")); // Grab the data-order attribute from input element and convert it to Number

        /* Check if the user guess is correct */
        myQuiz.guess(choiceKey);

        /* Since guess() changes score and question index, we have to re-run renderAll() */
        renderAll();
      }
    })

    restartButtonEl.addEventListener("click", function() {
      myQuiz.reset(); // reset the score and currentIndex
      renderAll(); // re-render the page
      nextButtonEl.style.opacity = 1; // restore the next button
      setValue(taglineEl, `Pick an option below`); // restore the tagline to original text
    })
  }

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
          <input type="radio" name="choice" class="quiz__input" id="choice${index}" data-order="${index}">
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

  /* Render Progress Helper Function - Calculates Percentage */
  const getPercentage = (num1, num2) => {
    return Math.round((num1/num2) * 100);
  }

  /* Render Progress Helper Function - Sets LoadingBar Interval */
  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function() {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressEl.style.width = width + "%";
      }
    })
  }

  /* Render Progress Bar */
  const renderProgress = () => {
    // Get the width
    const currentWidth = getPercentage(myQuiz.currentIndex, myQuiz.questions.length);
    // Use launch function to setup setInterval and handle loadingBar
    launch(0, currentWidth);
  }

  /* Render End Screen */
  const renderEndScreen = () => {
    /* Change the HTML values to let the use know the guiz is over and give them their score */
    let finalScore = getPercentage(myQuiz.score, myQuiz.questions.length);
    switch(finalScore) {
      case 0:
        setValue(quizQuestionEl, `Oof... you don't know him at all, do you?`);
        break;
      case 20:
        setValue(quizQuestionEl, `Well one of your guesses was successful...`);
        break;
      case 40:
        setValue(quizQuestionEl, `Two lucky guesses or you just barely know him.`);
        break;
      case 60:
        setValue(quizQuestionEl, `You must be a colleague of his.`);
        break;
      case 80:
        setValue(quizQuestionEl, `Nice! You know him well.`);
        break;
      case 100:
        setValue(quizQuestionEl, `Great job! You must be a close friend.`);
        break;
    }
    setValue(taglineEl, `Complete`);
    setValue(trackerEl, `Your score: ${finalScore}%`)

    /* Hide the next button */
    nextButtonEl.style.opacity = 0;
    renderProgress(); // Render progress bar once more
  }

  /* If quiz hasn't ended, call render methods */
  const renderAll = () => {
    if (myQuiz.hasEnded()) {
      renderEndScreen();
    } else {
      renderQuestion();
      renderChoicesElements();
      renderTracker();
      renderProgress();
    }
  }

  /* Return an object with containing the renderAll() function */
  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();

App.renderAll();
App.listeners();