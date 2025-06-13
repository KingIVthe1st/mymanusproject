/**
 * MUTATION OBSERVER MOBILE MENU FIX - December 13, 2025
 * Uses MutationObserver to ensure our handler stays attached
 */

(function() {
    'use strict';
    
    console.log('🔬 MUTATION OBSERVER Fix Starting...');
    
    let menuFixed = false;
    
    function ensureMenuWorks() {
        const btn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const menu = document.querySelector('.mobile-menu');
        
        if (!btn || !menu || menuFixed) return;
        
        console.log('🎯 Applying MUTATION fix...');
        
        // Our toggle function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            console.log('🌟 MUTATION handler fired!');
            
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                btn.classList.add('active');
            } else {
                menu.classList.add('hidden');
                btn.classList.remove('active');
            }
        }
        
        // Force our handler
        btn.onclick = toggleMenu;
        
        // Watch for changes to the button
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // If onclick was removed or changed
                if (mutation.type === 'attributes' && mutation.attributeName === 'onclick') {
                    console.log('⚠️ Button onclick was modified! Reattaching...');
                    btn.onclick = toggleMenu;
                }
            });
        });
        
        // Start observing
        observer.observe(btn, {
            attributes: true,
            attributeFilter: ['onclick', 'class']
        });
        
        // Also watch the parent in case button gets replaced
        const parentObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach(function(node) {
                        if (node === btn || node.contains(btn)) {
                            console.log('🚨 Button was removed! Reattaching to new button...');
                            menuFixed = false;
                            setTimeout(ensureMenuWorks, 100);
                        }
                    });
                }
            });
        });
        
        if (btn.parentNode) {
            parentObserver.observe(btn.parentNode, {
                childList: true,
                subtree: true
            });
        }
        
        menuFixed = true;
        console.log('✅ MUTATION fix applied with observer protection!');
    }
    
    // Try multiple times
    ensureMenuWorks();
    setTimeout(ensureMenuWorks, 100);
    setTimeout(ensureMenuWorks, 500);
    setTimeout(ensureMenuWorks, 1000);
    setTimeout(ensureMenuWorks, 2000);
    
    // Also on DOM ready and load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureMenuWorks);
    }
    window.addEventListener('load', ensureMenuWorks);
    
})();
