import { getCard, createCardImage, getCardValue } from './';

/**
 * Run computer turn.
 * @param {Number} minimumPoints
 * @param {HTMLElement} smallPoints 
 * @param {HTMLElement} divCardsComputer 
 * @param {Array<String>} deck
 */
export const computerTurn = (minimumPoints, smallPoints, divCardsComputer, deck) => {
  if (!minimumPoints) throw new Error('minimumPoints is required');
  if (!smallPoints) throw new Error('smallPoints is required');

  let computerPoints = 0;

  do {
    const card = getCard(deck);

    computerPoints += getCardValue(card);
    smallPoints.innerText = computerPoints;

    const imgCard = createCardImage(card);
    divCardsComputer.append(imgCard);
  } while (computerPoints < minimumPoints && minimumPoints <= 21);

  setTimeout(() => {
    if (computerPoints === minimumPoints) {
      alert('no one wins');
    } else if (minimumPoints > 21 || (computerPoints <= 21 && computerPoints > minimumPoints)) {
      alert('Computer wins');
    } else if (computerPoints > 21 || (minimumPoints <= 21 && minimumPoints > computerPoints)) {
      alert('Player wins')
    }
  }, 100);
}