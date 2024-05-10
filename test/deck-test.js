const chai = require('chai')
const expect = chai.expect
const { createDeck, countCards} = require('../src/deck')
const {createCard} = require('../src/card')
describe('deck', function () {
    it('should create a deck', () => {
      const card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
      const card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
      const deck = createDeck([card1, card2])
      expect(deck.length).to.equal(2)
    })
  })

  describe('count the cards', function () {
    let card1, card2, card3, card4, deck
    beforeEach(function () {
      card1 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
      card2 = createCard(4, "What type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
      card3 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
      card4 = createCard(1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object")
      deck = createDeck([card1, card2, card3, card4])
    })
  
    it('should detect a deck with no cards', () => {
      const emptyDeck = createDeck([])
      countCards(emptyDeck)
      expect(emptyDeck.length).to.equal(0)
    })
  
    it('should count all the cards in a deck', () => {
      countCards(deck)
      expect(deck.length).to.equal(4)
    })
  })