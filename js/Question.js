export default function Question(question, choices, answerkey) {
  this.question = question;
  this.choiecs = choices;
  this.answerkey = answerkey;
}

Question.prototype.isCorrect = function (guessKey) {
  return guessKey === this.answerkey;
}
