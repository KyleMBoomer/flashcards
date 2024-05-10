const {evaluateGuess} = require('../src/card')

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
    return score   
}
function endRound(round) {
    score = calculateScore(round)
    console.log(`Game over! You scored ${score}%. Play again?`)
    return `Game over! You scored ${score}%. Play again?`
}

module.exports= {createRound, takeTurn, calculateScore, endRound }