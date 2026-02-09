import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { SearchBar } from '../SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox', { name: /search desserts/i });
    expect(input).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Search for treats..." />);
    
    expect(screen.getByPlaceholderText('Search for treats...')).toBeInTheDocument();
  });

  it('shows search icon when empty', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    // Search icon should be visible
    const searchIcon = screen.getByRole('textbox').nextElementSibling;
    expect(searchIcon).toBeInTheDocument();
  });

  it('shows clear button when has value', async () => {
    const user = userEvent.setup();
    render(<SearchBar value="" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'cake');
    
    const clearButton = await screen.findByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'brownie');
    
    expect(input).toHaveValue('brownie');
  });

  it('clears input when clear button clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchBar value="test" onChange={handleChange} />);
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();
    render(<SearchBar value="" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    
    // Tab to input
    await user.tab();
    expect(input).toHaveFocus();
  });
});
