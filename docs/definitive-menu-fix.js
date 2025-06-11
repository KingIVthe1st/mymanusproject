document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DEFINITIVE MENU FIX INITIALIZED ===');
    
    // Wait a moment to ensure all elements are loaded
    setTimeout(function() {
        // Get menu elements with multiple selectors to be extra sure
        const menuToggle = document.querySelector('.navbar-mobile-toggle, .mobile-toggle, [aria-label="Menu"], .hamburger');
        const mobileMenu = document.querySelector('.mobile-menu, .mobile-nav, .mobile-navigation');
        const closeButton = document.querySelector('.mobile-close-btn, .close-menu, [aria-label="Close"]');
        
        if (!menuToggle || !mobileMenu) {
            console.error('Essential menu elements not found');
            return;
        }
        
        console.log('Menu elements found:', { menuToggle, mobileMenu, closeButton });
        
        // Add styles directly to the document
        const style = document.createElement('style');
        style.textContent = `
            /* Force menu to be visible and interactive */
            .mobile-menu {
                position: fixed !important;
                top: 0 !important;
                right: 0 !important;
                width: 80% !important;
                max-width: 400px !important;
                height: 100% !important;
                background: #4a3a7a !important;
                z-index: 10000 !important;
                transform: translateX(100%) !important;
                transition: transform 0.3s ease !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            .mobile-menu.active {
                transform: translateX(0) !important;
            }
            
            .mobile-menu-overlay {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0,0,0,0.5) !important;
                z-index: 9999 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
                pointer-events: auto !important;
            }
            
            .mobile-menu-overlay.active {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* Ensure menu items are clickable */
            .mobile-menu a, 
            .mobile-nav-link,
            .mobile-menu a * {
                pointer-events: auto !important;
                cursor: pointer !important;
                position: relative !important;
                z-index: 10001 !important;
            }
            
            /* Make sure nothing is blocking clicks */
            body.menu-open {
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
                height: 100% !important;
            }
        `;
        document.head.appendChild(style);
        
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
        }
        
        // Toggle menu function
        function toggleMenu(open) {
            const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
            
            console.log('Toggling menu:', shouldOpen ? 'open' : 'close');
            
            if (shouldOpen) {
                // Open menu
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.classList.add('menu-open');
                
                // Force reflow/repaint
                void mobileMenu.offsetWidth;
                
            } else {
                // Close menu
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        // Set up event listeners with proper cleanup
        function setupEventListeners() {
            // Remove any existing listeners first
            menuToggle.removeEventListener('click', handleToggleClick);
            overlay.removeEventListener('click', handleOverlayClick);
            if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
            
            // Add new listeners
            menuToggle.addEventListener('click', handleToggleClick);
            overlay.addEventListener('click', handleOverlayClick);
            if (closeButton) closeButton.addEventListener('click', handleCloseClick);
            
            // Make menu items close the menu when clicked
            const menuItems = mobileMenu.querySelectorAll('a');
            menuItems.forEach(item => {
                item.removeEventListener('click', handleMenuItemClick);
                item.addEventListener('click', handleMenuItemClick);
            });
            
            // Close on escape key
            document.removeEventListener('keydown', handleEscape);
            document.addEventListener('keydown', handleEscape);
        }
        
        // Event handlers
        function handleToggleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            toggleMenu();
            return false;
        }
        
        function handleOverlayClick(e) {
            e.preventDefault();
            console.log('Overlay clicked');
            toggleMenu(false);
            return false;
        }
        
        function handleCloseClick(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            console.log('Close button clicked');
            toggleMenu(false);
            return false;
        }
        
        function handleMenuItemClick(e) {
            console.log('Menu item clicked:', this.href);
            // Let the default action happen for external links
            if (!this.href || this.href.includes('http')) {
                return true;
            }
            
            // For anchor links, scroll after closing menu
            if (this.hash) {
                e.preventDefault();
                toggleMenu(false);
                
                // Scroll to the section after menu closes
                setTimeout(() => {
                    const target = document.querySelector(this.hash);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
                
                return false;
            }
            
            // For other internal links, just close the menu
            toggleMenu(false);
            return true;
        }
        
        function handleEscape(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                console.log('Escape key pressed');
                toggleMenu(false);
            }
        }
        
        // Initialize everything
        setupEventListeners();
        
        // Make sure menu is initially closed
        mobileMenu.style.display = 'block';
        setTimeout(() => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }, 100);
        
        console.log('Definitive menu fix initialized successfully');
        
    }, 300); // Slight delay to ensure DOM is ready
});
