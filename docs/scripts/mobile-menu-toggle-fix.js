// Mobile Menu Toggle Fix
// Ensures the mobile menu toggle button works properly on all page loads

(function() {
  'use strict';
  
  function initMobileMenuToggle() {
    console.log('Initializing mobile menu toggle fix...');
    
    const mobileToggle = document.querySelector('.navbar-mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileToggle || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }
    
    // Remove any existing click handlers
    const newToggle = mobileToggle.cloneNode(true);
    mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
    
    // Toggle menu function
    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      const isOpening = !mobileMenu.classList.contains('active');
      console.log('Toggle menu:', isOpening ? 'opening' : 'closing');
      
      // Toggle classes
      newToggle.classList.toggle('active');
      if (isOpening) {
        mobileMenu.classList.remove('hidden');
      }
      mobileMenu.classList.toggle('active');
      if (!isOpening) {
        setTimeout(() => mobileMenu.classList.add('hidden'), 450);
      }
      if (mobileOverlay) {
        mobileOverlay.classList.toggle('active');
      }
      document.body.classList.toggle('menu-open');
      
      // Handle animations
      if (isOpening) {
        mobileLinks.forEach((link, index) => {
          link.style.animation = `fadeInRight 0.4s ease-out ${index * 0.08}s forwards`;
          link.style.opacity = '0';
          link.style.transform = 'translateX(20px)';
        });
      } else {
        mobileLinks.forEach(link => {
          link.style.animation = '';
          link.style.opacity = '';
          link.style.transform = '';
        });
      }
    }
    
    // Close menu function
    function closeMenu() {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    }
    
    // Add event listeners
    newToggle.addEventListener('click', toggleMenu);
    
    if (closeButton) {
      closeButton.addEventListener('click', closeMenu);
    }
    
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMenu);
    }
    
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
    
    console.log('Mobile menu toggle initialized successfully');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenuToggle);
  } else {
    // DOM is already loaded, init immediately
    initMobileMenuToggle();
  }
  
  // Also init after a short delay to catch any async loading issues
  setTimeout(initMobileMenuToggle, 100);
})();
