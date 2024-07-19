import { ReactNode, useState } from 'react';
import { ThemeContext, ToggleThemeContext } from '../../context/context';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lightTheme, setDarkTheme] = useState(false);

  const toggleTheme = (isLightTheme: boolean) => {
    setDarkTheme(isLightTheme);
  };

  return (
    <ThemeContext.Provider value={lightTheme}>
      <ToggleThemeContext.Provider value={toggleTheme}>{children}</ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
