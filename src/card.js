function createCard(id, question, answers, correctAnswer) {
    return {
        id, question, answers, correctAnswer
    }
}

function evaluateGuess(guess, correctAnswer) {
    if (guess === correctAnswer) {
        return "Correct!"
    }
    return "Incorrect!"
}

function createDeck(cards) {
    let deck = cards
    return deck
}

function createRound(deck, turns = 0, incorrectGuesses = []) {
    return {
        deck: deck,
        currentCard: deck[0],
        turns: turns,
        incorrectGuesses: incorrectGuesses
    }
}
module.exports = { createCard, evaluateGuess, createDeck, createRound }