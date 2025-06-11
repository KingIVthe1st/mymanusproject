// Direct fix for the mobile toggle button with ID "mobile-toggle-btn"
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DIRECT TOGGLE FIX INITIALIZING ===');
    
    // Wait a moment to ensure DOM is ready
    setTimeout(function() {
        // Get the specific toggle button by ID
        const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
        
        if (mobileToggleBtn) {
            console.log('Found mobile toggle button by ID:', mobileToggleBtn);
            
            // Remove any existing click handlers
            const newToggle = mobileToggleBtn.cloneNode(true);
            mobileToggleBtn.parentNode.replaceChild(newToggle, mobileToggleBtn);
            
            // Add direct click handler that will trigger the menu
            newToggle.addEventListener('click', function(e) {
                console.log('Mobile toggle button clicked directly');
                e.preventDefault();
                e.stopPropagation();
                
                // Find menu references from nuclear-menu-fix.js
                const nuclearMenu = document.getElementById('nuclear-mobile-menu');
                const menuOverlay = document.getElementById('nuclear-menu-overlay');
                
                if (nuclearMenu && menuOverlay) {
                    // Toggle menu directly
                    const isOpen = nuclearMenu.classList.contains('active');
                    
                    if (!isOpen) {
                        // Open menu
                        document.body.style.overflow = 'hidden';
                        menuOverlay.style.visibility = 'visible';
                        menuOverlay.style.opacity = '1';
                        nuclearMenu.style.transform = 'translateX(0)';
                        nuclearMenu.classList.add('active');
                        
                        // Animate menu items
                        const menuLinks = document.querySelectorAll('.nuclear-menu-link');
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
                        const menuLinks = document.querySelectorAll('.nuclear-menu-link');
                        menuLinks.forEach(link => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateX(20px)';
                        });
                        
                        setTimeout(() => {
                            menuOverlay.style.visibility = 'hidden';
                        }, 300);
                    }
                } else {
                    console.error('Nuclear menu elements not found, trying alternative approach');
                    
                    // Try direct toggle as backup
                    const classicMenu = document.querySelector('.mobile-menu');
                    if (classicMenu) {
                        if (classicMenu.classList.contains('active')) {
                            classicMenu.classList.remove('active');
                            classicMenu.style.transform = 'translateX(100%)';
                            classicMenu.style.opacity = '0';
                            document.body.classList.remove('menu-open');
                        } else {
                            classicMenu.style.display = 'block';
                            classicMenu.style.transform = 'translateX(0)';
                            classicMenu.style.opacity = '1';
                            classicMenu.classList.add('active');
                            document.body.classList.add('menu-open');
                        }
                    }
                }
                
                return false;
            }, true); // Use capturing to ensure the click is handled
            
            // Add visual feedback for the button
            newToggle.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            newToggle.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
            
            // Make absolutely sure it's clickable
            newToggle.style.cursor = 'pointer !important';
            newToggle.style.pointerEvents = 'auto !important';
            newToggle.style.zIndex = '999999 !important';
            newToggle.style.position = 'relative !important';
            
            console.log('Direct toggle fix applied successfully');
        } else {
            console.error('Could not find mobile toggle button by ID "mobile-toggle-btn"');
            
            // Fallback to find by class
            const toggleBtns = document.querySelectorAll('.navbar-mobile-toggle, .mobile-toggle, [aria-label="Menu"], .hamburger');
            console.log('Found toggle buttons by class:', toggleBtns.length);
            
            toggleBtns.forEach((btn, index) => {
                console.log(`Applying fix to toggle button ${index}:`, btn);
                
                // Clone and replace to remove existing handlers
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                // Same click handler as above
                newBtn.addEventListener('click', function(e) {
                    console.log(`Fallback toggle button ${index} clicked`);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // The same logic as above
                    const nuclearMenu = document.getElementById('nuclear-mobile-menu');
                    const menuOverlay = document.getElementById('nuclear-menu-overlay');
                    
                    if (nuclearMenu && menuOverlay) {
                        const isOpen = nuclearMenu.classList.contains('active');
                        
                        if (!isOpen) {
                            document.body.style.overflow = 'hidden';
                            menuOverlay.style.visibility = 'visible';
                            menuOverlay.style.opacity = '1';
                            nuclearMenu.style.transform = 'translateX(0)';
                            nuclearMenu.classList.add('active');
                            
                            const menuLinks = document.querySelectorAll('.nuclear-menu-link');
                            menuLinks.forEach((link, i) => {
                                setTimeout(() => {
                                    link.style.opacity = '1';
                                    link.style.transform = 'translateX(0)';
                                    link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                }, i * 100);
                            });
                        } else {
                            document.body.style.overflow = '';
                            menuOverlay.style.opacity = '0';
                            nuclearMenu.style.transform = 'translateX(100%)';
                            nuclearMenu.classList.remove('active');
                            
                            const menuLinks = document.querySelectorAll('.nuclear-menu-link');
                            menuLinks.forEach(link => {
                                link.style.opacity = '0';
                                link.style.transform = 'translateX(20px)';
                            });
                            
                            setTimeout(() => {
                                menuOverlay.style.visibility = 'hidden';
                            }, 300);
                        }
                    } else {
                        // Try direct toggle as backup
                        const classicMenu = document.querySelector('.mobile-menu');
                        if (classicMenu) {
                            if (classicMenu.classList.contains('active')) {
                                classicMenu.classList.remove('active');
                                classicMenu.style.transform = 'translateX(100%)';
                                classicMenu.style.opacity = '0';
                                document.body.classList.remove('menu-open');
                            } else {
                                classicMenu.style.display = 'block';
                                classicMenu.style.transform = 'translateX(0)';
                                classicMenu.style.opacity = '1';
                                classicMenu.classList.add('active');
                                document.body.classList.add('menu-open');
                            }
                        }
                    }
                    
                    return false;
                }, true); // Use capturing
                
                // Same visual feedback and styles as above
                newBtn.style.cursor = 'pointer !important';
                newBtn.style.pointerEvents = 'auto !important';
                newBtn.style.zIndex = '999999 !important';
                newBtn.style.position = 'relative !important';
            });
        }
    }, 800); // Wait longer to ensure all other scripts have loaded
});
