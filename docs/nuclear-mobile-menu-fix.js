/**
 * NUCLEAR MOBILE MENU FIX - December 13, 2025
 * This will make the menu work no matter what
 */

(function() {
    'use strict';
    
    console.log('☢️ NUCLEAR MOBILE MENU FIX ACTIVATED');
    
    // Kill all other scripts
    window.toggleMobileMenu = null;
    window.openSimpleMenu = null;
    window.closeSimpleMenu = null;
    window.toggleMenu = null;
    
    function nuclearInit() {
        console.log('🔧 Nuclear init starting...');
        
        // Get elements
        const btn = document.querySelector('#mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.mobile-close-btn');
        
        if (!btn || !menu) {
            console.error('❌ Required elements missing');
            setTimeout(nuclearInit, 500); // Try again
            return;
        }
        
        console.log('✅ Elements found!');
        
        // Clear ALL event listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Set initial state
        menu.classList.add('hidden');
        newBtn.classList.remove('active');
        
        // THE ONLY CLICK HANDLER
        newBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔘 BUTTON CLICKED!');
            
            if (menu.classList.contains('hidden')) {
                // OPEN
                console.log('➡️ OPENING MENU');
                menu.classList.remove('hidden');
                newBtn.classList.add('active');
                document.body.classList.add('menu-open');
            } else {
                // CLOSE
                console.log('⬅️ CLOSING MENU');
                menu.classList.add('hidden');
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            return false;
        };
        
        // Close button
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                menu.classList.add('hidden');
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                return false;
            };
        }
        
        // Close on nav link click
        const links = menu.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            link.onclick = function() {
                menu.classList.add('hidden');
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            };
        });
        
        console.log('💪 NUCLEAR FIX COMPLETE!');
    }
    
    // Try multiple times to ensure it works
    nuclearInit();
    setTimeout(nuclearInit, 100);
    setTimeout(nuclearInit, 500);
    setTimeout(nuclearInit, 1000);
    
})();
