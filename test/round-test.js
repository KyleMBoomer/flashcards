const chai = require('chai')
const expect = chai.expect

const { createCard } = require('../src/card')
const { createDeck } = require('../src/deck')
const { createRound, takeTurn, calculateScore, endRound } = require('../src/round')


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
})
describe('take turn', function () {
    let card1, card2, card3, deck
    beforeEach(function () {
        card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
        card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
        card3 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
        deck = createDeck([card1, card2, card3])
    })
    it('should be able to take a turn', () => {
        const round = createRound(deck)
        takeTurn('correctAnswer', round)
        expect(round.turns).to.equal(1)
        takeTurn('incorrectGuess', round)
        expect(round.turns).to.equal(2)
    })

    it('should have next card be the current card', () => {
        const round = createRound(deck)
        takeTurn('guess', round)
        expect(round.currentCard, deck[1])
    })

    it('should store incorrect guesses when appropriate', () => {
        const round = createRound(deck)
        takeTurn('correctAnswer', round)
        expect(round.incorrectGuesses, [])
        takeTurn('incorrectAnswer', round)
        expect(round.incorrectGuesses, deck[1].id)
    })

    it('should provide appropriate feedback', () => {
        const round = createRound(deck)
        expect(takeTurn('correctAnswer', round), "Correct!")
        expect(takeTurn('incorrectGuess', round), "Incorrect!")
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

    it('should calculate a 100% score', () => {
        takeTurn('mutator method', round)
        takeTurn('accessor method', round)
        expect(calculateScore(round)).to.equal(100)
    })

    it('should calculate a zero score', () => {
        takeTurn('accessor method', round)
        takeTurn('mutator method', round)
        expect(calculateScore(round)).to.equal(0)
    })

    it('should calculate a score in between', () => {
        takeTurn('mutator method', round)
        takeTurn('accessor method', round)
        takeTurn('function', round)
        takeTurn('object', round)
        expect(calculateScore(round)).to.equal(75)
    })
})

describe('end game', function () {
    let card1, card2, card3, card4, deck, round
    it('should declare the end of the game', () => {
        card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
        card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
        card3 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
        card4 = createCard(1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object")
        deck = createDeck([card1, card2, card3, card4])
        round = createRound(deck)
        const turn1 = takeTurn('mutator method', round)
        const turn2 = takeTurn('accessor method', round)
        const turn3 = takeTurn('array', round)
        const turn4 = takeTurn('oldYeller', round)
        const gameOver = endRound(round)

        expect(gameOver).to.equal('Game over! You scored 75%. Play again?')
    })
})