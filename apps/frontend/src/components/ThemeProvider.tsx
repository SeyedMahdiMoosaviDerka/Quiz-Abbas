'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with a default theme to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Only run this on the client
  useEffect(() => {
    setMounted(true);
    // Check if theme is stored in local storage
    try {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
      } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
      ) {
        // Use system preference if no theme in local storage
        setTheme('light');
      }
    } catch (e) {
      // Do nothing if localStorage is not available
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update class on document.documentElement
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Save to local storage
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Do nothing if localStorage is not available
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Avoid hydration mismatch by not rendering theme-dependent elements until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
