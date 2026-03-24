import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  it('renders the platform title', () => {
    render(<Header />)

    const title = screen.getByText('Accessible Games')
    expect(title).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<Header />)
    
    const tagline = screen.getByText('Inclusive gaming for everyone')
    expect(tagline).toBeInTheDocument()
  })

  it('uses semantic header element', () => {
    const { container } = render(<Header />)
    
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })
})