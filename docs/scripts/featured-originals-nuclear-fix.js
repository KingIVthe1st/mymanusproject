// Featured Originals Mobile Fix - Nuclear JavaScript Option
// Force visibility when CSS fails
document.addEventListener('DOMContentLoaded', function() {
    forceMobileVisibility();
    
    // Also run after a delay to catch any late-loading styles
    setTimeout(forceMobileVisibility, 1000);
    setTimeout(forceMobileVisibility, 2000);
    
    // Run on resize
    window.addEventListener('resize', forceMobileVisibility);
});

function forceMobileVisibility() {
    // Only apply on mobile
    if (window.innerWidth > 768) return;
    
    console.log('Forcing Featured Originals visibility on mobile...');
    
    // Get all artwork cards
    const artworkSection = document.querySelector('#artwork');
    if (!artworkSection) return;
    
    // Force section visibility
    artworkSection.style.setProperty('opacity', '1', 'important');
    artworkSection.style.setProperty('visibility', 'visible', 'important');
    
    // Get all cards
    const allCards = artworkSection.querySelectorAll('.artwork-card, .artwork-item, [class*="artwork"]');
    allCards.forEach((card, index) => {
        // Force visibility on everything
        card.style.setProperty('opacity', '1', 'important');
        card.style.setProperty('visibility', 'visible', 'important');
        card.style.setProperty('filter', 'none', 'important');
        card.style.setProperty('transform', 'none', 'important');
        
        // Special attention to last two cards
        if (index >= allCards.length - 2) {
            console.log(`Fixing card ${index + 1} of ${allCards.length}`);
            
            // Force all children to be visible too
            const allChildren = card.querySelectorAll('*');
            allChildren.forEach(child => {
                child.style.setProperty('opacity', '1', 'important');
                child.style.setProperty('visibility', 'visible', 'important');
                child.style.setProperty('filter', 'none', 'important');
            });
        }
    });
    
    // Fix all images in the section
    const allImages = artworkSection.querySelectorAll('img, picture');
    allImages.forEach(img => {
        img.style.setProperty('opacity', '1', 'important');
        img.style.setProperty('visibility', 'visible', 'important');
        img.style.setProperty('filter', 'none', 'important');
    });
    
    // Fix all buttons and links
    const allButtons = artworkSection.querySelectorAll('a, button');
    allButtons.forEach(btn => {
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('visibility', 'visible', 'important');
    });
    
    // Fix CTA button specifically
    const ctaButton = document.querySelector('.text-center a[href*="shop.amirarahim.com"]');
    if (ctaButton) {
        ctaButton.style.setProperty('opacity', '1', 'important');
        ctaButton.style.setProperty('visibility', 'visible', 'important');
        console.log('Fixed CTA button');
    }
    
    // Remove any animation classes that might cause issues
    const animatedElements = artworkSection.querySelectorAll('[class*="fade"], [class*="animate"]');
    animatedElements.forEach(el => {
        // Remove animation classes
        el.className = el.className.replace(/fade\S*/g, '').replace(/animate\S*/g, '');
    });
    
    console.log('Featured Originals mobile visibility fix applied');
}

// Also create a mutation observer to catch any dynamic changes
const observer = new MutationObserver(function(mutations) {
    if (window.innerWidth <= 768) {
        forceMobileVisibility();
    }
});

// Start observing once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const artworkSection = document.querySelector('#artwork');
    if (artworkSection) {
        observer.observe(artworkSection, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
});
