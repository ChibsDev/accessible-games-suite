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
    <div className="max-w-4xl mx-auto">
      {/* Stats Card - Modern Design */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-8 mb-6 border border-purple-100">
        <h2 className="text-4xl font-black text-gray-900 mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ⚡ Showdown Challenge
        </h2>
        
        <div className="flex gap-6 justify-center">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 min-w-[140px] text-center border border-purple-200">
            <p className="text-4xl font-black text-purple-600" data-testid="attempts-count">
              {attempts}
            </p>
            <p className="text-sm font-bold text-gray-600 mt-2">Attempts</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 min-w-[140px] text-center border border-emerald-200">
            <p className="text-4xl font-black text-emerald-600" data-testid="best-time">
              {bestTime !== null ? `${bestTime}ms` : '---'}
            </p>
            <p className="text-sm font-bold text-gray-600 mt-2">Best Time</p>
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
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-gray-200/50 min-h-96 flex items-center justify-center"
        role="application"
        aria-label="Showdown game area"
        tabIndex={0}
        data-testid="game-area"
      >
        {gameState === 'instructions' && (
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Draw Challenge
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Test your reaction time!
            </p>
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-8 mb-8 text-left max-w-md mx-auto border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">How to Play:</h4>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">1.</span>
                  <span>Press "Start" to begin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">2.</span>
                  <span>Wait for the "GO!" signal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">3.</span>
                  <span>Press SPACE as fast as you can</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">4.</span>
                  <span>See your reaction time</span>
                </li>
              </ol>
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800 font-medium">
                  ⚠️ Don't press before "GO!" or it's a false start!
                </p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Start Game
            </button>
          </div>
        )}

        {gameState === 'ready' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full animate-pulse">
                <span className="text-6xl">👁️</span>
              </div>
            </div>
            <h3 className="text-5xl font-black text-gray-900 mb-4">
              Get Ready...
            </h3>
            <p className="text-xl text-gray-600">
              Press SPACE when you see GO!
            </p>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-8 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full animate-pulse">
                <span className="text-6xl">⏳</span>
              </div>
            </div>
            <h3 className="text-5xl font-black text-amber-600">
              Wait for it...
            </h3>
          </div>
        )}

        {gameState === 'go' && (
          <div className="text-center -m-12 flex items-center justify-center min-h-96 w-full rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 shadow-2xl border-4 border-white">
            <div className="flex flex-col items-center gap-6">
              <div className="p-8 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
                <span className="text-8xl">⚡</span>
              </div>
              <h3 className="text-9xl font-black text-white drop-shadow-2xl animate-pulse">
                GO!
              </h3>
            </div>
          </div>
        )}

        {gameState === 'false-start' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-8 bg-gradient-to-br from-red-100 to-rose-100 rounded-full">
                <span className="text-6xl">❌</span>
              </div>
            </div>
            <h3 className="text-5xl font-black text-red-600 mb-4">
              False Start!
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              You pressed too early. Wait for the GO signal!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Try Again
            </button>
          </div>
        )}

        {gameState === 'result' && reactionTime !== null && (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                <span className="text-6xl">
                  {reactionTime < 200 ? '🏆' : 
                  reactionTime < 300 ? '⚡' :
                  reactionTime < 400 ? '👍' :
                  '🎯'}
                </span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              Your Time
            </h3>
            <p className="text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {reactionTime}ms
            </p>
            <p className="text-2xl font-semibold text-gray-600 mb-8">
              {reactionTime < 200 ? '🏆 Lightning Fast!' : 
              reactionTime < 300 ? '⚡ Great Reflexes!' :
              reactionTime < 400 ? '👍 Good Job!' :
              '🎯 Keep Practicing!'}
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xl font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowdownGame