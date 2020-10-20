import Question from "./Question.js";
import Quiz from "./Quiz.js";

const q1 = new Question("How old is Adam?", [25, 26, 27, 28], 1);
const q2 = new Question("Which of the following is NOT a hobby of his?", ["Running", "Gaming", "Snowboarding", "Reading"], 0);
const q3 = new Question("What sport did he play most growing up?", ["Baseball", "Football", "Track & Field", "Basketball"], 3);
const q4 = new Question("What generation is he in his family lineage?", ["Jr.", "III", "IV", "V"], 3);
const q5 = new Question("What is the profession of his soon-to-be wife?", ["Accountant", "Nurse", "Marketing Director", "Yoga Instructor"], 1);

const qArray = [q1, q2, q3, q4, q5];

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
})();

