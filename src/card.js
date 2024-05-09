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
        incorrectGuesses: incorrectGuesses,
    }
}

function takeTurn(guess, round) {
    const correctAnswer = round.currentCard.correctAnswer
    const feedback = evaluateGuess(guess, correctAnswer)
    if (feedback === 'Incorrect!') {
        round.incorrectGuesses.push(round.currentCard.id)
    }
    let cardIndex = round.deck.indexOf(round.currentCard)
    let nextCard = cardIndex +1
    round.currentCard = round.deck[nextCard]
    round.turns++
    return feedback
}
function calculateScore(round) {
    let score = ((round.turns - round.incorrectGuesses.length) / round.turns) * 100
    console.log(`Current Score: ${score}`)
    return score   
}
function endRound(round) {
    score = calculateScore(round)
    console.log(`Game over! You scored ${score}. Play again?`)
    return `Game over! You scored ${score}%. Play again?`
}

function countCards(deck) {
    return deck.length
}

module.exports = { createCard, evaluateGuess, createDeck, createRound, takeTurn, calculateScore, countCards, endRound }