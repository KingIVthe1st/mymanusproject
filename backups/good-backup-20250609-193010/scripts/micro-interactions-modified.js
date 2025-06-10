// Micro-Interactions & Haptic Feedback System
// Modified Version - Removes large cursor circle while keeping particle effects

class EnhancedPaintCursor {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 15;
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        // REMOVED: magneticCursor = null; - This was the large purple circle
        this.paintColors = [
            'radial-gradient(circle, rgba(255,105,180,0.8) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(138,43,226,0.7) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(255,193,7,0.6) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(32,201,151,0.7) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(255,87,34,0.6) 0%, transparent 70%)'
        ];
        this.isActive = true;
        this.lastPaintTime = 0;
        this.paintThrottle = 50; // milliseconds
        
        this.init();
    }
    
    init() {
        // REMOVED: this.createMagneticCursor(); - This created the large circle
        this.bindEvents();
        this.startAnimationLoop();
    }
    
    // REMOVED: createMagneticCursor() function - This was creating the large purple circle
    
    bindEvents() {
        // Mouse movement tracking - SIMPLIFIED to remove paint effects
        document.addEventListener('mousemove', (e) => {
            this.updateMousePosition(e);
            this.updateVelocity();
            // REMOVED: this.updateMagneticCursor(); - Large circle updates
            // REMOVED: Paint drop creation - Medium-sized effects
        });
        
        // REMOVED: Mouse enter/leave for cursor visibility - Not needed without magnetic cursor
        
        // Click interactions - SIMPLIFIED to only keep small interactive particles
        document.addEventListener('click', (e) => {
            // REMOVED: this.createClickSplash(e); - Large splash effects
            this.createInteractiveParticles(e); // Keep small particles
        });
        
        // Keep useful UI interactions
        this.setupMagneticButtons();
        this.setupGlassCards();
        this.setupRevealAnimations();
    }
    
    updateMousePosition(e) {
        this.lastMousePos = { ...this.mousePos };
        this.mousePos = { x: e.clientX, y: e.clientY };
    }
    
    updateVelocity() {
        this.velocity = {
            x: this.mousePos.x - this.lastMousePos.x,
            y: this.mousePos.y - this.lastMousePos.y
        };
    }
    
    // REMOVED: updateMagneticCursor() - This was updating the large circle position
    // REMOVED: createPaintDrop() - This was creating medium-sized paint effects
    // REMOVED: createClickSplash() - This was creating large splash effects
    
    createInteractiveParticles(e) {
        const particleCount = 5 + Math.random() * 5;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'interactive-particle active';
                
                const angle = (Math.PI * 2 * i) / particleCount;
                const radius = 20 + Math.random() * 30;
                const x = e.clientX + Math.cos(angle) * radius;
                const y = e.clientY + Math.sin(angle) * radius;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    getRandomPaintColor() {
        return this.paintColors[Math.floor(Math.random() * this.paintColors.length)];
    }
    
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.magnetic-btn, .glass-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                button.classList.add('haptic-feedback');
            });
            
            button.addEventListener('mouseleave', (e) => {
                button.classList.remove('haptic-feedback');
            });
            
            button.addEventListener('mousedown', (e) => {
                this.createButtonRipple(e, button);
            });
        });
    }
    
    createButtonRipple(e, button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    setupGlassCards() {
        const cards = document.querySelectorAll('.glass-card, .artwork-card, .education-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('haptic-feedback');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('haptic-feedback');
            });
        });
    }
    
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.2
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    startAnimationLoop() {
        const animate = () => {
            // Performance optimization: only update if cursor is active
            if (this.isActive) {
                this.updateTrail();
            }
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    updateTrail() {
        // Advanced trail logic can be added here if needed
        // Currently handled by rainbow-cursor.js for small particles
    }
    
    // Mobile touch support
    setupMobileSupport() {
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                // REMOVED: Large click splash for mobile
                // Keep small interactive particles for mobile
                this.createInteractiveParticles({
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                    target: e.target
                });
            });
            
            // Add mobile touch feedback class to interactive elements
            const touchElements = document.querySelectorAll('.magnetic-btn, .glass-button, .glass-card');
            touchElements.forEach(element => {
                element.classList.add('mobile-touch-feedback');
            });
        }
    }
}

// CSS for ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Initialize the enhanced paint cursor system
document.addEventListener('DOMContentLoaded', () => {
    const paintCursor = new EnhancedPaintCursor();
    paintCursor.setupMobileSupport();
    
    // Store reference globally for potential external control
    window.paintCursor = paintCursor;
});

// Performance monitoring
const performanceMonitor = {
    frameCount: 0,
    lastTime: performance.now(),
    fps: 60,
    
    update() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;
            
            // Reduce effects if performance is poor
            if (this.fps < 30 && window.paintCursor) {
                window.paintCursor.paintThrottle = 100; // Reduce paint frequency
            }
        }
        
        requestAnimationFrame(() => this.update());
    }
};

// Start performance monitoring
setTimeout(() => {
    performanceMonitor.update();
}, 1000);
