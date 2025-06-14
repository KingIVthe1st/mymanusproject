/**
 * NAVBAR INITIAL STATE FIX - December 2025
 * Ensures navbar displays correctly on initial page load
 */

(function() {
    'use strict';
    
    // Immediately set navbar initial state
    function fixNavbarInitialState() {
        const navbar = document.querySelector('.navbar');
        const navbarContainer = document.querySelector('.navbar-container');
        
        if (navbar) {
            // Force initial styles to prevent display issues
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            
            // Remove any transform that might hide it
            navbar.classList.remove('hidden');
            navbar.classList.remove('navbar-hidden');
        }
        
        if (navbarContainer) {
            // Ensure container is properly sized
            navbarContainer.style.height = '60px';
        }
        
        console.log('✅ Navbar initial state fixed');
    }
    
    // Run immediately
    fixNavbarInitialState();
    
    // Run again when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixNavbarInitialState);
    }
    
    // Mark page as loaded after a short delay to re-enable transitions
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('page-loaded');
            console.log('✅ Page loaded - transitions enabled');
        }, 100);
    });
    
    // Ensure navbar stays visible during scroll initialization
    let scrollInitialized = false;
    window.addEventListener('scroll', function() {
        if (!scrollInitialized) {
            scrollInitialized = true;
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.transform = 'translateY(0)';
                navbar.style.opacity = '1';
            }
        }
    }, { once: true });
    
})();