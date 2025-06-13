/**
 * PERSISTENT MOBILE MENU FIX - December 13, 2025
 * This fix handles all scenarios: first load, refresh, cached loads
 */

(function() {
    'use strict';
    
    console.log('🛡️ PERSISTENT Mobile Menu Fix Loading...');
    
    let attempts = 0;
    const maxAttempts = 20;
    
    function attachMenuHandler() {
        attempts++;
        console.log(`🔄 Attempt ${attempts} to fix mobile menu...`);
        
        const btn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        
        if (!btn || !menu) {
            console.log('⏳ Elements not ready yet...');
            if (attempts < maxAttempts) {
                setTimeout(attachMenuHandler, 500);
            }
            return;
        }
        
        // Check if we already attached our handler
        if (btn.dataset.persistentFixed === 'true') {
            console.log('✅ Handler already attached');
            return;
        }
        
        console.log('🎯 Found elements, attaching PERSISTENT handler...');
        
        // Remove ALL existing event listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Mark that we've fixed this button
        newBtn.dataset.persistentFixed = 'true';
        
        // Our handler function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            console.log('🚀 PERSISTENT HANDLER FIRED!');
            
            const isHidden = menu.classList.contains('hidden');
            
            if (isHidden) {
                console.log('📂 Opening menu...');
                menu.classList.remove('hidden');
                menu.style.display = 'flex';
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                newBtn.classList.add('active');
                document.body.classList.add('menu-open');
            } else {
                console.log('📁 Closing menu...');
                menu.classList.add('hidden');
                menu.style.display = '';
                menu.style.opacity = '';
                menu.style.visibility = '';
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            return false;
        }
        
        // Attach multiple event types to ensure it works
        newBtn.addEventListener('click', toggleMenu, true);
        newBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });
        
        // Also use onclick as a fallback
        newBtn.onclick = toggleMenu;
        
        // Handle close button
        const closeBtn = document.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                menu.classList.add('hidden');
                menu.style.display = '';
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                return false;
            };
        }
        
        // Handle menu links
        const links = document.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            link.onclick = function() {
                menu.classList.add('hidden');
                menu.style.display = '';
                newBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            };
        });
        
        console.log('💪 PERSISTENT fix successfully applied!');
        
        // Keep checking periodically in case something overwrites our handler
        setTimeout(function() {
            if (newBtn.dataset.persistentFixed === 'true') {
                console.log('🔒 Handler still intact');
            } else {
                console.log('⚠️ Handler was overwritten, reapplying...');
                attachMenuHandler();
            }
        }, 5000);
    }
    
    // Start fixing immediately
    attachMenuHandler();
    
    // Also try when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachMenuHandler);
    }
    
    // Also try after window load
    window.addEventListener('load', function() {
        setTimeout(attachMenuHandler, 100);
    });
    
    // Nuclear option: check every second for 10 seconds
    let checkInterval = setInterval(function() {
        const btn = document.getElementById('mobile-toggle-btn');
        if (btn && btn.dataset.persistentFixed !== 'true') {
            console.log('🚨 Button lost handler, reattaching...');
            attachMenuHandler();
        }
    }, 1000);
    
    // Stop checking after 10 seconds
    setTimeout(function() {
        clearInterval(checkInterval);
        console.log('🛑 Stopped periodic checks');
    }, 10000);
    
})();
