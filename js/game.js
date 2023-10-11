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
const btnStop = document.getElementById('btnStop');
const smallPoints = document.querySelectorAll('small');
const divPlayerCards = document.getElementById('player-cards');
const divComputerCards = document.getElementById('computer-cards');

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

// Computer turn
const computerTurn = (minPoints) => {
  do {
    const card = getCard();
    computerPoints += getCardValue(card);
    smallPoints[1].innerText = computerPoints;
  
    const imgCard = document.createElement('img');
    imgCard.src = `assets/${card}.png`;
    imgCard.classList.add('blackjack-card');
    divComputerCards.append(imgCard);

    if (minPoints > 21) {
      break;
    }
    
  } while (computerPoints < minPoints);
}

btnGet.addEventListener('click', () => {
  const card = getCard();
  playerPoints += getCardValue(card);
  smallPoints[0].innerText = playerPoints;

  const imgCard = document.createElement('img');
  imgCard.src = `assets/${card}.png`;
  imgCard.classList.add('blackjack-card');
  divPlayerCards.append(imgCard);

  if (playerPoints > 21) {
    btnGet.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    btnStop.disabled = true;
    computerTurn(playerPoints);
  }
});

btnStop.addEventListener('click', () => {
  btnGet.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerPoints);
});