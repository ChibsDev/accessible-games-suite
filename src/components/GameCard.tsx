interface GameCardProps {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

function GameCard({ title, description, difficulty }: GameCardProps) {

  const difficultyColours = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColours[difficulty]}`}
        >
          {difficulty}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Play Game
      </button>
    </div>
  );
}

export default GameCard;
