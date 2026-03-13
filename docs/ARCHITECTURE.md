# Architecture Overview

## System Design

### High-Level Structure

```
accessible-games-suite/
├── src/
│   ├── components/     # Reusable UI components
│   ├── games/          # Individual game implementations
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   └── types/          # TypeScript type definitions
```

### Core Principles

1. **Component Reusability**: Shared components across all games
2. **Accessibility First**: WCAG 2.1 AA compliance built-in
3. **Type Safety**: TypeScript for reduced runtime errors
4. **Testability**: Designed for unit, integration, and E2E testing

### Game Integration Pattern

Each game will implement a standard interface:

- Consistent navigation and controls
- Shared accessibility settings
- Common UI components (menus, buttons, modals)
- Standardized testing approach

## Tech Stack Decisions

**React + TypeScript**: Industry standard, excellent tooling, type safety
**Vite**: Fast development experience, modern build tool
**Tailwind CSS**: Rapid styling with accessibility utilities

## Current Implementation

### Memory Match Game
**Technology:** React functional components with hooks
**State Management:** useState for game state, useEffect for initialization
**Accessibility:** 
- ARIA labels on all interactive elements
- Live regions for game state announcements
- Keyboard navigation with visual focus indicators
- Screen reader tested with NVDA

**Key Components:**
- Card state tracking (flipped, matched)
- Match detection logic with 1-second delay
- Move counter and match counter
- Victory detection and new game reset
- Keyboard navigation (arrow keys for selection, Enter/Space to flip)

**Testing:** test cases covering initialization, card flipping, matching logic, game completion, and accessibility

### Platform Architecture
**Routing:** Conditional rendering based on currentGame state
**Component Reusability:** GameCard component used across all games
**Consistent Layout:** Header, Footer, and main content area structure
**Accessibility Pattern:** Semantic HTML, ARIA attributes, keyboard support
