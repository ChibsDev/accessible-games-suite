import { useState } from 'react'

function NumberGuess() {
  const [secretNumber, setSecretNumber] = useState(() => {
    return Math.floor(Math.random() * 100) + 1  // Random number 1-100
  })

  const [currentGuess, setCurrentGuess] = useState('')

  const [guessCount, setGuessCount] = useState(0)

  const [feedback, setFeedback] = useState('')

  const [hasWon, setHasWon] = useState(false)

  const [bestScore, setBestScore] = useState<number | null>(null)

  const [guessHistory, setGuessHistory] = useState<number[]>([]) 

  const [showHint, setShowHint] = useState(false)

  function handleGuess() {
  if (currentGuess === '') return

  const guess = parseInt(currentGuess)

  setGuessHistory([...guessHistory, guess])

  setGuessCount(guessCount + 1)

  if (guess === secretNumber) {
    const finalGuessCount = guessCount + 1
    setFeedback(`🎉 Correct! You won in ${finalGuessCount} guesses!`)
    setHasWon(true)
    
    // Update best score if this is better (or first win)
    if (bestScore === null || finalGuessCount < bestScore) {
      setBestScore(finalGuessCount)
    }
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
    setGuessHistory([])
    setShowHint(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Screen reader announcements */}
      <div 
        role="status" 
        aria-live="polite" 
        className="sr-only"
      >
        {feedback && `${feedback} You have made ${guessCount} guesses.`}
      </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Number Guessing Game
        </h1>
        <p className="text-gray-600 mb-2">
          I'm thinking of a number between 1 and 100.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Can you guess it? I'll tell you if you need to go higher or lower!
        </p>

        <div className="flex gap-8 text-center mb-6">
          <div>
            <p className="text-2xl font-bold text-blue-600" data-testid="guess-count">
              {guessCount}
            </p>
            <p className="text-sm text-gray-600">Guesses</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600" data-testid="best-score">
              {bestScore !== null ? bestScore : '---'}
            </p>
            <p className="text-sm text-gray-600">Best Score</p>
          </div>
        </div>

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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGuess()
                }
              }}
              disabled={hasWon}
              className="flex-1 px-6 py-4 text-4xl font-bold text-center bg-gray-50 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
              placeholder="?"
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
                {/* Hint Button, only show if user has made guesses */}
        {guessHistory.length > 0 && !hasWon && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>
        )}

        {/* Hint Display */}
        {showHint && guessHistory.length > 0 && (
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-purple-900 mb-2">Your Previous Guesses:</h3>
            <div className="flex flex-wrap gap-2">
              {guessHistory.map((guess, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full font-semibold"
                >
                  {guess}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NumberGuess