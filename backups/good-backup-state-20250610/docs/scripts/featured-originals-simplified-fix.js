// Featured Originals Mobile Fix - Simplified JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile
    if (window.innerWidth > 768) return;
    
    console.log('Applying simplified Featured Originals mobile fix...');
    
    // Fix artwork overlays to be visible on mobile
    const artworkOverlays = document.querySelectorAll('#artwork .artwork-overlay');
    artworkOverlays.forEach((overlay, index) => {
        overlay.style.transform = 'translateY(0)';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        console.log(`Fixed overlay ${index + 1}`);
    });
    
    // Ensure all artwork cards are visible
    const artworkCards = document.querySelectorAll('#artwork .artwork-card');
    artworkCards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.filter = 'none';
        console.log(`Fixed card ${index + 1}`);
    });
    
    // Fix the View All Originals button
    const viewAllBtn = document.querySelector('.view-all-originals-btn');
    if (viewAllBtn) {
        viewAllBtn.style.opacity = '1';
        viewAllBtn.style.visibility = 'visible';
        viewAllBtn.style.filter = 'none';
        viewAllBtn.style.pointerEvents = 'auto';
        console.log('Fixed View All Originals button');
    }
    
    // Remove any blocking elements
    const blockingElements = document.querySelectorAll('#artwork .absolute.inset-0:not(.artwork-overlay)');
    blockingElements.forEach(el => {
        if (!el.querySelector('img')) {
            el.style.display = 'none';
            console.log('Removed blocking element');
        }
    });
    
    console.log('Simplified Featured Originals mobile fix complete');
});

// Also run on orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        if (window.innerWidth <= 768) {
            location.reload();
        }
    }, 100);
});