/*
  2C -> Two of Clubs
  2D -> Two of Diamonds
  2H -> Two of Hearts
  2S -> Two of Spades
*/

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let computerPoints = 0;

// HTML References
const btnGet = document.getElementById('btnGet');
const smallPoints = document.querySelectorAll('small');

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

// Calculate the numerical value of a card in a deck.
const getCardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  let points = 0;

  if (isNaN(value)) {
    points = (value === 'A') ? 11 : 10;
  } else {
    points = value * 1;
  }

  return points;
}

btnGet.addEventListener('click', () => {
  const card = getCard();
  playerPoints += getCardValue(card);

  smallPoints[0].innerText = playerPoints;
});