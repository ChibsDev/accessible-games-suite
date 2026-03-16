import { useState } from 'react'

function NumberGuess() {
  const [secretNumber, setSecretNumber] = useState(() => {
    return Math.floor(Math.random() * 100) + 1  // Random number 1-100
  })

  const [currentGuess, setCurrentGuess] = useState('')

  const [guessCount, setGuessCount] = useState(0)

  const [feedback, setFeedback] = useState('')

  const [hasWon, setHasWon] = useState(false)

  function handleGuess() {
  if (currentGuess === '') return

  const guess = parseInt(currentGuess)

  setGuessCount(guessCount + 1)

  if (guess === secretNumber) {
    setFeedback('🎉 Correct! You won!')
    setHasWon(true)
  } else if (guess < secretNumber) {
    setFeedback('📈 Higher!')
  } else {
    setFeedback('📉 Lower!')
  }

  setCurrentGuess('')
}

  function handlePlayAgain() {
    setSecretNumber(Math.floor(Math.random() * 100) + 1)
    
    setCurrentGuess('')
    setGuessCount(0)
    setFeedback('')
    setHasWon(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Number Guessing Game
        </h1>
        <p className="text-gray-600 mb-6">
          I'm thinking of a number between 1 and 100...
        </p>

        {/* Show current guess count */}
        <p className="text-lg text-gray-700 mb-4">
          Guesses: <span className="font-bold" data-testid="guess-count">{guessCount}</span>
        </p>

        <div className="mb-6">
          <label htmlFor="guess-input" className="block text-gray-700 mb-2">
            Your Guess:
          </label>
          <div className="flex gap-4">
            <input
              id="guess-input"
              type="number"
              min="1"
              max="100"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              disabled={hasWon}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter a number..."
              aria-label="Your guess between 1 and 100"
            />
            <button
              onClick={handleGuess}
              disabled={hasWon}
              className="px-8 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guess
            </button>
          </div>
        </div>

        {feedback && (
          <p className="text-xl font-bold text-center mb-4" data-testid="feedback">
            {feedback}
          </p>
        )}

        {hasWon && (
          <div className="text-center mb-6">
            <button
              onClick={handlePlayAgain}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Debug */}
        <p className="text-sm text-red-500 mb-4">
          DEBUG: Secret number is {secretNumber}
        </p>
      </div>
    </div>
  )
}

export default NumberGuess