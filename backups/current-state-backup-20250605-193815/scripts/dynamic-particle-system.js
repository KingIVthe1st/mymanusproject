// ===================================================
//   DYNAMIC PARTICLE SYSTEM MANAGER
//   Multi-Million Dollar Agency Level Implementation
// ===================================================

class DynamicParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.isInitialized = false;
        this.animationFrame = null;
        this.mousePosition = { x: 0, y: 0 };
        this.lastMousePosition = { x: 0, y: 0 };
        this.isMouseMoving = false;
        this.performanceMode = this.detectPerformanceMode();
        
        // Configuration based on performance
        this.config = {
            particleCount: this.performanceMode === 'high' ? 25 : 15,
            interactiveRadius: 150,
            trailParticles: this.performanceMode === 'high' ? 8 : 4,
            brushStrokes: this.performanceMode === 'high' ? 5 : 3,
            updateInterval: this.performanceMode === 'high' ? 16 : 32, // 60fps vs 30fps
        };
        
        this.particleTypes = ['default', 'splatter', 'droplet', 'brush', 'texture'];
        this.particleSizes = ['small', 'medium', 'large', 'xlarge'];
        this.particleLayers = ['back', 'mid', 'front'];
        this.particleThemes = ['warm', 'cool', 'purple', 'pink'];
        
        this.init();
    }
    
    detectPerformanceMode() {
        // Detect device performance capabilities
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const hasGoodGPU = !isMobile && window.devicePixelRatio <= 2;
        const hasGoodCPU = navigator.hardwareConcurrency >= 4;
        
        return (hasGoodGPU && hasGoodCPU) ? 'high' : 'medium';
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.createCanvas();
        this.generateParticles();
        this.setupEventListeners();
        this.startAnimationLoop();
        this.isInitialized = true;
        
        console.log(`🎨 Dynamic Particle System initialized in ${this.performanceMode} performance mode`);
    }
    
    createCanvas() {
        // Remove existing canvas if any
        const existingCanvas = document.querySelector('.particle-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        // Create new canvas container
        this.canvas = document.createElement('div');
        this.canvas.className = 'particle-canvas';
        this.canvas.setAttribute('aria-hidden', 'true');
        
        // Insert canvas as first child of body (behind everything)
        document.body.insertBefore(this.canvas, document.body.firstChild);
    }
    
    generateParticles() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Clear existing particles
        this.particles = [];
        this.canvas.innerHTML = '';
        
        // Generate base particles
        for (let i = 0; i < this.config.particleCount; i++) {
            this.createParticle({
                x: Math.random() * viewportWidth,
                y: Math.random() * viewportHeight,
                delay: Math.random() * 10, // Stagger animations
                isStatic: true
            });
        }
        
        // Generate brush stroke particles (if high performance)
        if (this.performanceMode === 'high') {
            for (let i = 0; i < this.config.brushStrokes; i++) {
                this.createBrushStroke(i);
            }
        }
    }
    
    createParticle(options = {}) {
        const particle = document.createElement('div');
        const particleData = {
            element: particle,
            x: options.x || Math.random() * window.innerWidth,
            y: options.y || Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 1,
            maxLife: 1,
            isInteractive: !options.isStatic,
            id: Date.now() + Math.random()
        };
        
        // Random particle configuration
        const type = this.getRandomType();
        const size = this.getRandomSize();
        const layer = this.getRandomLayer();
        const theme = this.getRandomTheme();
        
        // Apply classes
        particle.className = `paint-particle ${type} ${size} ${layer} ${theme}`;
        
        if (particleData.isInteractive) {
            particle.classList.add('interactive');
        }
        
        // Apply random animation delay
        if (options.delay) {
            particle.style.animationDelay = `${options.delay}s`;
        }
        
        // Position the particle
        particle.style.left = `${particleData.x}px`;
        particle.style.top = `${particleData.y}px`;
        
        // Add to DOM and tracking
        this.canvas.appendChild(particle);
        this.particles.push(particleData);
        
        return particleData;
    }
    
    createBrushStroke(index) {
        const brushStroke = document.createElement('div');
        brushStroke.className = 'brush-stroke-particle';
        
        // Random size and position
        const width = 100 + Math.random() * 200;
        const height = 20 + Math.random() * 40;
        
        brushStroke.style.width = `${width}px`;
        brushStroke.style.height = `${height}px`;
        brushStroke.style.left = `-${width}px`;
        brushStroke.style.top = `${Math.random() * window.innerHeight}px`;
        brushStroke.style.animationDelay = `${index * 7}s`; // Stagger brush strokes
        
        this.canvas.appendChild(brushStroke);
    }
    
    createTrailParticle(x, y) {
        if (this.particles.length > this.config.particleCount + this.config.trailParticles) {
            return; // Limit trail particles for performance
        }
        
        const trail = document.createElement('div');
        trail.className = 'splatter-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        this.canvas.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
    
    setupEventListeners() {
        // Mouse movement tracking (throttled for performance)
        let mouseMoveTimer = null;
        document.addEventListener('mousemove', (e) => {
            this.lastMousePosition = { ...this.mousePosition };
            this.mousePosition = { x: e.clientX, y: e.clientY };
            this.isMouseMoving = true;
            
            // Throttle mouse movement processing
            if (mouseMoveTimer) return;
            mouseMoveTimer = setTimeout(() => {
                this.handleMouseMove(e);
                mouseMoveTimer = null;
            }, this.config.updateInterval);
        });
        
        // Stop mouse movement flag
        document.addEventListener('mousemove', this.debounce(() => {
            this.isMouseMoving = false;
        }, 100));
        
        // Responsive resizing
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Visibility change (pause when tab not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Touch support for mobile
        if ('ontouchstart' in window) {
            document.addEventListener('touchmove', (e) => {
                const touch = e.touches[0];
                this.mousePosition = { x: touch.clientX, y: touch.clientY };
                this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
            }, { passive: true });
        }
    }
    
    handleMouseMove(e) {
        if (!this.isMouseMoving || this.performanceMode !== 'high') return;
        
        // Create trail particles on fast mouse movement
        const speed = Math.sqrt(
            Math.pow(this.mousePosition.x - this.lastMousePosition.x, 2) +
            Math.pow(this.mousePosition.y - this.lastMousePosition.y, 2)
        );
        
        if (speed > 50) { // Only on fast movement
            this.createTrailParticle(
                this.mousePosition.x + (Math.random() - 0.5) * 20,
                this.mousePosition.y + (Math.random() - 0.5) * 20
            );
        }
        
        // Interactive particle response
        this.particles.forEach(particle => {
            if (!particle.isInteractive) return;
            
            const dx = particle.x - this.mousePosition.x;
            const dy = particle.y - this.mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.interactiveRadius) {
                const force = (this.config.interactiveRadius - distance) / this.config.interactiveRadius;
                const angle = Math.atan2(dy, dx);
                
                particle.vx += Math.cos(angle) * force * 0.02;
                particle.vy += Math.sin(angle) * force * 0.02;
                
                // Limit velocity
                particle.vx = Math.max(-2, Math.min(2, particle.vx));
                particle.vy = Math.max(-2, Math.min(2, particle.vy));
            }
        });
    }
    
    handleResize() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Reposition particles that are off-screen
        this.particles.forEach(particle => {
            if (particle.x > viewportWidth) {
                particle.x = viewportWidth - 50;
            }
            if (particle.y > viewportHeight) {
                particle.y = viewportHeight - 50;
            }
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        // Regenerate if significant size change
        if (Math.abs(viewportWidth - this.lastViewportWidth) > 200) {
            this.regenerateParticles();
        }
        
        this.lastViewportWidth = viewportWidth;
    }
    
    startAnimationLoop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        const animate = () => {
            this.updateParticles();
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    updateParticles() {
        // Only update interactive particles (static ones use CSS animations)
        this.particles.forEach(particle => {
            if (!particle.isInteractive) return;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Boundary constraints with wrapping
            if (particle.x < -100) particle.x = window.innerWidth + 50;
            if (particle.x > window.innerWidth + 100) particle.x = -50;
            if (particle.y < -100) particle.y = window.innerHeight + 50;
            if (particle.y > window.innerHeight + 100) particle.y = -50;
            
            // Update DOM position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
    }
    
    pauseAnimations() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // Pause CSS animations
        this.particles.forEach(particle => {
            particle.element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        this.startAnimationLoop();
        
        // Resume CSS animations
        this.particles.forEach(particle => {
            particle.element.style.animationPlayState = 'running';
        });
    }
    
    regenerateParticles() {
        // Clear existing
        this.particles = [];
        this.canvas.innerHTML = '';
        
        // Generate new particles
        setTimeout(() => {
            this.generateParticles();
        }, 100);
    }
    
    // Utility methods
    getRandomType() {
        const types = this.particleTypes;
        return `type-${types[Math.floor(Math.random() * types.length)]}`;
    }
    
    getRandomSize() {
        const sizes = this.particleSizes;
        return `size-${sizes[Math.floor(Math.random() * sizes.length)]}`;
    }
    
    getRandomLayer() {
        const layers = this.particleLayers;
        return `layer-${layers[Math.floor(Math.random() * layers.length)]}`;
    }
    
    getRandomTheme() {
        const themes = this.particleThemes;
        return `theme-${themes[Math.floor(Math.random() * themes.length)]}`;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Public API
    addParticle(x, y, options = {}) {
        return this.createParticle({ x, y, ...options });
    }
    
    removeParticle(particleId) {
        const index = this.particles.findIndex(p => p.id === particleId);
        if (index !== -1) {
            const particle = this.particles[index];
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
            this.particles.splice(index, 1);
        }
    }
    
    setPerformanceMode(mode) {
        this.performanceMode = mode;
        this.updateConfig();
        this.regenerateParticles();
    }
    
    updateConfig() {
        this.config = {
            particleCount: this.performanceMode === 'high' ? 25 : 15,
            interactiveRadius: 150,
            trailParticles: this.performanceMode === 'high' ? 8 : 4,
            brushStrokes: this.performanceMode === 'high' ? 5 : 3,
            updateInterval: this.performanceMode === 'high' ? 16 : 32,
        };
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.particles = [];
        this.isInitialized = false;
    }
}

// Auto-initialize when script loads
window.DynamicParticleSystem = DynamicParticleSystem;

// Global instance
window.particleSystem = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all styles are loaded
    setTimeout(() => {
        window.particleSystem = new DynamicParticleSystem();
    }, 100);
});

// Backup initialization for faster loading
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(() => {
        if (!window.particleSystem) {
            window.particleSystem = new DynamicParticleSystem();
        }
    }, 100);
}
