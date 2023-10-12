// const chai = require('chai');
// //require chai to give us access to assertion library
// const expect = chai.expect;
// const { evaluateGuess } = require('../src/turns');
// const { createCard } = require('../src/card');

// describe('turn', function() {
//     it('should tell us if a guess to a flashcard question is correct', function () {
    
//     const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object')
  
//     let guess1 = 'object';
//     const correctGuess = card.correctAnswer;
//     let correctUserGuess = evaluateGuess(guess1,correctGuess);
    
//     expect(correctUserGuess).to.equal("correct!");
//     });
    
  
//     it('should tell us if a guess to a flashcard question is incorrect', function () {
//     const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
  
//     let guess2 = 'array';
//     const correctGuess = card.correctAnswer;
//     let incorrectUserGuess = evaluateGuess(guess2,correctGuess);
  
//     expect(incorrectUserGuess).to.equal("incorrect!");
  
//     });
//   });