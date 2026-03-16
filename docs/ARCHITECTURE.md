# Architecture Overview

## System Design Philosophy

This platform demonstrates professional software engineering practices with a focus on:
- **Accessibility-first design** - WCAG 2.1 AA compliance from the ground up
- **Component reusability** - Shared patterns across all games
- **Type safety** - TypeScript throughout for reduced runtime errors
- **Testability** - Comprehensive test coverage with quality engineering mindset
- **Maintainability** - Clean code structure with clear separation of concerns

---

## High-Level Structure
```
accessible-games-suite/
├── public/
│   └── images/              # Game assets (silhouettes, etc.)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── GameCard.tsx
│   │   └── Footer.tsx
│   ├── games/               # Individual game implementations
│   │   ├── MemoryMatch.tsx
│   │   ├── MemoryMatch.test.tsx
│   │   ├── ShowdownGame.tsx
│   │   └── ShowdownGame.test.tsx
│   ├── test/                # Test configuration
│   │   └── setup.ts
│   ├── App.tsx              # Main application & routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & accessibility utilities
├── docs/                    # Documentation
└── tests/                   # Test utilities
```

---

## Core Technologies

### Frontend Stack
- **React 18** - Component-based UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling with accessibility focus

### Testing Stack
- **Vitest** - Fast unit testing framework
- **React Testing Library** - User-centric component testing
- **Mock timers & Audio APIs** - Testing time-based and browser features

---

## Application Architecture

### Routing Strategy
**Conditional rendering based on game state:**
```typescript
// App.tsx
const [currentGame, setCurrentGame] = useState<string | null>(null)

if (currentGame === 'memory-match') {
  return <MemoryMatch />
}

if (currentGame === 'showdown') {
  return <ShowdownGame />
}

return <GameSelectionScreen />
```

**Why this approach:**
- Simple and explicit
- No router dependencies
- Easy to test
- Clear game state management

---

## Game Implementation Patterns

### 1. Memory Match Game

**State Management:**
```typescript
interface Card {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

const [cards, setCards] = useState<Card[]>([])
const [flippedCards, setFlippedCards] = useState<number[]>([])
const [moves, setMoves] = useState(0)
const [matches, setMatches] = useState(0)
```

**Key Patterns:**
- Immutable state updates (never mutate arrays/objects)
- setTimeout for flip-back delay
- useEffect for keyboard listeners
- Live regions for screen reader announcements

**Accessibility Features:**
- Arrow key navigation with visual focus ring
- ARIA labels on all cards
- Live region announces matches
- Data attributes for testing

---

### 2. Showdown Game

**State Machine:**
```typescript
type GameState = 
  | 'instructions'
  | 'ready'
  | 'waiting'
  | 'go'
  | 'result'
  | 'false-start'
```

**Key Patterns:**
- useRef for timestamp storage (doesn't trigger re-renders)
- Web Audio API for sound generation
- Random delays for unpredictability
- State-based UI rendering

**Accessibility Features:**
- Dual-modality cues (visual + audio)
- Screen reader state announcements
- Single-action gameplay (SPACE key)
- Clear visual feedback with color changes

---

## Accessibility Architecture

### Component-Level Accessibility

**Every interactive element includes:**
1. **Semantic HTML** - `<button>`, `<header>`, `<main>`, `<footer>`
2. **ARIA attributes** - `role`, `aria-label`, `aria-live`
3. **Keyboard support** - Full navigation without mouse
4. **Focus management** - Visible focus indicators
5. **Screen reader support** - Meaningful announcements

### Global Accessibility Utilities

**Screen-reader-only class:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Focus styles:**
```css
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Testing Architecture

### Test Organization
- **Co-located tests** - `Component.test.tsx` next to `Component.tsx`
- **Setup file** - Shared test configuration in `src/test/setup.ts`
- **Mock utilities** - AudioContext mocks for browser APIs

### Testing Patterns

**Component Testing:**
```typescript
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('...')).toBeInTheDocument()
  })
})
```

**Accessibility Testing:**
```typescript
it('has accessible role', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

**Interaction Testing:**
```typescript
it('responds to keyboard', async () => {
  render(<Component />)
  fireEvent.keyDown(window, { code: 'Space' })
  expect(screen.getByText('Result')).toBeInTheDocument()
})
```

---

## State Management Strategy

**Local component state only:**
- No Redux or external state management
- useState for component data
- useRef for non-reactive values (timestamps)
- useEffect for side effects (timers, listeners)

**Why this approach:**
- Simple and explicit
- Easy to understand and debug
- Sufficient for current scope
- Can scale to Context API if needed

---

## Performance Considerations

**Optimizations:**
- Vite's fast HMR for development
- Code splitting by game (conditional rendering)
- Minimal dependencies
- Tailwind's purged CSS for production

**Accessibility vs Performance:**
- Live regions update frequently (acceptable tradeoff)
- Audio generation is lightweight
- Images optimized (PNG with transparency)
- No heavy animations or transitions

---

## Design Decisions

### Why React + TypeScript?
- Industry standard (employability)
- Type safety reduces bugs
- Excellent tooling and ecosystem
- Great testing support

### Why Tailwind CSS?
- Rapid development
- Built-in accessibility utilities
- Consistent design tokens
- Excellent documentation

### Why Monorepo Structure?
- Shared components across games
- Consistent testing patterns
- Easy to add new games
- Professional organization

### Why Co-located Tests?
- Easy to find related test
- Encourages testing alongside development
- Clear ownership
- Standard industry practice

---

## Future Architecture Considerations

**Potential enhancements:**
- Settings panel for accessibility preferences
- LocalStorage for best scores persistence
- Context API for global settings
- Sound effect library
- Difficulty level variations
- More sophisticated routing (React Router)

**Maintaining principles:**
- Accessibility first
- Test coverage on new features
- Type safety
- Clean component structure