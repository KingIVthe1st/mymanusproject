/**
 * MOBILE MENU WORKING FIX - December 2025
 * Directly manipulates styles to ensure menu opens
 */

function initMobileMenu() {
    console.log('🚀 Mobile Menu Working Fix - Initializing...');
    
    const toggleBtn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-close-btn');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!toggleBtn || !mobileMenu) {
        console.error('❌ Required elements not found, retrying...');
        setTimeout(initMobileMenu, 100);
        return;
    }
    
    console.log('✅ Elements found!');
    
    // Function to open menu
    function openMenu() {
        console.log('📂 Opening menu...');
        mobileMenu.classList.remove('hidden');
        // Force the styles directly to override CSS
        mobileMenu.style.display = 'flex';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.pointerEvents = 'auto';
        toggleBtn.classList.add('active');
        document.body.classList.add('menu-open');
    }
    
    // Function to close menu
    function closeMenu() {
        console.log('📁 Closing menu...');
        mobileMenu.classList.add('hidden');
        // Force the styles directly
        mobileMenu.style.display = 'none';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.pointerEvents = 'none';
        toggleBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Clear any existing event listeners
    const newToggleBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
    
    // Add click listener to toggle button
    newToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if menu is currently visible
        const isHidden = mobileMenu.classList.contains('hidden') || 
                        mobileMenu.style.display === 'none' || 
                        mobileMenu.style.opacity === '0';
        
        if (isHidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });
    
    // Add close button listener
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
    }
    
    // Close on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!mobileMenu.classList.contains('hidden') && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.navbar-mobile-toggle')) {
            closeMenu();
        }
    });
    
    // Ensure menu is closed on init
    closeMenu();
    
    console.log('✅ Mobile Menu Working Fix - Ready!');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Also try after a delay as backup
setTimeout(initMobileMenu, 1000);
