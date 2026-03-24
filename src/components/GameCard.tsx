interface GameCardProps {
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  onPlay: () => void
}

function GameCard({ title, description, difficulty, onPlay }: GameCardProps) {
  const difficultyConfig = {
    Easy: { 
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dots: '●',
      gradient: 'from-emerald-50 to-teal-50'
    },
    Medium: { 
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      dots: '●●',
      gradient: 'from-amber-50 to-orange-50'
    },
    Hard: { 
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      dots: '●●●',
      gradient: 'from-rose-50 to-pink-50'
    }
  }

  const config = difficultyConfig[difficulty]

  return (
    <div className={`group bg-gradient-to-br ${config.gradient} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50`}>
      <div className="p-8">
        {/* Difficulty Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${config.color}`}>
            {config.dots} {difficulty}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed min-h-[3rem]">
          {description}
        </p>

        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Play Now →
        </button>
      </div>
    </div>
  )
}

export default GameCard