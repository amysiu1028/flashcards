const chai = require('chai');
//require chai to give us access to assertion library
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/card');

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
  
  const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object')

  let guess1 = 'object';
  const correctGuess = card.correctAnswer;
  let correctUserGuess = evaluateGuess(guess1,correctGuess);
  
  expect(correctUserGuess).to.equal("correct!");

  });
  

  it('should tell us if a guess to a flashcard question is incorrect', function () {
  const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');

  let guess2 = 'array';
  const correctGuess = card.correctAnswer;
  let incorrectUserGuess = evaluateGuess(guess2,correctGuess);

  expect(incorrectUserGuess).to.equal("incorrect!");

  });
});

describe('deck',function() {
  it('should be able to create an array of card objects', function() {
    // const cards = [card1, card2, card3]
    const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1,card2,card3]);

    expect(deck).to.deep.equal([card1,card2,card3]);
  });
  
  it('should be able to know how many cards are in the deck', function() {
    const card1 = createCard(2, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const cards = [card1, card2, card3]

    expect(cards.length).to.equal(3);
  });

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
  // let guess = evaluateGuess(userGuess,correctAns);
    takeTurn('array',round);    
    expect(round.incorrectGuesses).to.deep.equal([1]);

    takeTurn('pug',round);
    expect(round.incorrectGuesses).to.deep.equal([1, 2]);

    takeTurn('appendix',round);  
    expect(round.incorrectGuesses).to.deep.equal([1, 2, 14]);

    takeTurn('Lex', round);
    expect(round.incorrectGuesses).to.deep.equal([1, 2, 14, 12]);
    // console.log(round.incorrectGuesses, "incorrect guesses")
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
    expect(percentCorrect2).to.equal('50%');

    takeTurn('spleen',round); //incorrect guess
    let percentCorrect3 = calculatePercentCorrect(round);
    expect(percentCorrect3).to.equal('33%');
  });
});


//check the it('should make next card currentCard', is that what we are supposed to do?

//studyhall: walk through jsFUN
//walk through jsFUN in morning? HAve a rock walk through it?


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
