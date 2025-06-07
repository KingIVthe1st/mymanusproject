// Featured In Icons Fix - Ensure Font Awesome icons display properly
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Featured In Icons Fix: Starting icon verification...');
    
    // Wait for Font Awesome to load
    setTimeout(function() {
        // Target the Featured In section specifically
        const featuredInSection = document.getElementById('featured-in');
        if (!featuredInSection) {
            console.warn('Featured In section not found');
            return;
        }
        
        // Define the correct icons for each card
        const iconConfig = [
            { 
                cardIndex: 0, 
                iconClass: 'fa-newspaper', 
                unicode: '\uf1ea',
                description: 'Publications - Newspaper Icon',
                bgColor: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            },
            { 
                cardIndex: 1, 
                iconClass: 'fa-microphone', 
                unicode: '\uf130',
                description: 'Podcasts - Microphone Icon',
                bgColor: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
            },
            { 
                cardIndex: 2, 
                iconClass: 'fa-trophy', 
                unicode: '\uf091',
                description: 'Achievements - Trophy Icon',
                bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            }
        ];
        
        // Get all featured item cards
        const featuredItems = featuredInSection.querySelectorAll('.featured-item');
        console.log(`Found ${featuredItems.length} featured items`);
        
        iconConfig.forEach((config, index) => {
            if (index < featuredItems.length) {
                const card = featuredItems[index];
                const iconContainer = card.querySelector('.inline-block');
                const iconElement = card.querySelector('.fas');
                
                if (iconContainer && iconElement) {
                    // Ensure proper classes are set
                    iconElement.className = `fas ${config.iconClass} fa-2x`;
                    
                    // Force the icon to display
                    iconElement.style.cssText = `
                        font-family: "Font Awesome 6 Free" !important;
                        font-weight: 900 !important;
                        display: inline-block !important;
                        font-style: normal !important;
                        font-variant: normal !important;
                        text-rendering: auto !important;
                        -webkit-font-smoothing: antialiased !important;
                        font-size: 2rem !important;
                        color: white !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        z-index: 10 !important;
                        position: relative !important;
                    `;
                    
                    // Set the icon container background
                    iconContainer.style.cssText = `
                        display: inline-flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        width: 64px !important;
                        height: 64px !important;
                        border-radius: 50% !important;
                        margin-bottom: 1.5rem !important;
                        background: ${config.bgColor} !important;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
                        position: relative !important;
                        overflow: visible !important;
                    `;
                    
                    console.log(`✅ ${config.description} - Successfully applied`);
                } else {
                    console.warn(`⚠️ Icon container or element not found for card ${index}`);
                }
            }
        });
        
        // Backup method: If Font Awesome fails to load, create fallback icons
        setTimeout(function() {
            iconConfig.forEach((config, index) => {
                if (index < featuredItems.length) {
                    const card = featuredItems[index];
                    const iconElement = card.querySelector('.fas');
                    
                    if (iconElement && (!iconElement.innerHTML || iconElement.innerHTML.trim() === '')) {
                        // Create a fallback icon using Unicode
                        iconElement.innerHTML = config.unicode;
                        console.log(`🔄 Fallback icon applied for ${config.description}`);
                    }
                }
            });
        }, 2000);
        
        console.log('🎨 Featured In Icons Fix: Icon verification completed');
        
    }, 1000); // Wait 1 second for Font Awesome to load
});

// Additional check for late-loading Font Awesome
window.addEventListener('load', function() {
    setTimeout(function() {
        // Re-run the icon fix after everything is loaded
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    }, 500);
});
