import _ from 'underscore';

const cardTypes = ['C', 'D', 'H', 'S'];
const specialTypes = ['A', 'J', 'Q', 'K']; 

/**
 * Create and shuffle a deck of cards.
 * @returns {Array<String>} return a new deck of cards.
 */
export const createDeck = () => {
  let deck = [];

  for (const type of cardTypes) {
    for (let i = 2; i <= 10; i++) {
      deck.push(i + type);
    }

    for (const special of specialTypes) {
      deck.push(special + type);
    }
  }

  deck = _.shuffle(deck)
  return deck;
}