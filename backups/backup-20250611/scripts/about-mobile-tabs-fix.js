// About Section Mobile Visibility Fix - June 9, 2025
// Forces tabs to be visible on mobile devices

document.addEventListener('DOMContentLoaded', function() {
    // Function to fix mobile tabs visibility
    function fixMobileAboutTabs() {
        const isMobile = window.innerWidth <= 767;
        
        if (isMobile) {
            console.log('Applying mobile about tabs fix...');
            
            // Get the about section
            const aboutSection = document.getElementById('about');
            if (!aboutSection) {
                console.error('About section not found');
                return;
            }
            
            // Get the content area (second child of about-grid)
            const aboutGrid = document.getElementById('about-grid');
            if (!aboutGrid) {
                console.error('About grid not found');
                return;
            }
            
            // Make sure grid is visible
            aboutGrid.style.cssText = 'display: flex !important; flex-direction: column !important; visibility: visible !important; opacity: 1 !important; gap: 2rem !important;';
            
            // Get all children of about-grid
            const gridChildren = aboutGrid.children;
            console.log(`Found ${gridChildren.length} children in about-grid`);
            
            // Make all children visible
            for (let i = 0; i < gridChildren.length; i++) {
                const child = gridChildren[i];
                child.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; position: relative !important;';
                
                // If this is the content area (second child)
                if (i === 1) {
                    console.log('Processing content area with tabs...');
                    
                    // Find the cards grid inside - be more specific
                    const cardsGrid = child.querySelector('.grid.grid-cols-1');
                    if (cardsGrid) {
                        console.log('Found cards grid:', cardsGrid.className);
                        cardsGrid.style.cssText = 'display: grid !important; grid-template-columns: 1fr !important; gap: 1rem !important; visibility: visible !important; opacity: 1 !important; min-height: auto !important;';
                        
                        // Get only the 4 card divs (not all children)
                        const cardDivs = cardsGrid.querySelectorAll('div.relative.group[class*="bg-gradient-to-br"]');
                        console.log(`Found ${cardDivs.length} actual cards`);
                        
                        // Make each card visible
                        cardDivs.forEach((card, index) => {
                            console.log(`Card ${index + 1} classes:`, card.className);
                            card.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; padding: 1.5rem !important; margin-bottom: 1rem !important; position: relative !important; width: 100% !important; min-height: auto !important;';
                            card.style.transform = 'none';
                            card.style.transition = 'none';
                            
                            // Make sure the content inside is visible too
                            const flexContent = card.querySelector('.flex.items-start');
                            if (flexContent) {
                                flexContent.style.display = 'flex !important';
                                flexContent.style.visibility = 'visible !important';
                            }
                        });
                        
                        // Debug: let's see what ALL children are
                        console.log('All grid children:', Array.from(cardsGrid.children).map(c => c.tagName + ' ' + c.className));
                    } else {
                        console.warn('Cards grid not found - trying alternative selector');
                        // Try alternative selector
                        const altGrid = child.querySelector('[class*="grid"]');
                        if (altGrid) {
                            console.log('Found alternative grid:', altGrid.className);
                        }
                    }
                    
                    // Make sure Shop Art button is visible
                    const shopButton = child.querySelector('a[href*="shop.amirarahim.com"]');
                    if (shopButton && shopButton.parentElement) {
                        shopButton.parentElement.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; margin-top: 2rem !important;';
                        shopButton.style.cssText = 'display: block !important; width: 100% !important;';
                    }
                }
            }
            
            // Force remove any hidden classes
            const hiddenElements = aboutSection.querySelectorAll('.hidden, .lg\\:hidden, .md\\:hidden, .invisible, .opacity-0');
            hiddenElements.forEach(el => {
                el.classList.remove('hidden', 'lg:hidden', 'md:hidden', 'invisible', 'opacity-0');
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
            
            console.log('Mobile About tabs fix applied successfully');
        }
    }
    
    // Apply fix on load
    fixMobileAboutTabs();
    
    // Apply fix on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixMobileAboutTabs, 250);
    });
    
    // Force fix after a delay to ensure all CSS is loaded
    setTimeout(fixMobileAboutTabs, 1000);
    
    // Additional fix after 2 seconds for stubborn cases
    setTimeout(fixMobileAboutTabs, 2000);
});