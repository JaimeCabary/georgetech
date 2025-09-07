// src/components/ui/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full  text-white focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? (
       <FontAwesomeIcon icon={faSun} /> 
      ) : (
        <FontAwesomeIcon icon={faMoon} /> 
      )}
    </button>
  );
};

export default ThemeToggle;