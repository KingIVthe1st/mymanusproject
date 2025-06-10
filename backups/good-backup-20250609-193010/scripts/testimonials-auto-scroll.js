/**
 * Auto-scroll functionality for testimonials section
 * Enhances the Senja embed widget with smooth auto-scrolling
 */

class TestimonialsAutoScroll {
    constructor() {
        this.scrollInterval = null;
        this.scrollSpeed = 50; // pixels per second
        this.pauseTime = 3000; // milliseconds to pause at each testimonial
        this.isManuallyInteracting = false;
        this.interactionTimeout = null;
        this.observers = [];
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        // Wait for Senja widget to load
        this.waitForSenjaWidget();
    }
    
    waitForSenjaWidget() {
        const checkSenjaWidget = () => {
            const senjaEmbed = document.querySelector('.senja-embed');
            if (senjaEmbed) {
                // Wait a bit more for the widget to fully render
                setTimeout(() => this.setupAutoScroll(), 2000);
            } else {
                // Check again in 500ms
                setTimeout(checkSenjaWidget, 500);
            }
        };
        checkSenjaWidget();
    }
    
    setupAutoScroll() {
        const senjaContainer = document.querySelector('.senja-embed');
        if (!senjaContainer) return;
        
        // Look for scrollable containers within the Senja widget
        const scrollableElements = this.findScrollableElements(senjaContainer);
        
        if (scrollableElements.length > 0) {
            scrollableElements.forEach(element => {
                this.setupScrollForElement(element);
            });
        } else {
            // If no immediate scrollable elements, try iframe approach
            this.setupIframeScroll(senjaContainer);
        }
    }
    
    findScrollableElements(container) {
        const scrollableElements = [];
        
        // Check common selectors for testimonial containers
        const selectors = [
            '[data-testid="testimonials-container"]',
            '.testimonials-container',
            '.testimonials-scroll',
            '.senja-testimonials',
            '.testimonial-carousel',
            '[class*="scroll"]',
            '[class*="carousel"]',
            '[class*="slider"]'
        ];
        
        selectors.forEach(selector => {
            const elements = container.querySelectorAll(selector);
            elements.forEach(el => {
                if (this.isScrollable(el)) {
                    scrollableElements.push(el);
                }
            });
        });
        
        // If no specific containers found, check all children
        if (scrollableElements.length === 0) {
            const allElements = container.querySelectorAll('*');
            allElements.forEach(el => {
                if (this.isScrollable(el)) {
                    scrollableElements.push(el);
                }
            });
        }
        
        return scrollableElements;
    }
    
    isScrollable(element) {
        const style = window.getComputedStyle(element);
        const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
        const hasVerticalScroll = element.scrollHeight > element.clientHeight;
        const overflowX = style.overflowX;
        const overflowY = style.overflowY;
        
        return (hasHorizontalScroll && (overflowX === 'auto' || overflowX === 'scroll')) ||
               (hasVerticalScroll && (overflowY === 'auto' || overflowY === 'scroll'));
    }
    
    setupScrollForElement(element) {
        // Add smooth scrolling behavior
        element.style.scrollBehavior = 'smooth';
        
        // Set up auto-scroll
        this.startAutoScroll(element);
        
        // Pause on hover/interaction
        this.setupInteractionHandlers(element);
        
        // Create intersection observer to pause when not visible
        this.setupVisibilityObserver(element);
    }
    
    setupIframeScroll(container) {
        // Try to find iframe within Senja widget
        const iframe = container.querySelector('iframe');
        if (iframe) {
            // Wait for iframe to load
            iframe.addEventListener('load', () => {
                try {
                    // Try to access iframe content (may be blocked by CORS)
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (iframeDoc) {
                        const scrollableElements = this.findScrollableElements(iframeDoc.body);
                        scrollableElements.forEach(element => {
                            this.setupScrollForElement(element);
                        });
                    }
                } catch (e) {
                    // CORS blocked - use alternative approach
                    this.setupExternalAutoScroll(container);
                }
            });
        }
    }
    
    setupExternalAutoScroll(container) {
        // Alternative approach: Add our own auto-scroll layer
        const scrollWrapper = document.createElement('div');
        scrollWrapper.className = 'testimonials-auto-scroll-wrapper';
        scrollWrapper.style.cssText = `
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
        `;
        
        // Wrap the Senja embed
        container.parentNode.insertBefore(scrollWrapper, container);
        scrollWrapper.appendChild(container);
        
        // Apply auto-scroll animation
        this.applyAutoScrollAnimation(container);
    }
    
    applyAutoScrollAnimation(element) {
        element.style.cssText += `
            animation: testimonials-auto-scroll 30s linear infinite;
            animation-play-state: running;
        `;
        
        // Add CSS animation if not already present
        if (!document.querySelector('#testimonials-auto-scroll-styles')) {
            const styles = document.createElement('style');
            styles.id = 'testimonials-auto-scroll-styles';
            styles.textContent = `
                @keyframes testimonials-auto-scroll {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-25%); }
                    50% { transform: translateX(-50%); }
                    75% { transform: translateX(-75%); }
                    100% { transform: translateX(0); }
                }
                
                .testimonials-auto-scroll-wrapper:hover .senja-embed {
                    animation-play-state: paused !important;
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    startAutoScroll(element) {
        const scroll = () => {
            if (this.isManuallyInteracting) return;
            
            const isHorizontalScroll = element.scrollWidth > element.clientWidth;
            const isVerticalScroll = element.scrollHeight > element.clientHeight;
            
            if (isHorizontalScroll) {
                this.horizontalAutoScroll(element);
            } else if (isVerticalScroll) {
                this.verticalAutoScroll(element);
            }
        };
        
        // Start scrolling after initial delay
        setTimeout(() => {
            this.scrollInterval = setInterval(scroll, 100);
        }, 2000);
    }
    
    horizontalAutoScroll(element) {
        const currentScroll = element.scrollLeft;
        const maxScroll = element.scrollWidth - element.clientWidth;
        
        if (currentScroll >= maxScroll) {
            // Reset to beginning
            element.scrollLeft = 0;
            setTimeout(() => {
                if (!this.isManuallyInteracting) {
                    element.scrollLeft += 2;
                }
            }, this.pauseTime);
        } else {
            element.scrollLeft += 2;
        }
    }
    
    verticalAutoScroll(element) {
        const currentScroll = element.scrollTop;
        const maxScroll = element.scrollHeight - element.clientHeight;
        
        if (currentScroll >= maxScroll) {
            // Reset to beginning
            element.scrollTop = 0;
            setTimeout(() => {
                if (!this.isManuallyInteracting) {
                    element.scrollTop += 2;
                }
            }, this.pauseTime);
        } else {
            element.scrollTop += 2;
        }
    }
    
    setupInteractionHandlers(element) {
        const pauseAutoScroll = () => {
            this.isManuallyInteracting = true;
            clearTimeout(this.interactionTimeout);
            
            // Resume after 5 seconds of no interaction
            this.interactionTimeout = setTimeout(() => {
                this.isManuallyInteracting = false;
            }, 5000);
        };
        
        // Pause on various interactions
        element.addEventListener('mouseenter', pauseAutoScroll);
        element.addEventListener('touchstart', pauseAutoScroll);
        element.addEventListener('scroll', pauseAutoScroll);
        element.addEventListener('click', pauseAutoScroll);
    }
    
    setupVisibilityObserver(element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Resume auto-scroll when visible
                    if (!this.isManuallyInteracting && !this.scrollInterval) {
                        this.startAutoScroll(element);
                    }
                } else {
                    // Pause auto-scroll when not visible
                    clearInterval(this.scrollInterval);
                    this.scrollInterval = null;
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% visible
        });
        
        observer.observe(element);
        this.observers.push(observer);
    }
    
    destroy() {
        // Clean up
        clearInterval(this.scrollInterval);
        clearTimeout(this.interactionTimeout);
        this.observers.forEach(observer => observer.disconnect());
        
        // Remove added styles
        const styles = document.querySelector('#testimonials-auto-scroll-styles');
        if (styles) {
            styles.remove();
        }
    }
}

// Enhanced CSS for better testimonials display
const addTestimonialsEnhancements = () => {
    const styles = document.createElement('style');
    styles.id = 'testimonials-enhancements';
    styles.textContent = `
        /* Testimonials section enhancements */
        .testimonial-card {
            transition: all 0.3s ease;
            will-change: transform;
        }
        
        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Senja widget enhancements */
        .senja-embed {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Auto-scroll indicator */
        .testimonials-auto-scroll-indicator {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 5px 10px;
            font-size: 12px;
            color: #666;
            backdrop-filter: blur(5px);
            z-index: 10;
        }
        
        .testimonials-auto-scroll-indicator.paused {
            opacity: 0.5;
        }
        
        /* Smooth scrollbar styling */
        .senja-embed ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        
        .senja-embed ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
        }
        
        .senja-embed ::-webkit-scrollbar-thumb {
            background: rgba(147, 51, 234, 0.5);
            border-radius: 3px;
        }
        
        .senja-embed ::-webkit-scrollbar-thumb:hover {
            background: rgba(147, 51, 234, 0.7);
        }
    `;
    document.head.appendChild(styles);
};

// Initialize auto-scroll functionality
let testimonialsAutoScroll = null;

// Initialize when document is ready
const initTestimonialsAutoScroll = () => {
    addTestimonialsEnhancements();
    testimonialsAutoScroll = new TestimonialsAutoScroll();
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsAutoScroll);
} else {
    initTestimonialsAutoScroll();
}

// Export for potential manual control
window.testimonialsAutoScroll = testimonialsAutoScroll;
