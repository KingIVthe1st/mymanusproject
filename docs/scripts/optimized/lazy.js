/*
 * LAZY.JS - Phase 1 Optimization
 * Deferred Functionality, Testimonials, Dynamic Loading
 * Generated: 2025-06-07
 */

(function() {
    'use strict';
    
    // ===== TESTIMONIALS AUTO-SCROLL =====
    class TestimonialsAutoScroll {
        constructor() {
            this.container = null;
            this.track = null;
            this.dots = [];
            this.currentIndex = 0;
            this.itemsPerView = 3;
            this.totalItems = 0;
            this.intervalId = null;
            this.isPaused = false;
            this.autoScrollDelay = 3000;
            
            this.init();
        }
        
        init() {
            this.container = document.querySelector('.testimonials-container');
            this.track = document.querySelector('.testimonials-track');
            this.dots = document.querySelectorAll('.nav-dot');
            
            if (!this.container || !this.track) return;
            
            this.totalItems = this.track.children.length;
            this.setupObserver();
            this.setupControls();
            this.setupResponsive();
            this.start();
        }
        
        setupObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.start();
                    } else {
                        this.pause();
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(this.container);
        }
        
        setupControls() {
            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.pause());
            this.container.addEventListener('mouseleave', () => this.resume());
            
            // Touch pause
            this.container.addEventListener('touchstart', () => this.pause());
            this.container.addEventListener('touchend', () => {
                setTimeout(() => this.resume(), 5000);
            });
            
            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.pause();
                    setTimeout(() => this.resume(), 5000);
                });
            });
        }
        
        setupResponsive() {
            const updateItemsPerView = () => {
                if (window.innerWidth < 768) {
                    this.itemsPerView = 1;
                } else if (window.innerWidth < 1200) {
                    this.itemsPerView = 2;
                } else {
                    this.itemsPerView = 3;
                }
            };
            
            updateItemsPerView();
            window.addEventListener('resize', updateItemsPerView);
        }
        
        scroll() {
            if (this.isPaused || !this.track) return;
            
            const cardWidth = this.track.children[0]?.offsetWidth + 32 || 320; // Including gap
            const maxScroll = (this.totalItems - this.itemsPerView) * cardWidth;
            
            this.currentIndex = (this.currentIndex + 1) % Math.ceil(this.totalItems / this.itemsPerView);
            const scrollPosition = Math.min(this.currentIndex * cardWidth * this.itemsPerView, maxScroll);
            
            this.track.style.transform = `translateX(-${scrollPosition}px)`;
            this.updateDots();
            
            // Reset to beginning if reached end
            if (scrollPosition >= maxScroll) {
                setTimeout(() => {
                    this.currentIndex = 0;
                    this.track.style.transform = 'translateX(0)';
                    this.updateDots();
                }, 1000);
            }
        }
        
        goToSlide(index) {
            const cardWidth = this.track.children[0]?.offsetWidth + 32 || 320;
            const scrollPosition = index * cardWidth * this.itemsPerView;
            
            this.currentIndex = index;
            this.track.style.transform = `translateX(-${scrollPosition}px)`;
            this.updateDots();
        }
        
        updateDots() {
            this.dots.forEach((dot, index) => {
                if (index === this.currentIndex) {
                    dot.style.background = 'white';
                    dot.style.transform = 'scale(1.2)';
                } else {
                    dot.style.background = 'rgba(255, 255, 255, 0.5)';
                    dot.style.transform = 'scale(1)';
                }
            });
        }
        
        start() {
            if (this.intervalId) return;
            this.intervalId = setInterval(() => this.scroll(), this.autoScrollDelay);
        }
        
        pause() {
            this.isPaused = true;
        }
        
        resume() {
            this.isPaused = false;
        }
        
        stop() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }
    }
    
    // ===== DYNAMIC CSS LOADER =====
    class DynamicCSSLoader {
        constructor() {
            this.loadedStyles = new Set();
            this.init();
        }
        
        init() {
            this.loadDeferredStyles();
        }
        
        loadDeferredStyles() {
            const deferredStyles = [
                'styles/featured-logos.css?v=1.1',
                'styles/education-button-fix.css',
                'styles/education-visibility-fix.css',
                'styles/collaborate-badge-fix.css',
                'styles/premium-effects-enhanced.css',
                'styles/luxury-typography.css',
                'styles/footer-enhancement.css'
            ];
            
            // Load in chunks to avoid blocking
            this.loadStylesInChunks(deferredStyles, 3);
        }
        
        loadStylesInChunks(styles, chunkSize) {
            for (let i = 0; i < styles.length; i += chunkSize) {
                const chunk = styles.slice(i, i + chunkSize);
                
                setTimeout(() => {
                    chunk.forEach(href => this.loadStyle(href));
                }, i * 100);
            }
        }
        
        loadStyle(href) {
            if (this.loadedStyles.has(href)) return;
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            
            link.onload = () => {
                link.media = 'all';
                this.loadedStyles.add(href);
            };
            
            document.head.appendChild(link);
        }
    }
    
    // ===== LAZY FEATURES =====
    class LazyFeatures {
        constructor() {
            this.observers = new Map();
            this.init();
        }
        
        init() {
            this.setupLazyBackgrounds();
            this.setupLazyComponents();
        }
        
        setupLazyBackgrounds() {
            const lazyBackgrounds = document.querySelectorAll('[data-bg]');
            
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bg = entry.target.dataset.bg;
                        entry.target.style.backgroundImage = `url(${bg})`;
                        entry.target.classList.add('bg-loaded');
                        bgObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '50px' });
            
            lazyBackgrounds.forEach(el => bgObserver.observe(el));
        }
        
        setupLazyComponents() {
            const lazyComponents = document.querySelectorAll('[data-lazy-component]');
            
            const componentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadComponent(entry.target);
                        componentObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '100px' });
            
            lazyComponents.forEach(el => componentObserver.observe(el));
        }
        
        loadComponent(element) {
            const componentType = element.dataset.lazyComponent;
            
            switch (componentType) {
                case 'gallery':
                    this.loadGallery(element);
                    break;
                case 'contact-form':
                    this.loadContactForm(element);
                    break;
                case 'social-feed':
                    this.loadSocialFeed(element);
                    break;
            }
        }
        
        loadGallery(element) {
            element.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') {
                    this.openLightbox(e.target);
                }
            });
        }
        
        openLightbox(img) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(lightbox);
            requestAnimationFrame(() => lightbox.style.opacity = '1');
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.style.opacity = '0';
                    setTimeout(() => lightbox.remove(), 300);
                }
            });
        }
        
        loadContactForm(element) {
            const form = element.querySelector('form');
            if (!form) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
        
        handleFormSubmit(form) {
            const submitButton = form.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                this.showFormSuccess(form);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                form.reset();
            }, 2000);
        }
        
        showFormSuccess(form) {
            const message = document.createElement('div');
            message.textContent = 'Thank you! Your message has been sent.';
            message.style.cssText = `
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            `;
            
            form.appendChild(message);
            requestAnimationFrame(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            });
            
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 300);
            }, 5000);
        }
        
        loadSocialFeed(element) {
            element.innerHTML = '<div class="social-placeholder"><p>Social feed loading...</p></div>';
        }
    }
    
    // ===== OPTIMIZED SCROLLING =====
    class OptimizedScrolling {
        constructor() {
            this.ticking = false;
            this.scrollCallbacks = [];
            this.init();
        }
        
        init() {
            this.setupScrollHandler();
        }
        
        setupScrollHandler() {
            window.addEventListener('scroll', () => {
                if (!this.ticking) {
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        this.ticking = false;
                    });
                    this.ticking = true;
                }
            }, { passive: true });
        }
        
        handleScroll() {
            const scrollTop = window.pageYOffset;
            const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
            
            this.scrollCallbacks.forEach(callback => {
                try {
                    callback(scrollTop, scrollPercent);
                } catch (error) {
                    console.error('Scroll callback error:', error);
                }
            });
        }
        
        addScrollCallback(callback) {
            this.scrollCallbacks.push(callback);
        }
    }
    
    // ===== RESOURCE PREFETCHER =====
    class ResourcePrefetcher {
        constructor() {
            this.prefetched = new Set();
            this.init();
        }
        
        init() {
            this.setupHoverPrefetch();
        }
        
        setupHoverPrefetch() {
            const links = document.querySelectorAll('a[href]');
            
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    this.prefetchLink(link.href);
                }, { once: true });
            });
        }
        
        prefetchLink(url) {
            if (this.prefetched.has(url) || !url.startsWith(window.location.origin)) return;
            
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
            
            this.prefetched.add(url);
        }
    }
    
    // ===== SERVICE WORKER REGISTRATION =====
    class ServiceWorkerManager {
        constructor() {
            this.init();
        }
        
        init() {
            if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                this.registerServiceWorker();
            }
        }
        
        async registerServiceWorker() {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered:', registration);
            } catch (error) {
                console.log('ServiceWorker registration failed:', error);
            }
        }
    }
    
    // ===== ANALYTICS TRACKER =====
    class AnalyticsTracker {
        constructor() {
            this.events = [];
            this.init();
        }
        
        init() {
            this.setupVisibilityTracking();
            this.setupInteractionTracking();
        }
        
        setupVisibilityTracking() {
            const sections = document.querySelectorAll('section[id]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackEvent('section_view', {
                            section: entry.target.id,
                            timestamp: Date.now()
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            sections.forEach(section => observer.observe(section));
        }
        
        setupInteractionTracking() {
            // Track button clicks
            document.addEventListener('click', (e) => {
                const button = e.target.closest('button, .btn, a[href^="#"]');
                if (button) {
                    this.trackEvent('interaction', {
                        type: 'click',
                        element: button.tagName.toLowerCase(),
                        text: button.textContent.trim().substring(0, 50),
                        timestamp: Date.now()
                    });
                }
            });
            
            // Track form submissions
            document.addEventListener('submit', (e) => {
                this.trackEvent('form_submit', {
                    form: e.target.id || 'unnamed',
                    timestamp: Date.now()
                });
            });
        }
        
        trackEvent(eventName, data) {
            this.events.push({ event: eventName, data });
            
            // Log to console in development
            if (window.location.hostname === 'localhost') {
                console.log('Analytics Event:', eventName, data);
            }
            
            // Here you would send to your analytics service
            // this.sendToAnalytics(eventName, data);
        }
    }
    
    // ===== INITIALIZATION =====
    document.addEventListener('appReady', () => {
        // Initialize all lazy-loaded features
        new TestimonialsAutoScroll();
        new DynamicCSSLoader();
        new LazyFeatures();
        new OptimizedScrolling();
        new ResourcePrefetcher();
        new ServiceWorkerManager();
        new AnalyticsTracker();
        
        console.log('✅ Lazy features initialized');
    });
    
    // Export for debugging
    window.LazyDebug = {
        TestimonialsAutoScroll,
        DynamicCSSLoader,
        LazyFeatures,
        OptimizedScrolling,
        ResourcePrefetcher,
        ServiceWorkerManager,
        AnalyticsTracker
    };
    
})();
