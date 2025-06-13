/**
 * MOBILE MENU DIAGNOSTIC - December 13, 2025
 * Simple diagnostic to identify the issue
 */

console.log('🔍 MOBILE MENU DIAGNOSTIC STARTING...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM Ready - Running diagnostic...');
    
    // Find all relevant elements
    const toggleButton = document.getElementById('mobile-toggle-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    console.log('🎯 Element Check:', {
        toggleButton: !!toggleButton,
        mobileMenu: !!mobileMenu,
        hamburger: !!hamburger
    });
    
    if (mobileMenu) {
        console.log('📱 Mobile Menu Current State:', {
            classList: Array.from(mobileMenu.classList),
            display: window.getComputedStyle(mobileMenu).display,
            visibility: window.getComputedStyle(mobileMenu).visibility,
            opacity: window.getComputedStyle(mobileMenu).opacity,
            transform: window.getComputedStyle(mobileMenu).transform
        });
        
        // Check the container too
        const container = mobileMenu.querySelector('.mobile-menu-container');
        if (container) {
            console.log('📦 Container State:', {
                transform: window.getComputedStyle(container).transform,
                display: window.getComputedStyle(container).display
            });
        }
    }
    
    if (toggleButton) {
        // Simple direct toggle test
        toggleButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🆕 CLICK DETECTED - Direct onclick handler');
            
            if (mobileMenu) {
                const isHidden = mobileMenu.classList.contains('hidden');
                console.log('Current hidden state:', isHidden);
                
                if (isHidden) {
                    console.log('➡️ Removing hidden class...');
                    mobileMenu.classList.remove('hidden');
                    // Force display
                    mobileMenu.style.display = 'flex';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.visibility = 'visible';
                    toggleButton.classList.add('active');
                } else {
                    console.log('⬅️ Adding hidden class...');
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.display = 'none';
                    toggleButton.classList.remove('active');
                }
                
                console.log('✅ After toggle:', {
                    hidden: mobileMenu.classList.contains('hidden'),
                    display: mobileMenu.style.display,
                    computedDisplay: window.getComputedStyle(mobileMenu).display
                });
            }
            
            return false;
        };
        
        console.log('✅ Diagnostic onclick handler attached');
    }
    
    // Log all click events on the button
    if (toggleButton) {
        toggleButton.addEventListener('click', function(e) {
            console.log('🎯 addEventListener click fired');
        }, true);
        
        toggleButton.addEventListener('touchstart', function(e) {
            console.log('👆 touchstart event fired');
        }, true);
    }
    
    // Check for conflicting scripts
    console.log('🔍 Checking for conflicts:', {
        globalFunctions: {
            toggleMobileMenu: typeof window.toggleMobileMenu,
            openSimpleMenu: typeof window.openSimpleMenu,
            toggleMenu: typeof window.toggleMenu
        }
    });
});

console.log('📝 Diagnostic script loaded');
