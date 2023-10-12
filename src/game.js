const data = require('./data'); //require data from data file
const prototypeQuestions = data.prototypeData; //access to all data 
//which is an array
//start the game 
const util = require('./util');


console.log(prototypeQuestions, "prototype Questions")


function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}


// Your game should meet these other requirements:
// start(): the function that starts everything
// Creates cards
// Puts cards in a deck
// Creates a new round using the deck
// Invokes printMessage(deck) to display the message in the CLI
// Invokes printQuestion(round) to kick off our helper functions that allow interaction via the CLI
// Implementation Note: The helper functions are all fleshed out and fit to work with functions that meet the requirements in the previous iterations.

// Testing Tip: You’ll notice it difficult to test the game’s start function. If you invoke it in your test file, it hangs the test suite by starting the game while running the tests. Sometimes as front end developers, we run into pieces of code that aren’t possible, or worth it, to test. In this case, instead of testing start, consider trying to extract what you can out of start and into a separate function, and test those functions on their own.

// Your game’s start() function should be invoked to make the game playable in the console.
// Look at the file being run when we want to start the game. Think about where you need to invoke your start function.

// module.exports = { printMessage, printQuestion };


module.exports = { printMessage, printQuestion };
