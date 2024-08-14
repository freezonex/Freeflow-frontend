'use client';
import React, { createContext, useState } from 'react';
import { theme } from '@carbon/themes';

const ThemeContext = createContext({
  theme: { headerTheme: 'g100', contentTheme: 'g10', sideNavTheme: 'g90' },
  setTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    headerTheme: 'white',
    contentTheme: 'g10',
    sideNavTheme: 'white',
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
