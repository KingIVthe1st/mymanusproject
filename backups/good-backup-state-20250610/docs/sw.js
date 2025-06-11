// Service Worker for Amira Rahim Portfolio
// Advanced caching strategy for performance and offline support

const CACHE_NAME = 'amira-portfolio-v1';
const STATIC_CACHE = 'amira-static-v1';
const IMAGE_CACHE = 'amira-images-v1';
const API_CACHE = 'amira-api-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/styles/nav-styles.css',
  '/styles/hero-styles.css',
  '/scripts/rainbow-cursor.js',
  '/scripts/micro-interactions.js',
  '/images/logo/amira-logo.webp',
  '/images/optimized/amira-header-mobile.webp',
  '/images/optimized/amira-header-desktop.webp',
  // Manifest and icons
  '/favicon.ico'
];

// Image optimization assets
const IMAGE_PATTERNS = [
  /.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
  /\/images\/.*$/,
  /\/artwork\/.*$/,
  /\/optimized\/.*$/
];

// External resources
const EXTERNAL_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/cdnjs\.cloudflare\.com/,
  /^https:\/\/cdn\.jsdelivr\.net/
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    (async () => {
      try {
        // Cache critical resources
        const staticCache = await caches.open(STATIC_CACHE);
        console.log('Service Worker: Caching critical resources...');
        await staticCache.addAll(CRITICAL_RESOURCES);
        
        console.log('Service Worker: Critical resources cached successfully');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('Service Worker: Error during install:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(cacheName => 
            cacheName !== STATIC_CACHE && 
            cacheName !== IMAGE_CACHE && 
            cacheName !== API_CACHE
          )
          .map(cacheName => {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          });
        
        await Promise.all(deletePromises);
        
        // Claim all clients immediately
        await self.clients.claim();
        
        console.log('Service Worker: Activated successfully');
      } catch (error) {
        console.error('Service Worker: Error during activation:', error);
      }
    })()
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(url)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Stale While Revalidate for images
    if (isImage(url)) {
      return await staleWhileRevalidate(request, IMAGE_CACHE);
    }
    
    // Strategy 3: Network First for API calls
    if (isApiCall(url)) {
      return await networkFirst(request, API_CACHE);
    }
    
    // Strategy 4: Network First with fallback for external resources
    if (isExternalResource(url)) {
      return await networkFirst(request, STATIC_CACHE);
    }
    
    // Strategy 5: Stale While Revalidate for main document
    if (isMainDocument(request)) {
      return await staleWhileRevalidate(request, STATIC_CACHE);
    }
    
    // Default: Network only
    return await fetch(request);
    
  } catch (error) {
    console.error('Service Worker: Fetch error:', error);
    
    // Fallback for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return await cache.match('/index.html') || new Response('Offline', { status: 503 });
    }
    
    // Fallback for failed requests
    return new Response('Network Error', { 
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First: Network error for', request.url, error);
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const networkPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('Stale While Revalidate: Network update failed for', request.url);
    return null;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cached version
  return await networkPromise;
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network First: Network failed, trying cache for', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Helper functions to determine caching strategy
function isStaticAsset(url) {
  return url.pathname.match(/\.(css|js|woff2?|ttf|eot)$/);
}

function isImage(url) {
  return IMAGE_PATTERNS.some(pattern => pattern.test(url.pathname)) ||
         url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/);
}

function isApiCall(url) {
  return url.pathname.startsWith('/api/') || 
         url.hostname !== self.location.hostname;
}

function isExternalResource(url) {
  return EXTERNAL_PATTERNS.some(pattern => pattern.test(url.href));
}

function isMainDocument(request) {
  return request.mode === 'navigate' || 
         request.destination === 'document' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// Background Sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    const cache = await caches.open(API_CACHE);
    // Handle queued form submissions when online
    console.log('Service Worker: Syncing offline form submissions...');
  } catch (error) {
    console.error('Service Worker: Sync error:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const options = {
    body: event.data.text(),
    icon: '/images/logo/amira-logo.webp',
    badge: '/images/logo/amira-logo.webp',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Artwork',
        icon: '/images/logo/amira-logo.webp'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/logo/amira-logo.webp'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Amira Rahim Art', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#artwork')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ cacheSize: size });
    });
  }
});

async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const text = await response.text();
        totalSize += new Blob([text]).size;
      }
    }
  }
  
  return totalSize;
}

console.log('Service Worker: Loaded successfully');
