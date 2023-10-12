const inquirer = require('inquirer');
//popular node.js module that provides an easy way to create interactive CLI
//
const { takeTurn, endRound } = require('./round.mjs');
//Chris had to add to start game from index.js
// const game = require('./src/game'); 
// game.start();

const genList = (round) => {
  let card = round.currentCard;
  
  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = takeTurn(id, round);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round)); 
  //this gets the input someone puts in terminal and saving it as getAnswer.answers

    if(!round.currentCard) {
      endRound(round);
    } else {
      main(round);
    }
}

module.exports.main = main;