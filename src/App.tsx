import { useState } from "react";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Footer from "./components/Footer";
import MemoryMatch from "./games/MemoryMatch";
import ShowdownGame from './games/ShowdownGame';
import NumberGuess from './games/NumberGuess';

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
    if (currentGame === 'showdown') {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentGame(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to Games
          </button>
          <ShowdownGame />
        </main>
        <Footer />
      </div>
    )
  }
    if (currentGame === 'number-guess') {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentGame(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to Games
          </button>
          <NumberGuess />
        </main>
        <Footer />
      </div>
    )
  }
  if (currentGame === "memory-match") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <button
            onClick={() => setCurrentGame(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to Games
          </button>
          <MemoryMatch />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Game
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All games are fully keyboard accessible and optimised for screen readers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameCard
            title="Memory Match"
            description="Test your memory by matching pairs of cards. Includes audio cues and high contrast mode."
            difficulty="Easy"
            onPlay={() => setCurrentGame("memory-match")}
          />

          <GameCard
            title="Number Guess"
            description="Guess the secret number between 1-100. Classic game with hints and score tracking."
            difficulty="Easy"
            onPlay={() => setCurrentGame('number-guess')}
          />

          <GameCard
            title="Showdown Game"
            description="Test your reaction time in this quick-draw challenge. Visual and audio cues."
            difficulty="Hard"
            onPlay={() => setCurrentGame('showdown')}
          />
       </div>
    </div>
  </main>

      <Footer />
    </div>
  );
}

export default App;
