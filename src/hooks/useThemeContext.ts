import { useContext } from 'react';
import { ThemeContext } from '../context/context';

export function UseTheme() {
  return useContext(ThemeContext);
}
