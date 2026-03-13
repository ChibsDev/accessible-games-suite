import { useState } from "react";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Footer from "./components/Footer";
import MemoryMatch from "./games/MemoryMatch";
import ShowdownGame from './games/ShowdownGame';

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
    if (currentGame === 'showdown') {
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
          <ShowdownGame />
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

      <main className="flex-1 container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Memory Match"
            description="Test your memory by matching pairs of cards. Includes audio cues and high contrast mode."
            difficulty="Easy"
            onPlay={() => setCurrentGame("memory-match")}
          />

          <GameCard
            title="Word Puzzle"
            description="Find words in a grid. Fully keyboard accessible with screen reader support."
            difficulty="Medium"
            onPlay={() => alert("Coming soon!")}
          />

          <GameCard
            title="Showdown Game"
            description="Test your reaction time in this quick-draw challenge. Visual and audio cues."
            difficulty="Hard"
            onPlay={() => setCurrentGame('showdown')}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
