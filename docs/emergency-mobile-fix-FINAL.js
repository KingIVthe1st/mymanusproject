// IMMEDIATE MOBILE MENU FIX - December 13, 2025
// This will work regardless of HTML corruption

(function() {
    console.log('🔧 IMMEDIATE Mobile Menu Fix Starting...');
    
    let menuOpen = false;
    let mobileMenuElement = null;
    let overlayElement = null;
    
    function createMobileMenu() {
        // Remove any existing mobile menu
        const existing = document.getElementById('emergency-mobile-menu');
        if (existing) {
            existing.remove();
        }
        
        // Create overlay
        overlayElement = document.createElement('div');
        overlayElement.id = 'emergency-overlay';
        overlayElement.style.cssText = `
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
        `;
        
        // Create mobile menu
        mobileMenuElement = document.createElement('div');
        mobileMenuElement.id = 'emergency-mobile-menu';
        mobileMenuElement.style.cssText = `
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
            z-index: 9999;
            transition: right 0.3s ease;
            padding: 20px;
            box-shadow: -5px 0 20px rgba(0,0,0,0.3);
            overflow-y: auto;
        `;
        
        // Menu content
        mobileMenuElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 40px; width: auto;">
                <button id="emergency-close" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    padding: 5px 10px;
                    line-height: 1;
                ">×</button>
            </div>
            <nav>
                <a href="#artwork" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">Artwork</a>
                <a href="#featured-in" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">Featured In</a>
                <a href="#education" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">Education</a>
                <a href="#collaborate" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">Collaborate</a>
                <a href="#about" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">About</a>
                <a href="#contact" style="
                    display: block;
                    color: white;
                    text-decoration: none;
                    padding: 15px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                    font-size: 18px;
                    font-weight: 500;
                ">Contact</a>
            </nav>
        `;
        
        // Add to page
        document.body.appendChild(overlayElement);
        document.body.appendChild(mobileMenuElement);
        
        console.log('📱 Mobile menu elements created successfully');
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Close button
        const closeBtn = document.getElementById('emergency-close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                console.log('❌ Close button clicked');
                closeMenu();
            };
        }
        
        // Overlay click
        if (overlayElement) {
            overlayElement.onclick = function() {
                console.log('⬜ Overlay clicked');
                closeMenu();
            };
        }
        
        // Nav links
        const navLinks = mobileMenuElement.querySelectorAll('a');
        navLinks.forEach(link => {
            link.onclick = function() {
                console.log('🔗 Nav link clicked:', link.textContent);
                closeMenu();
            };
        });
        
        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOpen) {
                console.log('⌨️ Escape key pressed');
                closeMenu();
            }
        });
        
        console.log('🎧 Event listeners set up successfully');
    }
    
    function openMenu() {
        if (mobileMenuElement && overlayElement) {
            console.log('📂 Opening mobile menu...');
            
            mobileMenuElement.style.right = '0';
            overlayElement.style.opacity = '1';
            overlayElement.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
            menuOpen = true;
            
            console.log('✅ Mobile menu OPENED successfully!');
        } else {
            console.error('❌ Menu elements not found for opening');
        }
    }
    
    function closeMenu() {
        if (mobileMenuElement && overlayElement) {
            console.log('📁 Closing mobile menu...');
            
            mobileMenuElement.style.right = '-100%';
            overlayElement.style.opacity = '0';
            overlayElement.style.visibility = 'hidden';
            document.body.style.overflow = '';
            menuOpen = false;
            
            console.log('✅ Mobile menu CLOSED successfully!');
        } else {
            console.error('❌ Menu elements not found for closing');
        }
    }
    
    function toggleMenu() {
        console.log('🔄 Toggle menu called, current state:', menuOpen);
        
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function attachToToggleButton() {
        const toggleBtn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        
        if (toggleBtn) {
            console.log('🔘 Found toggle button, attaching handler...');
            
            // Remove any existing handlers
            toggleBtn.onclick = null;
            
            // Add our handler
            toggleBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔘 Toggle button clicked!');
                toggleMenu();
            };
            
            console.log('✅ Toggle button handler attached successfully!');
        } else {
            console.error('❌ Toggle button not found!');
        }
    }
    
    function initialize() {
        console.log('🚀 Initializing emergency mobile menu...');
        createMobileMenu();
        attachToToggleButton();
        console.log('🎉 Emergency mobile menu initialization complete!');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also initialize after short delays to ensure it works
    setTimeout(initialize, 100);
    setTimeout(initialize, 500);
    
    // Make functions globally available for debugging
    window.emergencyMenuToggle = toggleMenu;
    window.emergencyMenuOpen = openMenu;
    window.emergencyMenuClose = closeMenu;
    
})();
