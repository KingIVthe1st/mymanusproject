// EMERGENCY MOBILE MENU FIX - December 13, 2025
// This is a nuclear option fix that will work regardless of HTML corruption

(function() {
    'use strict';
    
    console.log('🚨 EMERGENCY Mobile Menu Fix Loading...');
    
    function createWorkingMobileMenu() {
        console.log('🔧 Creating working mobile menu from scratch...');
        
        // Remove any existing broken mobile menu
        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.remove();
        }
        
        // Find the toggle button
        const toggleButton = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        if (!toggleButton) {
            console.error('❌ Toggle button not found');
            return;
        }
        
        // Create new mobile menu HTML
        const mobileMenuHTML = `
            <div class="mobile-menu-emergency" style="
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 400px;
                height: 100vh;
                background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
                z-index: 9999;
                transition: right 0.3s ease;
                display: flex;
                flex-direction: column;
                padding: 20px;
                box-shadow: -5px 0 20px rgba(0,0,0,0.3);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 40px; width: auto;">
                    <button class="mobile-close-emergency" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 10px;
                    ">×</button>
                </div>
                <nav style="flex: 1;">
                    <a href="#artwork" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">Artwork</a>
                    <a href="#featured-in" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">Featured In</a>
                    <a href="#education" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">Education</a>
                    <a href="#collaborate" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">Collaborate</a>
                    <a href="#about" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">About</a>
                    <a href="#contact" class="mobile-nav-emergency" style="
                        display: block;
                        color: white;
                        text-decoration: none;
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                        font-size: 18px;
                        font-weight: 500;
                    ">Contact</a>
                </nav>
            </div>
            <div class="mobile-overlay-emergency" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.5);
                z-index: 9998;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            "></div>
        `;
        
        // Insert the mobile menu
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
        
        // Get the new elements
        const mobileMenu = document.querySelector('.mobile-menu-emergency');
        const mobileOverlay = document.querySelector('.mobile-overlay-emergency');
        const closeButton = document.querySelector('.mobile-close-emergency');
        const navLinks = document.querySelectorAll('.mobile-nav-emergency');
        
        let isOpen = false;
        
        // Toggle function
        function toggleMenu() {
            console.log('🔄 Toggling emergency menu...', isOpen);
            
            if (isOpen) {
                // Close menu
                mobileMenu.style.right = '-100%';
                mobileOverlay.style.opacity = '0';
                mobileOverlay.style.visibility = 'hidden';
                document.body.style.overflow = '';
                isOpen = false;
                console.log('✅ Menu CLOSED');
            } else {
                // Open menu
                mobileMenu.style.right = '0';
                mobileOverlay.style.opacity = '1';
                mobileOverlay.style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
                isOpen = true;
                console.log('✅ Menu OPENED');
            }
        }
        
        // Close function
        function closeMenu() {
            if (isOpen) {
                toggleMenu();
            }
        }
        
        // Event listeners
        toggleButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        };
        
        closeButton.onclick = function(e) {
            e.preventDefault();
            closeMenu();
        };
        
        mobileOverlay.onclick = function() {
            closeMenu();
        };
        
        // Navigation links
        navLinks.forEach(link => {
            link.onclick = function(e) {
                closeMenu();
                // Let the link navigate normally
            };
        });
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });
        
        console.log('🎉 Emergency Mobile Menu created successfully!');
    }
    
    // Initialize immediately and with delays
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWorkingMobileMenu);
    } else {
        createWorkingMobileMenu();
    }
    
    // Also try after a delay to ensure it overrides any other scripts
    setTimeout(createWorkingMobileMenu, 100);
    
})();
