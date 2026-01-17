function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2026 Accessible Games Suite
          </p>
          
          <div className="flex gap-6">
            <a 
              href="https://github.com/ChibsDev/accessible-games-suite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm text-center mt-4">
          Built with accessibility in mind • WCAG 2.1 AA Compliant
        </p>
      </div>
    </footer>
  )
}

export default Footer