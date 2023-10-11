

function takeTurn(guess, round) {
    // console.log(round, "round")
    // let nextCurrentCard
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
  //so every time you invoke function, it'll update the current card to the next card...  so when you invoke it again, it'll have a new card, and grab a new id (above)
    if (nextCurrentCardIndex < round.deck.length) {
        let nextCurrentCard = round.deck[nextCurrentCardIndex];
        //let and const - can always look up but not below.
        round.currentCard = nextCurrentCard //reassign object value
    } else {
        round.currentCard = null
    }
    // console.log(round.currentCard, "current card ")
    return round
};

function calculatePercentCorrect(round) {
    let calculatePercent = (((round.turns - round.incorrectGuesses.length) / round.turns) * 100).toFixed(0)
    let percentCorrect = `${calculatePercent}%`
    // console.log(percentCorrect)
    return percentCorrect;
}

module.exports = {
    createRound,
    takeTurn,
    calculatePercentCorrect,
    //endRound,
}

