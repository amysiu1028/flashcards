const chai = require('chai'); //imports assertion library
const expect = chai.expect; //gives access to expect syntax from chai assertion
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');
// import round from '../src/round';

//import functions in round.js 
const { createDeck } = require('../src/deck');
// const { evaluateGuess } = require('../src/turns');
const { createCard } = require('../src/card');
//QUESTION WHY ISn't it autopopulating! import card functions to be able to include lin each individual test.
// import card from '../src/card';


describe('round',function() {
it('should create a object for round', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const cards = createDeck([card]);
    const round = createRound(cards,card);
  
    expect(round).to.deep.equal( {deck: [{id: 1, question: 'What allows you to define a set of related information using key-value pairs?', answers: ['object', 'array', 'function'], correctAnswer: 'object'}], currentCard:{id: 1, question: 'What allows you to define a set of related information using key-value pairs?', answers: ['object', 'array', 'function'], correctAnswer: 'object'}, turns: 0, incorrectGuesses: []});
    });
  
    it('should update turns count', function () {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const cards = [card,card1, card2, card3]
      const deck = createDeck(cards);
      let round = createRound(deck,card);
      
      takeTurn('object',round);
      expect(round.turns).to.equal(1);
      takeTurn('sea otter', round);
      expect(round.turns).to.equal(2);
      takeTurn('gallbladder', round);
      expect(round.turns).to.equal(3);
      takeTurn('Fitzgerald', round);
      expect(round.turns).to.equal(4);
    });
  
    it('should make next card currentCard', function() {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const cards = [card,card1, card2, card3]
      const deck = createDeck(cards);
      let round = createRound(deck,card);
  
      takeTurn('object',round);
      expect(round.currentCard).to.deep.equal({
        id: 2,
        question: "What is Robbie's favorite animal",
        answers: [ 'sea otter', 'pug', 'capybara' ],
        correctAnswer: 'sea otter'
      });
  
      takeTurn('sea otter', round);
      expect(round.currentCard).to.deep.equal({
        id: 14,
        question: 'What organ is Khalid missing?',
        answers: [ 'spleen', 'appendix', 'gallbladder' ],
        correctAnswer: 'gallbladder'
      });
  
      takeTurn('gallbladder', round);
      expect(round.currentCard).to.deep.equal({
        id: 12,
        question: "What is Travis's middle name?",
        answers: [ 'Lex', 'William', 'Fitzgerald' ],
        correctAnswer: 'Fitzgerald'
      });
  
      takeTurn('Fitzgerald', round);
      expect(round.currentCard).to.deep.equal(null);
    });
  
    it('should add incorrect guesses into incorrect guesses array by card id', function() {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
      const cards = [card,card1,card2,card3]
      const deck = createDeck(cards);
      let round = createRound(deck,card);

      takeTurn('array',round);    
      expect(round.incorrectGuesses).to.deep.equal([1]);
  
      takeTurn('pug',round);
      expect(round.incorrectGuesses).to.deep.equal([1, 2]);
  
      takeTurn('appendix',round);  
      expect(round.incorrectGuesses).to.deep.equal([1, 2, 14]);
  
      takeTurn('Lex', round);
      expect(round.incorrectGuesses).to.deep.equal([1, 2, 14, 12]);
    });
  
    it('should return feedback when incorrect', function () {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const cards = [card,card1];
      const deck = createDeck(cards);
      const round = createRound(deck,card);
      takeTurn('array',round); 
      expect(round.feedback).to.equal( 'array is incorrect!');
      //since I'm using round, and returning round.. don't need to set variable
      // console.log(round.feedback);
      
      takeTurn('pug', round); 
      // console.log(round.feedback);
      expect(round.feedback).to.equal( 'pug is incorrect!')
    });
  
    it('should return feedback when correct', function () {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const cards = [card,card1];
      const deck = createDeck(cards);
      const round = createRound(deck,card);
      // let guess = evaluateGuess(userGuess,correctAns);
      takeTurn('object',round); 
      expect(round.feedback).to.equal( 'object is correct!');
  
      takeTurn('sea otter', round);
      expect(round.feedback).to.equal( 'sea otter is correct!');
    });
  
    it('should calculate percent correct', function() {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const cards = [card,card1,card2];
      const deck = createDeck(cards);
      const round = createRound(deck,card);
  
      takeTurn('object',round); //correct guess
      let percentCorrect = calculatePercentCorrect(round);
      expect(percentCorrect).to.equal('100%');
  
      takeTurn('pug',round); //incorrect guess
      let percentCorrect2 =  calculatePercentCorrect(round);
      expect(percentCorrect2).to.equal('50%'); //THISSS SHOULD BE 50%?
  
      takeTurn('spleen',round); //incorrect guess
      let percentCorrect3 = calculatePercentCorrect(round);
      expect(percentCorrect3).to.equal('33%');
    });

    it('should be able to tell us when round is over and percent of questions answered correctly', function() {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
      const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
      const cards = [card,card1,card2];
      const deck = createDeck(cards);
      const round = createRound(deck,card);

      takeTurn('object', round);
      takeTurn('pug', round);
      takeTurn('gallbladder',round);

      let roundPhrase = endRound(round);
      expect(roundPhrase.endround).to.equal('Round over! You answered 67% of the questions correctly!');
    });
});
  