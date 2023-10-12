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
  // console.log(feedback,"feedback")
  return {
    name: 'feedback',
    // message: `Your answer of ${guess} is ${feedback}`
    message: `Your answer of ${feedback.feedback}`
  }
}

async function main(round) {
  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const updatedRound = takeTurn(getAnswer.answers, currentRound);
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round)); 
  //this gets the input someone puts in terminal and saving it as getAnswer.answers

    if(!updatedRound.currentCard) {
      endRound(getAnswer.answers,updatedRound); 
      // Pass the guess along with the round object
    } else {
      main(updatedRound); // Pass the updated round object to the next iteration
    }
   } 


module.exports.main = main;