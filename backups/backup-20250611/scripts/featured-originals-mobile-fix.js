// Featured Originals Mobile Opacity Fix
document.addEventListener('DOMContentLoaded', function() {
    function fixFeaturedOriginalsMobile() {
        if (window.innerWidth <= 768) {
            // Get the artwork section
            const artworkSection = document.querySelector('#artwork');
            if (!artworkSection) return;
            
            // Fix all artwork cards
            const artworkCards = artworkSection.querySelectorAll('.artwork-card');
            artworkCards.forEach(card => {
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('visibility', 'visible', 'important');
                
                // Fix images within cards
                const images = card.querySelectorAll('img');
                images.forEach(img => {
                    img.style.setProperty('opacity', '1', 'important');
                    img.style.setProperty('filter', 'none', 'important');
                });
            });
            
            // Get all grid items
            const gridItems = artworkSection.querySelectorAll('.grid > div');
            
            // Fix the last two items (bottom row on mobile)
            if (gridItems.length >= 2) {
                const lastTwo = [gridItems[gridItems.length - 1], gridItems[gridItems.length - 2]];
                lastTwo.forEach(item => {
                    item.style.setProperty('opacity', '1', 'important');
                    
                    // Fix all children
                    const allElements = item.querySelectorAll('*');
                    allElements.forEach(el => {
                        el.style.setProperty('opacity', '1', 'important');
                        el.style.setProperty('filter', 'none', 'important');
                    });
                });
            }
            
            // Fix View All Originals button
            const viewAllButtons = document.querySelectorAll('a[href*="shop.amirarahim.com/collections/available-originals-1"]');
            viewAllButtons.forEach(btn => {
                if (btn.textContent.includes('View All Originals')) {
                    btn.style.setProperty('opacity', '1', 'important');
                    btn.style.setProperty('background', 'linear-gradient(135deg, #7c3aed, #ec4899)', 'important');
                    btn.style.setProperty('color', 'white', 'important');
                }
            });
            
            console.log('Featured Originals mobile opacity fix applied');
        }
    }
    
    // Apply fix on load
    fixFeaturedOriginalsMobile();
    
    // Re-apply on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixFeaturedOriginalsMobile, 250);
    });
    
    // Apply after delay to catch any late-loading elements
    setTimeout(fixFeaturedOriginalsMobile, 1000);
    setTimeout(fixFeaturedOriginalsMobile, 2000);
});
