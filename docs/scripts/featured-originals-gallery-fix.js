// Disable gallery modal for Featured Originals section and ensure direct shop links
document.addEventListener('DOMContentLoaded', function() {
    // Check if gallery.js has loaded and prevent it from affecting Featured Originals
    const featuredOriginalsSection = document.querySelector('#artwork');
    
    if (featuredOriginalsSection) {
        console.log('Fixing Featured Originals gallery behavior...');
        
        // Override any existing gallery functionality for Featured Originals
        const artworkCards = featuredOriginalsSection.querySelectorAll('.artwork-card');
        
        artworkCards.forEach(card => {
            // Remove any data attributes that might trigger gallery
            card.removeAttribute('data-gallery');
            card.removeAttribute('data-image');
            
            const img = card.querySelector('.artwork-image img');
            const button = card.querySelector('.artwork-button');
            const overlay = card.querySelector('.artwork-overlay');
            
            if (img) {
                // Remove gallery-related attributes
                img.removeAttribute('data-gallery');
                img.removeAttribute('data-image');
                img.removeAttribute('data-lightbox');
                
                // Ensure direct link behavior
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (button && button.href) {
                        window.open(button.href, '_blank');
                    }
                });
                
                img.style.cursor = 'pointer';
            }
            
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    if (!e.target.closest('.artwork-button')) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        if (button && button.href) {
                            window.open(button.href, '_blank');
                        }
                    }
                });
                
                overlay.style.cursor = 'pointer';
            }
            
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (this.href) {
                        window.open(this.href, '_blank');
                    }
                });
            }
        });
        
        console.log('Featured Originals gallery fix applied successfully!');
    }
});
