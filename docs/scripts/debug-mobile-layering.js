// Debug and Fix Mobile Layering Issues
(function() {
    'use strict';
    
    function debugAndFixLayering() {
        if (window.innerWidth > 768) return;
        
        console.log('[Layering Debug] Starting diagnostic...');
        
        // Find the problem elements
        const radiance = document.querySelector('#artwork .grid > div:nth-child(6)');
        const viewAllBtn = document.querySelector('.view-all-originals-btn');
        
        if (radiance) {
            // Check what might be blocking it
            const rect = radiance.getBoundingClientRect();
            const elementsAtPoint = document.elementsFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
            
            console.log('[Layering Debug] Elements above Radiance card:', elementsAtPoint);
            
            // Find blocking elements
            elementsAtPoint.forEach((el, index) => {
                if (el !== radiance && !radiance.contains(el)) {
                    console.log(`[Layering Debug] Potential blocker ${index}:`, el.tagName, el.className);
                    
                    // Fix blocking elements
                    if (!el.querySelector('.artwork-card') && !el.closest('#artwork')) {
                        el.style.pointerEvents = 'none';
                        el.style.zIndex = '-1';
                        console.log('[Layering Debug] Disabled blocking element:', el);
                    }
                }
            });
            
            // Force fix the radiance card
            radiance.style.cssText = `
                position: relative !important;
                z-index: 9999 !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                isolation: isolate !important;
                transform: translateZ(0) !important;
            `;
        }
        
        if (viewAllBtn) {
            // Check what's blocking the button
            const btnRect = viewAllBtn.getBoundingClientRect();
            const elementsAtBtn = document.elementsFromPoint(btnRect.left + btnRect.width/2, btnRect.top + btnRect.height/2);
            
            console.log('[Layering Debug] Elements above View All button:', elementsAtBtn);
            
            // Fix the button
            viewAllBtn.style.cssText = `
                position: relative !important;
                z-index: 99999 !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                display: inline-flex !important;
                isolation: isolate !important;
                transform: translateZ(0) !important;
            `;
            
            // Fix its container
            const container = viewAllBtn.parentElement;
            if (container) {
                container.style.cssText = `
                    position: relative !important;
                    z-index: 9998 !important;
                    pointer-events: auto !important;
                    isolation: isolate !important;
                `;
            }
        }
        
        // Find and disable all potential blocking overlays
        const potentialBlockers = document.querySelectorAll('.bg-shape, .decorative-circle, .living-gradient-bg, .particle, .paint-drop');
        potentialBlockers.forEach(blocker => {
            blocker.style.pointerEvents = 'none';
            blocker.style.zIndex = '-1';
        });
        
        console.log('[Layering Debug] Fix complete!');
    }
    
    // Run the fix multiple times
    document.addEventListener('DOMContentLoaded', debugAndFixLayering);
    window.addEventListener('load', debugAndFixLayering);
    setTimeout(debugAndFixLayering, 1000);
    setTimeout(debugAndFixLayering, 2000);
    
    // Add click event listener to debug
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            console.log('[Click Debug] Clicked element:', e.target);
            console.log('[Click Debug] Click coordinates:', e.clientX, e.clientY);
        }
    });
})();