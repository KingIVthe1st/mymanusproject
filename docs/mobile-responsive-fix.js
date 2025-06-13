// SIMPLIFIED MOBILE MENU RESPONSIVE FIX
(function() {
    'use strict';
    
    console.log('🚀 SIMPLIFIED Mobile Responsive Fix Loading...');
    
    // Simple device detection
    function isMobileDevice() {
        return window.innerWidth <= 1024 || 
               'ontouchstart' in window || 
               navigator.maxTouchPoints > 0;
    }
    
    // Force correct navigation state
    function forceCorrectNavigation() {
        const isMobile = isMobileDevice();
        const mobileToggle = document.querySelector('.navbar-mobile-toggle') || document.querySelector('#mobile-toggle-btn');
        const navbarLinks = document.querySelector('.navbar-links');
        
        console.log('📱 Device detected as mobile:', isMobile, 'Screen:', window.innerWidth + 'x' + window.innerHeight);
        
        if (isMobile) {
            // Force mobile view
            if (navbarLinks) {
                navbarLinks.style.setProperty('display', 'none', 'important');
                navbarLinks.style.setProperty('visibility', 'hidden', 'important');
            }
            
            if (mobileToggle) {
                mobileToggle.style.setProperty('display', 'flex', 'important');
                mobileToggle.style.setProperty('visibility', 'visible', 'important');
                mobileToggle.style.setProperty('opacity', '1', 'important');
                mobileToggle.style.setProperty('pointer-events', 'auto', 'important');
            }
            
            console.log('✅ Forced mobile view');
        } else {
            // Force desktop view
            if (navbarLinks) {
                navbarLinks.style.setProperty('display', 'flex', 'important');
                navbarLinks.style.setProperty('visibility', 'visible', 'important');
            }
            
            if (mobileToggle) {
                mobileToggle.style.setProperty('display', 'none', 'important');
            }
            
            console.log('✅ Forced desktop view');
        }
    }
    
    // Initialize mobile menu functionality
    function initMobileMenu() {
        console.log('🔧 Initializing mobile menu...');
        
        const toggleButton = document.querySelector('.navbar-mobile-toggle') || document.querySelector('#mobile-toggle-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeButton = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (!toggleButton || !mobileMenu) {
            console.error('❌ Mobile menu elements not found');
            return;
        }
        
        // Clean existing event listeners
        const newToggleButton = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
        
        // Toggle function
        function toggleMobileMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            
            console.log('🔄 Toggling mobile menu...');
            
            const isCurrentlyOpen = mobileMenu.classList.contains('active');
            
            if (isCurrentlyOpen) {
                // Close
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                newToggleButton.classList.remove('active');
                document.body.classList.remove('menu-open');
                console.log('✅ Menu CLOSED');
            } else {
                // Open
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('active');
                newToggleButton.classList.add('active');
                document.body.classList.add('menu-open');
                console.log('✅ Menu OPENED');
            }
        }
        
        // Close function
        function closeMobileMenu() {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
        
        // Add event listeners
        newToggleButton.addEventListener('click', toggleMobileMenu);
        newToggleButton.addEventListener('touchstart', toggleMobileMenu, { passive: false });
        
        // Close button
        if (closeButton) {
            closeButton.addEventListener('click', closeMobileMenu);
            closeButton.addEventListener('touchstart', closeMobileMenu, { passive: false });
        }
        
        // Mobile nav links
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
            link.addEventListener('touchstart', closeMobileMenu, { passive: false });
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Click outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !newToggleButton.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        console.log('🎉 Mobile menu initialized!');
    }
    
    // Main initialization
    function initialize() {
        forceCorrectNavigation();
        initMobileMenu();
        
        // Add resize listener
        window.addEventListener('resize', function() {
            setTimeout(forceCorrectNavigation, 100);
        });
        
        // Add orientation change listener
        window.addEventListener('orientationchange', function() {
            setTimeout(forceCorrectNavigation, 200);
        });
    }
    
    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also initialize after delays to override other scripts
    setTimeout(initialize, 100);
    setTimeout(initialize, 500);
    setTimeout(initialize, 1000);
    
})();
