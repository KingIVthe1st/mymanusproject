// Mobile Menu Luxury Animations - Multi-Million Dollar Agency Quality
(function() {
  'use strict';

  // Configuration
  const config = {
    shootingStars: {
      enabled: true,
      frequency: 2000, // New star every 2 seconds for more activity
      minDuration: 2500,
      maxDuration: 4000,
      colors: [
        'rgba(147, 51, 234, 0.4)', // Purple
        'rgba(236, 72, 153, 0.5)', // Pink
        'rgba(251, 191, 36, 0.4)',  // Amber
        'rgba(59, 130, 246, 0.4)',  // Blue
        'rgba(34, 211, 238, 0.4)'   // Cyan
      ]
    },
    ambientParticles: {
      enabled: true,
      count: 8,
      colors: [
        'rgba(147, 51, 234, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(251, 191, 36, 0.6)'
      ]
    },
    constellations: {
      enabled: true,
      count: 12,
      twinkleDelay: 200
    },
    glowOrbs: {
      enabled: true,
      positions: [
        { class: 'purple', top: '10%', right: '-10%' },
        { class: 'pink', bottom: '20%', left: '-5%' },
        { class: 'amber', top: '60%', right: '10%' }
      ]
    }
  };

  // Check if animations should be reduced
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile Menu Animation Manager
  class MobileMenuAnimations {
    constructor() {
      this.container = null;
      this.starsContainer = null;
      this.animationFrameId = null;
      this.shootingStarInterval = null;
      this.isActive = false;
    }

    init() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.container = document.querySelector('.mobile-menu-container');
      if (!this.container) {
        console.warn('Mobile menu container not found');
        return;
      }

      // Create animation containers
      this.createAnimationContainers();

      // Listen for menu state changes
      this.observeMenuState();
    }

    createAnimationContainers() {
      // Create stars container
      this.starsContainer = document.createElement('div');
      this.starsContainer.className = 'mobile-menu-stars';
      this.container.insertBefore(this.starsContainer, this.container.firstChild);

      // Add glow orbs
      if (config.glowOrbs.enabled && !prefersReducedMotion) {
        this.createGlowOrbs();
      }

      // Add constellation dots
      if (config.constellations.enabled && !prefersReducedMotion) {
        this.createConstellationDots();
      }

      // Add ambient particles
      if (config.ambientParticles.enabled && !prefersReducedMotion) {
        this.createAmbientParticles();
      }
    }

    createGlowOrbs() {
      config.glowOrbs.positions.forEach((orb, index) => {
        const orbElement = document.createElement('div');
        orbElement.className = `glow-orb ${orb.class}`;
        
        // Set position
        Object.keys(orb).forEach(key => {
          if (key !== 'class' && orb[key]) {
            orbElement.style[key] = orb[key];
          }
        });

        // Add animation delay for staggered effect
        orbElement.style.animationDelay = `${index * 2}s`;
        
        this.starsContainer.appendChild(orbElement);
      });
    }

    createConstellationDots() {
      for (let i = 0; i < config.constellations.count; i++) {
        const dot = document.createElement('div');
        dot.className = 'constellation-dot';
        
        // Random position
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        dot.style.animationDelay = `${Math.random() * 4}s`;
        
        this.starsContainer.appendChild(dot);
      }
    }

    createAmbientParticles() {
      for (let i = 0; i < config.ambientParticles.count; i++) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${50 + Math.random() * 50}%`;
        
        // Random color
        const color = config.ambientParticles.colors[Math.floor(Math.random() * config.ambientParticles.colors.length)];
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        this.starsContainer.appendChild(particle);
      }
    }

    createShootingStar() {
      if (!this.isActive || prefersReducedMotion) return;

      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random starting position on the left or top edge
      const startFromTop = Math.random() > 0.5;
      if (startFromTop) {
        star.style.top = `${Math.random() * 30}%`;
        star.style.left = '-100px';
      } else {
        star.style.top = '-20px';
        star.style.left = `${Math.random() * 50}%`;
      }
      
      // Random angle between 30-60 degrees
      const angle = 30 + Math.random() * 30;
      star.style.transform = `rotate(${angle}deg)`;
      
      // Random width for variety
      const width = 100 + Math.random() * 150;
      star.style.width = `${width}px`;
      
      // Enhanced multi-color gradient
      const colors = [
        'rgba(147, 51, 234, 0.5)',  // Purple
        'rgba(236, 72, 153, 0.7)',  // Pink
        'rgba(251, 191, 36, 0.6)',  // Amber
        'rgba(59, 130, 246, 0.5)',  // Blue
        'rgba(34, 211, 238, 0.5)'   // Cyan
      ];
      
      // Create a more vibrant gradient
      const gradient = `linear-gradient(90deg, 
        transparent 0%,
        ${colors[0]} 25%,
        ${colors[1]} 40%,
        ${colors[2]} 55%,
        ${colors[3]} 70%,
        ${colors[4]} 85%,
        transparent 100%
      )`;
      
      star.style.background = gradient;
      
      // Random duration
      const duration = config.shootingStars.minDuration + Math.random() * (config.shootingStars.maxDuration - config.shootingStars.minDuration);
      star.style.animationDuration = `${duration}ms`;
      
      // Add color burst element
      const burst = document.createElement('div');
      burst.style.cssText = `
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 120px;
        height: 120px;
        pointer-events: none;
        transform: translate(0, -50%);
        opacity: 0;
        animation: colorBurst ${duration}ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
        background: radial-gradient(
          circle,
          ${colors[1]} 0%,
          ${colors[0]} 20%,
          ${colors[2]} 40%,
          ${colors[3]} 60%,
          transparent 80%
        );
      `;
      star.appendChild(burst);
      
      this.starsContainer.appendChild(star);
      
      // Create particle trail
      this.createParticleTrail(star, duration, angle);
      
      // Remove star after animation
      setTimeout(() => {
        star.remove();
      }, duration);
    }

    createParticleTrail(star, duration, angle) {
      const particleCount = 5 + Math.floor(Math.random() * 5);
      const delay = duration / particleCount;
      
      for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
          if (!star.parentElement) return; // Star already removed
          
          const rect = star.getBoundingClientRect();
          const containerRect = this.starsContainer.getBoundingClientRect();
          
          const particle = document.createElement('div');
          particle.className = 'star-particle';
          
          // Position particle along the star's path
          const progress = i / particleCount;
          const x = rect.left - containerRect.left + (rect.width * progress * 0.7);
          const y = rect.top - containerRect.top + (Math.sin(progress * Math.PI) * 10);
          
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          
          // Random drift direction
          const driftX = (Math.random() - 0.5) * 30;
          const driftY = Math.random() * 20 + 10;
          particle.style.setProperty('--drift-x', `${driftX}px`);
          particle.style.setProperty('--drift-y', `${driftY}px`);
          
          // Random color for variety
          const colors = [
            'rgba(251, 191, 36, 0.8)',
            'rgba(236, 72, 153, 0.8)', 
            'rgba(147, 51, 234, 0.8)',
            'rgba(59, 130, 246, 0.8)'
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
          
          this.starsContainer.appendChild(particle);
          
          // Remove particle after animation
          setTimeout(() => particle.remove(), 1500);
        }, i * delay);
      }
    }

    startShootingStars() {
      if (!config.shootingStars.enabled || this.shootingStarInterval) return;
      
      // Create first star immediately
      this.createShootingStar();
      
      // Create stars at intervals
      this.shootingStarInterval = setInterval(() => {
        this.createShootingStar();
      }, config.shootingStars.frequency);
    }

    stopShootingStars() {
      if (this.shootingStarInterval) {
        clearInterval(this.shootingStarInterval);
        this.shootingStarInterval = null;
      }
    }

    observeMenuState() {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!mobileMenu) return;

      // Create mutation observer to watch for class changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isMenuActive = mobileMenu.classList.contains('active');
            this.handleMenuStateChange(isMenuActive);
          }
        });
      });

      observer.observe(mobileMenu, { attributes: true });

      // Check initial state
      const isMenuActive = mobileMenu.classList.contains('active');
      this.handleMenuStateChange(isMenuActive);
    }

    handleMenuStateChange(isActive) {
      this.isActive = isActive;
      
      if (isActive) {
        this.startAnimations();
      } else {
        this.stopAnimations();
      }
    }

    startAnimations() {
      this.startShootingStars();
      
      // Add active class to container for CSS animations
      if (this.starsContainer) {
        this.starsContainer.classList.add('active');
      }
    }

    stopAnimations() {
      this.stopShootingStars();
      
      // Remove active class
      if (this.starsContainer) {
        this.starsContainer.classList.remove('active');
      }
    }

    // Touch interaction for mobile
    addTouchInteractions() {
      if (!this.container) return;

      let touchStartY = 0;
      
      this.container.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      this.container.addEventListener('touchmove', (e) => {
        if (!this.isActive) return;
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Create particle at touch position with subtle effect
        if (Math.abs(deltaY) > 10 && Math.random() > 0.7) {
          this.createTouchParticle(e.touches[0].clientX, touchY);
          touchStartY = touchY;
        }
      }, { passive: true });
    }

    createTouchParticle(x, y) {
      const particle = document.createElement('div');
      particle.className = 'touch-particle';
      particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: touchParticleFade 1s ease-out forwards;
      `;
      
      this.starsContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // Add touch particle animation to stylesheet
  const style = document.createElement('style');
  style.textContent = `
    @keyframes touchParticleFade {
      0% {
        transform: scale(0) translate(-50%, -50%);
        opacity: 1;
      }
      100% {
        transform: scale(3) translate(-50%, -50%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize animations
  const mobileMenuAnimations = new MobileMenuAnimations();
  mobileMenuAnimations.init();

})();