// FINAL Mobile Menu Fix - Overrides all conflicts
(function() {
    'use strict';
    
    console.log('🚀 FINAL Mobile Menu Fix Loading...');
    
    // Wait for everything to load
    function initFinalMobileFix() {
        console.log('🔧 Initializing FINAL mobile menu fix...');
        
        // Get mobile menu elements
        const toggleButton = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeButton = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        console.log('📍 Elements found:', {
            toggleButton: !!toggleButton,
            mobileMenu: !!mobileMenu,
            closeButton: !!closeButton,
            mobileLinksCount: mobileLinks.length
        });
        
        if (!toggleButton || !mobileMenu) {
            console.error('❌ Required mobile menu elements not found');
            return;
        }
        
        // Clean slate - remove all existing event listeners
        const newToggleButton = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
        
        // Simple toggle functionality
        function toggleMobileMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            
            console.log('🔄 Toggling mobile menu...');
            
            const isCurrentlyOpen = mobileMenu.classList.contains('active');
            
            if (isCurrentlyOpen) {
                // Close the menu
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                newToggleButton.classList.remove('active');
                document.body.classList.remove('menu-open');
                console.log('✅ Menu CLOSED');
            } else {
                // Open the menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('active');
                mobileMenu.style.display = 'flex';
                newToggleButton.classList.add('active');
                document.body.classList.add('menu-open');
                console.log('✅ Menu OPENED');
            }
        }
        
        // Close menu function
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
        mobileLinks.forEach((link, index) => {
            const closeAndNavigate = (e) => {
                console.log(`📱 Mobile link ${index + 1} clicked`);
                closeMobileMenu();
            };
            
            link.addEventListener('click', closeAndNavigate);
            link.addEventListener('touchstart', closeAndNavigate, { passive: false });
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !newToggleButton.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        console.log('🎉 FINAL Mobile Menu Fix initialized successfully!');
        
        // Test the toggle button is clickable
        console.log('🧪 Toggle button style:', {
            pointerEvents: getComputedStyle(newToggleButton).pointerEvents,
            zIndex: getComputedStyle(newToggleButton).zIndex,
            position: getComputedStyle(newToggleButton).position
        });
    }
    
    // Multiple initialization attempts to ensure it works
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFinalMobileFix);
    } else {
        initFinalMobileFix();
    }
    
    // Also initialize after delays to override other scripts
    setTimeout(initFinalMobileFix, 100);
    setTimeout(initFinalMobileFix, 500);
    setTimeout(initFinalMobileFix, 1000);
    
})();
