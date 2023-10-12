/**
 * Retrieves a card from the deck.
 * @param {Array<String>} deck 
 * @returns {String} return a new deck card.
 */
export const getCard = (deck) => {
  if (!deck || deck.length === 0) {
    throw new Error('There are no cards in the deck')
  }

  const card = deck.pop()
  return card;
}