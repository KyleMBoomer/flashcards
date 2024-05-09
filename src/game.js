const { createDeck, createRound, calculateScore, countCards } = require('./card');
const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');


function start() {
  createDeck(prototypeQuestions)
  const round = createRound(deck)
  printMessage(deck)
  printQuestion(round)
  calculateScore(round)
  return deck, round

}

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(prototypeQuestions)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

module.exports = { printMessage, printQuestion, start };
