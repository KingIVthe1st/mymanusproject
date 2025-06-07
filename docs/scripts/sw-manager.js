// Service Worker Registration and Management
// Advanced PWA implementation for Amira Rahim Portfolio

class ServiceWorkerManager {
  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
    this.registration = null;
    this.updateAvailable = false;
    
    if (this.isSupported) {
      this.init();
    }
  }
  
  async init() {
    try {
      console.log('ServiceWorker: Initializing...');
      
      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });
      
      console.log('ServiceWorker: Registered successfully', this.registration);
      
      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdate();
      });
      
      // Listen for messages from SW
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleMessage(event);
      });
      
      // Check for waiting service worker
      if (this.registration.waiting) {
        this.showUpdateNotification();
      }
      
      // Check for updates every 5 minutes
      setInterval(() => {
        this.checkForUpdates();
      }, 5 * 60 * 1000);
      
    } catch (error) {
      console.error('ServiceWorker: Registration failed', error);
    }
  }
  
  handleUpdate() {
    const newWorker = this.registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        this.updateAvailable = true;
        this.showUpdateNotification();
      }
    });
  }
  
  handleMessage(event) {
    const { data } = event;
    
    switch (data.type) {
      case 'CACHE_UPDATED':
        console.log('ServiceWorker: Cache updated');
        break;
      case 'OFFLINE_READY':
        this.showOfflineNotification();
        break;
    }
  }
  
  async checkForUpdates() {
    if (this.registration) {
      await this.registration.update();
    }
  }
  
  async activateUpdate() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
  
  showUpdateNotification() {
    // Create elegant update notification
    const notification = document.createElement('div');
    notification.className = 'sw-update-notification';
    notification.innerHTML = `
      <div class="sw-notification-content">
        <div class="sw-icon">
          <i class="fas fa-download"></i>
        </div>
        <div class="sw-text">
          <h4>New version available</h4>
          <p>Click to update and get the latest features</p>
        </div>
        <button class="sw-update-btn" onclick="window.swManager.activateUpdate()">
          Update Now
        </button>
        <button class="sw-dismiss-btn" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#sw-notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'sw-notification-styles';
      styles.textContent = `
        .sw-update-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          max-width: 320px;
          animation: swSlideIn 0.3s ease-out;
        }
        
        .sw-notification-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .sw-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }
        
        .sw-text {
          flex-grow: 1;
        }
        
        .sw-text h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .sw-text p {
          margin: 0;
          font-size: 12px;
          color: #666;
          line-height: 1.3;
        }
        
        .sw-update-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .sw-update-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .sw-dismiss-btn {
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 4px;
          margin-left: 8px;
          border-radius: 4px;
          transition: color 0.2s ease;
        }
        
        .sw-dismiss-btn:hover {
          color: #666;
        }
        
        @keyframes swSlideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .sw-update-notification {
            left: 20px;
            right: 20px;
            max-width: none;
          }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }
  
  showOfflineNotification() {
    console.log('ServiceWorker: Offline functionality ready');
    
    // Show subtle offline indicator
    const indicator = document.createElement('div');
    indicator.className = 'sw-offline-indicator';
    indicator.innerHTML = `
      <i class="fas fa-wifi"></i>
      <span>Offline support enabled</span>
    `;
    
    document.body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
      indicator.remove();
    }, 3000);
  }
  
  async getCacheSize() {
    if (!this.registration) return 0;
    
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        resolve(event.data.cacheSize);
      };
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_SIZE' },
        [channel.port2]
      );
    });
  }
}

// Dynamic Module Loader for Code Splitting
class ModuleLoader {
  constructor() {
    this.loadedModules = new Set();
    this.loadingModules = new Map();
  }
  
  async loadModule(modulePath, condition = true) {
    if (!condition) return null;
    
    if (this.loadedModules.has(modulePath)) {
      return true; // Already loaded
    }
    
    if (this.loadingModules.has(modulePath)) {
      return this.loadingModules.get(modulePath); // Return existing promise
    }
    
    console.log(`ModuleLoader: Loading ${modulePath}...`);
    
    const loadPromise = import(modulePath)
      .then((module) => {
        this.loadedModules.add(modulePath);
        this.loadingModules.delete(modulePath);
        console.log(`ModuleLoader: Successfully loaded ${modulePath}`);
        return module;
      })
      .catch((error) => {
        this.loadingModules.delete(modulePath);
        console.error(`ModuleLoader: Failed to load ${modulePath}`, error);
        throw error;
      });
    
    this.loadingModules.set(modulePath, loadPromise);
    return loadPromise;
  }
  
  // Load modules based on user interaction
  async loadOnInteraction(modulePath, triggerSelector, eventType = 'click') {
    const elements = document.querySelectorAll(triggerSelector);
    
    if (elements.length === 0) return;
    
    const loadModule = async () => {
      try {
        await this.loadModule(modulePath);
        // Remove event listeners after loading
        elements.forEach(el => {
          el.removeEventListener(eventType, loadModule);
        });
      } catch (error) {
        console.error('ModuleLoader: Interaction-based loading failed', error);
      }
    };
    
    elements.forEach(el => {
      el.addEventListener(eventType, loadModule, { once: true });
    });
  }
  
  // Load modules based on viewport intersection
  async loadOnIntersection(modulePath, triggerSelector, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    const elements = document.querySelectorAll(triggerSelector);
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          try {
            await this.loadModule(modulePath);
            observer.disconnect(); // Stop observing after loading
          } catch (error) {
            console.error('ModuleLoader: Intersection-based loading failed', error);
          }
          break;
        }
      }
    }, defaultOptions);
    
    elements.forEach(el => observer.observe(el));
  }
  
  // Load modules based on media query
  async loadOnMediaQuery(modulePath, mediaQuery) {
    const mql = window.matchMedia(mediaQuery);
    
    const loadIfMatches = async () => {
      if (mql.matches) {
        await this.loadModule(modulePath);
        mql.removeEventListener('change', loadIfMatches);
      }
    };
    
    // Check immediately
    await loadIfMatches();
    
    // Listen for changes
    mql.addEventListener('change', loadIfMatches);
  }
  
  // Preload critical modules with priority
  async preloadCritical(modules) {
    const promises = modules.map(async (modulePath) => {
      try {
        await this.loadModule(modulePath);
      } catch (error) {
        console.warn(`ModuleLoader: Failed to preload ${modulePath}`, error);
      }
    });
    
    await Promise.allSettled(promises);
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }
  
  init() {
    // Monitor Core Web Vitals
    this.observeCLS();
    this.observeFID();
    this.observeLCP();
    
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor navigation timing
    this.observeNavigationTiming();
  }
  
  observeCLS() {
    if ('LayoutShift' in window) {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.metrics.cls = clsValue;
      }).observe({ type: 'layout-shift', buffered: true });
    }
  }
  
  observeFID() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.metrics.fid = entry.processingStart - entry.startTime;
        break;
      }
    }).observe({ type: 'first-input', buffered: true });
  }
  
  observeLCP() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }
  
  observeResourceTiming() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('.webp') || entry.name.includes('.avif')) {
          const duration = entry.responseEnd - entry.startTime;
          this.metrics.imageLoadTime = (this.metrics.imageLoadTime || 0) + duration;
        }
      }
    }).observe({ type: 'resource', buffered: true });
  }
  
  observeNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        this.metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
        
        console.log('Performance Metrics:', this.metrics);
      }, 0);
    });
  }
  
  getMetrics() {
    return { ...this.metrics };
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Service Worker Manager
  window.swManager = new ServiceWorkerManager();
  
  // Initialize Module Loader
  window.moduleLoader = new ModuleLoader();
  
  // Initialize Performance Monitor
  window.performanceMonitor = new PerformanceMonitor();
  
  // Setup code splitting for heavy features
  setupCodeSplitting();
});

async function setupCodeSplitting() {
  const loader = window.moduleLoader;
  
  // Load gallery features when artwork section is viewed
  loader.loadOnIntersection('/scripts/gallery.js', '#artwork');
  
  // Load form handling when contact section is viewed
  loader.loadOnIntersection('/scripts/contact-form.js', '#contact');
  
  // Load advanced animations on user interaction
  loader.loadOnInteraction('/scripts/advanced-animations.js', '.artwork-card', 'mouseenter');
  
  // Load mobile-specific features on mobile devices
  loader.loadOnMediaQuery('/scripts/mobile-enhancements.js', '(max-width: 768px)');
  
  // Load testimonials auto-scroll when section is visible
  loader.loadOnIntersection('/scripts/simple-testimonials-autoscroll.js', '.testimonials-container');
  
  // Preload critical interactive modules
  await loader.preloadCritical([
    '/scripts/micro-interactions.js',
    '/scripts/rainbow-cursor.js'
  ]);
  
  console.log('Code splitting setup completed');
}

// Export for global access
window.ServiceWorkerManager = ServiceWorkerManager;
window.ModuleLoader = ModuleLoader;
window.PerformanceMonitor = PerformanceMonitor;

console.log('Service Worker registration and code splitting loaded');
