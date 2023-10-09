const chai = require('chai');
//require chai to give us access to assertion library
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck } = require('../src/card');

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });  
});

describe('turn', function() {
  it('should tell us if a guess to a flashcard question is correct', function () {
  
  let card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object')

  let guess1 = 'object';
  let correctGuess = card.correctAnswer;
  let correctUserGuess = evaluateGuess(guess1,correctGuess);
  
  expect(correctUserGuess).to.equal("correct!");

  });
  

  it('should tell us if a guess to a flashcard question is incorrect', function () {
  let card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

  let guess2 = 'array';
  let correctGuess = card.correctAnswer;
  let incorrectUserGuess = evaluateGuess(guess2,correctGuess);

  expect(incorrectUserGuess).to.equal("incorrect!");

  });
});

describe('deck',function() {
  it('should be able to create an array of card objects', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

    const cards = createDeck(card);

    expect(cards).to.deep.equal([ {id: 1, question: 'What allows you to define a set of related information using key-value pairs?', answers: ['object', 'array', 'function'], correctAnswer: 'object'} ]);
  });
  
  it('should be able to know how many cards are in the deck', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const cards = createDeck(card);
    expect(cards.length).to.deep.equal(1);
  });
});


//iteration 2:
//should create a deck function that returns with an array of card objects
//it should know how many cards are in the deck

//should create a round object: 
//key values:
// deck : deck object
// currentCard should start off as 1st card in deck
// turns : 0
//incorrectGuesses: [] then stores incorrectly guessed cards during round
// takeTurn(guess,round) - should update turns count, evaluate guessesm give Feedback, store ids of incorrect guesses?

//should organize guesses and records if they are correct or incorrect
//

//should create object that includes



  //describe general 
  //each it - one thing you're testing
  //first it, should return correct, if guees is correct
  //2nd it, if inccorect, 
  //testing: think happy path and sad path.
  //if fx works -> happy
  //if 
