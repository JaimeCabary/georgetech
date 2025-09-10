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
// import "@fontsource/orbitron/700.css"; // Orbitron bold


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
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { 
  initializePWA, 
  clearBadge,
  showNotification 
} from './utils/notifications';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';
import './styles/index.css';
import "@fontsource/orbitron/700.css"; // Orbitron bold

// Import Font Awesome CSS and configure it
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false; // Disable the automatic CSS injection

function App() {
  const [pwaStatus, setPwaStatus] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Initialize PWA features on app load
    const setupPWA = async () => {
      try {
        const status = await initializePWA();
        setPwaStatus(status);
        
        if (status.hasNotificationPermission) {
          showNotification('George Tech Stores - Notifications enabled!', 'success');
          // Set initial badge to 0
          clearBadge();
        } else {
          console.log('Notification permission not granted');
        }

        // Show install prompt if available
        if (status.installApp) {
          setShowInstallPrompt(true);
        }
      } catch (error) {
        console.error('PWA setup failed:', error);
      }
    };

    setupPWA();

    // Handle app update notifications
    window.addEventListener('online', () => {
      showNotification('You are back online!', 'success');
    });

    window.addEventListener('offline', () => {
      showNotification('You are offline. Some features may be limited.', 'warning');
    });

    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  const handleInstallApp = async () => {
    if (pwaStatus?.installApp) {
      const installed = await pwaStatus.installApp();
      if (installed) {
        showNotification('George Tech Stores installed successfully!', 'success');
        setShowInstallPrompt(false);
      }
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
            {/* Install App Banner */}
            {showInstallPrompt && (
              <div className="bg-white dark:bg-dark-100 text-[#FF4500] dark:text-white px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-[Orbitron] text-sm"> Install George Tech Stores for better experience</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleInstallApp}
                    className="bg-[#FF4500]  text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#ad2f01] transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismissInstall}
                    className="text-white hover:text-gray-200 transition-colors text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <AppRoutes />
            
            {/* Enhanced Toast Container */}
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastClassName="font-[Orbitron]"
            />
            
            {/* PWA Status Indicator (only in development) */}
            {/* {process.env.NODE_ENV === 'development' && pwaStatus && (
              <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs font-[Orbitron]">
                <div>SW: {pwaStatus.registration ? '✅' : '❌'}</div>
                <div>Notifications: {pwaStatus.hasNotificationPermission ? '✅' : '❌'}</div>
              </div>
            )} */}
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;