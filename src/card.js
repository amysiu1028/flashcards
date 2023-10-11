function createCard(id, question, answers, correctAnswer) {
    const card = {
        id, 
        question, 
        answers, 
        correctAnswer,
    };
    return card
};

function evaluateGuess(guess,correctGuess) {
    if (guess === correctGuess) {
        return "correct!"
    } else {
        return "incorrect!"
    }
};

// function createDeck(cards) {
//     return cards
// };

// function createRound(cards, card) {
//     const round = {
//         deck: cards,
//         currentCard: card,
//         turns: 0,
//         incorrectGuesses: [], 
//     };
//     return round;
// };

// function takeTurn(guess, round) {
//     // console.log(round, "round")
//     // let nextCurrentCard
//     round.turns += 1

//     let currentCardIndex = round.deck.findIndex(card => card === round.currentCard);
//     let nextCurrentCardIndex = currentCardIndex + 1
//     let guessResult = evaluateGuess(guess,round.currentCard.correctAnswer)
//     if (guessResult === "incorrect!") { 
//         round.incorrectGuesses.push(round.currentCard.id);
//         round.feedback = `${guess} is incorrect!`; 
//     } else {
//         round.feedback = `${guess} is correct!`; 
//     }
//   //so every time you invoke function, it'll update the current card to the next card...  so when you invoke it again, it'll have a new card, and grab a new id (above)
//     if (nextCurrentCardIndex < round.deck.length) {
//         let nextCurrentCard = round.deck[nextCurrentCardIndex];
//         //let and const - can always look up but not below.
//         round.currentCard = nextCurrentCard //reassign object value
//     } else {
//         round.currentCard = null
//     }
//     // console.log(round.currentCard, "current card ")
//     return round
// };

// function calculatePercentCorrect(round) {
//     let calculatePercent = (((round.turns - round.incorrectGuesses.length) / round.turns) * 100).toFixed(0)
//     let percentCorrect = `${calculatePercent}%`
//     // console.log(percentCorrect)
//     return percentCorrect;
// }


//create fx, 
//what parameters to use? under what object?
//should calculate percent correct
//should calculate percent incorrect
//research percent
//add a property value...
//use the evaluateGuess function... in this to get correct, incorrect over total cards?
//where can we get the total? turns or deck.length 
//not deck bc it's the entire deck...
//simplified: 
//incorrectArray.length divided by total turns


//create function called //takeTurn(guess, round)
module.exports = {
    createCard,
    evaluateGuess,
    // createDeck,
    // createRound,
    // takeTurn,
    // calculatePercentCorrect,
    //endRound,
}

//NOTES TO TAKE DOEN: 
//UNDER TAKE TURN FUNCTION:
// round.currentCard to null means that the variable round.currentCard no longer points to any object or value. It essentially means that the currentCard property of the round object does not have a valid card object assigned to it.

//make next card current card:
//declare current index of current card 
//using indexOf() method
//find a way to declare current card (after a guess of incorrect or correct), as the next index of the cards array.
// and if next card index > round.deck.length == null
//console.log("There are no more cards")

// function takeTurn(guess, round) {
//     console.log(round,"round before")
//     console.log(guess,"guess")
//     round.turns += 1; 
//     // console.log(round.turns,"num")
//     let guessResult = evaluateGuess(guess,round.currentCard.correctAnswer)

//     if (guessResult === "incorrect!") {
//         round.feedback = `${guess} is incorrect!`; 
//         //remember object? You can add property to it!
//         round.incorrectGuesses.push(round.currentCard);
//     } else {
//         round.feedback = `${guess} is correct!`;
//     }
//     console.log(round,"round after")
//     return round
//     //Notes: if you can't return two then return something that you can call on!
// };
