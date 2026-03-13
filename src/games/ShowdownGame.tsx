import { useState, useEffect, useRef } from 'react'

type GameState = 
  | 'instructions'
  | 'ready'
  | 'waiting'
  | 'go'
  | 'result'
  | 'false-start'

function ShowdownGame() {
  const [gameState, setGameState] = useState<GameState>('instructions')
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)

  // store timestamps without causing re-renders
  const goTimeRef = useRef<number>(0)

  function playBeep() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = 800 // 800Hz beep
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

  function startGame() {
    setGameState('ready')
    setReactionTime(null)
    
  
    setTimeout(() => {
      setGameState('waiting')
      startCountdown()
    }, 1500)
  }

  function startCountdown() {
    // Medium difficulty
    const randomDelay = 2000 + Math.random() * 2000
    
    setTimeout(() => {
      goTimeRef.current = Date.now()
      playBeep()
      setGameState('go')
    }, randomDelay)
  }

  function handleSpacePress() {
    if (gameState === 'waiting') {
      // Pressed too early
      setGameState('false-start')
      return
    }

    if (gameState === 'go') {
      // Calculate reaction time
      const now = Date.now()
      const time = now - goTimeRef.current
      setReactionTime(time)
      setAttempts(attempts + 1)
      
      // Update best time if this is better
      if (bestTime === null || time < bestTime) {
        setBestTime(time)
      }
      
      setGameState('result')
    }
  }

  // Keyboard event listener
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space') {
        event.preventDefault()
        handleSpacePress()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, attempts, bestTime]) // Dependencies so handleSpacePress has current values

  return (
  <div className="min-h-screen bg-gradient-to-b from-orange-100 via-yellow-50 to-orange-100 py-8">
    <div className="max-w-7xl mx-auto relative px-4">
      {/* Left Cowboy Silhouette */}
      <div 
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-64 h-96"
        style={{
          backgroundImage: "url('/images/duel-silhouette.png')",
          backgroundPosition: 'left center',
          backgroundSize: 'auto 300px',
          backgroundRepeat: 'no-repeat'
        }}
        aria-hidden="true"
      />

      {/* Right Cowboy Silhouette */}
      <div 
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-64 h-96"
        style={{
          backgroundImage: "url('/images/duel-silhouette.png')",
          backgroundPosition: 'right center',
          backgroundSize: 'auto 300px',
          backgroundRepeat: 'no-repeat'
        }}
        aria-hidden="true"
      />

      {/* Center Game Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Stats Bar */}
        <div className="bg-amber-50 border-4 border-amber-900 rounded-lg shadow-2xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-amber-900 mb-4 text-center font-serif">
            ⭐ SHOWDOWN CHALLENGE ⭐
          </h2>
          
          <div className="flex gap-8 text-center justify-center">
            <div>
              <p className="text-2xl font-bold text-blue-600" data-testid="attempts-count">
                {attempts}
              </p>
              <p className="text-sm text-gray-600">Attempts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600" data-testid="best-time">
                {bestTime !== null ? `${bestTime}ms` : '---'}
              </p>
              <p className="text-sm text-gray-600">Best Time</p>
            </div>
          </div>
        </div>

        {/* Screen reader announcements */}
        <div 
          role="status" 
          aria-live="polite" 
          className="sr-only"
        >
          {gameState === 'ready' && 'Get ready to react'}
          {gameState === 'waiting' && 'Wait for the signal'}
          {gameState === 'go' && 'Go now!'}
          {gameState === 'false-start' && 'False start! You pressed too early'}
          {gameState === 'result' && reactionTime && `Your reaction time: ${reactionTime} milliseconds`}
        </div>

        {/* Game Area */}
        <div 
          className="bg-amber-50/95 backdrop-blur-sm border-4 border-amber-900 rounded-lg shadow-2xl p-12 min-h-96 flex items-center justify-center"
          role="application"
          aria-label="Showdown game area"
          tabIndex={0}
          data-testid="game-area"
        >
          {gameState === 'instructions' && (
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Quick Draw Challenge
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Test your reaction time!
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h4 className="font-bold text-gray-800 mb-3">How to Play:</h4>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Press "Start" to begin</li>
                  <li>2. Wait for the "DRAW!" signal</li>
                  <li>3. Press SPACE as fast as you can</li>
                  <li>4. See your reaction time</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  ⚠️ Don't press before "DRAW!" or it's a false start!
                </p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                Start Game
              </button>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="text-center">
              <h3 className="text-5xl font-bold text-gray-800">
                Get Ready...
              </h3>
              <p className="text-xl text-gray-600 mt-4">
                Press SPACE when you see DRAW!
              </p>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="text-center">
              <h3 className="text-5xl font-bold text-yellow-600">
                Wait for it...
              </h3>
            </div>
          )}

          {gameState === 'go' && (
            <div className="text-center bg-red-600 -m-12 flex items-center justify-center min-h-96 w-full rounded-lg border-4 border-amber-900 shadow-inner">
              <div className="flex flex-col items-center">
                <h3 className="text-9xl font-black text-yellow-300 animate-pulse drop-shadow-2xl">
                  DRAW!
                </h3>
                <p className="text-4xl text-white font-bold mt-4">🔫</p>
              </div>
            </div>
          )}

          {gameState === 'false-start' && (
            <div className="text-center">
              <h3 className="text-5xl font-bold text-red-600 mb-4">
                False Start!
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                You pressed too early. Wait for the DRAW signal!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          )}

          {gameState === 'result' && reactionTime !== null && (
            <div className="text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Your Time
              </h3>
              <p className="text-7xl font-black text-blue-600 mb-6">
                {reactionTime}ms
              </p>
              <p className="text-2xl text-gray-600 mb-8">
                {reactionTime < 200 ? '🏆 Lightning Fast!' : 
                 reactionTime < 300 ? '⚡ Great Reflexes!' :
                 reactionTime < 400 ? '👍 Good Job!' :
                 '🎯 Keep Practicing!'}
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ShowdownGame