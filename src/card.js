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

module.exports = {
    createCard,
    evaluateGuess,

}