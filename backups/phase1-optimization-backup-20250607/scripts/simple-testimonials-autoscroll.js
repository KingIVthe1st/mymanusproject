/**
 * Simple 3-Second Testimonials Auto-Scroll
 * Automatically scrolls through testimonials every 3 seconds
 */

(function() {
    let autoScrollInterval;
    let isUserInteracting = false;
    let interactionTimer;
    
    // Configuration
    const SCROLL_INTERVAL = 3000; // 3 seconds
    const PAUSE_DURATION = 8000; // 8 seconds pause after user interaction
    
    function initTestimonialsAutoScroll() {
        console.log('🎨 Initializing 3-second testimonials auto-scroll...');
        
        // Wait for Senja widget to load
        const maxAttempts = 20;
        let attempts = 0;
        
        function checkForSenjaWidget() {
            attempts++;
            console.log(`🔍 Checking for Senja widget (attempt ${attempts}/${maxAttempts})`);
            
            const senjaEmbed = document.querySelector('.senja-embed');
            const senjaContainer = document.querySelector('[data-id="6a3e2a3d-0648-4ec0-bbeb-8dbca588b22a"]');
            
            if (senjaEmbed || senjaContainer) {
                console.log('✅ Senja widget found! Setting up auto-scroll...');
                setTimeout(() => setupAutoScroll(senjaEmbed || senjaContainer), 2000);
                return;
            }
            
            if (attempts < maxAttempts) {
                setTimeout(checkForSenjaWidget, 1000);
            } else {
                console.warn('⚠️ Could not find Senja widget after maximum attempts');
                setupFallbackAutoScroll();
            }
        }
        
        checkForSenjaWidget();
    }
    
    function setupAutoScroll(container) {
        console.log('🚀 Setting up auto-scroll for container:', container);
        
        // Find scrollable elements
        const scrollableElement = findScrollableElement(container);
        
        if (scrollableElement) {
            console.log('📜 Found scrollable element:', scrollableElement);
            startAutoScroll(scrollableElement);
            setupInteractionHandlers(scrollableElement);
        } else {
            // Try iframe approach
            const iframe = container.querySelector('iframe');
            if (iframe) {
                console.log('🖼️ Found iframe, setting up iframe auto-scroll');
                setupIframeAutoScroll(iframe, container);
            } else {
                console.log('🔄 Using CSS animation fallback');
                setupCSSAnimationFallback(container);
            }
        }
    }
    
    function findScrollableElement(container) {
        // Check the container itself first
        if (isScrollable(container)) {
            return container;
        }
        
        // Look for common testimonial container classes
        const selectors = [
            '[class*="testimonial"]',
            '[class*="carousel"]',
            '[class*="slider"]',
            '[class*="scroll"]',
            '[data-testid*="testimonial"]',
            '.senja-grid',
            '.senja-carousel'
        ];
        
        for (const selector of selectors) {
            const elements = container.querySelectorAll(selector);
            for (const element of elements) {
                if (isScrollable(element)) {
                    return element;
                }
            }
        }
        
        // Check all children
        const allElements = container.querySelectorAll('*');
        for (const element of allElements) {
            if (isScrollable(element)) {
                return element;
            }
        }
        
        return null;
    }
    
    function isScrollable(element) {
        const style = window.getComputedStyle(element);
        const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;
        const overflowX = style.overflowX;
        const overflowY = style.overflowY;
        
        return (hasHorizontalScroll && (overflowX === 'auto' || overflowX === 'scroll')) ||
               (hasVerticalScroll && (overflowY === 'auto' || overflowY === 'scroll'));
    }
    
    function startAutoScroll(element) {
        console.log('▶️ Starting auto-scroll every 3 seconds');
        
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        
        autoScrollInterval = setInterval(() => {
            if (isUserInteracting) {
                console.log('⏸️ User is interacting, pausing auto-scroll');
                return;
            }
            
            performScroll(element);
        }, SCROLL_INTERVAL);
    }
    
    function performScroll(element) {
        const isHorizontal = element.scrollWidth > element.clientWidth;
        
        if (isHorizontal) {
            // Horizontal scrolling
            const currentScroll = element.scrollLeft;
            const maxScroll = element.scrollWidth - element.clientWidth;
            const scrollAmount = Math.min(element.clientWidth * 0.8, 400); // Scroll about 80% of visible width
            
            if (currentScroll >= maxScroll - 10) {
                // Reset to beginning
                console.log('🔄 Resetting horizontal scroll to beginning');
                element.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Scroll to next position
                const nextPosition = Math.min(currentScroll + scrollAmount, maxScroll);
                console.log(`➡️ Scrolling horizontally from ${currentScroll} to ${nextPosition}`);
                element.scrollTo({ left: nextPosition, behavior: 'smooth' });
            }
        } else {
            // Vertical scrolling
            const currentScroll = element.scrollTop;
            const maxScroll = element.scrollHeight - element.clientHeight;
            const scrollAmount = Math.min(element.clientHeight * 0.8, 300); // Scroll about 80% of visible height
            
            if (currentScroll >= maxScroll - 10) {
                // Reset to beginning
                console.log('🔄 Resetting vertical scroll to beginning');
                element.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scroll to next position
                const nextPosition = Math.min(currentScroll + scrollAmount, maxScroll);
                console.log(`⬇️ Scrolling vertically from ${currentScroll} to ${nextPosition}`);
                element.scrollTo({ top: nextPosition, behavior: 'smooth' });
            }
        }
    }
    
    function setupInteractionHandlers(element) {
        const pauseAutoScroll = () => {
            console.log('👆 User interaction detected, pausing auto-scroll');
            isUserInteracting = true;
            
            clearTimeout(interactionTimer);
            interactionTimer = setTimeout(() => {
                console.log('▶️ Resuming auto-scroll after user interaction pause');
                isUserInteracting = false;
            }, PAUSE_DURATION);
        };
        
        // Add event listeners
        element.addEventListener('mouseenter', pauseAutoScroll);
        element.addEventListener('mouseleave', () => {
            // Don't immediately resume, wait for the timer
        });
        element.addEventListener('touchstart', pauseAutoScroll);
        element.addEventListener('scroll', pauseAutoScroll);
        element.addEventListener('click', pauseAutoScroll);
        
        // Pause when clicking anywhere in the testimonials section
        const testimonialsSection = element.closest('section') || element.closest('.testimonial-card');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('click', pauseAutoScroll);
        }
    }
    
    function setupIframeAutoScroll(iframe, container) {
        console.log('🖼️ Setting up iframe auto-scroll');
        
        // For iframes, we'll use a different approach since we can't access content
        // We'll use CSS animations on the container
        setupCSSAnimationFallback(container);
    }
    
    function setupCSSAnimationFallback(container) {
        console.log('🎨 Setting up CSS animation fallback');
        
        // Add CSS for smooth auto-scrolling animation
        const style = document.createElement('style');
        style.id = 'testimonials-autoscroll-css';
        style.textContent = `
            .senja-embed {
                position: relative;
                overflow: hidden !important;
            }
            
            .senja-embed > * {
                animation: testimonials-slide 12s linear infinite;
                animation-play-state: running;
            }
            
            .senja-embed:hover > * {
                animation-play-state: paused;
            }
            
            @keyframes testimonials-slide {
                0% { transform: translateX(0%); }
                25% { transform: translateX(-25%); }
                50% { transform: translateX(-50%); }
                75% { transform: translateX(-75%); }
                100% { transform: translateX(0%); }
            }
            
            /* Ensure smooth transitions */
            .senja-embed * {
                transition: transform 0.5s ease-in-out;
            }
        `;
        
        if (!document.getElementById('testimonials-autoscroll-css')) {
            document.head.appendChild(style);
        }
        
        // Add interaction pause functionality
        container.addEventListener('mouseenter', () => {
            container.style.animationPlayState = 'paused';
        });
        
        container.addEventListener('mouseleave', () => {
            setTimeout(() => {
                container.style.animationPlayState = 'running';
            }, 1000);
        });
    }
    
    function setupFallbackAutoScroll() {
        console.log('🔄 Setting up fallback auto-scroll for any testimonials found');
        
        // Look for any testimonial-like containers
        const testimonialSelectors = [
            '.testimonial-card',
            '[class*="testimonial"]',
            'section:has(h2:contains("Collectors"))',
            'section:has(h2:contains("Testimonial"))'
        ];
        
        for (const selector of testimonialSelectors) {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const scrollable = findScrollableElement(element);
                    if (scrollable) {
                        console.log('📜 Found fallback scrollable element:', scrollable);
                        startAutoScroll(scrollable);
                        setupInteractionHandlers(scrollable);
                    }
                });
            } catch (e) {
                // Continue with other selectors
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialsAutoScroll);
    } else {
        initTestimonialsAutoScroll();
    }
    
    // Also try after page load
    window.addEventListener('load', () => {
        setTimeout(initTestimonialsAutoScroll, 1000);
    });
    
    // Listen for Senja widget messages
    window.addEventListener('message', (event) => {
        if (event.data && typeof event.data === 'string' && event.data.includes('senja')) {
            console.log('📨 Senja message detected, reinitializing auto-scroll...');
            setTimeout(initTestimonialsAutoScroll, 2000);
        }
    });
    
    // Expose control functions globally
    window.testimonialsAutoScroll = {
        pause: () => {
            isUserInteracting = true;
            console.log('⏸️ Auto-scroll paused manually');
        },
        resume: () => {
            isUserInteracting = false;
            console.log('▶️ Auto-scroll resumed manually');
        },
        restart: initTestimonialsAutoScroll
    };
    
})();
