// Remove gradient overlays on mobile for Featured Originals
document.addEventListener('DOMContentLoaded', function() {
    removeGradientOverlays();
    
    // Run again after delay to catch dynamic content
    setTimeout(removeGradientOverlays, 1000);
    
    // Run on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            removeGradientOverlays();
        }
    });
});

function removeGradientOverlays() {
    if (window.innerWidth > 768) return;
    
    console.log('Removing gradient overlays from Featured Originals...');
    
    // Find all gradient overlays in the artwork section
    const gradientOverlays = document.querySelectorAll('#artwork .bg-gradient-to-t, #artwork .bg-gradient-to-b, #artwork [class*="from-black"], #artwork .absolute.inset-0');
    
    gradientOverlays.forEach(overlay => {
        // Check if it's actually a gradient overlay (not content)
        if (overlay.classList.contains('from-black') || 
            overlay.classList.contains('bg-gradient-to-t') || 
            overlay.classList.contains('bg-gradient-to-b') ||
            (overlay.classList.contains('absolute') && overlay.classList.contains('inset-0') && !overlay.querySelector('img'))) {
            
            // Remove the overlay
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
            console.log('Removed gradient overlay:', overlay.className);
        }
    });
    
    // Fix the text containers to have solid backgrounds
    const textContainers = document.querySelectorAll('#artwork .absolute.bottom-0, #artwork .p-6');
    textContainers.forEach(container => {
        container.style.background = 'rgba(255, 255, 255, 0.95)';
        container.style.backdropFilter = 'blur(10px)';
        container.style.padding = '1.5rem';
        
        // Fix text colors
        const texts = container.querySelectorAll('h3, p, a');
        texts.forEach(text => {
            if (!text.href || !text.href.includes('shop.amirarahim.com')) {
                text.style.color = '#1f2937'; // Dark gray
            }
        });
    });
    
    // Fix View Details buttons
    const viewDetailsButtons = document.querySelectorAll('#artwork a[href*="shop.amirarahim.com"]');
    viewDetailsButtons.forEach(btn => {
        if (btn.textContent.includes('View Details')) {
            btn.style.background = '#7c3aed';
            btn.style.color = 'white';
            btn.style.padding = '0.75rem 2rem';
            btn.style.borderRadius = '9999px';
            btn.style.display = 'inline-block';
            btn.style.fontWeight = '600';
            btn.style.opacity = '1';
        }
    });
    
    console.log('Gradient overlay removal complete');
}