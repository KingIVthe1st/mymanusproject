/**
 * OPTIMIZED TESTIMONIALS AUTO-SCROLL
 * Enhanced performance with intersection observer and 6-second intervals
 * Only starts when section is visible, loads faster, better UX
 */

(function() {
    let autoScrollInterval;
    let isUserInteracting = false;
    let interactionTimer;
    let isIntersecting = false;
    let testimonialContainer = null;
    let hasStarted = false;
    
    // Configuration - DOUBLED from 3 to 6 seconds as requested
    const SCROLL_INTERVAL = 6000; // 6 seconds (doubled from 3)
    const PAUSE_DURATION = 8000; // 8 seconds pause after user interaction
    const FAST_DETECTION_TIMEOUT = 500; // Faster widget detection
    
    console.log('🚀 Optimized Testimonials Auto-Scroll Initializing...');
    console.log('⏱️ Scroll interval set to 6 seconds (doubled from 3)');
    
    // Intersection Observer for performance optimization
    function createIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.3 // Start when 30% of section is visible
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isIntersecting = entry.isIntersecting;
                
                if (isIntersecting && !hasStarted) {
                    console.log('👁️ Testimonials section visible - starting auto-scroll');
                    hasStarted = true;
                    initTestimonialsAutoScroll();
                } else if (!isIntersecting && autoScrollInterval) {
                    console.log('⏸️ Testimonials section hidden - pausing auto-scroll');
                    pauseAutoScroll();
                }
            });
        }, options);
        
        // Find testimonials section
        const testimonialsSection = document.querySelector('[class*="testimonial"]') || 
                                   document.querySelector('section:has(h2:contains("Collectors"))') ||
                                   document.querySelector('.testimonial-card');
        
        if (testimonialsSection) {
            observer.observe(testimonialsSection);
            console.log('🎯 Intersection observer set up for testimonials section');
            return true;
        }
        
        console.warn('⚠️ Could not find testimonials section for intersection observer');
        return false;
    }
    
    function initTestimonialsAutoScroll() {
        if (!isIntersecting && hasStarted) {
            console.log('⏸️ Section not visible, skipping initialization');
            return;
        }
        
        console.log('🎨 Starting optimized testimonials auto-scroll...');
        
        // Fast widget detection with optimized timing
        let attempts = 0;
        const maxAttempts = 10; // Reduced from 20 for faster loading
        
        function checkForTestimonialContainer() {
            attempts++;
            console.log(`🔍 Fast detection attempt ${attempts}/${maxAttempts}`);
            
            // Multiple detection strategies for faster finding
            testimonialContainer = findTestimonialContainer();
            
            if (testimonialContainer) {
                console.log('✅ Testimonials container found! Setting up optimized auto-scroll...');
                setupOptimizedAutoScroll();
                return;
            }
            
            if (attempts < maxAttempts) {
                setTimeout(checkForTestimonialContainer, FAST_DETECTION_TIMEOUT);
            } else {
                console.warn('⚠️ Could not find testimonials container after fast detection');
                // Fallback to any testimonial-like elements
                setupFallbackAutoScroll();
            }
        }
        
        checkForTestimonialContainer();
    }
    
    function findTestimonialContainer() {
        // Prioritized detection strategies for faster results
        const strategies = [
            () => document.querySelector('.testimonials-container'),
            () => document.querySelector('[class*="testimonials-container"]'),
            () => document.querySelector('.testimonials-track'),
            () => document.querySelector('[style*="overflow-x: auto"]'),
            () => document.querySelector('.senja-embed'),
            () => document.querySelector('[data-id="6a3e2a3d-0648-4ec0-bbeb-8dbca588b22a"]'),
            () => document.querySelector('[class*="testimonial"][class*="card"] .testimonials-track'),
            () => document.querySelector('section [style*="display: flex"]')
        ];
        
        for (const strategy of strategies) {
            try {
                const container = strategy();
                if (container && isValidContainer(container)) {
                    console.log('📍 Found container using strategy:', strategy.toString().slice(0, 50) + '...');
                    return container;
                }
            } catch (e) {
                // Continue to next strategy
            }
        }
        
        return null;
    }
    
    function isValidContainer(element) {
        if (!element) return false;
        
        // Check if container has scrollable content
        const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;
        const hasTestimonialContent = element.querySelector('[class*="testimonial"]') || 
                                     element.querySelector('[style*="testimonial"]') ||
                                     element.children.length > 1;
        
        return (hasHorizontalScroll || hasVerticalScroll) && hasTestimonialContent;
    }
    
    function setupOptimizedAutoScroll() {
        if (!testimonialContainer || !isIntersecting) {
            console.log('⏸️ Cannot setup auto-scroll - container missing or not visible');
            return;
        }
        
        console.log('🚀 Setting up optimized auto-scroll with 6-second intervals');
        
        // Clear any existing intervals
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        
        // Enhanced interaction handlers
        setupOptimizedInteractionHandlers();
        
        // Start 6-second auto-scroll
        autoScrollInterval = setInterval(() => {
            if (isUserInteracting || !isIntersecting) {
                console.log('⏸️ Skipping scroll - user interaction or not visible');
                return;
            }
            
            performOptimizedScroll();
        }, SCROLL_INTERVAL);
        
        console.log('✅ 6-second auto-scroll active!');
    }
    
    function performOptimizedScroll() {
        if (!testimonialContainer) return;
        
        const isHorizontal = testimonialContainer.scrollWidth > testimonialContainer.clientWidth;
        
        if (isHorizontal) {
            // Optimized horizontal scrolling
            const currentScroll = testimonialContainer.scrollLeft;
            const maxScroll = testimonialContainer.scrollWidth - testimonialContainer.clientWidth;
            const cardWidth = testimonialContainer.children[0]?.offsetWidth || 320;
            const gap = 32; // Estimated gap between cards
            const scrollAmount = cardWidth + gap;
            
            if (currentScroll >= maxScroll - 10) {
                console.log('🔄 Resetting to beginning (horizontal)');
                testimonialContainer.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const nextPosition = Math.min(currentScroll + scrollAmount, maxScroll);
                console.log(`➡️ Scrolling horizontally: ${currentScroll} → ${nextPosition}`);
                testimonialContainer.scrollTo({ left: nextPosition, behavior: 'smooth' });
            }
        } else {
            // Optimized vertical scrolling
            const currentScroll = testimonialContainer.scrollTop;
            const maxScroll = testimonialContainer.scrollHeight - testimonialContainer.clientHeight;
            const scrollAmount = testimonialContainer.clientHeight * 0.8;
            
            if (currentScroll >= maxScroll - 10) {
                console.log('🔄 Resetting to beginning (vertical)');
                testimonialContainer.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const nextPosition = Math.min(currentScroll + scrollAmount, maxScroll);
                console.log(`⬇️ Scrolling vertically: ${currentScroll} → ${nextPosition}`);
                testimonialContainer.scrollTo({ top: nextPosition, behavior: 'smooth' });
            }
        }
    }
    
    function setupOptimizedInteractionHandlers() {
        if (!testimonialContainer) return;
        
        const pauseAutoScroll = () => {
            console.log('👆 User interaction detected - pausing 6-second auto-scroll');
            isUserInteracting = true;
            
            clearTimeout(interactionTimer);
            interactionTimer = setTimeout(() => {
                console.log('▶️ Resuming 6-second auto-scroll after pause');
                isUserInteracting = false;
            }, PAUSE_DURATION);
        };
        
        // Optimized event listeners with passive options where possible
        const events = [
            { name: 'mouseenter', passive: true },
            { name: 'touchstart', passive: true },
            { name: 'scroll', passive: true },
            { name: 'click', passive: false }
        ];
        
        events.forEach(({ name, passive }) => {
            testimonialContainer.addEventListener(name, pauseAutoScroll, { passive });
        });
        
        // Pause when clicking anywhere in testimonials section
        const testimonialsSection = testimonialContainer.closest('section') || 
                                   testimonialContainer.closest('[class*="testimonial"]');
        if (testimonialsSection) {
            testimonialsSection.addEventListener('click', pauseAutoScroll, { passive: false });
        }
        
        console.log('🎛️ Optimized interaction handlers set up');
    }
    
    function pauseAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    function resumeAutoScroll() {
        if (isIntersecting && !autoScrollInterval && testimonialContainer) {
            setupOptimizedAutoScroll();
        }
    }
    
    function setupFallbackAutoScroll() {
        console.log('🔄 Setting up fallback auto-scroll for any testimonial elements');
        
        // Look for any testimonial-like containers as fallback
        const fallbackSelectors = [
            '.testimonial-card',
            '[class*="testimonial"]',
            '[style*="overflow-x: auto"]',
            '[style*="display: flex"]'
        ];
        
        for (const selector of fallbackSelectors) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (isValidContainer(element)) {
                    console.log('📜 Found fallback container:', element);
                    testimonialContainer = element;
                    setupOptimizedAutoScroll();
                    return;
                }
            });
        }
    }
    
    // Initialize when DOM is ready with intersection observer
    function initialize() {
        console.log('🔧 Initializing optimized testimonials system...');
        
        // Set up intersection observer first
        const observerSet = createIntersectionObserver();
        
        if (!observerSet) {
            // Fallback: start immediately if no observer could be set
            console.log('⚠️ No intersection observer, starting immediately');
            hasStarted = true;
            isIntersecting = true;
            initTestimonialsAutoScroll();
        }
    }
    
    // Enhanced initialization timing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // DOM already loaded
        initialize();
    }
    
    // Additional initialization after page load for dynamic content
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!hasStarted) {
                console.log('🔄 Post-load initialization attempt');
                initialize();
            }
        }, 1000);
    });
    
    // Listen for dynamic content changes
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0 && !hasStarted) {
                    // Check if testimonials were added dynamically
                    const hasTestimonialContent = Array.from(mutation.addedNodes).some(node => 
                        node.nodeType === 1 && (
                            node.classList?.contains('testimonials-container') ||
                            node.querySelector?.('.testimonials-container') ||
                            node.classList?.contains('senja-embed')
                        )
                    );
                    
                    if (hasTestimonialContent) {
                        console.log('🆕 Dynamic testimonials content detected');
                        setTimeout(initialize, 500);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Expose control functions for debugging
    window.optimizedTestimonialsAutoScroll = {
        pause: () => {
            isUserInteracting = true;
            pauseAutoScroll();
            console.log('⏸️ Manually paused optimized auto-scroll');
        },
        resume: () => {
            isUserInteracting = false;
            resumeAutoScroll();
            console.log('▶️ Manually resumed optimized auto-scroll');
        },
        restart: initialize,
        status: () => ({
            hasStarted,
            isIntersecting,
            isUserInteracting,
            intervalActive: !!autoScrollInterval,
            containerFound: !!testimonialContainer,
            scrollInterval: SCROLL_INTERVAL
        })
    };
    
    console.log('✅ Optimized testimonials auto-scroll system ready!');
    console.log('📊 Configuration: 6-second intervals, intersection observer, fast loading');
    
})();
