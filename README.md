# Accessible Games Suite

An accessible, inclusive gaming platform built to showcase software development and quality engineering skills.

## 🎯 Project Vision

This platform demonstrates:
- **Accessible Design**: WCAG 2.1 AA compliant games for all abilities
- **Quality Engineering**: Comprehensive testing at unit, integration, and E2E levels
- **Modern Development**: React, TypeScript, and industry-standard tooling
- **Iterative Development**: Built in phases with visible progress

## 🚀 Current Status

**Phase 1: Foundation & First Game** (Complete)
- [x] Project setup with Vite + React + TypeScript
- [x] Platform shell with responsive navigation
- [x] Memory Match game with full accessibility
- [x] Comprehensive testing infrastructure (28 tests)
- [x] Lighthouse accessibility score: 87/100
- [x] NVDA screen reader tested and optimized

**Phase 2: Second Game** (In Progress)
- [ ] Showdown Game (reaction-time based)
- [ ] Additional accessibility testing
- [ ] Performance optimization

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library, Playwright (coming soon)
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

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

### Completed
1. **Memory Match** ✅
   - Card matching memory game
   - Full keyboard navigation (arrow keys + Enter/Space)
   - Screen reader support with ARIA labels and live regions
   - Visual indicators for color blindness
   - 16 test cases
   - Difficulty: Easy

### In Development
2. **Showdown Game** 🚧
   - Reaction-time based quick-draw game
   - Dual-modality cues (visual + audio)
   - Single-action gameplay
   - Difficulty: Hard

### Planned
3. **Word Puzzle** - Accessible word finding game

## ♿ Accessibility Features

**Implemented:**
- ✅ Full keyboard navigation (Tab, arrow keys, Enter, Space)
- ✅ Screen reader compatible (ARIA labels, live regions, semantic HTML)
- ✅ NVDA tested and optimized
- ✅ Visual indicators for color blindness (checkmarks, patterns)
- ✅ Focus indicators with high contrast
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ No flashing content
- ✅ Lighthouse accessibility score: 87/100

**Planned:**
- 🔲 High contrast mode toggle
- 🔲 Adjustable text size
- 🔲 Reduced motion preferences
- 🔲 Sound effect volume control
## 🧪 Testing Approach

- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user journeys
- **Accessibility Tests**: Automated WCAG checks

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md) (coming soon)
- [Accessibility Guidelines](./docs/ACCESSIBILITY.md) (coming soon)
- [Contributing Guide](./docs/CONTRIBUTING.md) (coming soon)
