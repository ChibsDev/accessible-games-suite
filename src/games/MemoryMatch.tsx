import { useState, useEffect } from "react";

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = ["🎮", "🎯", "🎨", "🎭", "🎪", "🎸", "🎲", "🎰"];

function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Initialize the game when component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  function initializeGame() {
    // Create pairs: each symbol appears twice
    const cardPairs = SYMBOLS.flatMap((symbol, index) => [
      { id: index * 2, symbol, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false },
    ]);

    const shuffled = cardPairs.sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setMoves(0);
    setMatches(0);
  }

  function handleCardClick(cardId: number) {
    if (flippedCards.length === 2) return;

    const clickedCard = cards.find((card) => card.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    const newCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card,
    );
    setCards(newCards);

    // Add this card to flipped cards
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // If this is the second card, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards, newCards);
    }
  }

  function checkForMatch(flippedCardIds: number[], currentCards: Card[]) {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = currentCards.find((card) => card.id === firstId);
    const secondCard = currentCards.find((card) => card.id === secondId);

    if (!firstCard || !secondCard) return;

    if (firstCard.symbol === secondCard.symbol) {
      const newCards = currentCards.map((card) =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card,
      );
      setCards(newCards);
      setMatches(matches + 1);
      setFlippedCards([]);
    } else {
      setTimeout(() => {
        const newCards = currentCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card,
        );
        setCards(newCards);
        setFlippedCards([]);
      }, 1000); // 1 second delay
    }
  }

  function checkGameComplete() {
  return cards.length > 0 && cards.every((card) => card.isMatched);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Memory Match
            </h2>
            <p className="text-gray-600">Find all matching pairs of cards!</p>
          </div>

          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            New Game
          </button>
        </div>

        <div className="flex gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{moves}</p>
            <p className="text-sm text-gray-600">Moves</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{matches}</p>
            <p className="text-sm text-gray-600">Matches</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {checkGameComplete() ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              Congratulations!
            </h3>
            <p className="text-gray-600 mb-6">
              You completed the game in {moves} moves!
            </p>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-4xl flex items-center justify-center focus:outline-none focus:ring-2 transition-colors ${
                card.isMatched 
                  ? 'bg-green-600 cursor-default' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 cursor-pointer'
              }`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : "❓"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MemoryMatch;
