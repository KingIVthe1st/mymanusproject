// Mobile Menu Fix - Direct Approach
(function() {
    'use strict';
    
    console.log('=== MOBILE MENU FIX INITIALIZED ===');
    
    function initializeMenu() {
        console.log('Initializing mobile menu fix...');
        
        // Get menu elements
        const menuToggle = document.querySelector('.navbar-mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeButton = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (!menuToggle || !mobileMenu) {
            console.error('Required menu elements not found');
            return;
        }
        
        console.log('Found menu elements:', { menuToggle, mobileMenu, closeButton, mobileLinks: mobileLinks.length });
        
        // Toggle menu function
        function toggleMenu(open) {
            const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
            
            console.log(`Toggling menu: ${shouldOpen ? 'open' : 'close'}`);
            
            if (shouldOpen) {
                // Open menu
                mobileMenu.style.display = 'block';
                mobileMenu.classList.add('active');
                document.body.classList.add('menu-open');
                
                // Add overlay
                let overlay = document.querySelector('.mobile-menu-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'mobile-menu-overlay';
                    document.body.appendChild(overlay);
                }
                overlay.classList.add('active');
                
                // Add click outside handler
                overlay.onclick = function() {
                    toggleMenu(false);
                };
                
            } else {
                // Close menu
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Remove overlay
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                
                // Hide after transition
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 400);
            }
        }
        
        // Toggle button click
        menuToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            toggleMenu();
            return false;
        };
        
        // Close button click
        if (closeButton) {
            closeButton.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                toggleMenu(false);
                return false;
            };
        }
        
        // Menu links
        mobileLinks.forEach(link => {
            // Remove any existing handlers
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetHref = this.getAttribute('href');
                console.log(`Menu link clicked: ${targetHref}`);
                
                // Close menu
                toggleMenu(false);
                
                // Navigate after a short delay
                setTimeout(() => {
                    if (targetHref && targetHref.startsWith('#')) {
                        const target = document.querySelector(targetHref);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }, 100);
                
                return false;
            };
        });
        
        // Add styles for the overlay
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            .mobile-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .mobile-menu {
                display: none;
                position: fixed;
                top: 0;
                right: 0;
                width: 80%;
                max-width: 400px;
                height: 100%;
                background: #4a3a7a;
                z-index: 1000;
                overflow-y: auto;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .mobile-menu.active {
                display: block;
                transform: translateX(0);
            }
            body.menu-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
        
        console.log('Mobile menu fix initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMenu);
    } else {
        initializeMenu();
    }
    
    // Also initialize after a delay to catch any dynamic content
    setTimeout(initializeMenu, 1000);
})();
