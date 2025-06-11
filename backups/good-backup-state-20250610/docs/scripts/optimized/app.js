/*
 * APP.JS - Phase 1 Optimization
 * Navigation, Scroll Behavior, Core Interactions
 * Generated: 2025-06-07
 */

(function() {
    'use strict';
    
    // ===== PERFORMANCE UTILITIES =====
    const debounce = (func, wait, immediate) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    };
    
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // ===== NAVIGATION SYSTEM =====
    class NavigationManager {
        constructor() {
            this.navbar = document.getElementById('main-navbar');
            this.mobileToggle = document.querySelector('.navbar-mobile-toggle');
            this.mobileMenu = document.querySelector('.mobile-menu');
            this.mobileOverlay = document.querySelector('.mobile-menu-overlay');
            this.mobileLinks = document.querySelectorAll('.mobile-nav-link');
            this.closeButton = document.querySelector('.mobile-close-btn');
            this.lastScrollTop = 0;
            this.isScrolling = false;
            this.scrollTimer = null;
            
            this.init();
        }
        
        init() {
            this.setupNavbar();
            this.setupMobileMenu();
            this.setupScrollBehavior();
            this.setupSmoothScrolling();
        }
        
        setupNavbar() {
            if (!this.navbar) return;
            
            // Apply navigation fixes
            this.navbar.style.setProperty('display', 'flex', 'important');
            this.navbar.style.setProperty('position', 'fixed', 'important');
            this.navbar.style.setProperty('top', '0', 'important');
            this.navbar.style.setProperty('z-index', '1000', 'important');
            this.navbar.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Grid layout for navbar container
            const navContainer = this.navbar.querySelector('.navbar-container');
            if (navContainer) {
                navContainer.style.setProperty('display', 'grid', 'important');
                navContainer.style.setProperty('grid-template-columns', '200px 1fr 200px', 'important');
                navContainer.style.setProperty('align-items', 'center', 'important');
            }
        }
        
        setupMobileMenu() {
            if (!this.mobileToggle || !this.mobileMenu) return;
            
            this.mobileToggle.addEventListener('click', () => this.toggleMenu());
            
            if (this.closeButton) {
                this.closeButton.addEventListener('click', () => this.closeMenu());
            }
            
            if (this.mobileOverlay) {
                this.mobileOverlay.addEventListener('click', () => this.closeMenu());
            }
            
            // Close menu when clicking on links
            this.mobileLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeMenu();
            });
        }
        
        toggleMenu() {
            const isOpening = !this.mobileMenu.classList.contains('active');
            
            this.mobileToggle?.classList.toggle('active');
            this.mobileMenu?.classList.toggle('active');
            this.mobileOverlay?.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            if (isOpening) {
                this.animateMobileLinks();
            }
        }
        
        closeMenu() {
            if (this.mobileMenu?.classList.contains('active')) {
                this.mobileToggle?.classList.remove('active');
                this.mobileMenu?.classList.remove('active');
                this.mobileOverlay?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        animateMobileLinks() {
            this.mobileLinks.forEach((link, index) => {
                link.style.animation = `fadeInRight 0.4s ease-out ${index * 0.08}s forwards`;
                link.style.opacity = '0';
                link.style.transform = 'translateX(20px)';
            });
        }
        
        setupScrollBehavior() {
            if (!this.navbar) return;
            
            const handleScroll = throttle(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    if (scrollTop > this.lastScrollTop && Math.abs(scrollTop - this.lastScrollTop) > 5) {
                        // Scrolling down - hide navbar
                        this.navbar.style.transform = 'translateY(-100%)';
                        this.navbar.style.opacity = '0.8';
                    } else if (scrollTop < this.lastScrollTop && Math.abs(scrollTop - this.lastScrollTop) > 5) {
                        // Scrolling up - show navbar
                        this.navbar.style.transform = 'translateY(0)';
                        this.navbar.style.opacity = '1';
                    }
                } else {
                    // Near top - always show navbar
                    this.navbar.style.transform = 'translateY(0)';
                    this.navbar.style.opacity = '1';
                }
                
                this.lastScrollTop = scrollTop;
                
                // Show navbar after scrolling stops
                clearTimeout(this.scrollTimer);
                this.scrollTimer = setTimeout(() => {
                    this.navbar.style.transform = 'translateY(0)';
                    this.navbar.style.opacity = '1';
                }, 1500);
            }, 16);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // Show navbar on mouse movement near top
            document.addEventListener('mousemove', (e) => {
                if (e.clientY < 100) {
                    this.navbar.style.transform = 'translateY(0)';
                    this.navbar.style.opacity = '1';
                }
            });
            
            // Always show navbar when hovering
            this.navbar.addEventListener('mouseenter', () => {
                this.navbar.style.transform = 'translateY(0)';
                this.navbar.style.opacity = '1';
            });
        }
        
        setupSmoothScrolling() {
            // Smooth scroll for anchor links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a[href^="#"]');
                if (!link) return;
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMenu();
                }
            });
        }
    }
    
    // ===== SCROLL PROGRESS INDICATOR =====
    class ScrollProgress {
        constructor() {
            this.progressBar = document.querySelector('.scroll-progress');
            this.init();
        }
        
        init() {
            if (!this.progressBar) return;
            
            const updateProgress = throttle(() => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
            }, 16);
            
            window.addEventListener('scroll', updateProgress, { passive: true });
        }
    }
    
    // ===== REVEAL ANIMATIONS =====
    class RevealAnimations {
        constructor() {
            this.revealElements = document.querySelectorAll('.reveal');
            this.observer = null;
            this.init();
        }
        
        init() {
            if (!this.revealElements.length) return;
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            this.revealElements.forEach(el => this.observer.observe(el));
        }
    }
    
    // ===== IMAGE LAZY LOADING =====
    class LazyImageLoader {
        constructor() {
            this.lazyImages = document.querySelectorAll('img[loading="lazy"]');
            this.init();
        }
        
        init() {
            if (!this.lazyImages.length) return;
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            this.lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // ===== FORM ENHANCEMENTS =====
    class FormEnhancements {
        constructor() {
            this.forms = document.querySelectorAll('form');
            this.init();
        }
        
        init() {
            this.forms.forEach(form => {
                this.setupFormValidation(form);
                this.setupInputAnimations(form);
            });
        }
        
        setupFormValidation(form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', debounce(() => this.validateField(input), 300));
            });
        }
        
        validateField(field) {
            const isValid = field.checkValidity();
            field.classList.toggle('invalid', !isValid);
            field.classList.toggle('valid', isValid);
        }
        
        setupInputAnimations(form) {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement?.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement?.classList.remove('focused');
                    }
                });
            });
        }
    }
    
    // ===== PERFORMANCE MONITOR =====
    class PerformanceMonitor {
        constructor() {
            this.frameCount = 0;
            this.lastTime = performance.now();
            this.fps = 0;
            this.init();
        }
        
        init() {
            if (window.location.search.includes('debug=performance')) {
                this.startMonitoring();
            }
        }
        
        startMonitoring() {
            const measure = (currentTime) => {
                this.frameCount++;
                
                if (currentTime - this.lastTime >= 1000) {
                    this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                    console.log(`FPS: ${this.fps}`);
                    
                    this.frameCount = 0;
                    this.lastTime = currentTime;
                    
                    // Auto-adjust quality if FPS drops below 30
                    if (this.fps < 30) {
                        this.reduceQuality();
                    }
                }
                
                requestAnimationFrame(measure);
            };
            
            requestAnimationFrame(measure);
        }
        
        reduceQuality() {
            document.body.classList.add('reduced-quality');
            console.warn('Performance mode activated - reduced visual effects');
        }
    }
    
    // ===== INITIALIZATION =====
    class AppInitializer {
        constructor() {
            this.components = [];
            this.init();
        }
        
        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initComponents());
            } else {
                this.initComponents();
            }
        }
        
        initComponents() {
            try {
                // Initialize core components
                this.components.push(new NavigationManager());
                this.components.push(new ScrollProgress());
                this.components.push(new RevealAnimations());
                this.components.push(new LazyImageLoader());
                this.components.push(new FormEnhancements());
                this.components.push(new PerformanceMonitor());
                
                // Set up error handling
                this.setupErrorHandling();
                
                // Fire custom event when app is ready
                document.dispatchEvent(new CustomEvent('appReady'));
                
                console.log('✅ App initialized successfully');
            } catch (error) {
                console.error('❌ App initialization failed:', error);
            }
        }
        
        setupErrorHandling() {
            window.addEventListener('error', (event) => {
                console.error('Runtime error:', event.error);
            });
            
            window.addEventListener('unhandledrejection', (event) => {
                console.error('Unhandled promise rejection:', event.reason);
            });
        }
    }
    
    // Start the application
    new AppInitializer();
    
    // Export for debugging
    window.AppDebug = {
        NavigationManager,
        ScrollProgress,
        RevealAnimations,
        LazyImageLoader,
        FormEnhancements,
        PerformanceMonitor
    };
    
})();
