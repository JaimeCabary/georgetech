// import { toast } from 'react-toastify';
// import { vibrate } from 'react-use';

// // Request notification permission
// export const requestNotificationPermission = async () => {
//   if ('Notification' in window) {
//     const permission = await Notification.requestPermission();
//     return permission === 'granted';
//   }
//   return false;
// };

// // Send browser notification
// export const sendBrowserNotification = (title, options = {}) => {
//   if ('Notification' in window && Notification.permission === 'granted') {
//     new Notification(title, {
//       icon: '/logo192.png',
//       badge: '/logo192.png',
//       ...options
//     });
//   }
// };

// // Show toast with haptic feedback
// export const showNotification = (message, type = 'info') => {
//   // Haptic feedback (vibration)
//   if ('vibrate' in navigator) {
//     navigator.vibrate(200); // Vibrate for 200ms
//   }

//   // Toast notification
//   toast[type](message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });
// };

// // Pull-to-refresh with haptics
// export const setupPullToRefresh = (onRefresh) => {
//   let startY = 0;

//   const handleTouchStart = (e) => {
//     startY = e.touches[0].clientY;
//   };

//   const handleTouchMove = (e) => {
//     const currentY = e.touches[0].clientY;
//     const pullDistance = currentY - startY;

//     // If pulled down more than 100px
//     if (pullDistance > 100 && window.scrollY === 0) {
//       if ('vibrate' in navigator) {
//         navigator.vibrate(100); // Gentle pull haptic
//       }
//     }
//   };

//   const handleTouchEnd = (e) => {
//     const currentY = e.changedTouches[0].clientY;
//     const pullDistance = currentY - startY;

//     if (pullDistance > 150 && window.scrollY === 0) {
//       if ('vibrate' in navigator) {
//         navigator.vibrate(300); // Refresh confirmation haptic
//       }
//       onRefresh();
//     }
//   };

//   document.addEventListener('touchstart', handleTouchStart);
//   document.addEventListener('touchmove', handleTouchMove);
//   document.addEventListener('touchend', handleTouchEnd);

//   return () => {
//     document.removeEventListener('touchstart', handleTouchStart);
//     document.removeEventListener('touchmove', handleTouchMove);
//     document.removeEventListener('touchend', handleTouchEnd);
//   };
// };
import { toast } from 'react-toastify';

// Register Service Worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Send browser notification
export const sendBrowserNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/logo192.png',
      badge: '/logo192.png',
      ...options
    });
  }
};

// Vibration utility
export const vibrate = (pattern = 200) => {
  if ('vibrate' in navigator) {
    if (Array.isArray(pattern)) {
      navigator.vibrate(pattern);
    } else {
      navigator.vibrate([pattern]);
    }
  }
};

// Show toast with haptic feedback
export const showNotification = (message, type = 'info') => {
  vibrate(200);
  toast[type](message, {
    position: "top-right",
    className: "font-[Orbitron] text-[#FF4500]",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Schedule periodic notifications (every 3 hours)
export const schedulePeriodicNotifications = async () => {
  const registration = await registerServiceWorker();
  if (!registration) return false;

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return false;

  // Set up interval for 3 hours (3 * 60 * 60 * 1000 ms)
  const INTERVAL = 3 * 60 * 60 * 1000;
  
  const scheduleNext = () => {
    setTimeout(() => {
      // Send notification
      sendBrowserNotification('Scheduled Reminder', {
        body: 'Your 3-hour interval notification!',
        tag: 'scheduled-notification',
        requireInteraction: false,
        silent: false
      });
      
      // Schedule next notification
      scheduleNext();
    }, INTERVAL);
  };

  // Start the scheduling
  scheduleNext();
  
  // Also notify the service worker
  if (registration.active) {
    registration.active.postMessage({
      type: 'SCHEDULE_NOTIFICATION'
    });
  }

  return true;
};

// Set app badge (for supported browsers/PWAs)
export const setBadgeCount = (count) => {
  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(count).catch(err => {
      console.log('Badge API not supported:', err);
    });
  }
};

// Clear app badge
export const clearBadge = () => {
  if ('clearAppBadge' in navigator) {
    navigator.clearAppBadge().catch(err => {
      console.log('Badge API not supported:', err);
    });
  }
};

// Initialize PWA features
export const initializePWA = async () => {
  // Register service worker
  const registration = await registerServiceWorker();
  
  // Request notification permission
  const hasNotificationPermission = await requestNotificationPermission();
  
  // Start periodic notifications if permission granted
  if (hasNotificationPermission) {
    await schedulePeriodicNotifications();
  }

  // Handle app installation
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });

  return {
    registration,
    hasNotificationPermission,
    installApp: async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        return outcome === 'accepted';
      }
      return false;
    }
  };
};

// Pull-to-refresh with haptics
export const setupPullToRefresh = (onRefresh) => {
  let startY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const pullDistance = currentY - startY;

    if (pullDistance > 100 && window.scrollY === 0) {
      vibrate(100);
    }
  };

  const handleTouchEnd = (e) => {
    const currentY = e.changedTouches[0].clientY;
    const pullDistance = currentY - startY;

    if (pullDistance > 150 && window.scrollY === 0) {
      vibrate(300);
      onRefresh();
    }
  };

  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);

  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };
};