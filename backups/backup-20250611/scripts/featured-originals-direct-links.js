// Featured Originals Direct Links Fix
// This script ensures Featured Originals artwork links go directly to shop instead of opening gallery modal

(function() {
    console.log('Featured Originals Direct Links: Initializing...');
    
    function setupDirectShopLinks() {
        // Target the Featured Originals section specifically
        const featuredSection = document.querySelector('#artwork');
        if (!featuredSection) {
            console.log('Featured Originals section not found');
            return;
        }
        
        // Find all artwork cards in the Featured Originals section
        const artworkCards = featuredSection.querySelectorAll('.artwork-card');
        
        artworkCards.forEach((card, index) => {
            const image = card.querySelector('img');
            const overlay = card.querySelector('.artwork-overlay');
            const button = card.querySelector('.artwork-button');
            
            if (image && button) {
                // Remove any existing click handlers that might open gallery
                image.style.cursor = 'pointer';
                
                // Add direct shop link to image click
                image.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Get the shop URL from the button
                    const shopUrl = button.href || 'https://shop.amirarahim.com/collections/available-originals-1';
                    
                    // Open in new tab
                    window.open(shopUrl, '_blank');
                    
                    console.log('Featured Originals: Opening shop link:', shopUrl);
                });
                
                // Also make the entire overlay clickable to shop
                if (overlay) {
                    overlay.style.cursor = 'pointer';
                    overlay.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const shopUrl = button.href || 'https://shop.amirarahim.com/collections/available-originals-1';
                        window.open(shopUrl, '_blank');
                        
                        console.log('Featured Originals: Opening shop link from overlay:', shopUrl);
                    });
                }
                
                // Ensure button has target="_blank"
                if (button) {
                    button.target = '_blank';
                    button.addEventListener('click', function(e) {
                        e.stopPropagation();
                        console.log('Featured Originals: Button clicked for shop link:', this.href);
                    });
                }
            }
        });
        
        console.log(`Featured Originals Direct Links: Set up ${artworkCards.length} artwork cards for direct shop access`);
    }
    
    // Disable gallery functionality for Featured Originals
    function disableGalleryForFeaturedOriginals() {
        // Override the gallery initialization to exclude Featured Originals
        if (window.gallery && window.gallery.artworks) {
            // Filter out Featured Originals from gallery artworks
            const featuredSection = document.querySelector('#artwork');
            if (featuredSection) {
                const featuredCards = featuredSection.querySelectorAll('.artwork-card');
                
                // Remove Featured Originals cards from gallery artworks array
                window.gallery.artworks = window.gallery.artworks.filter(artwork => {
                    return !Array.from(featuredCards).includes(artwork.element);
                });
                
                console.log('Featured Originals: Disabled gallery for Featured Originals section');
            }
        }
    }
    
    // Wait for DOM and gallery to be ready
    function initialize() {
        setupDirectShopLinks();
        
        // Wait a bit for gallery to initialize, then disable it for Featured Originals
        setTimeout(() => {
            disableGalleryForFeaturedOriginals();
        }, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also run after a short delay to ensure everything is loaded
    setTimeout(initialize, 2000);
    
})();
