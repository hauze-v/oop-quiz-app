export default function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentIndex];
}

Quiz.prototype.nextIndex = function() {
  this.currentIndex++;
}

Quiz.prototype.hasEnded = function () {
  return this.currentIndex === this.questions.length; 
}

Quiz.prototype.guess = function(userGuess) {
  /* Grab the currentQuestion object */
  const currentQuestion = this.getCurrentQuestion();

  /* Compare the userGuess key with the answer key and if correct, increment score */
  if(currentQuestion.isCorrect(userGuess)) {
    this.score++;
  }
  /* Go to the next question */
  this.nextIndex();
}