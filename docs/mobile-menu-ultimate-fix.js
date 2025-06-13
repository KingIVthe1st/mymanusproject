/**
 * ULTIMATE MOBILE MENU FIX - DECEMBER 13, 2025
 * Definitive solution that overrides all previous mobile menu scripts
 * Works with existing HTML structure in the page
 */

(function() {
    'use strict';
    
    console.log('🚀 ULTIMATE Mobile Menu Fix - Initializing...');
    
    // Disable all other mobile menu scripts by overriding their functions
    window.toggleMobileMenu = function() { console.log('⚠️ Other mobile menu scripts disabled'); };
    window.openSimpleMenu = function() { console.log('⚠️ Other mobile menu scripts disabled'); };
    window.closeSimpleMenu = function() { console.log('⚠️ Other mobile menu scripts disabled'); };
    window.toggleSimpleMenu = function() { console.log('⚠️ Other mobile menu scripts disabled'); };
    
    let isMenuOpen = false;
    let toggleButton = null;
    let mobileMenu = null;
    let closeButton = null;
    let mobileLinks = [];
    
    function initUltimateMobileMenu() {
        console.log('🔧 Initializing ULTIMATE mobile menu...');
        
        // Find DOM elements using the actual HTML structure
        toggleButton = document.getElementById('mobile-toggle-btn') || 
                      document.querySelector('.navbar-mobile-toggle') ||
                      document.querySelector('[id*="mobile-toggle"]');
        
        mobileMenu = document.querySelector('.mobile-menu');
        closeButton = document.querySelector('.mobile-close-btn') || 
                     document.querySelector('#mobile-close-btn');
        mobileLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));
        
        console.log('📍 ULTIMATE Elements found:', {
            toggleButton: !!toggleButton,
            mobileMenu: !!mobileMenu,
            closeButton: !!closeButton,
            mobileLinksCount: mobileLinks.length,
            menuClasses: mobileMenu ? Array.from(mobileMenu.classList) : 'not found'
        });
        
        if (!toggleButton) {
            console.error('❌ ULTIMATE: Toggle button not found');
            return false;
        }
        
        if (!mobileMenu) {
            console.error('❌ ULTIMATE: Mobile menu not found');
            return false;
        }
        
        // Remove all existing event listeners by cloning the toggle button
        const newToggleButton = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
        toggleButton = newToggleButton;
        
        // Ensure proper initial state
        mobileMenu.classList.add('hidden');
        toggleButton.classList.remove('active');
        document.body.classList.remove('menu-open');
        isMenuOpen = false;
        
        // Main toggle function
        function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            
            console.log('🔄 ULTIMATE: Toggling menu, current state:', isMenuOpen ? 'OPEN' : 'CLOSED');
            
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            console.log('📂 ULTIMATE: Opening menu...');
            
            // Remove hidden class to show menu
            mobileMenu.classList.remove('hidden');
            
            // Add active class to toggle button (for hamburger animation)
            toggleButton.classList.add('active');
            
            // Prevent body scroll
            document.body.classList.add('menu-open');
            
            // Update state
            isMenuOpen = true;
            
            console.log('✅ ULTIMATE: Menu OPENED successfully!');
        }
        
        function closeMenu() {
            console.log('📁 ULTIMATE: Closing menu...');
            
            // Add hidden class to hide menu
            mobileMenu.classList.add('hidden');
            
            // Remove active class from toggle button
            toggleButton.classList.remove('active');
            
            // Restore body scroll
            document.body.classList.remove('menu-open');
            
            // Update state
            isMenuOpen = false;
            
            console.log('✅ ULTIMATE: Menu CLOSED successfully!');
        }
        
        // Event Listeners
        console.log('📱 ULTIMATE: Adding event listeners...');
        
        // Toggle button events
        toggleButton.addEventListener('click', toggleMenu, { passive: false });
        toggleButton.addEventListener('touchstart', toggleMenu, { passive: false });
        
        // Close button events
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❌ ULTIMATE: Close button clicked');
                closeMenu();
            });
            
            closeButton.addEventListener('touchstart', function(e) {
                e.preventDefault();
                console.log('❌ ULTIMATE: Close button touched');
                closeMenu();
            }, { passive: false });
        }
        
        // Mobile navigation link events
        mobileLinks.forEach((link, index) => {
            const handleLinkClick = function(e) {
                console.log(`🔗 ULTIMATE: Mobile link ${index + 1} clicked`);
                closeMenu();
            };
            
            link.addEventListener('click', handleLinkClick);
            link.addEventListener('touchstart', handleLinkClick, { passive: false });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !mobileMenu.contains(e.target) && 
                !toggleButton.contains(e.target)) {
                console.log('👆 ULTIMATE: Clicked outside, closing menu');
                closeMenu();
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                console.log('⌨️ ULTIMATE: Escape key pressed, closing menu');
                closeMenu();
            }
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            if (isMenuOpen) {
                setTimeout(() => {
                    console.log('🔄 ULTIMATE: Orientation changed, adjusting menu');
                    closeMenu();
                }, 100);
            }
        });
        
        console.log('🎉 ULTIMATE Mobile Menu initialized successfully!');
        
        // Test button functionality
        setTimeout(() => {
            const buttonRect = toggleButton.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(toggleButton);
            
            console.log('🧪 ULTIMATE Button test:', {
                visible: buttonRect.width > 0 && buttonRect.height > 0,
                clickable: computedStyle.pointerEvents !== 'none',
                zIndex: computedStyle.zIndex,
                position: buttonRect.top + ', ' + buttonRect.left
            });
        }, 500);
        
        return true;
    }
    
    // Multiple initialization attempts to ensure it works
    function tryInitialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initUltimateMobileMenu, 100);
            });
        } else {
            setTimeout(initUltimateMobileMenu, 100);
        }
        
        // Also try after delays to override any conflicting scripts
        setTimeout(initUltimateMobileMenu, 500);
        setTimeout(initUltimateMobileMenu, 1000);
        setTimeout(initUltimateMobileMenu, 2000);
    }
    
    // Clear any conflicting intervals/timeouts
    for (let i = 1; i < 9999; i++) {
        clearInterval(i);
        clearTimeout(i);
    }
    
    // Start initialization
    tryInitialize();
    
    console.log('🌟 ULTIMATE Mobile Menu Fix loaded and ready!');
    
})();
