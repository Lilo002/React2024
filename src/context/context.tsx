import { createContext } from 'react';

type ToggleThemeContextType = (isLightTheme: boolean) => void;

export const ThemeContext = createContext(true);

export const ToggleThemeContext = createContext<ToggleThemeContextType>(() => {});
