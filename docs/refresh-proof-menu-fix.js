/**
 * REFRESH-PROOF MOBILE MENU FIX - December 13, 2025
 * The ultimate solution that works on refresh every time
 */

(function() {
    'use strict';
    
    console.log('🔄 REFRESH-PROOF Menu Fix Loading...');
    
    // Store original functions to prevent other scripts from working
    window.__originalFunctions = window.__originalFunctions || {};
    
    // Disable all other mobile menu functions
    const functionsToDisable = [
        'toggleMobileMenu', 'openSimpleMenu', 'closeSimpleMenu', 
        'toggleSimpleMenu', 'toggleMenu', 'openMenu', 'closeMenu'
    ];
    
    functionsToDisable.forEach(fname => {
        if (window[fname] && !window.__originalFunctions[fname]) {
            window.__originalFunctions[fname] = window[fname];
            window[fname] = function() {
                console.log(`🚫 Blocked call to ${fname}`);
            };
        }
    });
    
    // Our simple, reliable menu toggle
    window.__refreshProofToggle = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const menu = document.querySelector('.mobile-menu');
        const btn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        
        if (!menu || !btn) {
            console.error('Menu elements not found');
            return false;
        }
        
        console.log('✨ REFRESH-PROOF toggle fired!');
        
        const isHidden = menu.classList.contains('hidden');
        
        if (isHidden) {
            menu.classList.remove('hidden');
            btn.classList.add('active');
            // Force styles
            menu.style.cssText = 'display: flex !important; opacity: 1 !important; visibility: visible !important;';
        } else {
            menu.classList.add('hidden');
            btn.classList.remove('active');
            // Clear forced styles
            menu.style.cssText = '';
        }
        
        return false;
    };
    
    // Function to attach our handler
    function attachRefreshProofHandler() {
        const btn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        
        if (!btn) {
            setTimeout(attachRefreshProofHandler, 100);
            return;
        }
        
        // Remove all event listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Use only onclick for maximum reliability
        newBtn.onclick = window.__refreshProofToggle;
        
        // Also handle close button
        const closeBtn = document.querySelector('.mobile-close-btn');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                const menu = document.querySelector('.mobile-menu');
                if (menu) {
                    menu.classList.add('hidden');
                    menu.style.cssText = '';
                    newBtn.classList.remove('active');
                }
                return false;
            };
        }
        
        console.log('💎 REFRESH-PROOF handler attached!');
    }
    
    // Attach immediately and repeatedly
    for (let i = 0; i < 10; i++) {
        setTimeout(attachRefreshProofHandler, i * 300);
    }
    
    // Also attach on various events
    document.addEventListener('DOMContentLoaded', attachRefreshProofHandler);
    window.addEventListener('load', attachRefreshProofHandler);
    
    // Override addEventListener to prevent interference
    const originalAdd = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (this.id === 'mobile-toggle-btn' && type === 'click' && listener !== window.__refreshProofToggle) {
            console.log('🛡️ Blocked non-refresh-proof handler');
            return;
        }
        return originalAdd.call(this, type, listener, options);
    };
    
    console.log('🎯 REFRESH-PROOF system active!');
    
})();
