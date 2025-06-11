/**
 * Iframe Mobile Menu Controller
 * A direct approach to fix mobile menu links by implementing a controller that
 * forces links to be clickable and properly handles navigation.
 */

(function() {
  'use strict';

  // Debug flag - set to true for console logs
  const DEBUG = true;
  
  function log(...args) {
    if (DEBUG) console.log('[Menu Controller]', ...args);
  }

  function initMobileMenuFix() {
    log('Initializing mobile menu iframe controller');

    // Wait a moment to ensure DOM is fully ready
    setTimeout(function() {
      // Get main menu elements
      const mobileMenu = document.querySelector('.mobile-menu');
      const mobileLinks = document.querySelectorAll('.mobile-nav-link');
      const closeButton = document.querySelector('.mobile-close-btn');
      const mobileToggle = document.querySelector('.navbar-mobile-toggle');
      
      log('Found elements:', {
        mobileMenu: !!mobileMenu,
        mobileLinks: mobileLinks.length,
        closeButton: !!closeButton,
        mobileToggle: !!mobileToggle
      });

      if (!mobileMenu || mobileLinks.length === 0) {
        log('Critical mobile menu elements not found');
        return;
      }

      // Fix z-index and pointer-events for all menu elements
      mobileMenu.style.zIndex = '9999';
      
      // Force mobile menu to be visible when active
      const existingDisplay = window.getComputedStyle(mobileMenu).getPropertyValue('display');
      log('Current mobile menu display style:', existingDisplay);
      
      // Override the entire menu container style to ensure proper visibility and clickability
      function applyMenuStyles() {
        mobileMenu.style.pointerEvents = 'auto';
        const navLinks = mobileMenu.querySelectorAll('.nav-links');
        navLinks.forEach(nav => {
          nav.style.pointerEvents = 'auto';
          nav.style.zIndex = '10000';
          nav.style.position = 'relative';
        });
      }

      // Apply styles immediately and after a short delay
      applyMenuStyles();
      setTimeout(applyMenuStyles, 100);
      
      // Handle menu closing
      function closeMenu() {
        log('Closing menu');
        mobileMenu.classList.remove('active');
        
        if (mobileToggle) mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 450);
        
        // Remove overlay if it exists
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) overlay.classList.remove('active');
      }
      
      // Force link behavior override
      mobileLinks.forEach((link, index) => {
        // Store original href
        const targetHref = link.getAttribute('href');
        log(`Setting up link ${index} with target: ${targetHref}`);
        
        // Remove inline onclick handlers
        link.removeAttribute('onclick');
        
        // Clone and replace to remove any existing event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Force pointer events and styles
        newLink.style.pointerEvents = 'auto';
        newLink.style.cursor = 'pointer';
        newLink.style.zIndex = '10001';
        newLink.style.position = 'relative';
        
        // Add click handler that will forcibly navigate
        newLink.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          log(`Link clicked: ${targetHref}`);
          
          // Close menu first
          closeMenu();
          
          // Then navigate after a slight delay
          setTimeout(() => {
            if (targetHref && targetHref.startsWith('#')) {
              // Scroll to target for anchor links
              const targetElement = document.querySelector(targetHref);
              if (targetElement) {
                log(`Scrolling to element: ${targetHref}`);
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              } else {
                // Fallback to changing location hash
                log(`Element not found, changing location hash to: ${targetHref}`);
                window.location.hash = targetHref.substring(1);
              }
            } else if (targetHref) {
              // For regular links, navigate directly
              log(`Navigating to: ${targetHref}`);
              window.location.href = targetHref;
            }
          }, 100);
          
          return false;
        });
      });
      
      // Ensure close button works
      if (closeButton) {
        const newCloseBtn = closeButton.cloneNode(true);
        closeButton.parentNode.replaceChild(newCloseBtn, closeButton);
        
        newCloseBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
          return false;
        });
      }

      log('Mobile menu fix applied successfully');
    }, 500); // Wait for DOM to be fully ready
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenuFix);
  } else {
    initMobileMenuFix();
  }
  
  // Also initialize after window load
  window.addEventListener('load', initMobileMenuFix);
})();
