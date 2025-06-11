// Micro-Interactions & Haptic Feedback System
// Enhanced Paint Cursor with Smart Interactions

class EnhancedPaintCursor {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 15;
        this.mousePos = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.magneticCursor = null;
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
        this.createMagneticCursor();
        this.bindEvents();
        this.startAnimationLoop();
    }
    
    createMagneticCursor() {
        this.magneticCursor = document.createElement('div');
        this.magneticCursor.className = 'magnetic-cursor';
        this.magneticCursor.style.display = 'none';
        document.body.appendChild(this.magneticCursor);
    }
    
    bindEvents() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.updateMousePosition(e);
            this.updateVelocity();
            this.updateMagneticCursor();
            
            // Create paint drops based on movement speed
            const now = Date.now();
            if (now - this.lastPaintTime > this.paintThrottle) {
                this.createPaintDrop(e);
                this.lastPaintTime = now;
            }
        });
        
        // Show/hide cursor
        document.addEventListener('mouseenter', () => {
            this.magneticCursor.style.display = 'block';
            this.isActive = true;
        });
        
        document.addEventListener('mouseleave', () => {
            this.magneticCursor.style.display = 'none';
            this.isActive = false;
        });
        
        // Enhanced click interactions
        document.addEventListener('click', (e) => {
            this.createClickSplash(e);
            this.createInteractiveParticles(e);
        });
        
        // Magnetic button interactions
        this.setupMagneticButtons();
        
        // Glass card interactions
        this.setupGlassCards();
        
        // Text scramble effects - DISABLED
        // this.setupTextScramble();
        
        // Reveal animations
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
    
    updateMagneticCursor() {
        if (!this.isActive) return;
        
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        const scale = Math.min(1 + speed * 0.02, 2);
        
        this.magneticCursor.style.left = this.mousePos.x - 20 + 'px';
        this.magneticCursor.style.top = this.mousePos.y - 20 + 'px';
        this.magneticCursor.style.transform = `scale(${scale})`;
        
        // Change opacity based on speed
        const opacity = Math.min(0.3 + speed * 0.01, 0.8);
        this.magneticCursor.style.opacity = opacity;
    }
    
    createPaintDrop(e) {
        if (!this.isActive) return;
        
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        
        // Only create drops if moving fast enough
        if (speed < 2) return;
        
        const drop = document.createElement('div');
        drop.className = 'paint-drop';
        
        // Random size based on movement speed
        const size = Math.random() * 8 + 6 + speed * 0.3;
        drop.style.width = size + 'px';
        drop.style.height = size + 'px';
        
        // Position with slight randomness
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        drop.style.left = (e.clientX + offsetX) + 'px';
        drop.style.top = (e.clientY + offsetY) + 'px';
        
        // Random paint color
        drop.style.background = this.getRandomPaintColor();
        
        document.body.appendChild(drop);
        
        // Animate and remove
        requestAnimationFrame(() => {
            drop.style.transform = 'scale(0) rotate(' + (Math.random() * 360) + 'deg)';
            drop.style.opacity = '0';
        });
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 1000);
    }
    
    createClickSplash(e) {
        // Don't create splash on interactive elements
        if (e.target.closest('button, a, input, select, textarea')) return;
        
        const splash = document.createElement('div');
        splash.className = 'paint-splash animate';
        
        const size = 60 + Math.random() * 40;
        splash.style.width = size + 'px';
        splash.style.height = size + 'px';
        splash.style.left = (e.clientX - size/2) + 'px';
        splash.style.top = (e.clientY - size/2) + 'px';
        splash.style.background = this.getRandomPaintColor();
        
        document.body.appendChild(splash);
        
        setTimeout(() => {
            if (splash.parentNode) {
                splash.parentNode.removeChild(splash);
            }
        }, 800);
    }
    
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
    
    setupTextScramble() {
        const scrambleElements = document.querySelectorAll('.text-scramble');
        
        scrambleElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.scrambleText(element);
            });
        });
    }
    
    scrambleText(element) {
        element.classList.add('scrambling');
        setTimeout(() => {
            element.classList.remove('scrambling');
        }, 300);
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
        // Currently handled by individual paint drops
    }
    
    // Mobile touch support
    setupMobileSupport() {
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                this.createClickSplash({
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
