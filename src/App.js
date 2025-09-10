// // // src/App.js
// // import React, { useEffect } from 'react';
// // import { ToastContainer } from 'react-toastify';
// // import { requestNotificationPermission } from './utils/notifications';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { ThemeProvider } from './contexts/ThemeContext';
// // import { CartProvider } from './contexts/CartContext';
// // import { AuthProvider } from './contexts/AuthContext';
// // import AppRoutes from './AppRoutes';
// // import './styles/index.css';

// // // Import Font Awesome CSS and configure it
// // import { config } from '@fortawesome/fontawesome-svg-core';
// // import '@fortawesome/fontawesome-svg-core/styles.css';
// // config.autoAddCss = false; // Disable the automatic CSS injection

// // function App() {
// //   useEffect(() => {
// //     // Request notification permission on app load
// //     requestNotificationPermission();
// //   }, []);
// //   return (
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <CartProvider>
// //           <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
// //             <AppRoutes />
// //             <ToastContainer /> {/* Moved inside the div and removed the ? */}
// //           </div>
// //         </CartProvider>
// //       </AuthProvider>
// //     </ThemeProvider>
    
// //   );
// // }

// // export default App;

// // // src/App.js
// // import React, { useEffect } from 'react';
// // import { ToastContainer } from 'react-toastify';
// // import { requestNotificationPermission } from './utils/notifications';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { ThemeProvider } from './contexts/ThemeContext';
// // import { CartProvider } from './contexts/CartContext';
// // import { AuthProvider } from './contexts/AuthContext';
// // import AppRoutes from './AppRoutes';
// // import './styles/index.css';
// // import "@fontsource/orbitron/700.css"; // Orbitron bold


// // // Import Font Awesome CSS and configure it
// // import { config } from '@fortawesome/fontawesome-svg-core';
// // import '@fortawesome/fontawesome-svg-core/styles.css';
// // config.autoAddCss = false; // Disable the automatic CSS injection

// // function App() {
// //   useEffect(() => {
// //     // Request notification permission on app load
// //     requestNotificationPermission();
// //   }, []);

// //   return (
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <CartProvider>
// //           <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
// //             <AppRoutes />
// //             <ToastContainer /> {/* Moved inside the div and removed the ? */}
// //           </div>
// //         </CartProvider>
// //       </AuthProvider>
// //     </ThemeProvider>
// //   );
// // }

// // export default App;

// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { ToastContainer } from 'react-toastify';
// import { 
//   initializePWA, 
//   clearBadge,
//   showNotification 
// } from './utils/notifications';
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
//   const [pwaStatus, setPwaStatus] = useState(null);
//   const [showInstallPrompt, setShowInstallPrompt] = useState(false);

//   useEffect(() => {
//     // Initialize PWA features on app load
//     const setupPWA = async () => {
//       try {
//         const status = await initializePWA();
//         setPwaStatus(status);
        
//         if (status.hasNotificationPermission) {
//           showNotification('George Tech Stores - Notifications enabled!', 'success');
//           // Set initial badge to 0
//           clearBadge();
//         } else {
//           console.log('Notification permission not granted');
//         }

//         // Show install prompt if available
//         if (status.installApp) {
//           setShowInstallPrompt(true);
//         }
//       } catch (error) {
//         console.error('PWA setup failed:', error);
//       }
//     };

//     setupPWA();

//     // Handle app update notifications
//     window.addEventListener('online', () => {
//       showNotification('You are back online!', 'success');
//     });

//     window.addEventListener('offline', () => {
//       showNotification('You are offline. Some features may be limited.', 'warning');
//     });

//     return () => {
//       window.removeEventListener('online', () => {});
//       window.removeEventListener('offline', () => {});
//     };
//   }, []);

//   const handleInstallApp = async () => {
//     if (pwaStatus?.installApp) {
//       const installed = await pwaStatus.installApp();
//       if (installed) {
//         showNotification('George Tech Stores installed successfully!', 'success');
//         setShowInstallPrompt(false);
//       }
//     }
//   };

//   const handleDismissInstall = () => {
//     setShowInstallPrompt(false);
//   };

//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <CartProvider>
//           <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
//             {/* Install App Banner */}
//             {showInstallPrompt && (
//               <div className="bg-white dark:bg-dark-100 text-[#FF4500] dark:text-white px-4 py-2 flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <span className="font-[Orbitron] text-sm"> Install George Tech Stores for better experience</span>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={handleInstallApp}
//                     className="bg-[#FF4500]  text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#ad2f01] transition-colors"
//                   >
//                     Install
//                   </button>
//                   <button
//                     onClick={handleDismissInstall}
//                     className="text-white hover:text-gray-200 transition-colors text-xl"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//             )}

//             <AppRoutes />
            
//             {/* Enhanced Toast Container */}
//             <ToastContainer 
//               position="top-right"
//               autoClose={5000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="colored"
//               toastClassName="font-[Orbitron]"
//             />
            
//             {/* PWA Status Indicator (only in development) */}
//             {/* {process.env.NODE_ENV === 'development' && pwaStatus && (
//               <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs font-[Orbitron]">
//                 <div>SW: {pwaStatus.registration ? '✅' : '❌'}</div>
//                 <div>Notifications: {pwaStatus.hasNotificationPermission ? '✅' : '❌'}</div>
//               </div>
//             )} */}
//           </div>
//         </CartProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
// src/App.js
import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { 
  initializePWA, 
  clearBadge
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

// Function to generate a device ID
const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Function to detect if the app is already installed
const isAppInstalled = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

function App() {
  const [pwaStatus, setPwaStatus] = useState(null);
  const [shouldShowInstallPrompt, setShouldShowInstallPrompt] = useState(false);
  const [deviceId] = useState(getDeviceId());
  const [hasSetupPWA, setHasSetupPWA] = useState(false);

  const checkInstallPromptStatus = useCallback(async (pwaStatus) => {
    // Don't show prompt if app is already installed
    if (isAppInstalled()) {
      setShouldShowInstallPrompt(false);
      return;
    }

    // Check local storage first to avoid unnecessary API calls
    const isDismissed = localStorage.getItem(`installDismissed_${deviceId}`);
    if (isDismissed === 'true') {
      setShouldShowInstallPrompt(false);
      return;
    }

    try {
      // Check with backend if we should show the prompt
      const response = await fetch(`/api/check-install-prompt/${deviceId}`);
      const data = await response.json();
      
      setShouldShowInstallPrompt(data.shouldShowPrompt && pwaStatus?.installApp);
    } catch (error) {
      console.error('Failed to check install prompt status:', error);
      // Default to showing the prompt if there's an error
      setShouldShowInstallPrompt(pwaStatus?.installApp && !isAppInstalled());
    }
  }, [deviceId]);

  useEffect(() => {
    // Initialize PWA features on app load (only once)
    const setupPWA = async () => {
      if (hasSetupPWA) return;
      
      try {
        const status = await initializePWA();
        setPwaStatus(status);
        setHasSetupPWA(true);
        
        if (status.hasNotificationPermission) {
          // Only show notification on first setup, not every page load
          if (!localStorage.getItem('pwaSetupNotificationShown')) {
            toast.success('Notifications enabled!', {
              autoClose: 3000,
              className: 'font-[Orbitron]'
            });
            localStorage.setItem('pwaSetupNotificationShown', 'true');
          }
          // Set initial badge to 0
          clearBadge();
        }

        // Check if we should show install prompt
        checkInstallPromptStatus(status);
      } catch (error) {
        console.error('PWA setup failed:', error);
      }
    };

    setupPWA();

    // Handle app update notifications (less intrusive)
    const handleOnline = () => {
      console.log('Back online');
      // Don't show notification for online/offline to reduce spam
    };

    const handleOffline = () => {
      console.log('Offline');
      // Don't show notification for online/offline to reduce spam
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkInstallPromptStatus, hasSetupPWA]);

  const handleInstallApp = async () => {
    if (pwaStatus?.installApp) {
      const installed = await pwaStatus.installApp();
      if (installed) {
        toast.success('App installed successfully!', {
          autoClose: 3000,
          className: 'font-[Orbitron]'
        });
        setShouldShowInstallPrompt(false);
        // Mark as installed so it doesn't show again
        localStorage.setItem(`installDismissed_${deviceId}`, 'true');
      }
    }
  };

  const handleDismissInstall = async () => {
    try {
      await fetch('/api/dismiss-install-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceId }),
      });
      
      setShouldShowInstallPrompt(false);
      // Store dismissal in localStorage to prevent showing again
      localStorage.setItem(`installDismissed_${deviceId}`, 'true');
      
      toast.info("Install prompt hidden", {
        autoClose: 2000,
        className: 'font-[Orbitron]'
      });
    } catch (error) {
      console.error('Failed to dismiss install prompt:', error);
      setShouldShowInstallPrompt(false);
      // Still store dismissal locally even if API call fails
      localStorage.setItem(`installDismissed_${deviceId}`, 'true');
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
            {/* Install App Banner */}
            {shouldShowInstallPrompt && (
              <div className="bg-white dark:bg-[#434343] dark:text-white font-[Orbitron] text-[#FF4500] px-4 py-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-[Orbitron] text-sm">
                   Install George Tech Stores for better experience
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleInstallApp}
                    className="bg-[#FF4500] text-white px-4 py-1 rounded text-sm font-semibold hover:bg-[#6c1e01] transition-colors shadow"
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismissInstall}
                    className="text-black dark:text-white hover:text-gray-400 dark:hover:text-gray-200 transition-colors text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <AppRoutes />
            
            {/* Enhanced Toast Container with reduced autoClose time */}
            <ToastContainer 
              position="top-right"
              autoClose={3000} // Reduced from 5000 to 3000ms
              hideProgressBar={true} // Hide progress bar to be less intrusive
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false} // Don't pause when window loses focus
              draggable
              pauseOnHover={false} // Don't pause on hover
              theme="colored"
              toastClassName="font-[Orbitron] text-sm"
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;