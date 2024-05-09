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

// getRandomCard()

function createRound(deck, turns = 0, incorrectGuesses = []) {
    return {
        deck: deck,
        currentCard: deck[0],
        turns: turns,
        incorrectGuesses: incorrectGuesses,
        takeTurn: function(guess) {
            this.currentCard = this.deck[this.turns]
            const feedback = evaluateGuess(guess, this.deck[this.turns].correctAnswer)
            if(feedback === 'Incorrect!') {
                this.incorrectGuesses.push(this.currentCard.id)
            }
            this.turns++
            if (this.turns === 10) {
                calculateScore(this) 
            }
            return feedback
        }
    }
}

function calculateScore(round) {
    console.log('round', round)
let correctGuesses = round.turns - round.incorrectGuesses.length
let score = `${(correctGuesses/round.turns) * 100}%`
console.log('score', score)
return `Game over! You scored ${score}. Play again?`
}


module.exports = { createCard, evaluateGuess, createDeck, createRound, calculateScore }