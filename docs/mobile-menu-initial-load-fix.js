// Mobile Menu Initial Load Fix - December 15, 2025
// Ensures hamburger menu is immediately visible on mobile page load

(function() {
    'use strict';
    
    // Check if mobile device
    function isMobile() {
        return window.innerWidth <= 1024 || 
               window.matchMedia('(max-width: 1024px)').matches ||
               'ontouchstart' in window ||
               navigator.maxTouchPoints > 0;
    }
    
    // Force navbar visibility immediately
    function forceNavbarVisible() {
        if (!isMobile()) return;
        
        // Target both possible navbar selectors
        const navbars = [
            document.querySelector('.navbar'),
            document.querySelector('#main-navbar'),
            document.getElementById('main-navbar')
        ].filter(Boolean);
        
        navbars.forEach(navbar => {
            if (navbar) {
                // Force navbar styles
                navbar.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    z-index: 1000 !important;
                    display: flex !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: translateY(0) !important;
                    -webkit-transform: translateY(0) !important;
                    height: 60px !important;
                    background: rgba(255, 255, 255, 0.95) !important;
                    backdrop-filter: blur(20px) saturate(200%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(200%) !important;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
                `;
                
                // Force container visibility
                const container = navbar.querySelector('.navbar-container');
                if (container) {
                    container.style.cssText = `
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        width: 100% !important;
                        max-width: 1200px !important;
                        margin: 0 auto !important;
                        padding: 0 2rem !important;
                        height: 100% !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                    `;
                }
                
                // Force logo visibility
                const logo = navbar.querySelector('.navbar-logo');
                if (logo) {
                    logo.style.cssText = `
                        display: block !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                    `;
                    
                    const logoImg = logo.querySelector('img');
                    if (logoImg) {
                        logoImg.style.cssText = `
                            display: block !important;
                            opacity: 1 !important;
                            visibility: visible !important;
                            height: 50px !important;
                            width: auto !important;
                        `;
                    }
                }
                
                // Force hamburger visibility
                const hamburgers = [
                    navbar.querySelector('.navbar-mobile-toggle'),
                    navbar.querySelector('#mobile-toggle-btn'),
                    document.querySelector('#mobile-toggle-btn')
                ].filter(Boolean);
                
                hamburgers.forEach(hamburger => {
                    if (hamburger) {
                        hamburger.style.cssText = `
                            display: flex !important;
                            opacity: 1 !important;
                            visibility: visible !important;
                            pointer-events: auto !important;
                            position: relative !important;
                            z-index: 1001 !important;
                            cursor: pointer !important;
                            padding: 15px !important;
                            -webkit-tap-highlight-color: transparent !important;
                            touch-action: manipulation !important;
                            min-width: 44px !important;
                            min-height: 44px !important;
                            align-items: center !important;
                            justify-content: center !important;
                        `;
                    }
                });
                
                // Hide desktop navigation on mobile
                const navLinks = navbar.querySelector('.navbar-links');
                if (navLinks) {
                    navLinks.style.display = 'none !important';
                }
            }
        });
    }
    
    // Run immediately (synchronously)
    if (isMobile()) {
        forceNavbarVisible();
    }
    
    // Run again as soon as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (isMobile()) {
                forceNavbarVisible();
            }
        });
    }
    
    // Run again after a short delay to catch any late-loading elements
    setTimeout(function() {
        if (isMobile()) {
            forceNavbarVisible();
        }
    }, 100);
    
    // Run periodically for the first 3 seconds to catch any conflicts
    let attempts = 0;
    const maxAttempts = 6; // 3 seconds
    const interval = setInterval(function() {
        if (isMobile()) {
            forceNavbarVisible();
        }
        attempts++;
        if (attempts >= maxAttempts) {
            clearInterval(interval);
        }
    }, 500);
    
    // Override any conflicting scroll handlers
    let originalScrollY = window.scrollY;
    
    // Monitor for style changes that might hide the navbar
    if (isMobile()) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.classList.contains('navbar') || target.id === 'main-navbar') {
                        // Check if navbar was hidden
                        const transform = target.style.transform || target.style.webkitTransform;
                        const opacity = target.style.opacity;
                        const visibility = target.style.visibility;
                        const display = target.style.display;
                        
                        if ((transform && transform.includes('translateY(-')) ||
                            opacity === '0' ||
                            visibility === 'hidden' ||
                            display === 'none') {
                            // Re-force visibility
                            setTimeout(forceNavbarVisible, 10);
                        }
                    }
                }
            });
        });
        
        // Start observing after a short delay
        setTimeout(function() {
            const navbar = document.querySelector('.navbar') || document.querySelector('#main-navbar');
            if (navbar) {
                observer.observe(navbar, {
                    attributes: true,
                    attributeFilter: ['style', 'class']
                });
            }
        }, 500);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        setTimeout(function() {
            if (isMobile()) {
                forceNavbarVisible();
            }
        }, 100);
    });
    
    // Console logging for debugging
    console.log('Mobile Menu Initial Load Fix: Applied for mobile device');
    
})();
