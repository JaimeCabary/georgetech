// // src/App.js
// import React, { useEffect } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { requestNotificationPermission } from './utils/notifications';
// import 'react-toastify/dist/ReactToastify.css';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { CartProvider } from './contexts/CartContext';
// import { AuthProvider } from './contexts/AuthContext';
// import AppRoutes from './AppRoutes';
// import './styles/index.css';

// // Import Font Awesome CSS and configure it
// import { config } from '@fortawesome/fontawesome-svg-core';
// import '@fortawesome/fontawesome-svg-core/styles.css';
// config.autoAddCss = false; // Disable the automatic CSS injection

// function App() {
//   useEffect(() => {
//     // Request notification permission on app load
//     requestNotificationPermission();
//   }, []);
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <CartProvider>
//           <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
//             <AppRoutes />
//             <ToastContainer /> {/* Moved inside the div and removed the ? */}
//           </div>
//         </CartProvider>
//       </AuthProvider>
//     </ThemeProvider>
    
//   );
// }

// export default App;

// src/App.js
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { requestNotificationPermission } from './utils/notifications';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import './styles/index.css';

// Import Font Awesome CSS and configure it
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Disable the automatic CSS injection

function App() {
  useEffect(() => {
    // Request notification permission on app load
    requestNotificationPermission();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
            <AppRoutes />
            <ToastContainer /> {/* Moved inside the div and removed the ? */}
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;