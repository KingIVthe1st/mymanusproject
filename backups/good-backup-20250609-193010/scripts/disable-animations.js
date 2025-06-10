// Disable Section Title Animations - Override Script

// Override TextScramble class to be a no-op
if (typeof window !== 'undefined') {
    window.TextScramble = class {
        constructor(el) {
            this.el = el;
        }
        
        setText(newText) {
            // Simply set the text without animation
            if (this.el) {
                this.el.innerText = newText;
            }
            return Promise.resolve();
        }
        
        update() {
            // No-op
        }
        
        randomChar() {
            return '';
        }
    };
}

// Disable any text scramble initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Find all elements that might have text-scramble class
    const textElements = document.querySelectorAll('.text-scramble, h1, h2, h3, h4, h5, h6');
    
    // Ensure all text is visible immediately
    textElements.forEach(el => {
        if (el.style.opacity === '0' || el.style.opacity === '') {
            el.style.opacity = '1';
        }
        if (el.style.transform !== 'none') {
            el.style.transform = 'none';
        }
        
        // Remove any scramble-related classes
        el.classList.remove('text-scramble', 'scrambling', 'active');
        
        // Disable any pointer events that might trigger animations
        el.style.pointerEvents = 'auto';
    });
    
    // Override any intersection observers for text animations
    if (window.IntersectionObserver) {
        const originalObserve = IntersectionObserver.prototype.observe;
        IntersectionObserver.prototype.observe = function(element) {
            // Skip observing text elements for animations
            if (element.classList.contains('text-scramble') || 
                element.tagName.match(/^H[1-6]$/)) {
                return;
            }
            return originalObserve.call(this, element);
        };
    }
});
