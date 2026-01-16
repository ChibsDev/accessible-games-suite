import Header from "./components/Header";
import GameCard from "./components/GameCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Games
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Memory Match"
            description="Test your memory by matching pairs of cards. Includes audio cues and high contrast mode."
            difficulty="Easy"
          />

          <GameCard
            title="Word Puzzle"
            description="Find words in a grid. Fully keyboard accessible with screen reader support."
            difficulty="Medium"
          />

          <GameCard
            title="Rhythm Game"
            description="Match the beat! Audio-based gameplay with visual indicators."
            difficulty="Hard"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
