import { useEffect, useState } from 'react';
import { UseToggleThemeContext } from '../../hooks/useToggleThemeContext';
import './themeSwitcher.scss';

export function ThemeSwitcher() {
  const [isChecked, setIsChecked] = useState(true);
  const toggleTheme = UseToggleThemeContext();

  useEffect(() => {
    toggleTheme();
  }, [isChecked]);

  return (
    <label className="switcher">
      <input
        className="switcher-input"
        onChange={() => setIsChecked((prev) => !prev)}
        checked={isChecked}
        type="checkbox"
      />
      <span className="switcher-round" />
    </label>
  );
}
