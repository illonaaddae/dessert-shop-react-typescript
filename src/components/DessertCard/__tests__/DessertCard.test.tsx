import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { DessertCard } from '../DessertCard';
import { Dessert } from '../../../types/dessert';
import userEvent from '@testing-library/user-event';

const mockDessert: Dessert = {
  name: 'Waffle with Berries',
  category: 'Waffle',
  price: 6.5,
  image: {
    thumbnail: '/images/waffle-thumbnail.jpg',
    mobile: '/images/waffle-mobile.jpg',
    tablet: '/images/waffle-tablet.jpg',
    desktop: '/images/waffle-desktop.jpg',
  },
};

describe('DessertCard', () => {
  it('renders dessert information correctly', () => {
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    expect(screen.getByText('Waffle with Berries')).toBeInTheDocument();
    expect(screen.getByText('Waffle')).toBeInTheDocument();
    expect(screen.getByText('$6.50')).toBeInTheDocument();
  });

  it('renders dessert image with lazy loading', () => {
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    const image = screen.getByAltText('Waffle with Berries');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('shows "Add to Cart" button when not in cart', () => {
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('shows quantity controls when in cart', () => {
    render(<DessertCard dessert={mockDessert} isInCart={true} quantity={2} />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
  });

  it('renders favorite button', () => {
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    const favoriteButton = screen.getByRole('button', { name: /add.*to favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('toggles favorite when favorite button clicked', async () => {
    const user = userEvent.setup();
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    const favoriteButton = screen.getByRole('button', { name: /add.*to favorites/i });
    await user.click(favoriteButton);
    
    // After clicking, button should show "remove from favorites"
    expect(screen.getByRole('button', { name: /remove.*from favorites/i })).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<DessertCard dessert={mockDessert} isInCart={false} />);
    
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    
    const image = screen.getByAltText('Waffle with Berries');
    expect(image).toHaveAttribute('alt', 'Waffle with Berries');
  });
});
