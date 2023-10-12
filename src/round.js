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
  //so every time you invoke function, it'll update the current card to the next card
    if (nextCurrentCardIndex < round.deck.length) {
        let nextCurrentCard = round.deck[nextCurrentCardIndex];
        //let and const - can always look up but not below.
        round.currentCard = nextCurrentCard 
    } else {
        round.currentCard = null 
        // endRound(guess, round); 
        // round.percentCorrect = calculatePercentCorrect(round);
        // return endRound(guess, round); // Call endRound when there are no more cards
        //when it's over the round.deck.length, you're
        //setting it to equal to null,so when you call endRound() and try to access it, you get 
        //"Cannot read properties of null" error.
    }
    return round
};

function calculatePercentCorrect(round) {
    let calculatePercent = (((round.turns - round.incorrectGuesses.length) / round.turns) * 100).toFixed(0)
    let percentCorrect = `${calculatePercent}%`
    return percentCorrect;
}

//in order to end the round what do we need?
//round object
//user's guess?
//are we updating anything?
function endRound(guess, round) {
    if (round.currentCard) { 
        let guessResult = evaluateGuess(guess,round.currentCard.correctAnswer)
        if (guessResult === "incorrect!" || guessResult === "correct!") {
            if (round.turns === 0 && round.turns < round.deck.length) {
                round.turns++
            }
        }
    } else {
        // console.log(round.currentCard)
        let percentCorrect = calculatePercentCorrect(round);
        round.feedback = `Round over! You answered ${percentCorrect} of the questions correctly!`;
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