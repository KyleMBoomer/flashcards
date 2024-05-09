const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, createRound, calculateScore } = require('../src/card');

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
    const card = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "array"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer)
    expect(checkedAnswer).to.equal('Correct!')
  })

  it('should evaluate incorrect answer', () => {
    const card = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "object"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer)
    expect(checkedAnswer).to.equal('Incorrect!')
  })
})

describe('deck', function () {
  it('should create a deck', () => {
    const card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
    const card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
    const deck = createDeck([card1, card2])
    expect(deck.length).to.equal(2)
  })
})

describe('round', function () {
  let card1, card2, card3, deck
  beforeEach(function () {
    card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
    card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
    card3 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    deck = createDeck([card1, card2, card3])
  })

  it('should create a Round object with default properties for turns and incorrectGuesses', function () {
    const round = createRound(deck)
    expect(round.deck).to.deep.equal(deck)
    expect(round.currentCard).to.equal(card1)
    expect(round.turns).to.equal(0)
    expect(round.incorrectGuesses.length).to.equal(0)
  })

  it('should be able to take a turn', () => {
    const round = createRound(deck)
    round.takeTurn('correctAnswer')
    expect(round.turns).to.equal(1)
    round.takeTurn('incorrectGuess')
    expect(round.turns).to.equal(2)
  })

  it('should have next card be the current card', () => {
    const round = createRound(deck)
    round.takeTurn('guess')
    expect(round.currentCard, deck[1])
  })

  it('should store incorrect guesses when appropriate', () => {
    const round = createRound(deck)
    round.takeTurn('correctAnswer')
    expect(round.incorrectGuesses, [])
    round.takeTurn('incorrectAnswer')
    expect(round.incorrectGuesses, deck[1].id)
  })

  it('should provide appropriate feedback', () => {
    const round = createRound(deck)
    expect(round.takeTurn('correctAnswer'), "Correct!")
    expect(round.takeTurn('incorrectGuess'), "Incorrect!")
  })
})

describe('calculate score', function () {
  let card1, card2, card3, card4, deck, round
  beforeEach(function () {
    card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
    card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
    card3 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    card4 = createCard(1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object")
    deck = createDeck([card1, card2, card3, card4])
    round = createRound(deck)
  })

  it('should calculate 100% scores', () => {
    round.takeTurn('mutator method')
    round.takeTurn('accessor method')
    expect(calculateScore(round)).to.equal('Game over! You scored 100%. Play again?')
  })

  it('should calculate a zero score', () => {
    round.takeTurn('accessor method')
    round.takeTurn('mutator method')
    expect(calculateScore(round)).to.equal('Game over! You scored 0%. Play again?')
  })

  it('should calculate a score in between', () => {
    round.takeTurn('mutator method')
    round.takeTurn('accessor method')
    round.takeTurn('function')
    round.takeTurn('object')
    expect(calculateScore(round)).to.equal('Game over! You scored 75%. Play again?')
  })
})