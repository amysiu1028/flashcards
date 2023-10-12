const inquirer = require('inquirer');

const { takeTurn, endRound } = require('./round');

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

const confirmUpdate = (guess, round) => {
  const feedback = takeTurn(guess, round);
  return {
    name: 'feedback',
    message: `Your answer of ${feedback.feedback}`
  }
}

async function main(round) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round)); 

  if(!round.currentCard) {
    endRound(round);
    console.log(round.endround);
  } else {
    main(round);
  }
}


module.exports.main = main;