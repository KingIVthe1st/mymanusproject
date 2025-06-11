/*
 * ANIMATIONS.JS - Phase 1 Optimization
 * Rainbow Cursor, Micro-interactions, Visual Effects
 * Generated: 2025-06-07
 */

(function() {
    'use strict';
    
    // ===== RAINBOW CURSOR SYSTEM =====
    class RainbowCursor {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.mouse = { x: 0, y: 0, lastX: 0, lastY: 0 };
            this.isActive = false;
            this.maxParticles = 150;
            this.animationId = null;
            
            this.init();
        }
        
        init() {
            // Check if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            
            this.createCanvas();
            this.setupEventListeners();
            this.start();
        }
        
        createCanvas() {
            this.canvas = document.createElement('canvas');
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: multiply;
            `;
            
            this.ctx = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas);
            
            this.resize();
        }
        
        setupEventListeners() {
            window.addEventListener('resize', () => this.resize());
            
            document.addEventListener('mousemove', (e) => {
                this.mouse.lastX = this.mouse.x;
                this.mouse.lastY = this.mouse.y;
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.isActive = true;
                
                this.addParticles();
            });
            
            document.addEventListener('mouseleave', () => {
                this.isActive = false;
            });
            
            // Color switching on artwork hover
            document.addEventListener('mouseover', (e) => {
                if (e.target.closest('.artwork-card')) {
                    this.switchColorPalette('artwork');
                }
            });
            
            document.addEventListener('mouseout', (e) => {
                if (e.target.closest('.artwork-card')) {
                    this.switchColorPalette('default');
                }
            });
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        addParticles() {
            if (this.particles.length >= this.maxParticles) return;
            
            const velocity = Math.sqrt(
                Math.pow(this.mouse.x - this.mouse.lastX, 2) + 
                Math.pow(this.mouse.y - this.mouse.lastY, 2)
            );
            
            const numParticles = Math.min(Math.floor(velocity / 5) + 1, 8);
            
            for (let i = 0; i < numParticles; i++) {
                this.particles.push({
                    x: this.mouse.x + (Math.random() - 0.5) * 10,
                    y: this.mouse.y + (Math.random() - 0.5) * 10,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1,
                    decay: 0.02 + Math.random() * 0.03,
                    size: Math.random() * 3 + 0.5,
                    color: this.getColor(),
                    type: velocity > 15 ? 'sparkle' : 'normal'
                });
            }
        }
        
        getColor() {
            const palettes = {
                default: [
                    '#f6c347', '#ec4899', '#9333ea', '#3b82f6', '#10b981'
                ],
                artwork: [
                    '#9333ea', '#3b82f6', '#06b6d4', '#8b5cf6'
                ]
            };
            
            const currentPalette = palettes[this.currentPalette] || palettes.default;
            return currentPalette[Math.floor(Math.random() * currentPalette.length)];
        }
        
        switchColorPalette(palette) {
            this.currentPalette = palette;
        }
        
        updateParticles() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const particle = this.particles[i];
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life -= particle.decay;
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                
                if (particle.life <= 0) {
                    this.particles.splice(i, 1);
                }
            }
        }
        
        drawParticles() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (const particle of this.particles) {
                this.ctx.save();
                
                const alpha = particle.life;
                this.ctx.globalAlpha = alpha;
                
                if (particle.type === 'sparkle') {
                    this.drawSparkle(particle);
                } else {
                    this.drawCircle(particle);
                }
                
                this.ctx.restore();
            }
        }
        
        drawCircle(particle) {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        drawSparkle(particle) {
            this.ctx.fillStyle = particle.color;
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.life * Math.PI * 4);
            
            // Draw star shape
            this.ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                const radius = i % 2 === 0 ? particle.size : particle.size / 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.fill();
            
            this.ctx.restore();
        }
        
        animate() {
            this.updateParticles();
            this.drawParticles();
            this.animationId = requestAnimationFrame(() => this.animate());
        }
        
        start() {
            if (this.animationId) return;
            this.animate();
        }
        
        stop() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
        
        destroy() {
            this.stop();
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }
    
    // ===== MICRO INTERACTIONS =====
    class MicroInteractions {
        constructor() {
            this.rippleElements = [];
            this.init();
        }
        
        init() {
            this.setupButtonRipples();
            this.setupCardHovers();
            this.setupFormFocus();
            this.setupMagneticButtons();
        }
        
        setupButtonRipples() {
            const buttons = document.querySelectorAll('.btn, .glass-button, .artwork-button');
            
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.createRipple(e, button);
                });
            });
        }
        
        createRipple(event, element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            // Ensure element has relative positioning
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }
            
            element.style.overflow = 'hidden';
            element.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        }
        
        setupCardHovers() {
            const cards = document.querySelectorAll('.glass-card, .artwork-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    this.addCardGlow(card);
                });
                
                card.addEventListener('mouseleave', () => {
                    this.removeCardGlow(card);
                });
                
                card.addEventListener('mousemove', (e) => {
                    this.updateCardTilt(e, card);
                });
            });
        }
        
        addCardGlow(card) {
            card.style.boxShadow = `
                0 20px 40px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `;
        }
        
        removeCardGlow(card) {
            card.style.boxShadow = '';
        }
        
        updateCardTilt(event, card) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = event.clientX - centerX;
            const mouseY = event.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * -10;
            const rotateY = (mouseX / rect.width) * 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            }, { once: true });
        }
        
        setupFormFocus() {
            const inputs = document.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    const parent = input.closest('.form-group') || input.parentElement;
                    parent?.classList.add('focused');
                    
                    // Add subtle glow effect
                    input.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                });
                
                input.addEventListener('blur', () => {
                    const parent = input.closest('.form-group') || input.parentElement;
                    if (!input.value) {
                        parent?.classList.remove('focused');
                    }
                    
                    input.style.boxShadow = '';
                });
            });
        }
        
        setupMagneticButtons() {
            const buttons = document.querySelectorAll('.magnetic-btn');
            
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.transition = 'transform 0.1s ease';
                });
                
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const moveX = x * 0.1;
                    const moveY = y * 0.1;
                    
                    button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                    button.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
        }
    }
    
    // ===== TEXT ANIMATIONS =====
    class TextAnimations {
        constructor() {
            this.textElements = [];
            this.init();
        }
        
        init() {
            this.setupTextReveal();
            this.setupCounters();
        }
        
        setupTextReveal() {
            const textRevealElements = document.querySelectorAll('.text-reveal');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateTextReveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            textRevealElements.forEach(el => observer.observe(el));
        }
        
        animateTextReveal(element) {
            const words = element.textContent.split(' ');
            element.innerHTML = words.map(word => 
                `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
            ).join(' ');
            
            const spans = element.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        setupCounters() {
            const counters = document.querySelectorAll('[data-counter]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.8 });
            
            counters.forEach(counter => observer.observe(counter));
        }
        
        animateCounter(element) {
            const target = parseInt(element.dataset.counter);
            const duration = 2000;
            const start = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
    
    // ===== PERFORMANCE AWARE ANIMATIONS =====
    class PerformanceAnimations {
        constructor() {
            this.isHighPerformance = this.detectPerformance();
            this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.init();
        }
        
        detectPerformance() {
            // Simple performance detection
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const memory = navigator.deviceMemory;
            const cores = navigator.hardwareConcurrency;
            
            let score = 0;
            
            if (cores >= 4) score += 2;
            if (memory >= 4) score += 2;
            if (connection && connection.effectiveType === '4g') score += 1;
            
            return score >= 3;
        }
        
        init() {
            if (this.reducedMotion) {
                document.body.classList.add('reduced-motion');
                return;
            }
            
            if (!this.isHighPerformance) {
                document.body.classList.add('reduced-animations');
            }
        }
    }
    
    // ===== CSS ANIMATION STYLES =====
    const animationStyles = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .reduced-animations .decorative-circle,
        .reduced-animations .bg-shape {
            animation-duration: 10s;
        }
        
        .form-group.focused label {
            color: var(--color-primary);
            transform: translateY(-4px) scale(0.9);
        }
    `;
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
    
    // ===== INITIALIZATION =====
    document.addEventListener('appReady', () => {
        new RainbowCursor();
        new MicroInteractions();
        new TextAnimations();
        new PerformanceAnimations();
        
        console.log('✅ Animations initialized');
    });
    
    // Export for debugging
    window.AnimationDebug = {
        RainbowCursor,
        MicroInteractions,
        TextAnimations,
        PerformanceAnimations
    };
    
})();
