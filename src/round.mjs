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
        currentCard: card, //|| deck[0]
        turns: 0,
        incorrectGuesses: [], 
    };
    return round;
};

function takeTurn(guess, round) {
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
  //so every time you invoke function, it'll update the current card to the next card
    if (nextCurrentCardIndex < round.deck.length) {
        let nextCurrentCard = round.deck[nextCurrentCardIndex];
        //let and const - can always look up but not below.
        round.currentCard = nextCurrentCard //reassign object value
    } else {
        round.currentCard = null
    }
    return round
};

function calculatePercentCorrect(round) {
    let calculatePercent = (((round.turns - round.incorrectGuesses.length) / round.turns) * 100).toFixed(0)
    let percentCorrect = `${calculatePercent}%`
    // console.log(percentCorrect)
    return percentCorrect;
}

//in order to end the round what do we need?
//round object
//user's guess?
//are we updating anything?
function endRound(guess, round) {
    let guessResult = evaluateGuess(guess,round.currentCard.correctAnswer)
    // console.log(round.currentCard.correctAnswer,"correctAnswer")
    // console.log(round.currentCard.correctAnswer,"correctAnswer")
    
    if (guessResult === "incorrect!" || guessResult === "correct!") {
        if (round.turns === 0) {
            round.turns++
        }
        let percentCorrect = calculatePercentCorrect(round)
        // round.isOver = true
        // console.log(`Round over! You answered ${percentCorrect} of the questions correctly!`)
        return `Round over! You answered ${percentCorrect} of the questions correctly!`;
    }
}


module.exports = {
    round: round
    // createCard,
    // evaluateGuess, //QUESTION... I had to add this here
    // // createDeck,
    // createRound,
    // takeTurn,
    // calculatePercentCorrect,
    // endRound,
}