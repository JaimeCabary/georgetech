const CACHE_NAME = 'george-tech-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Add explicit return for when cacheName matches CACHE_NAME
        })
      );
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Background sync for notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'george-tech-notification') {
    event.waitUntil(showPeriodicNotification());
  }
});

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Check out new deals at George Tech Stores!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.primaryKey || 1,
      url: data.url || '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Shop Now',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/logo192.png'
      }
    ],
    tag: 'george-tech-notification',
    requireInteraction: false,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'George Tech Stores', 
      options
    )
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientsList) => {
        // Try to focus existing window
        for (const client of clientsList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if none exists
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url || '/');
        }
      })
    );
  } else if (event.action === 'close') {
    // Just close the notification (already handled above)
    return;
  } else {
    // Default click action - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientsList) => {
        if (clientsList.length > 0) {
          return clientsList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Show periodic notification
const showPeriodicNotification = async () => {
  const notifications = [
    {
      title: 'George Tech Stores',
      body: 'New tech deals available! Check out our latest offers.',
      data: { url: '/products' }
    },
    {
      title: 'George Tech Stores',
      body: 'Your cart is waiting! Complete your purchase today.',
      data: { url: '/cart' }
    },
    {
      title: 'George Tech Stores',
      body: 'Discover the latest gadgets and electronics!',
      data: { url: '/products' }
    }
  ];

  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
  
  const options = {
    body: randomNotification.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    tag: 'periodic-notification',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      url: randomNotification.data.url
    },
    actions: [
      {
        action: 'explore',
        title: 'Shop Now',
        icon: '/logo192.png'
      }
    ]
  };

  await self.registration.showNotification(randomNotification.title, options);
};

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    // Register for background sync
    self.registration.sync.register('george-tech-notification')
      .then(() => {
        console.log('Background sync registered');
      })
      .catch((error) => {
        console.error('Background sync registration failed:', error);
      });
  }
  
  if (event.data && event.data.type === 'SET_BADGE') {
    // Handle badge updates
    const count = event.data.count || 0;
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(count).catch((error) => {
        console.error('Badge setting failed:', error);
      });
    }
  }
});