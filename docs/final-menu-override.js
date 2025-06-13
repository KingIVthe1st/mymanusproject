console.log('🚀 FMO: Script loaded. Attempting immediate button check...');
let immediateButton = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
if (immediateButton) {
    console.log('✅ FMO: Button FOUND on immediate check!', immediateButton);
} else {
    console.warn('⚠️ FMO: Button NOT FOUND on immediate check.');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FMO: DOMContentLoaded event fired.');
    let domContentLoadedButton = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
    if (domContentLoadedButton) {
        console.log('✅ FMO: Button FOUND on DOMContentLoaded!', domContentLoadedButton);
    } else {
        console.warn('⚠️ FMO: Button NOT FOUND on DOMContentLoaded.');
    }

    setTimeout(() => {
        console.log('🚀 FMO: setTimeout (10ms) fired. Attempting final button check.');
        console.log('🚀 FINAL MENU OVERRIDE: Initializing...');

        // --- Stage 1: Aggressively Neutralize Old/Conflicting Menus & Toggles ---
        const selectorsToRemoveOrHide = [
            '.mobile-menu', // Common class for old menus
            '.mobile-nav',  // Common class for old navs
            '#mobile-menu-toggle', // Old checkbox toggle
            '#mobile-menu-toggle-checkbox', // Another old checkbox
            '[class*="old-menu-class"]', // Placeholder for any other specific old classes
            // Add any other selectors for menus with blue/black backgrounds if identifiable
        ];

        selectorsToRemoveOrHide.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (el.id !== 'nuclear-mobile-menu' && el.id !== 'nuclear-menu-overlay' && !el.closest('#nuclear-mobile-menu')) {
                    console.log(`🚀 FINAL MENU OVERRIDE: Hiding conflicting element: ${selector}`, el);
                    el.style.display = 'none !important';
                    el.style.visibility = 'hidden !important';
                    el.style.opacity = '0 !important';
                    el.style.pointerEvents = 'none !important';
                    el.style.position = 'absolute !important';
                    el.style.left = '-9999px !important'; // Move off-screen
                    // Consider removing from DOM if hiding isn't enough: el.remove();
                }
            });
        });
        
        // Attempt to remove specific problematic script files by their src attribute
        // This is aggressive and might not always work due to timing or browser security.
        const conflictingScriptSources = [
            'mobile-menu-fix.js',
            'force-link-click.js',
            'iframe-menu-controller.js',
            'menu-replacement.js',
            'definitive-menu-fix.js',
            'direct-toggle-fix.js',
            'master-menu-controller.js' // Also disable the previous master controller
        ];

        document.querySelectorAll('script').forEach(script => {
            conflictingScriptSources.forEach(srcSubstring => {
                if (script.src && script.src.includes(srcSubstring)) {
                    console.log(`🚀 FINAL MENU OVERRIDE: Attempting to neutralize script: ${script.src}`);
                    script.type = 'text/plain'; // Change type to prevent execution
                    // script.remove(); // More aggressive: remove the script tag
                }
            });
        });

        // --- Stage 2: Override Global Functions Used by Other Scripts ---
        console.log('🚀 FINAL MENU OVERRIDE: Overriding potentially conflicting global functions.');
        const functionsToOverride = ['toggleMenu', 'openMenu', 'closeMenu', 'toggleMobileMenu', 'initMobileMenu', 'setupMobileMenuListeners'];
        functionsToOverride.forEach(funcName => {
            window[funcName] = function(...args) {
                console.log(`🚀 FINAL MENU OVERRIDE: Intercepted call to ${funcName}`, args);
                // Optionally, call our own menu toggle if it makes sense
                // if (funcName.toLowerCase().includes('toggle') || funcName.toLowerCase().includes('open')) {
                //     ensureAndToggleNuclearMenu(true); // Assuming this function exists and is defined below
                // }
                return false; // Prevent default behavior
            };
        });

        // --- Stage 3: Ensure the Correct (Nuclear) Menu Exists and is Styled ---
        let nuclearMenu = document.getElementById('nuclear-mobile-menu');
        let menuOverlay = document.getElementById('nuclear-menu-overlay');
        const mobileToggleBtn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');

        function createOrVerifyNuclearMenu() {
            console.log('🚀 FINAL MENU OVERRIDE: Verifying/Creating Nuclear Menu...');
            if (!menuOverlay) {
                menuOverlay = document.createElement('div');
                menuOverlay.id = 'nuclear-menu-overlay';
                Object.assign(menuOverlay.style, {
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', zIndex: '10000', opacity: '0',
                    visibility: 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease', backdropFilter: 'blur(5px)'
                });
                document.body.appendChild(menuOverlay);
                console.log('🚀 FINAL MENU OVERRIDE: Created nuclear-menu-overlay.');
            }

            if (!nuclearMenu) {
                nuclearMenu = document.createElement('div');
                nuclearMenu.id = 'nuclear-mobile-menu';
                Object.assign(nuclearMenu.style, {
                    position: 'fixed', top: '0', right: '0', width: '80%', maxWidth: '320px', height: '100%',
                    background: 'linear-gradient(135deg, #9747FF 0%, #E8508D 100%)',
                    zIndex: '10001', transform: 'translateX(100%)', transition: 'transform 0.3s ease-out',
                    padding: '20px', overflowY: 'auto', boxShadow: '-5px 0 25px rgba(0,0,0,0.3)',
                    borderLeft: '1px solid rgba(255,255,255,0.1)'
                });
                // Simplified content for brevity, expand as needed
                nuclearMenu.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.2);">
                        <img src="images/logo/amira-logo.webp" alt="Amira Rahim" style="height: 35px; filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));">
                        <button id="final-menu-close-btn" style="background:transparent; border:none; color:white; font-size:28px; cursor:pointer; padding:5px;"><i class="fas fa-times"></i></button>
                    </div>
                    <nav id="final-menu-nav" style="display:flex; flex-direction:column; gap:12px;">
                        <!-- Links will be dynamically added or use a template -->
                    </nav>
                `;
                document.body.appendChild(nuclearMenu);
                console.log('🚀 FINAL MENU OVERRIDE: Created nuclear-mobile-menu.');
                populateFinalMenuLinks();
            } else {
                 // Ensure it has the correct base styles if it exists
                nuclearMenu.style.background = 'linear-gradient(135deg, #9747FF 0%, #E8508D 100%)';
                nuclearMenu.style.zIndex = '10001'; 
            }
            
            // Ensure gradient animation style exists
            if (!document.getElementById('nuclear-gradient-animation-style')) {
                const gradientAnimStyle = document.createElement('style');
                gradientAnimStyle.id = 'nuclear-gradient-animation-style';
                gradientAnimStyle.textContent = `
                    @keyframes final-gradient-shift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    #nuclear-mobile-menu {
                        background-size: 200% 200%;
                        animation: final-gradient-shift 7s ease infinite;
                    }
                    .final-menu-link {
                        color: white; text-decoration: none; font-size: 17px; padding: 10px 15px; border-radius: 8px;
                        transition: background-color 0.2s ease, transform 0.2s ease; display: flex; align-items: center; gap: 12px;
                        background: rgba(255,255,255,0.1); backdrop-filter: blur(3px); 
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        opacity: 0; transform: translateX(20px);
                    }
                    .final-menu-link:hover {
                        background: rgba(255,255,255,0.2);
                        transform: translateX(5px);
                    }
                `;
                document.head.appendChild(gradientAnimStyle);
            }
        }

        function populateFinalMenuLinks() {
            const nav = document.getElementById('final-menu-nav');
            if (!nav) return;
            const links = [
                { href: '#artwork', text: 'Artwork', icon: 'fas fa-palette' },
                { href: '#featured-in', text: 'Featured In', icon: 'fas fa-star' },
                { href: '#education', text: 'Education', icon: 'fas fa-graduation-cap' },
                { href: '#collaborate', text: 'Collaborate', icon: 'fas fa-handshake' },
                { href: '#about', text: 'About', icon: 'fas fa-user' },
                { href: '#contact', text: 'Contact', icon: 'fas fa-envelope' }
            ];
            nav.innerHTML = links.map(link => 
                `<a href="${link.href}" class="final-menu-link"><i class="${link.icon}" style="width:20px;"></i><span>${link.text}</span></a>`
            ).join('');
        }

        createOrVerifyNuclearMenu(); // Call it to ensure menu exists

        // --- Stage 4: Exclusive Toggle Control ---
        function finalToggleMenu(forceOpen) {
            console.log('🚀 FMO finalToggleMenu: Called. forceOpen:', forceOpen, 'Menu element:', nuclearMenu);
            const isOpen = nuclearMenu.classList.contains('active');
            const openAction = forceOpen !== undefined ? forceOpen : !isOpen;

            if (openAction) {
                console.log('🚀 FINAL MENU OVERRIDE: Opening menu.');
                document.body.style.overflow = 'hidden';
                menuOverlay.style.visibility = 'visible';
                menuOverlay.style.opacity = '1';
                nuclearMenu.style.transform = 'translateX(0)';
                nuclearMenu.classList.add('active');
                // Animate links
                document.querySelectorAll('.final-menu-link').forEach((link, index) => {
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateX(0)';
                        link.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    }, 50 + index * 70);
                });
            } else {
                console.log('🚀 FINAL MENU OVERRIDE: Closing menu.');
                document.body.style.overflow = '';
                menuOverlay.style.opacity = '0';
                nuclearMenu.style.transform = 'translateX(100%)';
                nuclearMenu.classList.remove('active');
                document.querySelectorAll('.final-menu-link').forEach(link => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateX(20px)';
                });
                setTimeout(() => { menuOverlay.style.visibility = 'hidden'; }, 300);
            }
        // [finalToggleMenu function ends here]

        if (!mobileToggleBtn) {
            console.error('[ERROR] Mobile menu button not found! (Final Attempt)');
            // Enhanced debugging: Log potential candidates if primary selectors fail
            let allPotentialButtons = document.querySelectorAll('button, [class*="toggle"], [id*="toggle"], [class*="menu-button"], [id*="menu-button"]');
            console.warn('⚠️ FMO: Listing all potential toggle-like elements found on page:', allPotentialButtons);
            if (document.getElementById('mobile-toggle-btn')) {
                 console.log('🔍 FMO DEBUG: getElementById("mobile-toggle-btn") actually found it NOW within setTimeout.');
            }
            if (document.querySelector('.navbar-mobile-toggle')) {
                 console.log('🔍 FMO DEBUG: querySelector(".navbar-mobile-toggle") actually found it NOW within setTimeout.');
        console.log('✅ FMO: Mobile toggle button found successfully (Final Attempt):', mobileToggleBtn);
        const newToggleBtn = mobileToggleBtn.cloneNode(true);
        if (mobileToggleBtn.parentNode) {
            mobileToggleBtn.parentNode.replaceChild(newToggleBtn, mobileToggleBtn);
            console.log('🚀 FINAL MENU OVERRIDE: Replaced original toggle with a clone.');
        } else {
            console.error('🚀 FINAL MENU OVERRIDE: Original mobileToggleBtn has no parentNode. Cannot replace.');
        }

        newToggleBtn.addEventListener('click', function(event) {
            console.log('🚀 FMO newToggleBtn click listener: Event fired. Event object:', event); // DETAILED LOG
            event.preventDefault();
            event.stopPropagation();
            console.log('🚀 FINAL MENU OVERRIDE: New toggle clicked! Calling finalToggleMenu.'); // DETAILED LOG
            finalToggleMenu();
        }, true); // Use capture
        newToggleBtn.style.pointerEvents = 'auto';
        newToggleBtn.style.zIndex = '10002';

        const finalCloseBtn = document.getElementById('final-menu-close-btn');
        if (finalCloseBtn) {
            finalCloseBtn.addEventListener('click', function(event) {
                console.log('🚀 FMO finalCloseBtn click listener: Event fired. Event object:', event); // DETAILED LOG
                event.preventDefault();
                event.stopPropagation();
                console.log('🚀 FINAL MENU OVERRIDE: Final menu close button clicked! Calling finalToggleMenu(false).'); // DETAILED LOG
                finalToggleMenu(false);
            });
        } else {
            console.warn('⚠️ FMO: Final menu close button (final-menu-close-btn) not found.');
        }

        const menuOverlay = document.getElementById('nuclear-menu-overlay');
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function(event) {
                console.log('🚀 FMO menuOverlay click listener: Event fired. Event object:', event); // DETAILED LOG
                // Ensure click is on overlay itself, not a child (like the menu content)
                if (event.target === menuOverlay) {
                    console.log('🚀 FINAL MENU OVERRIDE: Overlay clicked! Calling finalToggleMenu(false).'); // DETAILED LOG
                    finalToggleMenu(false);
                }
            });
        } else {
            console.warn('⚠️ FMO: Final menu overlay (nuclear-menu-overlay) not found.');
        }

        // Add Escape key listener to close menu
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && nuclearMenu && nuclearMenu.classList.contains('active')) {
                console.log('🚀 FMO Escape keydown listener: Event fired. Event object:', event); // DETAILED LOG
                console.log('🚀 FINAL MENU OVERRIDE: Escape key pressed! Calling finalToggleMenu(false).'); // DETAILED LOG
                finalToggleMenu(false);
            }
        });

        // Add click listeners to menu links to close menu on navigation
        const finalMenuLinks = document.querySelectorAll('.final-menu-link');
        finalMenuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    console.log('🚀 FMO finalMenuLinks click listener: Event fired. Link clicked:', targetId, 'Event object:', event); // DETAILED LOG
                    event.preventDefault();
                    finalToggleMenu(false); // Close menu
                    setTimeout(() => {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            console.log('🚀 FMO menu link click: Scrolling to:', targetId);
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            console.warn('🚀 FMO menu link click: Target element not found for ID:', targetId);
                        }
                    }, 350); // Wait for menu to close
                }
            });
        });

        // Ensure menu starts closed
        console.log('🚀 FMO: Ensuring menu starts closed by calling finalToggleMenu(false).');
        finalToggleMenu(false);
        // Small delay then force hide again in case something tries to open it immediately
        setTimeout(() => {
                if (nuclearMenu && !nuclearMenu.classList.contains('active')) {
                    console.log('🚀 FMO: Post-init check, menu is closed. Ensuring styles are set for hidden.');
                    nuclearMenu.style.transform = 'translateX(100%)';
                    if (menuOverlay) {
                        menuOverlay.style.opacity = '0';
                        menuOverlay.style.visibility = 'hidden';
                    }
                }
            }, 200);

            console.log('🚀 FINAL MENU OVERRIDE: Setup complete.');

        } else {
            console.error('🚀 FINAL MENU OVERRIDE: Could not find the main mobile toggle button (mobileToggleBtn is null)!');
        }
    }, 10); // End of setTimeout
}); // End of DOMContentLoaded listener
