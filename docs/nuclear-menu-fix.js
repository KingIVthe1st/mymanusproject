// Nuclear Menu Fix - Completely replaces mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== NUCLEAR MENU FIX INITIALIZING ===');
    
    // Wait for everything to be loaded
    setTimeout(function() {
        // Remove any existing menu-related styles and scripts
        const menuStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
        menuStyles.forEach(style => {
            const styleContent = style.textContent || style.href || '';
            if (styleContent.includes('mobile-menu') || styleContent.includes('mobileMenu') || 
                styleContent.includes('mobileNav') || styleContent.includes('navbar-mobile')) {
                style.remove();
            }
        });
        
        // Create new menu HTML
        const newMenuHTML = `
            <!-- New Mobile Menu Overlay -->
            <div id="nuclear-menu-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 9998;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            "></div>
            
            <!-- New Mobile Menu -->
            <div id="nuclear-mobile-menu" style="
                position: fixed;
                top: 0;
                right: 0;
                width: 80%;
                max-width: 400px;
                height: 100%;
                background: #4a3a7a;
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                padding: 20px;
                overflow-y: auto;
                box-shadow: -5px 0 15px rgba(0,0,0,0.2);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 40px;">
                    <button id="nuclear-menu-close" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 10px;
                        margin-right: -10px;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <nav style="display: flex; flex-direction: column; gap: 15px;">
                    <a href="#artwork" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-palette"></i>
                        <span>Artwork</span>
                    </a>
                    
                    <a href="#featured-in" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-star"></i>
                        <span>Featured In</span>
                    </a>
                    
                    <a href="#education" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Education</span>
                    </a>
                    
                    <a href="#collaborate" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-handshake"></i>
                        <span>Collaborate</span>
                    </a>
                    
                    <a href="#about" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <i class="fas fa-user"></i>
                        <span>About</span>
                    </a>
                    
                    <a href="#contact" class="nuclear-menu-link" style="
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-top: 10px;
                        background: rgba(255,255,255,0.1);
                        justify-content: center;
                    ">
                        <i class="fas fa-envelope"></i>
                        <span>Contact</span>
                    </a>
                </nav>
            </div>
        `;
        
        // Add new menu to the body
        document.body.insertAdjacentHTML('beforeend', newMenuHTML);
        
        // Get new menu elements
        const menuOverlay = document.getElementById('nuclear-menu-overlay');
        const mobileMenu = document.getElementById('nuclear-mobile-menu');
        const closeButton = document.getElementById('nuclear-menu-close');
        const menuLinks = document.querySelectorAll('.nuclear-menu-link');
        
        // Find the original menu toggle button and replace its functionality
        const originalToggle = document.querySelector('.navbar-mobile-toggle, .mobile-toggle, [aria-label="Menu"], .hamburger');
        
        // Toggle menu function
        function toggleMenu(open) {
            const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
            
            if (shouldOpen) {
                // Open menu
                document.body.style.overflow = 'hidden';
                menuOverlay.style.visibility = 'visible';
                menuOverlay.style.opacity = '1';
                mobileMenu.style.transform = 'translateX(0)';
                mobileMenu.classList.add('active');
            } else {
                // Close menu
                document.body.style.overflow = '';
                menuOverlay.style.opacity = '0';
                mobileMenu.style.transform = 'translateX(100%)';
                mobileMenu.classList.remove('active');
                
                setTimeout(() => {
                    menuOverlay.style.visibility = 'hidden';
                }, 300);
            }
        }
        
        // Set up event listeners
        if (originalToggle) {
            originalToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
            });
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMenu(false);
            });
        }
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                toggleMenu(false);
            });
        }
        
        // Handle menu links
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    toggleMenu(false);
                    
                    // Scroll to target after menu closes
                    setTimeout(() => {
                        const target = document.querySelector(targetId);
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 300);
                }
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
        
        console.log('=== NUCLEAR MENU FIX INITIALIZED ===');
        
        // Hide any existing mobile menu
        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.style.display = 'none';
        }
        
    }, 500); // Give everything time to load
});
