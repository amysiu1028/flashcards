const chai = require('chai');
const expect = chai.expect;
const { createDeck } = require('../src/deck');
// const { evaluateGuess } = require('../src/turns');
const { createCard, evaluateGuess } = require('../src/card')
//QUESTION WHY THIS IS commented out?

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
  });