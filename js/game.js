/*
  2C -> Two of Clubs
  2D -> Two of Diamonds
  2H -> Two of Hearts
  2S -> Two of Spades
*/

const blackjackModule = (() => {
  'use strict';

  let deck = [];
  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K']; 
  let playersPoints = [];
  
  // HTML References
  const btnGet = document.getElementById('btnGet');
  const btnStop = document.getElementById('btnStop');
  const btnNew = document.getElementById('btnNew');

  const divCardsPlayers = document.querySelectorAll('.divCards');
  const smallPoints = document.querySelectorAll('small');

  // Initializes a new game of blackjack with the specified number of players.
  const startNewBlackjackGame = (playersNumber = 1) => {
    deck = createDeck();

    playersPoints = [];
    for (let i = 0; i <= playersNumber; i++) {
      playersPoints.push(0);
    }

    smallPoints.forEach((element) => element.innerText = 0);
    divCardsPlayers.forEach((element) => element.innerHTML = '');
    
    btnGet.disabled = false;
    btnStop.disabled = false;
  }

  // Create and shuffle a deck of cards.
  const createDeck = () => {  
    deck = [];

    for (const type of types) {
      for (let i = 2; i <= 10; i++) {
        deck.push(i + type);
      }
  
      for (const special of specials) {
        deck.push(special + type);
      }
    }
  
    return _.shuffle(deck);
  }
  
  // Retrieves a card from the deck.
  const getCard = () => {
    if (deck.length === 0) {
      throw new Error('There are no cards in the deck')
    }
  
    return deck.pop();
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

  // Turn: 0 = first player, playersPoints.length - 1 = computer
  const accumulatePoints = (card, turn) => {
    playersPoints[turn] += getCardValue(card);
    smallPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  }

  // Create and display a playing card image on the screen.
  const displayCardImage = (card, turn) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/${card}.png`;
    imgCard.classList.add('blackjack-card');
    divCardsPlayers[turn].append(imgCard);
  }

  const determineWinner = () => {
    const [minPoints, computerPoints] = playersPoints;

    setTimeout(() => {
      if (computerPoints === minPoints) {
        alert('no one wins');
      } else if (minPoints > 21 || (computerPoints <= 21 && computerPoints > minPoints)) {
        alert('Computer wins');
      } else if (computerPoints > 21 || (minPoints <= 21 && minPoints > computerPoints)) {
        alert('Player wins')
      }
    }, 100);
  }
  
  // Run computer turn
  const computerTurn = (minPoints) => {
    let computerPoints = 0;

    do {
      const card = getCard();
      computerPoints = accumulatePoints(card, playersPoints.length - 1);
      displayCardImage(card, playersPoints.length - 1);
    } while (computerPoints < minPoints && minPoints <= 21);

    determineWinner();
  }
  
  btnGet.addEventListener('click', () => {
    const card = getCard();
    const playerPoints = accumulatePoints(card, 0);
    displayCardImage(card, 0);
  
    if (playerPoints > 21) {
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  });
  
  btnStop.addEventListener('click', () => {
    btnGet.disabled = true;
    btnStop.disabled = true;
    computerTurn(playersPoints[0]);
  });
  
  btnNew.addEventListener('click', () => {
    startNewBlackjackGame();
  });

  return {
    startNewBlackjackGame,
  };
})();
