import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GameCard from './GameCard'

describe('GameCard Component', () => {
  const mockProps = {
    title: 'Test Game',
    description: 'This is a test game description',
    difficulty: 'Easy' as const
  }

  it('renders game title', () => {
    render(<GameCard {...mockProps} />)
    
    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })

  it('renders game description', () => {
    render(<GameCard {...mockProps} />)
    
    expect(screen.getByText('This is a test game description')).toBeInTheDocument()
  })

  it('displays difficulty badge with correct color', () => {
    render(<GameCard {...mockProps} />)
    
    const badge = screen.getByText('Easy')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('renders Medium difficulty with yellow styling', () => {
    render(<GameCard {...mockProps} difficulty="Medium" />)
    
    const badge = screen.getByText('Medium')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('renders Hard difficulty with red styling', () => {
    render(<GameCard {...mockProps} difficulty="Hard" />)
    
    const badge = screen.getByText('Hard')
    expect(badge).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('renders a Play Game button', () => {
    render(<GameCard {...mockProps} />)
    
    const button = screen.getByRole('button', { name: /play game/i })
    expect(button).toBeInTheDocument()
  })

  it('button has proper focus styles for accessibility', () => {
    render(<GameCard {...mockProps} />)
    
    const button = screen.getByRole('button', { name: /play game/i })
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2')
  })

  it('card has hover effect classes', () => {
    const { container } = render(<GameCard {...mockProps} />)
    
    const card = container.firstChild
    expect(card).toHaveClass('hover:shadow-xl', 'transition-shadow')
  })
})