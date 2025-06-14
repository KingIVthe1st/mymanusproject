/**
 * SINGLE SIMPLE MOBILE MENU FIX - December 13, 2025
 * One script to rule them all - removes all complexity
 */

// Wait for page to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenu);
} else {
    setupMobileMenu();
}

function setupMobileMenu() {
    console.log('🎯 SIMPLE MOBILE MENU - Setting up...');
    
    // Get elements
    const btn = document.getElementById('mobile-toggle-btn') || document.querySelector('.navbar-mobile-toggle');
    const menu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-close-btn');
    const links = document.querySelectorAll('.mobile-nav-link');
    
    if (!btn || !menu) {
        console.error('❌ Mobile menu elements not found');
        // Try again in a bit
        setTimeout(setupMobileMenu, 500);
        return;
    }
    
    console.log('✅ Elements found!');
    
    // Simple toggle function
    function toggleMenu() {
        console.log('🔄 Toggle clicked!');
        
        if (menu.classList.contains('hidden')) {
            // Open
            menu.classList.remove('hidden');
            btn.classList.add('active');
            console.log('📂 Menu opened');
        } else {
            // Close
            menu.classList.add('hidden');
            btn.classList.remove('active');
            console.log('📁 Menu closed');
        }
    }
    
    // Remove all existing listeners
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    // Add single click listener
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            menu.classList.add('hidden');
            newBtn.classList.remove('active');
        });
    }
    
    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.add('hidden');
            newBtn.classList.remove('active');
        });
    });
    
    console.log('✅ SIMPLE MOBILE MENU ready!');
}

// Also set it up after a delay to be sure
setTimeout(setupMobileMenu, 1000);
