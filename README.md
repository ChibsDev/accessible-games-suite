# Accessible Games Suite

An accessible, inclusive gaming platform built to showcase software development and quality engineering skills.

## 🎯 Project Vision

This platform demonstrates:
- **Accessible Design**: WCAG 2.1 AA compliant games for all abilities
- **Quality Engineering**: Comprehensive testing at unit, integration, and E2E levels
- **Modern Development**: React, TypeScript, and industry-standard tooling
- **Iterative Development**: Built in phases with visible progress

## 🚀 Current Status

**✅ PROJECT COMPLETE - Three Fully Accessible Games**

**Phase 1: Foundation & First Game** ✅ Complete
- [x] Project setup with Vite + React + TypeScript
- [x] Platform shell with responsive navigation
- [x] Memory Match game with full accessibility
- [x] Comprehensive testing infrastructure
- [x] Lighthouse accessibility score: 87/100
- [x] NVDA screen reader tested and optimized

**Phase 2: Second Game** ✅ Complete
- [x] Showdown Game (reaction-time challenge)
- [x] Western visual theming with silhouettes
- [x] Audio cues (beep on GO signal)
- [x] Full test coverage

**Phase 3: Third Game** ✅ Complete
- [x] Number Guessing Game (logic puzzle)
- [x] Guess history with hint system
- [x] Enter key submission support
- [x] Best score tracking
- [x] 26 comprehensive tests

**Final Stats:**
- 🎮 3 fully accessible games
- ✅ 81+ passing tests across all components
- ♿ WCAG 2.1 AA compliant
- 📱 Responsive design
- 🔊 Screen reader optimized

## 🛠️ Tech Stack

**Frontend Framework:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling

**Testing:**
- Vitest (unit & integration testing)
- React Testing Library (component testing)
- 81+ passing tests across all components and games
- Mock timers for game state testing
- AudioContext mocking for browser APIs

**Accessibility:**
- ARIA labels and live regions
- Semantic HTML
- Keyboard navigation
- NVDA screen reader tested
- Lighthouse score: 87/100

**Development Tools:**
- ESLint & Prettier
- Git version control
- VS Code with accessibility extensions

## 📦 Getting Started

### Prerequisites
- Node.js 20+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/ChibsDev/accessible-games-suite.git

# Navigate to project
cd accessible-games-suite

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🎮 Games

### 1. Memory Match ✅
**Difficulty:** Easy  
**Type:** Puzzle/Memory

**Features:**
- Classic card-matching memory game
- 16 cards (8 matching pairs) with emoji symbols
- Full keyboard navigation (arrow keys + Enter/Space)
- Visual indicators for color blindness (checkmark on matched cards)
- Screen reader support with ARIA labels and live regions
- Move counter and match tracker
- New Game reset functionality

**Accessibility Highlights:**
- Keyboard-only playable
- Screen reader tested with NVDA
- High contrast focus indicators
- No time pressure
- 16 automated tests

---

### 2. Showdown Game ✅
**Difficulty:** Hard  
**Type:** Reaction/Timing

**Features:**
- Wild West themed quick-draw reaction game
- Dual-modality cues (visual flash + audio beep)
- Reaction time measurement in milliseconds
- Best time tracking
- False start detection
- Performance feedback (Lightning Fast, Great Reflexes, etc.)

**Accessibility Highlights:**
- Single-action gameplay (press SPACE)
- Visual AND audio cues (works for deaf or blind users)
- Screen reader announcements for all game states
- No sustained timing required
- Western silhouette theming with sunset gradient
- 17 automated tests

---

### 3. Number Guessing Game ✅
**Difficulty:** Easy  
**Type:** Logic/Puzzle

**Features:**
- Classic number guessing game (1-100)
- Intelligent feedback system (Higher/Lower hints)
- Guess history tracker with toggle display
- Best score tracking (fewest guesses)
- Enter key submission support
- Clean, minimal UI with large input

**Accessibility Highlights:**
- Keyboard-only playable (Enter to submit)
- Screen reader announcements for all feedback
- Large, bold input field (easy to read)
- Clear visual feedback
- No time pressure
- Optional hint system (view previous guesses)
- 26 automated tests

**User Experience Features:**
- Input clears automatically after each guess
- Hint button appears after first guess
- Play Again resets entire game state
- Persistent best score across rounds


## ♿ Accessibility Features

**Implemented:**
- ✅ Full keyboard navigation (Tab, arrow keys, Enter, Space)
- ✅ Screen reader compatible (ARIA labels, live regions, semantic HTML)
- ✅ NVDA tested and optimized with real-world usage
- ✅ Visual indicators for color blindness (checkmarks, dots, patterns)
- ✅ Dual-modality cues (visual + audio in Showdown Game)
- ✅ Focus indicators with high contrast yellow rings
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ No flashing content or seizure triggers
- ✅ No mandatory time pressure
- ✅ Lighthouse accessibility score: 87/100
- ✅ WCAG 2.1 AA compliant design

**Testing Approach:**
- Automated accessibility tests
- Manual screen reader testing (NVDA)
- Keyboard-only navigation testing
- Color contrast verification
- Lighthouse audits

## 🧪 Testing Approach

**Test Coverage:**
- **81+ automated tests** across platform and games
- Memory Match: 28 tests
- Showdown Game: 17 tests
- Number Guessing Game: 26 tests
- Platform Components: 10+ tests

**Testing Tools:**
- Vitest for test running
- React Testing Library for component testing
- Mock timers for game state testing
- AudioContext mocking for browser APIs

**Quality Engineering:**
- Tests written alongside features
- Accessibility requirements tested
- Data-testid attributes for maintainable selectors

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) (coming soon)
- [Accessibility Guidelines](./docs/ACCESSIBILITY.md) (coming soon)
- [Contributing Guide](./docs/CONTRIBUTING.md) (coming soon)
