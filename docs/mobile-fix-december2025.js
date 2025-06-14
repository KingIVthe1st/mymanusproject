/**
 * MOBILE FIX - December 2025
 * Fixes:
 * 1. Scrolling issue on mobile when site loads
 * 2. Mobile menu not working on Chrome
 */

(function() {
    'use strict';
    
    console.log('🔧 Mobile Fix December 2025 - Initializing...');
    
    // CRITICAL FIX 1: Remove body scroll lock on initial load
    function removeScrollLock() {
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        
        // Also ensure HTML element isn't locked
        const html = document.documentElement;
        html.style.overflow = '';
        html.style.position = '';
        html.style.height = '';
        
        console.log('✅ Scroll lock removed');
    }
    
    // Run immediately
    removeScrollLock();
    
    // CRITICAL FIX 2: Chrome-compatible mobile menu
    function initMobileMenu() {
        console.log('📱 Initializing Chrome-compatible mobile menu...');
        
        const toggleBtn = document.querySelector('.navbar-mobile-toggle') || document.getElementById('mobile-toggle-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (!toggleBtn || !mobileMenu) {
            console.warn('⚠️ Menu elements not found, retrying...');
            setTimeout(initMobileMenu, 100);
            return;
        }
        
        // Ensure menu is hidden initially
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        
        // Chrome-compatible toggle function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Opening menu
                console.log('📂 Opening menu...');
                
                // Remove hidden class first
                mobileMenu.classList.remove('hidden');
                
                // Force display with slight delay for Chrome
                setTimeout(() => {
                    mobileMenu.style.display = 'flex';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.visibility = 'visible';
                    mobileMenu.style.pointerEvents = 'auto';
                    mobileMenu.classList.add('active');
                    
                    // Lock body scroll
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                    
                    // Add active class to toggle button
                    toggleBtn.classList.add('active');
                }, 10); // Small delay for Chrome rendering
                
            } else {
                // Closing menu
                console.log('📁 Closing menu...');
                
                mobileMenu.classList.remove('active');
                mobileMenu.style.opacity = '0';
                
                // Remove display after transition
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.style.visibility = 'hidden';
                    mobileMenu.style.pointerEvents = 'none';
                    mobileMenu.classList.add('hidden');
                }, 400);
                
                // Unlock body scroll
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Remove active class from toggle button
                toggleBtn.classList.remove('active');
            }
        }
        
        // Chrome-compatible event listeners
        // Use both click and touchstart for better mobile support
        toggleBtn.addEventListener('click', toggleMenu, { passive: false });
        toggleBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });
        
        // Close button listeners
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
            
            closeBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            }, { passive: false });
        }
        
        // Mobile nav links
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });
        
        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
        
        // Close on outside click
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                toggleMenu();
            }
        });
        
        console.log('✅ Mobile menu initialized with Chrome compatibility');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            removeScrollLock();
            initMobileMenu();
        });
    } else {
        // DOM already loaded
        removeScrollLock();
        initMobileMenu();
    }
    
    // Additional safeguards
    window.addEventListener('load', function() {
        removeScrollLock();
        
        // Ensure menu is properly initialized
        setTimeout(function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && !mobileMenu.hasAttribute('data-initialized')) {
                mobileMenu.setAttribute('data-initialized', 'true');
                initMobileMenu();
            }
        }, 500);
    });
    
    // Prevent accidental scroll lock
    setInterval(function() {
        if (document.body.classList.contains('menu-open')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (!mobileMenu || mobileMenu.classList.contains('hidden')) {
                // Menu is hidden but body is locked - fix it
                removeScrollLock();
            }
        }
    }, 1000);
    
})();