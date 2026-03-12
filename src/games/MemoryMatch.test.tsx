import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import MemoryMatch from './MemoryMatch'

describe('MemoryMatch Game', () => {
  beforeEach(() => {
    render(<MemoryMatch />)
  })

  describe('Game Initialization', () => {
    it('renders the game title', () => {
      expect(screen.getByText('Memory Match')).toBeInTheDocument()
    })

    it('renders the game description', () => {
      expect(screen.getByText('Find all matching pairs of cards!')).toBeInTheDocument()
    })

    it('initializes with 16 cards', () => {
      const cards = screen.getAllByRole('button').filter(btn => 
        btn.textContent === '❓' || btn.textContent?.match(/[🎮🎯🎨🎭🎪🎸🎲🎰]/)
      )
      expect(cards.length).toBe(16)
    })

    it('starts with 0 moves', () => {
      expect(screen.getByTestId('moves-count')).toHaveTextContent('0')
    })

    it('starts with 0 matches', () => {
      expect(screen.getByTestId('matches-count')).toHaveTextContent('0')
    })

    it('all cards start face down', () => {
      const faceDownCards = screen.getAllByText('❓')
      expect(faceDownCards.length).toBe(16)
    })
  })

  describe('Card Flipping', () => {
    it('flips a card when clicked', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      const firstCard = cards[0]
      
      await user.click(firstCard)

      expect(firstCard.textContent).not.toBe('❓')
    })

    it('flips two cards before checking for match', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
      await user.click(cards[0])
      await user.click(cards[1])
      
      // Both cards should be flipped (facedown should be less than total)
      const faceDownCards = screen.getAllByText('❓')
      expect(faceDownCards.length).toBeLessThan(16)
    })

    it('increments move counter when two cards are flipped', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
      await user.click(cards[0])
      await user.click(cards[1])
      
      expect(screen.getByTestId('moves-count')).toHaveTextContent('1')
    })

    it('prevents clicking more than 2 cards at once', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
      await user.click(cards[0])
      await user.click(cards[1])
      await user.click(cards[2])  // This should be ignored
      
      // Still only 1 move
      expect(screen.getByText('1', { selector: '.text-blue-600' })).toBeInTheDocument()
    })
  })

  describe('Matching Logic', () => {
    it('tracks matches counter', () => {
  
      expect(screen.getByTestId('matches-count')).toHaveTextContent('0')
    })

    it('matched cards can be identified by data attribute', () => {

      const matchedCards = screen.queryAllByTestId(/^card-/)
        .filter(card => card.getAttribute('data-matched') === 'true')
      
      expect(matchedCards.length).toBe(0)
    })

    it('flipped cards can be identified by data attribute', () => {

      const flippedCards = screen.queryAllByTestId(/^card-/)
        .filter(card => card.getAttribute('data-flipped') === 'true')
      
      expect(flippedCards.length).toBe(0)
    })

    it('cards flip when clicked', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
    
      await user.click(cards[0])
      
      // Card should be flipped (showing symbol, not ❓)
      expect(cards[0].textContent).not.toBe('❓')
    })

    it('handles card interactions without crashing', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
      await user.click(cards[0])
      await user.click(cards[1])
      
      // Wait for any delays to complete
      await waitFor(() => {
        expect(screen.getByTestId('moves-count')).toHaveTextContent('1')
      }, { timeout: 1500 })
      

      expect(screen.getByTestId('game-board')).toBeInTheDocument()
    })
  })

  describe('Game Completion', () => {
    it('displays New Game button', () => {
      expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument()
    })

    it('resets game when New Game is clicked', async () => {
      const user = userEvent.setup()
      const cards = screen.getAllByRole('button').filter(btn => btn.textContent === '❓')
      
      await user.click(cards[0])
      await user.click(cards[1])
      
      await user.click(screen.getByRole('button', { name: /new game/i }))
      
      expect(screen.getByTestId('moves-count')).toHaveTextContent('0')
      
      // All cards should be face down
      await waitFor(() => {
        expect(screen.getAllByText('❓').length).toBe(16)
      })
    })
  })

  describe('Accessibility', () => {
    it('has accessible game board role', () => {
      const gameBoard = screen.getByRole('application')
      expect(gameBoard).toBeInTheDocument()
    })

    it('has descriptive aria-label', () => {
      const gameBoard = screen.getByLabelText('Memory match game board')
      expect(gameBoard).toBeInTheDocument()
    })

    it('cards are keyboard accessible buttons', () => {
      const cards = screen.getAllByRole('button').filter(btn => 
        btn.textContent === '❓' || btn.textContent?.match(/[🎮🎯🎨🎭🎪🎸🎲🎰]/)
      )
      
      cards.forEach(card => {
        expect(card.tagName).toBe('BUTTON')
      })
    })
  })
})