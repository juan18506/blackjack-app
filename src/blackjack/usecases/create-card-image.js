/**
 * Create a playing card image.
 * @param {String} card 
 * @returns {HTMLImageElement} returns a card image.
*/
export const createCardImage = (card) => {
  if (!card) throw new Error('card is required');

  const imgCard = document.createElement('img');
  imgCard.src = `./cards/${card}.webp`;
  imgCard.classList.add('blackjack-card');

  return imgCard;
}