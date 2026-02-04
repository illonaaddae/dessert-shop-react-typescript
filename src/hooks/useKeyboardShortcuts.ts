import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
  description: string;
}

/**
 * Custom hook for registering keyboard shortcuts
 * 
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param enabled - Whether shortcuts are currently enabled
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Exception: Allow '/' to focus search even from inputs
        if (e.key === '/' && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
          const shortcut = shortcuts.find((s) => s.key === '/');
          if (shortcut) {
            e.preventDefault();
            shortcut.callback();
          }
        }
        return;
      }

      // Find matching shortcut
      const shortcut = shortcuts.find(
        (s) =>
          s.key === e.key &&
          (s.ctrlKey === undefined || s.ctrlKey === e.ctrlKey) &&
          (s.shiftKey === undefined || s.shiftKey === e.shiftKey) &&
          (s.altKey === undefined || s.altKey === e.altKey) &&
          (s.metaKey === undefined || s.metaKey === e.metaKey)
      );

      if (shortcut) {
        e.preventDefault();
        shortcut.callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);
}
