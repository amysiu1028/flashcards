//chai library - used in testing files not in index! 
//to set up index.js:
//import functions
//them to build your flashcard application or implement the desired functionality
// const { createRound, takeTurn, calculatePercentCorrect } = require('../src/round');
// const { createDeck } = require('../src/deck');
// const { createCard, evaluateGuess } = require('../src/card');


// This is where your project starts.
// console.log('Your project is running...'); 
const startGameFunction = require('./src/game')
// console.log(startGameFunction)
startGameFunction.start()

 //access start of the game. 
//whatever node (fileName you are starting the game....)": node index.js

//start game in index.js so run node index.js

//when no more cards left... console.log
//an easier way? 

//2 questions:
//1. //QUESTION... in round.js I had to add this here in round.js. but also in card.js
//2.
////import card functions to be able to include lin each individual test.
// import card from '../src/card';