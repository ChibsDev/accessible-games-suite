# Accessible Games Suite

An accessible, inclusive gaming platform built to showcase software development and quality engineering skills.

## 🎯 Project Vision

This platform demonstrates:
- **Accessible Design**: WCAG 2.1 AA compliant games for all abilities
- **Quality Engineering**: Comprehensive testing at unit, integration, and E2E levels
- **Modern Development**: React, TypeScript, and industry-standard tooling
- **Iterative Development**: Built in phases with visible progress

## 🚀 Current Status

**Phase 1: Foundation & First Game** ✅ Complete
- [x] Project setup with Vite + React + TypeScript
- [x] Platform shell with responsive navigation
- [x] Memory Match game with full accessibility
- [x] Comprehensive testing infrastructure (51 passing tests)
- [x] Lighthouse accessibility score: 87/100
- [x] NVDA screen reader tested and optimized

**Phase 2: Second Game** ✅ Complete
- [x] Showdown Game (reaction-time challenge)
- [x] Western visual theming with silhouettes
- [x] Audio cues (beep on GO signal)
- [x] Full test coverage

**Phase 3: Third Game** 🚧 In Progress
- [ ] TDD approach for next game
- [ ] Additional accessibility features

## 🛠️ Tech Stack

**Frontend Framework:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling

**Testing:**
- Vitest (unit & integration testing)
- React Testing Library (component testing)
- 51 passing tests across all components

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

### 3. Coming Soon 🚧
**Approach:** Test-Driven Development (TDD)
- Writing tests first
- Building with accessibility from the ground up


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
- **51 automated tests** across platform and games
- Unit tests for component logic
- Integration tests for user interactions
- Accessibility tests for ARIA and keyboard support

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
