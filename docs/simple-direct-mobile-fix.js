/**
 * SIMPLE DIRECT MOBILE MENU FIX - December 13, 2025
 * Direct solution that bypasses all conflicts
 */

(function() {
    'use strict';
    
    console.log('🎯 SIMPLE DIRECT FIX - Starting...');
    
    // Wait for DOM
    function init() {
        const toggleBtn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeBtn = document.querySelector('.mobile-close-btn');
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        
        if (!toggleBtn || !mobileMenu) {
            console.error('Required elements not found');
            return;
        }
        
        console.log('✅ Elements found, setting up...');
        
        // Remove any existing onclick handlers
        toggleBtn.onclick = null;
        
        // Direct toggle function
        function toggleMenu() {
            console.log('🔄 Toggle clicked!');
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.cssText = 'display: flex !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important;';
                toggleBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('📂 Menu opened');
            } else {
                // Close menu
                mobileMenu.classList.add('hidden');
                mobileMenu.style.cssText = '';
                toggleBtn.classList.remove('active');
                document.body.style.overflow = '';
                console.log('📁 Menu closed');
            }
        }
        
        // Attach direct click handler
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.add('hidden');
                mobileMenu.style.cssText = '';
                toggleBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.cssText = '';
                toggleBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.cssText = '';
                toggleBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        console.log('✅ Simple direct fix installed!');
    }
    
    // Initialize when ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
