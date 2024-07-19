import { createContext } from 'react';

type ToggleThemeContextType = () => void;

export const ThemeContext = createContext(true);

export const ToggleThemeContext = createContext<ToggleThemeContextType>(() => {});
