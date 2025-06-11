// Ultimate JavaScript Fix for Featured Originals Mobile Layering Issue
// This ensures the CSS fixes are applied and enforced

(function() {
    'use strict';
    
    // Only run on mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Fix function to ensure all elements are visible and clickable
    function fixFeaturedOriginals() {
        if (!isMobile()) return;
        
        console.log('[Featured Originals Fix] Running mobile fixes...');
        
        // Get all artwork cards
        const artworkCards = document.querySelectorAll('#artwork .artwork-card');
        
        artworkCards.forEach((card, index) => {
            // Remove glass effects
            card.style.background = 'white';
            card.style.backdropFilter = 'none';
            card.style.webkitBackdropFilter = 'none';
            card.style.opacity = '1';
            card.style.filter = 'none';
            card.style.webkitFilter = 'none';
            
            // Fix images
            const images = card.querySelectorAll('img, picture');
            images.forEach(img => {
                img.style.opacity = '1';
                img.style.filter = 'none';
                img.style.webkitFilter = 'none';
            });
            
            // Fix overlay
            const overlay = card.querySelector('.artwork-overlay');
            if (overlay) {
                // Make overlay not block clicks
                overlay.style.pointerEvents = 'none';
                
                // But make buttons clickable
                const buttons = overlay.querySelectorAll('a, button');
                buttons.forEach(btn => {
                    btn.style.pointerEvents = 'auto';
                    btn.style.opacity = '1';
                    btn.style.visibility = 'visible';
                });
            }
            
            console.log(`[Featured Originals Fix] Fixed card ${index + 1}`);
        });
        
        // Fix View All Originals button
        const viewAllButtons = document.querySelectorAll('.view-all-originals-btn, #artwork a[href*="shop.amirarahim.com/collections/available-originals-1"]');
        viewAllButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
            btn.style.filter = 'none';
            btn.style.pointerEvents = 'auto';
            btn.style.position = 'relative';
            btn.style.zIndex = '10';
            console.log('[Featured Originals Fix] Fixed View All Originals button');
        });
        
        // Remove any pseudo-elements that might be blocking
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                #artwork *::before,
                #artwork *::after {
                    pointer-events: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('[Featured Originals Fix] Fixes complete!');
    }
    
    // Run fixes on multiple events to ensure they stick
    document.addEventListener('DOMContentLoaded', fixFeaturedOriginals);
    window.addEventListener('load', fixFeaturedOriginals);
    
    // Run again after a delay to catch any dynamic content
    setTimeout(fixFeaturedOriginals, 1000);
    setTimeout(fixFeaturedOriginals, 2000);
    
    // Run on resize in case user rotates device
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fixFeaturedOriginals, 250);
    });
    
    // Monitor for dynamic changes
    const observer = new MutationObserver(function(mutations) {
        if (isMobile()) {
            fixFeaturedOriginals();
        }
    });
    
    // Start observing when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const artworkSection = document.getElementById('artwork');
        if (artworkSection) {
            observer.observe(artworkSection, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
    });
})();