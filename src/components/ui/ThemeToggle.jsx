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

// // src/components/ui/ThemeToggle.jsx
// import React from 'react';
// import { useTheme } from '../../contexts/ThemeContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// const ThemeToggle = () => {
//   const { isDark, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="relative w-14 h-7 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-gray-600 dark:to-gray-800 p-1 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-purple-600 shadow-md hover:shadow-lg"
//       aria-label="Toggle theme"
//     >
//       {/* Thumb with icon */}
//       <div className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center transition-all duration-500 ${
//         isDark ? 'left-1' : 'left-8'
//       }`}>
//         <FontAwesomeIcon 
//           icon={isDark ? faMoon : faSun} 
//           className={`w-3 h-3 transition-all duration-500 ${
//             isDark ? 'text-purple-600' : 'text-yellow-500'
//           }`} 
//         />
//       </div>
      
//       {/* Background stars for dark mode */}
//       <div className={`absolute inset-0 flex justify-around items-center px-1 transition-opacity duration-500 ${
//         isDark ? 'opacity-100' : 'opacity-0'
//       }`}>
//         {[1, 2, 3].map((star) => (
//           <div key={star} className="w-1 h-1 bg-white rounded-full"></div>
//         ))}
//       </div>
//     </button>
//   );
// };

// export default ThemeToggle;