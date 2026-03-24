function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Accessible Games
          </h1>
          <p className="text-indigo-100 text-sm font-medium tracking-wide">
            Inclusive gaming for everyone
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header