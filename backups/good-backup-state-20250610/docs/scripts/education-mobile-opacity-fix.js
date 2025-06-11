// Mobile Education Section Opacity Fix
document.addEventListener('DOMContentLoaded', function() {
    // Function to fix mobile opacity issues
    function fixMobileEducationOpacity() {
        // Only apply on mobile devices
        if (window.innerWidth <= 768) {
            // Get all education cards
            const educationCards = document.querySelectorAll('#education .education-card, #education .group');
            
            educationCards.forEach(card => {
                // Force opacity and visibility
                card.style.setProperty('opacity', '1', 'important');
                card.style.setProperty('visibility', 'visible', 'important');
                card.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
                
                // Fix all text elements within the card
                const textElements = card.querySelectorAll('h3, p, span, .text-gray-600, .text-gray-800');
                textElements.forEach(el => {
                    el.style.setProperty('opacity', '1', 'important');
                    el.style.setProperty('color', '#111827', 'important');
                });
                
                // Fix CTA buttons
                const buttons = card.querySelectorAll('a.inline-flex, button');
                buttons.forEach(btn => {
                    btn.style.setProperty('opacity', '1', 'important');
                    btn.style.setProperty('visibility', 'visible', 'important');
                    btn.style.setProperty('background', 'linear-gradient(135deg, #7c3aed, #ec4899)', 'important');
                    btn.style.setProperty('color', 'white', 'important');
                    
                    // Fix button text and icons
                    const btnContent = btn.querySelectorAll('span, i');
                    btnContent.forEach(el => {
                        el.style.setProperty('color', 'white', 'important');
                        el.style.setProperty('opacity', '1', 'important');
                    });
                });
            });
            
            console.log('Mobile education opacity fix applied');
        }
    }
    
    // Apply fix on load
    fixMobileEducationOpacity();
    
    // Re-apply on resize if needed
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixMobileEducationOpacity, 250);
    });
    
    // Apply fix after a short delay to ensure all CSS is loaded
    setTimeout(fixMobileEducationOpacity, 1000);
});
