// Simple Mobile Menu Fix - Direct and Clean Solution
// This overrides all other mobile menu scripts and provides a simple working solution

(function() {
    'use strict';
    
    console.log('🔧 Loading Simple Mobile Menu Fix...');
    
    // Wait for DOM to be ready
    function initMobileMenu() {
        console.log('🔧 Initializing mobile menu...');
        
        // Get elements
        const mobileToggle = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileClose = document.getElementById('mobile-close-btn') || document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        console.log('🔧 Found elements:', {
            toggle: !!mobileToggle,
            menu: !!mobileMenu,
            close: !!mobileClose,
            links: mobileLinks.length
        });
        
        if (!mobileToggle || !mobileMenu) {
            console.error('❌ Mobile menu elements not found!');
            return;
        }
        
        // Remove any existing event listeners by cloning and replacing elements
        const newToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
        
        // Simple toggle function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log('🔧 Toggling menu...');
            
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                newToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                console.log('🔧 Menu closed');
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('active');
                newToggle.classList.add('active');
                document.body.classList.add('menu-open');
                console.log('🔧 Menu opened');
            }
        }
        
        // Close menu function
        function closeMenu() {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
        
        // Add click handler to toggle button
        newToggle.addEventListener('click', toggleMenu);
        console.log('🔧 Toggle click handler added');
        
        // Add close button handler
        if (mobileClose) {
            mobileClose.addEventListener('click', closeMenu);
            console.log('🔧 Close button handler added');
        }
        
        // Add handlers to menu links
        mobileLinks.forEach((link, index) => {
            link.addEventListener('click', () => {
                console.log(`🔧 Menu link ${index + 1} clicked`);
                closeMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !newToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        console.log('✅ Mobile menu fix initialized successfully!');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        // DOM already loaded
        initMobileMenu();
    }
    
    // Also try again after a short delay to ensure all other scripts have loaded
    setTimeout(initMobileMenu, 100);
    setTimeout(initMobileMenu, 500);
    
})();
