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

  it('displays difficulty badge with correct styling and indicator', () => {
    render(<GameCard {...mockProps} />)
    
    const badge = screen.getByText(/Easy/)
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-emerald-100', 'text-emerald-800')
  })

  it('renders Medium difficulty with yellow styling and indicators', () => {
    render(<GameCard {...mockProps} difficulty="Medium" />)
    
    const badge = screen.getByText(/Medium/)
    expect(badge).toHaveClass('bg-amber-100', 'text-amber-800')
  })

  it('renders Hard difficulty with red styling and indicators', () => {
    render(<GameCard {...mockProps} difficulty="Hard" />)
    
    const badge = screen.getByText(/Hard/)
    expect(badge).toHaveClass('bg-rose-100', 'text-rose-800')
  })

  it('renders a Play Game button', () => {
    render(<GameCard {...mockProps} />)

    const button = screen.getByRole('button', { name: /play now/i })
    expect(button).toBeInTheDocument()
  })

  it('button has proper focus styles for accessibility', () => {
    render(<GameCard {...mockProps} />)

    const button = screen.getByRole('button', { name: /play now/i })
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-4')
  })

  it('card has hover effect classes', () => {
    const { container } = render(<GameCard {...mockProps} />)

    const card = container.firstChild
    expect(card).toHaveClass('hover:shadow-xl', 'transition-all')
  })
})