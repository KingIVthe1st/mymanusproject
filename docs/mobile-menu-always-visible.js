/**
 * MOBILE MENU ALWAYS VISIBLE - JavaScript Fix
 * Disables scroll-based navbar hiding on mobile devices
 * Ensures hamburger menu is visible from page load
 */

(function() {
    'use strict';
    
    console.log('🔧 Mobile Menu Always Visible - Initializing...');
    
    // Function to check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 1024;
    }
    
    // Function to force mobile menu visibility
    function forceMobileMenuVisible() {
        if (!isMobile()) return;
        
        const navbar = document.querySelector('.navbar, #main-navbar');
        const mobileToggle = document.querySelector('.navbar-mobile-toggle, #mobile-toggle-btn');
        
        if (navbar) {
            // Remove any inline styles that might hide the navbar
            navbar.style.removeProperty('transform');
            navbar.style.removeProperty('opacity');
            navbar.style.removeProperty('visibility');
            navbar.style.removeProperty('display');
            
            // Force it to be visible
            navbar.style.setProperty('opacity', '1', 'important');
            navbar.style.setProperty('visibility', 'visible', 'important');
            navbar.style.setProperty('transform', 'translateY(0)', 'important');
            navbar.style.setProperty('display', 'block', 'important');
            
            // Remove any hiding classes
            navbar.classList.remove('hide', 'hidden', 'navbar-hidden', 'scrolled-down', 'scroll-hide');
        }
        
        if (mobileToggle) {
            // Force hamburger to be visible
            mobileToggle.style.setProperty('display', 'flex', 'important');
            mobileToggle.style.setProperty('opacity', '1', 'important');
            mobileToggle.style.setProperty('visibility', 'visible', 'important');
            
            // Ensure hamburger icon exists
            let hamburger = mobileToggle.querySelector('.hamburger');
            if (!hamburger) {
                hamburger = document.createElement('span');
                hamburger.className = 'hamburger';
                mobileToggle.appendChild(hamburger);
            }
            
            // Check if pseudo elements are working
            const styles = window.getComputedStyle(hamburger, '::before');
            if (!styles.content || styles.content === 'none' || styles.content === '') {
                // Create fallback lines
                if (!hamburger.querySelector('.hamburger-line')) {
                    hamburger.innerHTML = '';
                    for (let i = 0; i < 3; i++) {
                        const line = document.createElement('span');
                        line.className = 'hamburger-line';
                        line.style.cssText = 'display: block; width: 24px; height: 2px; background-color: #333; margin: 4px 0; opacity: 1; visibility: visible;';
                        hamburger.appendChild(line);
                    }
                }
            }
        }
    }
    
    // Override the scroll behavior for mobile
    function overrideScrollBehavior() {
        if (!isMobile()) return;
        
        // Find and disable the existing scroll handler
        const oldScrollHandler = window.handleScroll;
        if (oldScrollHandler) {
            window.handleScroll = function() {
                if (!isMobile()) {
                    // Allow normal scroll behavior on desktop
                    oldScrollHandler.apply(this, arguments);
                } else {
                    // On mobile, just ensure menu stays visible
                    forceMobileMenuVisible();
                }
            };
        }
        
        // Remove any existing scroll event listeners that might hide the navbar
        window.removeEventListener('scroll', window.throttledScroll);
        window.removeEventListener('scroll', window.handleScroll);
        
        // Add our own scroll listener that keeps the menu visible
        window.addEventListener('scroll', function() {
            if (isMobile()) {
                forceMobileMenuVisible();
            }
        }, { passive: true });
    }
    
    // Initialize on various events to ensure it works
    function initialize() {
        forceMobileMenuVisible();
        overrideScrollBehavior();
        
        // Set up mutation observer to catch any changes
        const observer = new MutationObserver(function(mutations) {
            if (isMobile()) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        (mutation.target.classList.contains('navbar') || 
                         mutation.target.id === 'main-navbar' ||
                         mutation.target.classList.contains('navbar-mobile-toggle') ||
                         mutation.target.id === 'mobile-toggle-btn')) {
                        forceMobileMenuVisible();
                    }
                });
            }
        });
        
        // Start observing
        const navbar = document.querySelector('.navbar, #main-navbar');
        if (navbar) {
            observer.observe(navbar, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                childList: true,
                subtree: true
            });
        }
        
        // Also observe the body for any navbar additions
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Run immediately
    forceMobileMenuVisible();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Run when all resources are loaded
    window.addEventListener('load', function() {
        forceMobileMenuVisible();
        overrideScrollBehavior();
    });
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            forceMobileMenuVisible();
            overrideScrollBehavior();
        }, 250);
    });
    
    // Continuously check for the first few seconds to ensure visibility
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        if (checkCount++ < 20) { // Check for 2 seconds
            forceMobileMenuVisible();
        } else {
            clearInterval(checkInterval);
        }
    }, 100);
    
    console.log('✅ Mobile Menu Always Visible - Initialized');
})();