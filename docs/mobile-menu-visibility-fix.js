/**
 * MOBILE MENU INITIAL VISIBILITY FIX - December 2025
 * Ensures mobile menu hamburger is visible on page load
 */

(function() {
    'use strict';
    
    console.log('🍄 Mobile Menu Initial Visibility Fix - Loading...');
    
    // Function to ensure mobile menu toggle is visible
    function ensureMobileMenuVisible() {
        const navbar = document.querySelector('.navbar');
        const mobileToggle = document.querySelector('.navbar-mobile-toggle, #mobile-toggle-btn');
        
        if (!navbar || !mobileToggle) {
            console.log('⏳ Waiting for navbar elements...');
            setTimeout(ensureMobileMenuVisible, 50);
            return;
        }
        
        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            console.log('📱 Mobile device detected - ensuring hamburger menu visibility');
            
            // Force navbar to be visible
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            navbar.style.display = 'block';
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '1000';
            
            // Force mobile toggle to be visible
            mobileToggle.style.display = 'flex';
            mobileToggle.style.opacity = '1';
            mobileToggle.style.visibility = 'visible';
            mobileToggle.style.position = 'relative';
            mobileToggle.style.zIndex = '1001';
            
            // Ensure hamburger lines are visible
            const hamburger = mobileToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.style.opacity = '1';
                hamburger.style.visibility = 'visible';
                
                // Also check for pseudo elements
                const styles = window.getComputedStyle(hamburger, '::before');
                if (!styles.content || styles.content === 'none') {
                    // If pseudo elements aren't working, create real elements
                    if (!hamburger.querySelector('.hamburger-line')) {
                        hamburger.innerHTML = '';
                        
                        // Create three lines
                        for (let i = 0; i < 3; i++) {
                            const line = document.createElement('span');
                            line.className = 'hamburger-line';
                            line.style.display = 'block';
                            line.style.width = '24px';
                            line.style.height = '2px';
                            line.style.backgroundColor = '#333';
                            line.style.margin = '4px 0';
                            line.style.borderRadius = '2px';
                            line.style.transition = 'all 0.3s ease';
                            hamburger.appendChild(line);
                        }
                    }
                }
            }
            
            // Hide desktop nav links on mobile
            const navLinks = document.querySelector('.navbar-links');
            if (navLinks) {
                navLinks.style.display = 'none';
            }
            
            console.log('✅ Mobile menu hamburger visibility ensured');
        }
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const navbar = document.querySelector('.navbar');
        const mobileToggle = document.querySelector('.navbar-mobile-toggle, #mobile-toggle-btn');
        
        if (navbar && mobileToggle && window.innerWidth <= 768) {
            // Ensure visibility on scroll
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            mobileToggle.style.display = 'flex';
            mobileToggle.style.opacity = '1';
            mobileToggle.style.visibility = 'visible';
        }
    }
    
    // Run immediately
    ensureMobileMenuVisible();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureMobileMenuVisible);
    } else {
        // DOM already loaded
        setTimeout(ensureMobileMenuVisible, 0);
    }
    
    // Run when window loads (all resources loaded)
    window.addEventListener('load', ensureMobileMenuVisible);
    
    // Handle scroll events
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(handleScroll, 50);
    }, { passive: true });
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(ensureMobileMenuVisible, 250);
    });
    
    // Mutation observer to catch any changes that might hide the menu
    const observer = new MutationObserver(function(mutations) {
        const mobileToggle = document.querySelector('.navbar-mobile-toggle, #mobile-toggle-btn');
        if (mobileToggle && window.innerWidth <= 768) {
            const display = window.getComputedStyle(mobileToggle).display;
            const visibility = window.getComputedStyle(mobileToggle).visibility;
            const opacity = window.getComputedStyle(mobileToggle).opacity;
            
            if (display === 'none' || visibility === 'hidden' || opacity === '0') {
                console.log('🔧 Mobile menu was hidden - fixing...');
                ensureMobileMenuVisible();
            }
        }
    });
    
    // Start observing once navbar exists
    function startObserving() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            observer.observe(navbar, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                childList: true,
                subtree: true
            });
        } else {
            setTimeout(startObserving, 100);
        }
    }
    
    startObserving();
    
    console.log('🍄 Mobile Menu Initial Visibility Fix - Loaded');
})();