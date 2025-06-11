/**
 * Direct Style Injection for Mobile Menu Fix
 * This script directly injects styles and event handlers to ensure mobile menu links are clickable
 */

(function() {
  'use strict';
  
  console.log('=== DIRECT STYLE INJECTION INITIALIZED ===');

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Force inject critical styles immediately
    const styleElement = document.createElement('style');
    styleElement.id = 'mobile-menu-fix-styles';
    styleElement.textContent = `
      /* Force mobile menu links to be clickable */
      .mobile-nav-link {
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 100000 !important;
        position: relative !important;
        opacity: 1 !important;
        touch-action: auto !important;
      }
      
      .mobile-nav-link * {
        pointer-events: auto !important;
      }
      
      .mobile-nav-link::before {
        pointer-events: none !important;
      }
      
      .mobile-menu, .mobile-nav, .nav-links {
        pointer-events: auto !important;
        z-index: 99999 !important;
      }
      
      /* Ensure overlay doesn't block clicks */
      .mobile-menu-overlay {
        pointer-events: none !important;
      }
      
      /* Handle any glass morphism that might interfere */
      .mobile-menu-container::before,
      .mobile-menu-container::after,
      .mobile-shooting-stars {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(styleElement);
    console.log('Critical styles injected');

    // Run fix initialization after a brief delay to ensure DOM is ready
    setTimeout(initMobileMenuFix, 100);
    
    // Also run again after window load event
    window.addEventListener('load', function() {
      setTimeout(initMobileMenuFix, 200);
    });
  });

  function initMobileMenuFix() {
    console.log('Initializing direct mobile menu fix');
    
    // Get references to menu elements
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenu || !mobileLinks.length) {
      console.log('Menu elements not found, will retry later');
      setTimeout(initMobileMenuFix, 500);
      return;
    }
    
    console.log(`Found ${mobileLinks.length} mobile links to fix`);

    // Clone and replace the entire menu to remove event listeners
    const newMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMenu, mobileMenu);
    
    // Get references to the new menu elements
    const newMobileLinks = newMenu.querySelectorAll('.mobile-nav-link');
    
    // Fix each link
    newMobileLinks.forEach((link, index) => {
      // Store the href from the original link
      const href = link.getAttribute('href');
      console.log(`Processing link ${index} with href: ${href}`);
      
      // Remove problematic attributes
      link.removeAttribute('onclick');
      
      // Create a brand new anchor element and replace the old one
      const newLink = document.createElement('a');
      newLink.href = href;
      newLink.className = link.className;
      newLink.innerHTML = link.innerHTML;
      newLink.style.cssText = `
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 100000 !important;
        position: relative !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 1.25rem 1.5rem !important;
        color: #fff !important;
        text-decoration: none !important;
        font-size: 1.2rem !important;
        font-weight: 500 !important;
        border-radius: 14px !important;
        margin: 0.5rem 0 !important;
        background: rgba(255, 255, 255, 0.15) !important;
      `;
      
      // Replace the original link with our new one
      link.parentNode.replaceChild(newLink, link);
      
      // Use direct click handling
      newLink.addEventListener('click', function(e) {
        console.log(`Link clicked: ${href}`);
        
        // Allow the default behavior (navigation)
        // But first close the menu
        const menu = document.querySelector('.mobile-menu');
        if (menu) {
          menu.classList.remove('active');
          setTimeout(() => {
            menu.classList.add('hidden');
          }, 200);
        }
        
        // Remove menu-open class from body
        document.body.classList.remove('menu-open');
        
        // Remove overlay if it exists
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) overlay.classList.remove('active');
      });
    });
    
    console.log('Direct menu fix applied successfully');
  }
})();
