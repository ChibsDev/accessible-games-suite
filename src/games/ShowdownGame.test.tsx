import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ShowdownGame from './ShowdownGame'

// Mock Web Audio API (not available in jsdom)
beforeEach(() => {
  global.AudioContext = vi.fn().mockImplementation(() => ({
    createOscillator: vi.fn().mockReturnValue({
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: { value: 0 },
      type: 'sine'
    }),
    createGain: vi.fn().mockReturnValue({
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn()
      }
    }),
    destination: {},
    currentTime: 0
  })) as any
})

describe('ShowdownGame', () => {
  describe('Game Initialization', () => {
    it('renders the game title', () => {
      render(<ShowdownGame />)
      expect(screen.getByText(/SHOWDOWN CHALLENGE/i)).toBeInTheDocument()
    })

    it('shows instructions on initial load', () => {
      render(<ShowdownGame />)
      expect(screen.getByText('Quick Draw Challenge')).toBeInTheDocument()
      expect(screen.getByText(/Test your reaction time/i)).toBeInTheDocument()
    })

    it('displays how to play instructions', () => {
      render(<ShowdownGame />)
      expect(screen.getByText(/Press "Start" to begin/i)).toBeInTheDocument()
      expect(screen.getByText(/Wait for the "GO!" signal/i)).toBeInTheDocument()
      expect(screen.getByText(/Press SPACE as fast as you can/i)).toBeInTheDocument()
    })

    it('starts with 0 attempts', () => {
      render(<ShowdownGame />)
      expect(screen.getByTestId('attempts-count')).toHaveTextContent('0')
    })

    it('starts with no best time', () => {
      render(<ShowdownGame />)
      expect(screen.getByTestId('best-time')).toHaveTextContent('---')
    })

    it('has a Start Game button', () => {
      render(<ShowdownGame />)
      expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
    })
  })

  describe('Game Flow', () => {
    it('shows "Get Ready" state after clicking Start', () => {
      render(<ShowdownGame />)
      
      const startButton = screen.getByRole('button', { name: /start game/i })
      fireEvent.click(startButton)
      
      expect(screen.getByText('Get Ready...')).toBeInTheDocument()
    })

    it('has Start Game button in instructions state', () => {
      render(<ShowdownGame />)
      expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument()
    })
  })

  describe('Game States', () => {
    it('displays game instructions initially', () => {
      render(<ShowdownGame />)
      expect(screen.getByText('Quick Draw Challenge')).toBeInTheDocument()
    })

    it('shows stats bar with attempts and best time', () => {
      render(<ShowdownGame />)
      expect(screen.getByText('Attempts')).toBeInTheDocument()
      expect(screen.getByText('Best Time')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has accessible game area role', () => {
      render(<ShowdownGame />)
      const gameArea = screen.getByRole('application')
      expect(gameArea).toBeInTheDocument()
    })

    it('has descriptive aria-label', () => {
      render(<ShowdownGame />)
      const gameArea = screen.getByLabelText('Showdown game area')
      expect(gameArea).toBeInTheDocument()
    })

    it('is keyboard focusable', () => {
      render(<ShowdownGame />)
      const gameArea = screen.getByTestId('game-area')
      expect(gameArea).toHaveAttribute('tabIndex', '0')
    })

    it('has live region for screen reader announcements', () => {
      render(<ShowdownGame />)
      const liveRegion = screen.getByRole('status')
      expect(liveRegion).toBeInTheDocument()
    })

    it('game area has proper ARIA attributes', () => {
      render(<ShowdownGame />)
      const gameArea = screen.getByTestId('game-area')
      expect(gameArea).toHaveAttribute('aria-label', 'Showdown game area')
      expect(gameArea).toHaveAttribute('role', 'application')
    })
  })

  describe('UI Elements', () => {
    it('renders stats correctly', () => {
      render(<ShowdownGame />)
      expect(screen.getByTestId('attempts-count')).toBeInTheDocument()
      expect(screen.getByTestId('best-time')).toBeInTheDocument()
    })

    it('displays warning about false starts', () => {
      render(<ShowdownGame />)
      expect(screen.getByText(/Don't press before "GO!" or it's a false start!/i)).toBeInTheDocument()
    })
  })
})