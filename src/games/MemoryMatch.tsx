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
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [lastAction, setLastAction] = useState<string>('');

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
    setSelectedCardIndex(0);
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

  // Clear previous announcement when flipping first card of a new pair
  if (newFlippedCards.length === 1) {
    setLastAction('');
  }

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
      setLastAction(`Match found! Total matches: ${matches + 1}`);
    } else {
      setLastAction('Not a match');
      setTimeout(() => {
        const newCards = currentCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card,
        );
        setCards(newCards);
        setFlippedCards([]);
        setLastAction('');
      }, 1000); // 1 second delay
    }
  }

  function checkGameComplete() {
  return cards.length > 0 && cards.every((card) => card.isMatched);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
  
  if (checkGameComplete()) return

  const totalCards = cards.length
  const cols = 4  

  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      setSelectedCardIndex((prev) => (prev + 1) % totalCards)
      break
    
    case 'ArrowLeft':
      event.preventDefault()
      setSelectedCardIndex((prev) => (prev - 1 + totalCards) % totalCards)
      break
    
    case 'ArrowDown':
      event.preventDefault()
      setSelectedCardIndex((prev) => {
        const newIndex = prev + cols
        return newIndex < totalCards ? newIndex : prev
      })
      break
    
    case 'ArrowUp':
      event.preventDefault()
      setSelectedCardIndex((prev) => {
        const newIndex = prev - cols
        return newIndex >= 0 ? newIndex : prev
      })
      break
    
    case 'Enter':
    case ' ':  // Space bar
      event.preventDefault()
      const selectedCard = cards[selectedCardIndex]
      if (selectedCard) {
        handleCardClick(selectedCard.id)
      }
      break
  }
}

  return (
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg p-8 mb-6 border border-indigo-100">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Memory Match
          </h2>
          <p className="text-gray-600 font-medium">Find all matching pairs of cards!</p>
        </div>

        <button
          onClick={initializeGame}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          New Game
        </button>
      </div>

      <div className="flex gap-6 justify-center">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 min-w-[140px] text-center border border-indigo-200">
          <p className="text-4xl font-black text-indigo-600" data-testid="moves-count">{moves}</p>
          <p className="text-sm font-bold text-gray-600 mt-2">Moves</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 min-w-[140px] text-center border border-emerald-200">
          <p className="text-4xl font-black text-emerald-600" data-testid="matches-count">{matches}</p>
          <p className="text-sm font-bold text-gray-600 mt-2">Matches</p>
        </div>
      </div>
    </div>

    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50">
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {lastAction}
      </div>
      
      <div 
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="application"
        aria-label="Memory match game board"
        data-testid="game-board"
      >
        {checkGameComplete() ? (
          // Victory Screen
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
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Play Again
            </button>
          </div>
        ) : (
          // Card Grid
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => {
              const isSelected = index === selectedCardIndex;
              
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  data-testid={`card-${card.id}`}
                  data-matched={card.isMatched}
                  data-flipped={card.isFlipped}
                  aria-label={
                    card.isMatched 
                      ? `Matched card, ${card.symbol}` 
                      : card.isFlipped 
                      ? `Card showing ${card.symbol}` 
                      : 'Hidden card'
                  }
                  className={`
                    aspect-square rounded-xl font-bold text-4xl
                    flex items-center justify-center
                    transition-all duration-300 transform
                    ${card.isMatched 
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white scale-95 shadow-inner cursor-default' 
                      : card.isFlipped 
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer'
                    }
                    ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
                    focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2
                  `}
                >
                  {card.isMatched ? (
                    <span className="flex flex-col items-center gap-1">
                      <span>{card.symbol}</span>
                      <span className="text-xl">✓</span>
                    </span>
                  ) : card.isFlipped ? (
                    card.symbol
                  ) : (
                    '❓'
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default MemoryMatch;
