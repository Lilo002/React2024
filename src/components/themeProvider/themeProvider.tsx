import { ReactNode, useState } from 'react';
import { ThemeContext, ToggleThemeContext } from '../../context/context';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lightTheme, setLightTheme] = useState(false);

  const toggleTheme = () => {
    console.log('switch');
    setLightTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={lightTheme}>
      <ToggleThemeContext.Provider value={toggleTheme}>{children}</ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
