/**
 * LIVING GRADIENT BACKGROUND - INTERACTIVE CONTROLS
 * Multi-million dollar agency level interactive gradient system
 * Responds to user interactions and scroll behavior
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        scrollEnhancementThreshold: 100,
        mouseInfluenceRadius: 300,
        performanceMode: window.innerWidth <= 768 || navigator.hardwareConcurrency < 4,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        throttleDelay: window.innerWidth <= 768 ? 32 : 16, // 30fps mobile, 60fps desktop
        maxFPS: 60,
        enableMouseTracking: window.innerWidth > 768 && !('ontouchstart' in window)
    };
    
    // Gradient elements
    let gradientElements = {};
    let isInitialized = false;
    
    /**
     * Initialize the living gradient system
     */
    function initializeLivingGradient() {
        if (isInitialized) return;
        
        // Get gradient elements
        gradientElements = {
            primary: document.querySelector('.living-gradient-bg'),
            secondary: document.querySelector('.living-gradient-secondary'),
            tertiary: document.querySelector('.living-gradient-tertiary'),
            hero: document.querySelector('.living-gradient-hero'),
            about: document.querySelector('.living-gradient-about'),
            artwork: document.querySelector('.living-gradient-artwork')
        };
        
        // Remove null elements
        Object.keys(gradientElements).forEach(key => {
            if (!gradientElements[key]) {
                delete gradientElements[key];
            }
        });
        
        if (Object.keys(gradientElements).length === 0) {
            console.warn('No living gradient elements found');
            return;
        }
        
        // Skip initialization if user prefers reduced motion
        if (config.reducedMotion) {
            console.log('Living gradients: Respecting reduced motion preference');
            return;
        }
        
        setupScrollInteractions();
        setupMouseInteractions();
        setupResizeHandling();
        setupIntersectionObserver();
        
        isInitialized = true;
        console.log('Living gradient background system initialized');
    }
    
    /**
     * Set up scroll-based interactions - optimized
     */
    function setupScrollInteractions() {
        if (config.performanceMode && window.innerWidth <= 480) return; // Skip on very small screens
        
        let scrollTimeout;
        let lastScrollY = 0;
        let isScrolling = false;
        
        function handleScroll() {
            if (isScrolling) return;
            isScrolling = true;
            
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDelta = Math.abs(scrollY - lastScrollY);
                
                // Only update if significant scroll change
                if (scrollDelta > 5) {
                    const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
                    
                    // Enhanced gradient during scroll
                    if (scrollY > config.scrollEnhancementThreshold) {
                        enhanceGradients(true, scrollProgress);
                    } else {
                        enhanceGradients(false, scrollProgress);
                    }
                    
                    lastScrollY = scrollY;
                }
                
                isScrolling = false;
            });
            
            // Reset enhancement after scroll stops
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(resetGradientEnhancements, 200);
        }
        
        // Throttled scroll listener for performance
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            if (!scrollTimer) {
                scrollTimer = setTimeout(() => {
                    handleScroll();
                    scrollTimer = null;
                }, config.throttleDelay);
            }
        }, { passive: true });
    }
    
    /**
     * Set up mouse/touch interactions - optimized
     */
    function setupMouseInteractions() {
        if (!config.enableMouseTracking) return; // Skip on mobile/touch devices
        
        let mouseX = 0;
        let mouseY = 0;
        let animationId = null;
        let isMouseActive = false;
        
        function updateMousePosition(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isMouseActive = true;
            
            if (!animationId) {
                animationId = requestAnimationFrame(applyMouseInfluence);
            }
        }
        
        function applyMouseInfluence() {
            if (!isMouseActive) {
                animationId = null;
                return;
            }
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;
            
            // Apply very subtle mouse influence to primary gradient only
            if (gradientElements.primary && Math.abs(deltaX) > 0.1) {
                const translateX = deltaX * 10; // Reduced from 20
                const translateY = deltaY * 10; // Reduced from 20
                gradientElements.primary.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            }
            
            animationId = null;
        }
        
        // Throttled mouse move listener
        let mouseMoveTimer = null;
        document.addEventListener('mousemove', (e) => {
            if (!mouseMoveTimer) {
                mouseMoveTimer = setTimeout(() => {
                    updateMousePosition(e);
                    mouseMoveTimer = null;
                }, 32); // 30fps for mouse tracking
            }
        }, { passive: true });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            isMouseActive = false;
            resetMouseInfluence();
        });
    }
    
    /**
     * Set up intersection observer - optimized
     */
    function setupIntersectionObserver() {
        if (config.performanceMode) return; // Skip on low-performance devices
        
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionId = entry.target.id;
                    applySectionGradientEffects(sectionId, true, entry.intersectionRatio);
                }
            });
        }, {
            threshold: [0.5],
            rootMargin: '0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    /**
     * Apply section-specific gradient effects - simplified
     */
    function applySectionGradientEffects(sectionId, isVisible, ratio) {
        const gradientKey = getSectionGradientKey(sectionId);
        const element = gradientElements[gradientKey];
        
        if (!element) return;
        
        // Simple opacity change only for performance
        if (isVisible) {
            element.style.opacity = Math.min(0.7, ratio * 1.1);
        } else {
            element.style.opacity = '0.4';
        }
    }
    
    /**
     * Get gradient element key for section
     */
    function getSectionGradientKey(sectionId) {
        const mapping = {
            'artwork': 'artwork',
            'about': 'about',
            'hero': 'hero'
        };
        return mapping[sectionId] || null;
    }
    
    /**
     * Enhance gradients during scroll - simplified
     */
    function enhanceGradients(enhance, scrollProgress) {
        if (!gradientElements.primary) return;
        
        // Only enhance primary gradient for performance
        if (enhance) {
            gradientElements.primary.style.opacity = Math.min(0.05, 0.03 + scrollProgress * 0.02);
        } else {
            gradientElements.primary.style.opacity = '0.03';
        }
    }
    
    /**
     * Reset gradient enhancements - simplified
     */
    function resetGradientEnhancements() {
        if (gradientElements.primary) {
            gradientElements.primary.style.opacity = '0.03';
        }
    }
    
    /**
     * Reset mouse influence - simplified
     */
    function resetMouseInfluence() {
        if (gradientElements.primary) {
            gradientElements.primary.style.transform = '';
        }
    }
    
    /**
     * Set up resize handling
     */
    function setupResizeHandling() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update performance mode based on new window size
                config.performanceMode = window.innerWidth <= 768;
                
                // Reset all transformations
                resetGradientEnhancements();
                resetMouseInfluence();
                
                console.log('Living gradients: Adapted to window resize');
            }, 150);
        });
    }
    
    /**
     * Create paint splash effect at mouse position
     */
    function createPaintSplash(x, y) {
        if (config.performanceMode || config.reducedMotion) return;
        
        const splash = document.createElement('div');
        splash.className = 'paint-splash-gradient';
        splash.style.left = (x - 100) + 'px';
        splash.style.top = (y - 100) + 'px';
        
        document.body.appendChild(splash);
        
        // Remove after animation
        setTimeout(() => {
            if (splash.parentNode) {
                splash.parentNode.removeChild(splash);
            }
        }, 2000);
    }
    
    /**
     * Add click interaction for paint splash effect - simplified
     */
    function setupClickInteractions() {
        if (config.performanceMode || config.reducedMotion) return;
        
        let lastClickTime = 0;
        
        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < 500) return; // Throttle clicks
            
            // Only create splash on non-interactive elements
            if (!e.target.closest('a, button, input, textarea, select')) {
                createPaintSplash(e.clientX, e.clientY);
                lastClickTime = now;
            }
        }, { passive: true });
    }
    
    // Start initialization
    init();
    
    // Expose simplified API for external control
    window.LivingGradient = {
        enhance: (enable) => enhanceGradients(enable, 0),
        reset: resetGradientEnhancements,
        splash: createPaintSplash,
        config: config
    };
    
})();
