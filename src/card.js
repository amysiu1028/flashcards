function createCard (id, question, answers, correctAnswer) {
    let card = {
        id, 
        question, 
        answers, 
        correctAnswer,
    };
    return card
}
// Used curly braces {} to define an object literal
function evaluateGuess(guess,correctGuess) {
    if (guess === correctGuess) {
        return "correct!"
    } else {
        return "incorrect!"
    }
} 

function createDeck(card) {
    const cards = [];
    cards.push(card); //whenever we invoke fx, we'll push card in cards array & return it to add more.
    return cards;
}
module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
}