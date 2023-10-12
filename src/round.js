function evaluateGuess(guess,correctAns) {
    if (guess === correctAns) {
        return "correct!"
    } else {
        return "incorrect!"
    }
};

function createRound(deck, card) {
    const round = {
        deck: deck,
        currentCard: card,
        turns: 0,
        incorrectGuesses: [], 
    };
    return round;
};

function takeTurn(guess,round) {
    round.turns += 1
    let currentCardIndex = round.deck.findIndex(card => card === round.currentCard);
    let nextCurrentCardIndex = currentCardIndex + 1
    let guessResult = evaluateGuess(guess,round.currentCard.correctAnswer)
    if (guessResult === "incorrect!") { 
        round.incorrectGuesses.push(round.currentCard.id);
        round.feedback = `${guess} is incorrect!`; 
    } else {
        round.feedback = `${guess} is correct!`; 
    }
    if (nextCurrentCardIndex < round.deck.length) {
        let nextCurrentCard = round.deck[nextCurrentCardIndex];
        //let and const - can always look up but not below.
        round.currentCard = nextCurrentCard 
    } else {
        round.currentCard = null 
    }
    return round
};

function calculatePercentCorrect(round) {
    let calculatePercent = (((round.turns - round.incorrectGuesses.length) / round.turns) * 100).toFixed(0)
    let percentCorrect = `${calculatePercent}%`
    return percentCorrect;
}

function endRound(round) {
    let percentCorrect = calculatePercentCorrect(round);
    if (!round.currentCard) {
        round.endround = `Round over! You answered ${percentCorrect} of the questions correctly!`;
    }
    return round
}


module.exports = {
    evaluateGuess, //QUESTION... I had to add this here
    createRound,
    takeTurn,
    calculatePercentCorrect,
    endRound,
}