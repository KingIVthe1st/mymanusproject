// Master Menu Controller - Ensures only one consistent menu implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== MASTER MENU CONTROLLER INITIALIZING ===');
    
    // Wait to ensure all other scripts have loaded
    setTimeout(function() {
        console.log('=== MASTER MENU CONTROLLER EXECUTING ===');
        
        // 1. REMOVE ALL EXISTING MENUS EXCEPT OUR NUCLEAR MENU
        // Hide existing mobile menus (don't remove to avoid layout shifts)
        const existingMenus = document.querySelectorAll('.mobile-menu, .mobile-nav, [class*="mobile-menu"], [class*="mobileMenu"]');
        existingMenus.forEach(menu => {
            if (menu.id !== 'nuclear-mobile-menu') {
                console.log('Hiding existing menu:', menu);
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.pointerEvents = 'none';
                menu.style.zIndex = '-1';
            }
        });
        
        // 2. ENSURE OUR NUCLEAR MENU EXISTS - RECREATE IF NECESSARY
        let nuclearMenu = document.getElementById('nuclear-mobile-menu');
        let menuOverlay = document.getElementById('nuclear-menu-overlay');
        
        if (!nuclearMenu || !menuOverlay) {
            console.log('Creating new nuclear menu from scratch');
            
            // Create overlay if it doesn't exist
            if (!menuOverlay) {
                menuOverlay = document.createElement('div');
                menuOverlay.id = 'nuclear-menu-overlay';
                menuOverlay.style.cssText = `
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
                `;
                document.body.appendChild(menuOverlay);
            }
            
            // Create menu if it doesn't exist
            if (!nuclearMenu) {
                nuclearMenu = document.createElement('div');
                nuclearMenu.id = 'nuclear-mobile-menu';
                nuclearMenu.style.cssText = `
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 80%;
                    max-width: 400px;
                    height: 100%;
                    background: linear-gradient(135deg, #9747FF 0%, #E8508D 100%);
                    z-index: 9999;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    padding: 20px;
                    overflow-y: auto;
                    box-shadow: -5px 0 25px rgba(0,0,0,0.3);
                    border-left: 1px solid rgba(255,255,255,0.1);
                `;
                
                // Add subtle gradient animation
                const gradientStyle = document.createElement('style');
                gradientStyle.textContent = `
                    @keyframes gradient-shift {
                        0% { background-position: 0 0, 0 0; }
                        50% { background-position: 0 0, 100% 100%; }
                        100% { background-position: 0 0, 0 0; }
                    }
                    
                    #nuclear-mobile-menu {
                        background-image: linear-gradient(135deg, #9747FF 0%, #E8508D 100%), 
                                         linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                        background-size: 100% 100%, 200% 200%;
                        background-position: 0 0, 0 0;
                        animation: gradient-shift 8s infinite linear;
                    }
                    
                    .nuclear-menu-link {
                        color: white;
                        text-decoration: none;
                        font-size: 18px;
                        padding: 12px 15px;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        background: rgba(255,255,255,0.08);
                        backdrop-filter: blur(5px);
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                        border: 1px solid rgba(255,255,255,0.1);
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    
                    .nuclear-menu-link:hover {
                        background: rgba(255,255,255,0.15);
                        transform: translateY(-2px);
                        box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                    }
                    
                    .nuclear-menu-link:active {
                        transform: translateY(1px);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    @keyframes fadeInRight {
                        from {
                            opacity: 0;
                            transform: translateX(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `;
                document.head.appendChild(gradientStyle);
                
                // Create menu content
                nuclearMenu.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.2);">
                        <img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 40px;">
                        <button id="nuclear-menu-close" style="
                            background: none;
                            border: 1px solid rgba(255,255,255,0.2);
                            color: white;
                            border-radius: 50%;
                            font-size: 24px;
                            cursor: pointer;
                            padding: 10px;
                            margin-right: -10px;
                        ">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <nav style="display: flex; flex-direction: column; gap: 15px;">
                        <a href="#artwork" class="nuclear-menu-link">
                            <i class="fas fa-palette"></i>
                            <span>Artwork</span>
                        </a>
                        
                        <a href="#featured-in" class="nuclear-menu-link">
                            <i class="fas fa-star"></i>
                            <span>Featured In</span>
                        </a>
                        
                        <a href="#education" class="nuclear-menu-link">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Education</span>
                        </a>
                        
                        <a href="#collaborate" class="nuclear-menu-link">
                            <i class="fas fa-handshake"></i>
                            <span>Collaborate</span>
                        </a>
                        
                        <a href="#about" class="nuclear-menu-link">
                            <i class="fas fa-user"></i>
                            <span>About</span>
                        </a>
                        
                        <a href="#contact" class="nuclear-menu-link" style="
                            margin-top: 10px;
                            background: rgba(255,255,255,0.1);
                            justify-content: center;
                        ">
                            <i class="fas fa-envelope"></i>
                            <span>Contact</span>
                        </a>
                    </nav>
                `;
                document.body.appendChild(nuclearMenu);
                
                // Re-get close button reference
                const closeButton = document.getElementById('nuclear-menu-close');
                if (closeButton) {
                    closeButton.addEventListener('click', function() {
                        toggleMenu(false);
                    });
                }
            }
        } else {
            console.log('Nuclear menu already exists - ensuring proper styles');
            
            // Ensure proper styling on existing menu
            nuclearMenu.style.backgroundImage = 'linear-gradient(135deg, #9747FF 0%, #E8508D 100%), linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)';
            nuclearMenu.style.backgroundSize = '100% 100%, 200% 200%';
            nuclearMenu.style.backgroundPosition = '0 0, 0 0';
            nuclearMenu.style.animation = 'gradient-shift 8s infinite linear';
            
            // Ensure overlay has proper styling
            menuOverlay.style.position = 'fixed';
            menuOverlay.style.top = '0';
            menuOverlay.style.left = '0';
            menuOverlay.style.width = '100%';
            menuOverlay.style.height = '100%';
            menuOverlay.style.background = 'rgba(0,0,0,0.8)';
            menuOverlay.style.zIndex = '9998';
            menuOverlay.style.backdropFilter = 'blur(5px)';
        }
        
        // 3. UNIVERSAL TOGGLE FUNCTION
        function toggleMenu(open) {
            const shouldOpen = open !== undefined ? open : !nuclearMenu.classList.contains('active');
            console.log('Toggle menu', shouldOpen ? 'open' : 'closed');
            
            if (shouldOpen) {
                // Open menu
                document.body.style.overflow = 'hidden';
                menuOverlay.style.visibility = 'visible';
                menuOverlay.style.opacity = '1';
                nuclearMenu.style.transform = 'translateX(0)';
                nuclearMenu.classList.add('active');
                
                // Animate menu items in
                const menuLinks = nuclearMenu.querySelectorAll('.nuclear-menu-link');
                menuLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, index * 100);
                });
            } else {
                // Close menu
                document.body.style.overflow = '';
                menuOverlay.style.opacity = '0';
                nuclearMenu.style.transform = 'translateX(100%)';
                nuclearMenu.classList.remove('active');
                
                // Reset animations
                const menuLinks = nuclearMenu.querySelectorAll('.nuclear-menu-link');
                menuLinks.forEach(link => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(20px)';
                });
                
                setTimeout(() => {
                    menuOverlay.style.visibility = 'hidden';
                }, 300);
            }
        }
        
        // 4. ATTACH TO ALL POSSIBLE TOGGLE BUTTONS
        const allPossibleToggles = document.querySelectorAll('.navbar-mobile-toggle, #mobile-toggle-btn, .mobile-toggle, [aria-label="Menu"], [class*="hamburger"]');
        console.log('Found', allPossibleToggles.length, 'possible toggle buttons');
        
        allPossibleToggles.forEach((toggle, index) => {
            console.log('Processing toggle button', index, toggle);
            
            // Clone to remove any existing handlers
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            // Add our handler with high priority
            newToggle.addEventListener('click', function(e) {
                console.log('Toggle button clicked', index);
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
                return false;
            }, true);
            
            // Make it super clickable
            newToggle.style.cursor = 'pointer';
            newToggle.style.pointerEvents = 'auto';
            newToggle.style.zIndex = '999999';
        });
        
        // 5. ATTACH TO OVERLAY AND ESCAPE KEY
        menuOverlay.addEventListener('click', function() {
            toggleMenu(false);
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nuclearMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
        
        // 6. HANDLE MENU LINKS
        const menuLinks = document.querySelectorAll('.nuclear-menu-link');
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
        
        // 7. DISABLE OTHER MENU SCRIPTS
        // Create a function that does nothing to override other toggle functions
        window.toggleMenu = function() { 
            console.log('Intercepted other toggle attempt');
            return false; 
        };
        
        // Common variable names used in other scripts
        const dummyFunction = function() { return false; };
        window.openMenu = dummyFunction;
        window.closeMenu = dummyFunction;
        window.toggleMobileMenu = dummyFunction;
        window.mobileMenuToggle = dummyFunction;
        
        console.log('=== MASTER MENU CONTROLLER INITIALIZED ===');
        
        // Ensure mobile menu starts closed
        toggleMenu(false);
        
    }, 1000); // Wait a full second for everything to load
});
