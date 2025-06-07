// Performance Optimization Script
(function() {
  'use strict';

  // 1. Implement Resource Loading Priority
  function optimizeResourceLoading() {
    // Add loading="lazy" to all images except critical ones
    const images = document.querySelectorAll('img:not([data-critical="true"])');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding async for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });

    // Optimize iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
    });
  }

  // 2. Implement Intersection Observer for animations
  function optimizeAnimations() {
    const animatedElements = document.querySelectorAll('.reveal, .glass-card, .artwork-item, .education-card');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Remove will-change after animation completes
            setTimeout(() => {
              entry.target.style.willChange = 'auto';
            }, 1000);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        animationObserver.observe(el);
      });
    }
  }

  // 3. Defer non-critical CSS animations
  function deferNonCriticalAnimations() {
    // Pause animations until visible
    const style = document.createElement('style');
    style.textContent = `
      .animation-paused {
        animation-play-state: paused !important;
      }
      .animate-in {
        animation-play-state: running !important;
      }
    `;
    document.head.appendChild(style);

    // Apply to floating elements
    document.querySelectorAll('.floating-element, .circle-animation').forEach(el => {
      el.classList.add('animation-paused');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('animation-paused');
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(el);
    });
  }

  // 4. Optimize font loading
  function optimizeFonts() {
    // Use font-display: swap for better performance
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }
  }

  // 5. Implement efficient event listeners
  function optimizeEventListeners() {
    // Use passive listeners for scroll events
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = requestAnimationFrame(() => {
        // Handle scroll events
        scrollTimeout = null;
      });
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('touchmove', throttledScroll, { passive: true });
  }

  // 6. Preload critical images
  function preloadCriticalImages() {
    const criticalImages = [
      'images/amira-header.png',
      'images/logo/amira-logo.webp'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // 7. Optimize third-party scripts
  function optimizeThirdPartyScripts() {
    // Defer Font Awesome
    const fontAwesome = document.querySelector('link[href*="font-awesome"]');
    if (fontAwesome) {
      fontAwesome.media = 'print';
      fontAwesome.onload = function() { this.media = 'all'; };
    }
  }

  // Initialize all optimizations
  function init() {
    // Run immediately
    optimizeResourceLoading();
    optimizeFonts();
    preloadCriticalImages();
    optimizeThirdPartyScripts();
    
    // Run after DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        optimizeAnimations();
        deferNonCriticalAnimations();
        optimizeEventListeners();
      });
    } else {
      optimizeAnimations();
      deferNonCriticalAnimations();
      optimizeEventListeners();
    }
  }

  // Start optimization
  init();
})();