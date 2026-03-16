import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import NumberGuess from './NumberGuess'

describe('NumberGuess Game', () => {
  beforeEach(() => {
    // Mock Math.random to control the secret number
    vi.spyOn(Math, 'random').mockReturnValue(0.49) // Will generate 50
  })

  describe('Game Initialization', () => {
    it('renders the game title', () => {
      render(<NumberGuess />)
      expect(screen.getByText(/Number Guessing Game/i)).toBeInTheDocument()
    })

    it('shows instructions', () => {
      render(<NumberGuess />)
      expect(screen.getByText(/I'm thinking of a number between 1 and 100/i)).toBeInTheDocument()
    })

    it('has an input field for guesses', () => {
      render(<NumberGuess />)
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      expect(input).toBeInTheDocument()
    })

    it('has a Guess button', () => {
      render(<NumberGuess />)
      expect(screen.getByRole('button', { name: /^Guess$/i })).toBeInTheDocument()
    })

    it('starts with 0 guesses', () => {
      render(<NumberGuess />)
      expect(screen.getByTestId('guess-count')).toHaveTextContent('0')
    })

    it('starts with no best score', () => {
      render(<NumberGuess />)
      expect(screen.getByTestId('best-score')).toHaveTextContent('---')
    })

    it('shows no feedback initially', () => {
      render(<NumberGuess />)
      expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
    })
  })

  describe('Game Logic', () => {
    it('gives "Higher!" feedback when guess is too low', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(button)
      
      expect(screen.getByTestId('feedback')).toHaveTextContent(/Higher/i)
    })

    it('gives "Lower!" feedback when guess is too high', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '75' } })
      fireEvent.click(button)
      
      expect(screen.getByTestId('feedback')).toHaveTextContent(/Lower/i)
    })

    it('shows success message when guess is correct', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(button)
      
      expect(screen.getByTestId('feedback')).toHaveTextContent(/Correct/i)
    })

    it('increments guess counter', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(button)
      
      expect(screen.getByTestId('guess-count')).toHaveTextContent('1')
    })

    it('clears input after guess', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i) as HTMLInputElement
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(button)
      
      expect(input.value).toBe('')
    })

    it('does not submit empty guess', () => {
      render(<NumberGuess />)
      
      const button = screen.getByRole('button', { name: /^Guess$/i })
      fireEvent.click(button)
      
      expect(screen.getByTestId('guess-count')).toHaveTextContent('0')
    })
  })

  describe('Win Condition', () => {
    it('shows Play Again button after winning', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(button)
      
      expect(screen.getByRole('button', { name: /Play Again/i })).toBeInTheDocument()
    })

    it('disables input and button after winning', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const guessButton = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(guessButton)
      
      expect(input).toBeDisabled()
      expect(guessButton).toBeDisabled()
    })

    it('tracks best score', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      // Make 2 guesses then win
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(button)
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(button)
      
      expect(screen.getByTestId('best-score')).toHaveTextContent('2')
    })

    it('resets game when Play Again is clicked', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const guessButton = screen.getByRole('button', { name: /^Guess$/i })
      
      // Win the game
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(guessButton)
      
      // Click Play Again
      const playAgainButton = screen.getByRole('button', { name: /Play Again/i })
      fireEvent.click(playAgainButton)
      
      // Game should be reset
      expect(screen.getByTestId('guess-count')).toHaveTextContent('0')
      expect(screen.queryByTestId('feedback')).not.toBeInTheDocument()
      expect(input).not.toBeDisabled()
    })
  })

  describe('Enter Key Submission', () => {
    it('submits guess when Enter key is pressed', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(screen.getByTestId('feedback')).toHaveTextContent(/Higher/i)
    })
  })

  describe('Guess History and Hints', () => {
    it('does not show hint button initially', () => {
      render(<NumberGuess />)
      
      expect(screen.queryByRole('button', { name: /Show Hint/i })).not.toBeInTheDocument()
    })

    it('shows hint button after first guess', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const button = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(button)
      
      expect(screen.getByRole('button', { name: /Show Hint/i })).toBeInTheDocument()
    })

    it('displays guess history when hint is shown', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const guessButton = screen.getByRole('button', { name: /^Guess$/i })
      
      // Make multiple guesses
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(guessButton)
      fireEvent.change(input, { target: { value: '75' } })
      fireEvent.click(guessButton)
      
      // Show hint
      const hintButton = screen.getByRole('button', { name: /Show Hint/i })
      fireEvent.click(hintButton)
      
      expect(screen.getByText('25')).toBeInTheDocument()
      expect(screen.getByText('75')).toBeInTheDocument()
    })

    it('toggles hint display', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const guessButton = screen.getByRole('button', { name: /^Guess$/i })
      
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(guessButton)
      
      const hintButton = screen.getByRole('button', { name: /Show Hint/i })
      
      // Show
      fireEvent.click(hintButton)
      expect(screen.getByText('Your Previous Guesses:')).toBeInTheDocument()
      
      // Hide
      fireEvent.click(hintButton)
      expect(screen.queryByText('Your Previous Guesses:')).not.toBeInTheDocument()
    })

    it('hides hint button after winning', () => {
      render(<NumberGuess />)
      
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      const guessButton = screen.getByRole('button', { name: /^Guess$/i })
      
      // Make a guess (hint button appears)
      fireEvent.change(input, { target: { value: '25' } })
      fireEvent.click(guessButton)
      expect(screen.getByRole('button', { name: /Show Hint/i })).toBeInTheDocument()
      
      // Win the game
      fireEvent.change(input, { target: { value: '50' } })
      fireEvent.click(guessButton)
      
      // Hint button should be gone
      expect(screen.queryByRole('button', { name: /Show Hint/i })).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has accessible form label', () => {
      render(<NumberGuess />)
      expect(screen.getByLabelText(/Your guess between 1 and 100/i)).toBeInTheDocument()
    })

    it('has live region for feedback', () => {
      render(<NumberGuess />)
      const liveRegion = screen.getByRole('status')
      expect(liveRegion).toBeInTheDocument()
    })

    it('input has min and max attributes', () => {
      render(<NumberGuess />)
      const input = screen.getByLabelText(/Your guess between 1 and 100/i)
      expect(input).toHaveAttribute('min', '1')
      expect(input).toHaveAttribute('max', '100')
    })
  })
})