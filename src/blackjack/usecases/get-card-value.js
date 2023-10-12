/**
 * Calculate the numerical value of a card in a deck.
 * @param {String} card 
 * @returns {Number} card numeric value.
 */
export const getCardValue = (card) => {
  if (!card) throw new Error('card is required');

  const value = card.substring(0, card.length - 1);
  let points = 0;

  if (isNaN(value)) {
    points = (value === 'A') ? 11 : 10;
  } else {
    points = value * 1;
  }

  return points;
}