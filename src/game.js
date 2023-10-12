const data = require('./data'); //require data from data file
const prototypeQuestions = data.prototypeData; //access to all data 
//which is an array
//start the game 
const util = require('./util');
const cardFunctions = require('./card');
const deckFunctions = require('./deck');
const roundFunctions = require('./round')
// console.log(cardFunctions) //object so to access it.
// console.log(cardFunctions.createCard)

function start() {
  // create cards:
  const createdCard = prototypeQuestions.map((card) => { return  cardFunctions.createCard(card.id, card.question, card.answers, card.correctAnswer)
  });
  // console.log(typeof creatingCards) //object QUESTION, WHY IS IT TELLING ME IT'S AN OBJECT WHEN IT'S AN ARRAY?
  // console.log(creatingCards)

  // Puts cards in a deck
  const deck = deckFunctions.createDeck(createdCard);
  // console.log(deck)

  //Creates a new round using the deck
  const round = roundFunctions.createRound(deck, createdCard[0]);
  console.log(round, "round")

  //Invokes printMessage(deck) to display the message in the CLI
  printMessage(deck);

  //Invokes printQuestion(round) to kick off our helper functions that allow interaction via the CLI
  printQuestion(round);
};

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${deckFunctions.countCards(deck)} cards.
  -----------------------------------------------------------------------`);
};

function printQuestion(round) {
  util.main(round);
};


module.exports = { printMessage, printQuestion, start };
