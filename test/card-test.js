const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess } = require('../src/card');

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });  
});

describe('guess', function() {
  it('should evaluate correct answer', () => {
    const card = createCard("2", "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "array"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer )
    expect(checkedAnswer).to.equal('Correct!')
  })

  it('should evaluate incorrect answer', () => {
    const card = createCard("2", "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
    const userAnswer = "object"
    let checkedAnswer = evaluateGuess(userAnswer, card.correctAnswer)
    expect(checkedAnswer).to.equal('Incorrect!')
  })
})