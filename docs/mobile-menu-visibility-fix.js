// Mobile Menu Visibility Fix - December 2025
// Disables scroll-based navbar hiding on mobile devices

(function() {
    'use strict';
    
    // Check if mobile device (including tablets)
    function isMobile() {
        return window.innerWidth <= 1024 || 
               window.matchMedia('(max-width: 1024px)').matches ||
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Force navbar to be visible
    function forceNavbarVisible() {
        const navbar = document.querySelector('.navbar') || document.getElementById('main-navbar');
        if (!navbar) return;
        
        // Remove any transform that hides the navbar
        navbar.style.transform = 'translateY(0)';
        navbar.style.webkitTransform = 'translateY(0)';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.display = 'flex';
        navbar.style.top = '0';
        navbar.style.position = 'fixed';
        
        // Ensure hamburger is visible
        const hamburger = navbar.querySelector('.navbar-mobile-toggle') || 
                         navbar.querySelector('#mobile-toggle-btn');
        if (hamburger) {
            hamburger.style.display = 'flex';
            hamburger.style.opacity = '1';
            hamburger.style.visibility = 'visible';
            hamburger.style.pointerEvents = 'auto';
        }
    }
    
    // Override scroll behavior on mobile
    function disableMobileScrollHiding() {
        if (!isMobile()) return;
        
        // Initial visibility
        forceNavbarVisible();
        
        // Override any existing scroll handlers
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = function(event, handler, options) {
            if (event === 'scroll' && isMobile()) {
                // Wrap the handler to prevent navbar hiding
                const wrappedHandler = function(e) {
                    handler.call(this, e);
                    // Force navbar visible after any scroll handler
                    requestAnimationFrame(forceNavbarVisible);
                };
                return originalAddEventListener.call(this, event, wrappedHandler, options);
            }
            return originalAddEventListener.call(this, event, handler, options);
        };
        
        // Monitor for any style changes and correct them
        const navbar = document.querySelector('.navbar') || document.getElementById('main-navbar');
        if (navbar) {
            const observer = new MutationObserver(function(mutations) {
                if (!isMobile()) return;
                
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const transform = navbar.style.transform || navbar.style.webkitTransform;
                        if (transform && transform.includes('translateY(-')) {
                            forceNavbarVisible();
                        }
                    }
                });
            });
            
            observer.observe(navbar, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableMobileScrollHiding);
    } else {
        disableMobileScrollHiding();
    }
    
    // Re-check on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (isMobile()) {
                forceNavbarVisible();
            }
        }, 100);
    });
    
    // Force visibility check every 500ms for the first 3 seconds
    // This catches any delayed JavaScript that might hide the navbar
    let checks = 0;
    const visibilityInterval = setInterval(function() {
        if (isMobile()) {
            forceNavbarVisible();
        }
        checks++;
        if (checks > 6) { // 3 seconds
            clearInterval(visibilityInterval);
        }
    }, 500);
    
})();
