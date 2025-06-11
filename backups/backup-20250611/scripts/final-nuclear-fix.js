// Final Nuclear Fix - Run this after everything else
(function() {
    'use strict';
    
    function finalFix() {
        if (window.innerWidth > 768) return;
        
        console.log('[FINAL FIX] Running nuclear option...');
        
        // Get the 5th and 6th artwork items
        const fifthItem = document.querySelector('#artwork .grid > div:nth-child(5)');
        const sixthItem = document.querySelector('#artwork .grid > div:nth-child(6)');
        const viewAllBtn = document.querySelector('.view-all-originals-btn');
        
        // Nuclear fix for 5th item (Bloom)
        if (fifthItem) {
            fifthItem.style.cssText = `
                position: relative !important;
                z-index: 99999 !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                background: white !important;
                display: block !important;
                visibility: visible !important;
                transform: none !important;
                filter: none !important;
                isolation: isolate !important;
            `;
            
            // Fix all children
            fifthItem.querySelectorAll('*').forEach(child => {
                child.style.opacity = '1';
                child.style.pointerEvents = 'auto';
            });
        }
        
        // Nuclear fix for 6th item (Radiance)
        if (sixthItem) {
            sixthItem.style.cssText = `
                position: relative !important;
                z-index: 99999 !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                background: white !important;
                display: block !important;
                visibility: visible !important;
                transform: none !important;
                filter: none !important;
                isolation: isolate !important;
            `;
            
            // Fix all children
            sixthItem.querySelectorAll('*').forEach(child => {
                child.style.opacity = '1';
                child.style.pointerEvents = 'auto';
            });
        }
        
        // Nuclear fix for View All button
        if (viewAllBtn) {
            viewAllBtn.style.cssText = `
                position: relative !important;
                z-index: 999999 !important;
                pointer-events: auto !important;
                opacity: 1 !important;
                display: inline-flex !important;
                cursor: pointer !important;
                visibility: visible !important;
                transform: none !important;
                filter: none !important;
                touch-action: manipulation !important;
            `;
            
            // Make sure parent is also fixed
            if (viewAllBtn.parentElement) {
                viewAllBtn.parentElement.style.cssText = `
                    position: relative !important;
                    z-index: 99998 !important;
                    pointer-events: auto !important;
                `;
            }
        }
        
        // Remove ALL decorative elements that could block
        document.querySelectorAll('.section-divider, .bg-shape, .decorative-circle, .particle').forEach(el => {
            el.style.display = 'none';
        });
        
        console.log('[FINAL FIX] Complete!');
    }
    
    // Run after everything else
    setTimeout(finalFix, 3000);
    setTimeout(finalFix, 5000);
    
    // Run on interaction
    document.addEventListener('touchstart', finalFix, { once: true });
})();