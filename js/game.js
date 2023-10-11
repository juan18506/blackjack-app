/*
  2C -> Two of Clubs
  2D -> Two of Diamonds
  2H -> Two of Hearts
  2S -> Two of Spades
*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

// Create and shuffle a deck of cards.
const createDeck = () => {
  for (const type of types) {
    for (let i = 2; i <= 10; i++) {
      deck.push(i + type);
    }

    for (const special of specials) {
      deck.push(special + type);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);

  return deck;
}

createDeck();

// Retrieves a card from the deck.
const getCard = () => {
  if (deck.length === 0) {
    throw new Error('There are no cards in the deck')
  }

  const card = deck.pop();
  return card;
}