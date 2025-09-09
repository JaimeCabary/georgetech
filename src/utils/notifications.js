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
  // Haptic feedback (vibration)
  vibrate(200); // Vibrate for 200ms

  // Toast notification
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
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

    // If pulled down more than 100px
    if (pullDistance > 100 && window.scrollY === 0) {
      vibrate(100); // Gentle pull haptic
    }
  };

  const handleTouchEnd = (e) => {
    const currentY = e.changedTouches[0].clientY;
    const pullDistance = currentY - startY;

    if (pullDistance > 150 && window.scrollY === 0) {
      vibrate(300); // Refresh confirmation haptic
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