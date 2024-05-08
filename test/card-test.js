const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck } = require('../src/card');

describe('card', function () {
  it('should be a function', function () {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function () {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });
});

describe('guess', function () {
  it('should evaluate correct answer', () => {
    const card = createCard("2", "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "array"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer)
    expect(checkedAnswer).to.equal('Correct!')
  })

  it('should evaluate incorrect answer', () => {
    const card = createCard("2", "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "object"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer)
    expect(checkedAnswer).to.equal('Incorrect!')
  })
})

describe('deck', function () {
  it('should create a deck', () => {
    const card1 = createCard("3", "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
    const card2 = createCard("4", "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
    const deck = createDeck([card1, card2])
    expect(deck.length).to.equal(2)
  })
})

describe('round', function () {
  let card1, card2, card3, deck
  beforeEach(function () {
    const card1 = createCard("3", "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
    const card2 = createCard("4", "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
    const deck = createDeck([card1, card2])
  })
})