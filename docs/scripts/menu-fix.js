// Menu Fix - Ensures mobile menu links are clickable
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  console.log('Menu fix script initialized');
  
  // Get all mobile nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileToggle = document.querySelector('.navbar-mobile-toggle');
  const closeButton = document.querySelector('.mobile-close-btn');
  
  // Function to close the mobile menu
  function closeMenu(e) {
    // If this was a link click, allow the default behavior (navigation)
    if (e && e.target.tagName === 'A') {
      console.log('Link clicked, closing menu');
    } else if (e) {
      // If it's any other event, prevent default
      e.preventDefault();
    }
    
    // Remove active classes
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 450);
    }
    
    if (mobileToggle) {
      mobileToggle.classList.remove('active');
    }
    
    document.body.classList.remove('menu-open');
    
    // Remove the overlay if it exists
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    
    return true;
  }

  // Add click handlers to all mobile nav links
  mobileNavLinks.forEach(link => {
    // Remove the inline onclick handler (which might be causing problems)
    link.removeAttribute('onclick');
    
    // Add a proper event listener
    link.addEventListener('click', function(e) {
      console.log('Mobile link clicked');
      // Let the event complete (navigation) then close the menu
      setTimeout(() => closeMenu(), 100);
    });
  });

  // Make sure the close button works
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }
  
  // Debug click logging for mobile nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Link clicked:', this.getAttribute('href'));
    });
  });

  console.log('Menu fix applied to', mobileNavLinks.length, 'navigation links');
});
