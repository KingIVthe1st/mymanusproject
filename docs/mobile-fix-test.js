/**
 * MOBILE FIX TEST - December 2025
 * Test script to verify mobile fixes are working
 */

// Test scroll functionality
function testScroll() {
    console.log('🔍 Testing scroll functionality...');
    
    const body = document.body;
    const html = document.documentElement;
    
    console.log('Body overflow:', window.getComputedStyle(body).overflow);
    console.log('Body position:', window.getComputedStyle(body).position);
    console.log('Body has menu-open class:', body.classList.contains('menu-open'));
    console.log('HTML overflow:', window.getComputedStyle(html).overflow);
    
    // Try to scroll
    window.scrollTo(0, 100);
    setTimeout(() => {
        if (window.scrollY > 0) {
            console.log('✅ Scrolling is working! Current scroll position:', window.scrollY);
        } else {
            console.log('❌ Scrolling is blocked. Current scroll position:', window.scrollY);
        }
    }, 100);
}

// Test mobile menu
function testMobileMenu() {
    console.log('🔍 Testing mobile menu...');
    
    const toggleBtn = document.querySelector('.navbar-mobile-toggle') || document.getElementById('mobile-toggle-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!toggleBtn) {
        console.log('❌ Toggle button not found');
        return;
    }
    
    if (!mobileMenu) {
        console.log('❌ Mobile menu not found');
        return;
    }
    
    console.log('✅ Mobile menu elements found');
    console.log('Toggle button display:', window.getComputedStyle(toggleBtn).display);
    console.log('Mobile menu display:', window.getComputedStyle(mobileMenu).display);
    console.log('Mobile menu has hidden class:', mobileMenu.classList.contains('hidden'));
    
    // Test click event
    console.log('📱 Simulating toggle button click...');
    toggleBtn.click();
    
    setTimeout(() => {
        if (!mobileMenu.classList.contains('hidden') || window.getComputedStyle(mobileMenu).display !== 'none') {
            console.log('✅ Mobile menu opened successfully!');
            
            // Test closing
            setTimeout(() => {
                toggleBtn.click();
                setTimeout(() => {
                    if (mobileMenu.classList.contains('hidden') || window.getComputedStyle(mobileMenu).display === 'none') {
                        console.log('✅ Mobile menu closed successfully!');
                    } else {
                        console.log('⚠️ Mobile menu did not close properly');
                    }
                }, 500);
            }, 1000);
        } else {
            console.log('❌ Mobile menu did not open');
        }
    }, 500);
}

// Run tests when page loads
window.addEventListener('load', function() {
    console.log('🚀 Running Mobile Fix Tests...');
    console.log('User Agent:', navigator.userAgent);
    console.log('Window size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Touch device:', 'ontouchstart' in window);
    
    console.log('\n--- Scroll Test ---');
    testScroll();
    
    console.log('\n--- Mobile Menu Test ---');
    setTimeout(testMobileMenu, 1000);
});

// Also log any errors
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', e.message, e.filename, e.lineno);
});