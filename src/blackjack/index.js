'use strict';

import { computerTurn, getCard, createDeck, getCardValue, createCardImage } from './usecases';

/*
  2C -> Two of Clubs
  2D -> Two of Diamonds
  2H -> Two of Hearts
  2S -> Two of Spades
*/

let deck = [];

let playerPoints = 0;
let computerPoints = 0;

// HTML References
const btnGet = document.getElementById('btnGet');
const btnStop = document.getElementById('btnStop');
const btnNew = document.getElementById('btnNew');

const [ divCardsPlayer, divCardsComputer ] = document.querySelectorAll('.divCards');
const smallPoints = document.querySelectorAll('small');

deck = createDeck();

btnGet.addEventListener('click', () => {
  const card = getCard(deck);
  playerPoints += getCardValue(card);
  smallPoints[0].innerText = playerPoints;

  const imgCard = createCardImage(card);
  divCardsPlayer.append(imgCard);

  if (playerPoints > 21) {
    btnGet.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints, smallPoints[1], divCardsComputer, deck);
  } else if (playerPoints === 21) {
    btnGet.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerPoints, smallPoints[1], divCardsComputer, deck);
  }
});

btnStop.addEventListener('click', () => {
  btnGet.disabled = true;
  btnStop.disabled = true;
  computerTurn(playerPoints, smallPoints[1], divCardsComputer, deck);
});

btnNew.addEventListener('click', () => {
  deck = [];
  deck= createDeck();

  playerPoints = 0;
  computerPoints = 0;

  smallPoints[0].innerText = '0'
  smallPoints[1].innerText = '0'

  divCardsPlayer.innerHTML = '';
  divCardsComputer.innerHTML = '';
  
  btnGet.disabled = false;
  btnStop.disabled = false;
});
