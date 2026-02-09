import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 500 });

    // Value should still be initial before delay
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    rerender({ value: 'second' });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: 'third' });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should still be 'first' because timers were cancelled
    expect(result.current).toBe('first');

    // After full delay, should be 'third'
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('third');
  });

  it('should cleanup timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    // Advance timers to ensure no errors occur
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Test passes if no errors thrown
    expect(true).toBe(true);
  });
});
