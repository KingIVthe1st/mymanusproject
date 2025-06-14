/**
 * VIEWPORT DETECTION FIX - December 2025
 * Ensures mobile menu shows correctly on initial mobile load
 * Must run BEFORE other scripts
 */

(function() {
    'use strict';
    
    console.log('🔍 VIEWPORT DETECTION FIX - Starting...');
    
    // Enhanced mobile detection
    function isMobileViewport() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Consider mobile if width <= 1024px OR touch device OR mobile user agent
        const isMobile = width <= 1024 || isTouchDevice || isMobileUA;
        
        console.log(`📊 Viewport Check: Width=${width}, Touch=${isTouchDevice}, MobileUA=${isMobileUA}, Result=${isMobile}`);
        
        return isMobile;
    }
    
    // Force correct navigation display IMMEDIATELY
    function forceNavigationState() {
        const isMobile = isMobileViewport();
        const navbar = document.querySelector('.navbar');
        const navbarLinks = document.querySelector('.navbar-links');
        const mobileToggle = document.querySelector('.navbar-mobile-toggle, #mobile-toggle-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        console.log('🎯 Forcing navigation state for', isMobile ? 'MOBILE' : 'DESKTOP');
        
        // Add body class for CSS targeting
        document.body.classList.toggle('is-mobile-viewport', isMobile);
        document.body.classList.toggle('is-desktop-viewport', !isMobile);
        
        if (navbarLinks) {
            if (isMobile) {
                // MOBILE: Hide desktop links
                navbarLinks.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;';
            } else {
                // DESKTOP: Show desktop links
                navbarLinks.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important;';
            }
        }
        
        if (mobileToggle) {
            if (isMobile) {
                // MOBILE: Show hamburger button
                mobileToggle.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;';
            } else {
                // DESKTOP: Hide hamburger button
                mobileToggle.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;';
            }
        }
        
        // Ensure mobile menu is hidden on load
        if (mobileMenu) {
            mobileMenu.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important;';
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        }
        
        console.log('✅ Navigation state forced successfully');
    }
    
    // Create and inject critical CSS
    function injectCriticalCSS() {
        const style = document.createElement('style');
        style.id = 'viewport-detection-critical-css';
        style.textContent = `
            /* CRITICAL VIEWPORT DETECTION CSS */
            
            /* Mobile viewport overrides */
            body.is-mobile-viewport .navbar-links {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
            }
            
            body.is-mobile-viewport .navbar-mobile-toggle,
            body.is-mobile-viewport #mobile-toggle-btn {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            /* Desktop viewport overrides */
            body.is-desktop-viewport .navbar-links {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            body.is-desktop-viewport .navbar-mobile-toggle,
            body.is-desktop-viewport #mobile-toggle-btn {
                display: none !important;
            }
            
            /* Ensure mobile menu starts hidden */
            .mobile-menu:not(.active) {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
            }
            
            /* Override any conflicting media queries on initial load */
            @media (max-width: 1024px) {
                body:not(.viewport-initialized) .navbar-links {
                    display: none !important;
                }
                body:not(.viewport-initialized) .navbar-mobile-toggle {
                    display: flex !important;
                }
            }
        `;
        
        // Insert at the very end of head to ensure highest priority
        const head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(style);
        
        console.log('💉 Critical CSS injected');
    }
    
    // Initialize viewport detection
    function initializeViewport() {
        console.log('🚀 Initializing viewport detection...');
        
        // Inject critical CSS first
        injectCriticalCSS();
        
        // Force correct state immediately
        forceNavigationState();
        
        // Mark as initialized
        document.body.classList.add('viewport-initialized');
        
        // Add resize listener with debounce
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(forceNavigationState, 150);
        });
        
        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
            setTimeout(forceNavigationState, 300);
        });
        
        console.log('✅ Viewport detection initialized');
    }
    
    // Run IMMEDIATELY when script loads
    initializeViewport();
    
    // Also run on DOM ready as backup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceNavigationState);
    } else {
        // DOM already loaded, run again
        setTimeout(forceNavigationState, 0);
    }
    
    // Final check after other scripts might have loaded
    setTimeout(forceNavigationState, 500);
    
})();