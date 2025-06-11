/**
 * Force Link Click Handler
 * This script uses multiple techniques to ensure mobile menu links are clickable
 */

(function() {
  'use strict';
  
  console.log('=== FORCE LINK CLICK HANDLER INITIALIZED ===');

  function initForceLinkHandler() {
    console.log('Initializing forced link handler');
    
    // Get all mobile menu links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileLinks.length) {
      console.warn('No mobile links found, retrying in 500ms');
      setTimeout(initForceLinkHandler, 500);
      return;
    }
    
    console.log(`Found ${mobileLinks.length} mobile menu links to fix`);
    
    // Fix each link with multiple techniques
    mobileLinks.forEach((link, index) => {
      const linkText = link.textContent.trim();
      const linkHref = link.getAttribute('href');
      
      console.log(`Processing link ${index}: ${linkText} (${linkHref})`);
      
      // 1. Remove any existing click handlers by cloning
      const newLink = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(newLink, link);
      }
      
      // 2. Remove any inline onclick attributes
      newLink.removeAttribute('onclick');
      
      // 3. Apply direct styles to ensure clickability
      const forceStyles = `
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        position: relative !important;
        touch-action: auto !important;
      `;
      
      newLink.setAttribute('style', forceStyles);
      
      // 4. Also apply to child elements
      const children = newLink.querySelectorAll('*');
      children.forEach(child => {
        child.setAttribute('style', 'pointer-events: auto !important; position: relative !important;');
      });
      
      // 5. Add multiple event listeners with capturing
      // These handlers will fire before any others
      ['click', 'touchstart', 'mousedown'].forEach(eventType => {
        newLink.addEventListener(eventType, function handleLinkEvent(e) {
          console.log(`Link "${linkText}" ${eventType} event captured`);

          // Navigate directly after closing menu
          setTimeout(() => {
            // Close the menu
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
              mobileMenu.classList.remove('active');
              setTimeout(() => mobileMenu.classList.add('hidden'), 400);
              
              // Also try to uncheck the toggle if it exists
              const menuToggle = document.getElementById('mobile-menu-toggle');
              if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
              }
            }
            
            // Now navigate to the link's target
            if (linkHref) {
              if (linkHref.startsWith('#')) {
                const targetElement = document.querySelector(linkHref);
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                } else {
                  window.location.hash = linkHref.substring(1);
                }
              } else {
                window.location.href = linkHref;
              }
            }
          }, 10);
        }, true); // true for capturing phase
      });
      
      // 6. Add touchstart handler specifically for iOS
      newLink.addEventListener('touchstart', function(e) {
        console.log('Touch started on link');
        // Mark this element as currently being touched
        newLink.classList.add('is-touching');
      }, {passive: true});
      
      // 7. Add touchend handler to trigger click
      newLink.addEventListener('touchend', function(e) {
        console.log('Touch ended on link');
        // Only if this is the element where touch started
        if (newLink.classList.contains('is-touching')) {
          // Remove the marker
          newLink.classList.remove('is-touching');
          
          // Create and dispatch a synthetic click event
          const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
          });
          
          console.log('Dispatching synthetic click event');
          newLink.dispatchEvent(clickEvent);
        }
      }, {passive: false});
      
      // 8. Prevent any default behavior that might interfere
      newLink.addEventListener('touchmove', function(e) {
        // If touch moves too much, cancel the touch sequence
        newLink.classList.remove('is-touching');
      }, {passive: true});
    });
    
    // Also fix the toggle button and close button
    const closeButton = document.querySelector('.mobile-close-btn');
    if (closeButton) {
      const newCloseBtn = closeButton.cloneNode(true);
      closeButton.parentNode.replaceChild(newCloseBtn, closeButton);
      
      // Add direct style
      newCloseBtn.style.cssText = 'cursor: pointer !important; pointer-events: auto !important; z-index: 1000000 !important;';
      
      // Add event handler
      newCloseBtn.addEventListener('click', function(e) {
        console.log('Close button clicked');
        
        // Close menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
          setTimeout(() => mobileMenu.classList.add('hidden'), 400);
        }
        
        // Restore body
        document.body.classList.remove('menu-open');
      }, true);
    }
    
    console.log('Force link handler initialized successfully');
  }
  
  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForceLinkHandler);
  } else {
    // DOM already loaded
    initForceLinkHandler();
  }
  
  // Run again after window load and after a delay
  window.addEventListener('load', function() {
    setTimeout(initForceLinkHandler, 300);
  });

  // Run one more time after everything else
  setTimeout(initForceLinkHandler, 1000);
})();
