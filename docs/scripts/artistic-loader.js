// Advanced Artistic Page Loader with Paint Splash Animation
class ArtisticLoader {
  constructor() {
    this.colors = {
      primary: ['#ec4899', '#f6c347', '#a78bfa'],
      secondary: ['#fce7f3', '#fef3c7', '#ede9fe']
    };
    this.isLoaded = false;
    this.loadStartTime = performance.now();
    this.minimumLoadTime = 2000; // Minimum time to show loader for smooth experience
    this.init();
  }
  
  init() {
    // Hide content initially
    document.body.style.overflow = 'hidden';
    
    // Create loader elements
    this.createLoaderStructure();
    
    // Start animations
    this.animatePaintSplash();
    
    // Monitor page load
    this.monitorPageLoad();
    
    // Optimize images
    this.setupLazyLoading();
  }
  
  createLoaderStructure() {
    const loader = document.createElement('div');
    loader.className = 'artistic-loader';
    loader.innerHTML = `
      <div class="loader-background"></div>
      <div class="paint-splash-container">
        <svg class="paint-splash-svg" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="paint-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            </filter>
            
            <linearGradient id="paint-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${this.colors.primary[0]};stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:${this.colors.secondary[0]};stop-opacity:0.7" />
            </linearGradient>
            
            <linearGradient id="paint-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${this.colors.primary[1]};stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:${this.colors.secondary[1]};stop-opacity:0.7" />
            </linearGradient>
            
            <linearGradient id="paint-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${this.colors.primary[2]};stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:${this.colors.secondary[2]};stop-opacity:0.7" />
            </linearGradient>
          </defs>
          
          <g class="paint-drops" filter="url(#paint-goo)">
            <!-- Paint drops will be dynamically created -->
          </g>
        </svg>
        
        <div class="loader-content">
          <h1 class="artist-name">Amira Rahim</h1>
          <div class="loading-text">
            <span class="loading-word">Creating Art</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(loader);
    this.loader = loader;
    this.paintDropsGroup = loader.querySelector('.paint-drops');
    this.progressBar = loader.querySelector('.progress-fill');
    
    // Create initial paint drops
    this.createPaintDrops();
  }
  
  createPaintDrops() {
    const dropCount = 3;
    const centerX = 400;
    const centerY = 400;
    
    // Create organic paint shapes instead of circles
    for (let i = 0; i < dropCount; i++) {
      const angle = (i / dropCount) * Math.PI * 2 + Math.PI / 6;
      const radius = 120;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const drop = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      drop.setAttribute('cx', x);
      drop.setAttribute('cy', y);
      drop.setAttribute('r', '50');
      drop.setAttribute('fill', `url(#paint-gradient-${(i % 3) + 1})`);
      drop.classList.add('paint-drop');
      drop.style.setProperty('--drop-index', i);
      drop.style.setProperty('--drop-delay', `${i * 0.15}s`);
      
      this.paintDropsGroup.appendChild(drop);
    }
  }
  
  animatePaintSplash() {
    // Animate paint drops with smoother timing
    const drops = this.paintDropsGroup.querySelectorAll('.paint-drop');
    drops.forEach((drop, index) => {
      drop.style.animation = 'dropExpand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      drop.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Update progress bar
    this.updateProgress();
  }
  
  updateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      this.progressBar.style.width = `${progress}%`;
    }, 30);
  }
  
  monitorPageLoad() {
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      this.handlePageLoad();
    } else {
      // Wait for page load
      window.addEventListener('load', () => this.handlePageLoad());
    }
    
    // Also monitor critical resources
    this.monitorCriticalResources();
  }
  
  monitorCriticalResources() {
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');
    const imagePromises = Array.from(criticalImages).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        }
      });
    });
    
    Promise.all(imagePromises).then(() => {
      this.criticalResourcesLoaded = true;
    });
  }
  
  handlePageLoad() {
    const loadTime = performance.now() - this.loadStartTime;
    const remainingTime = Math.max(0, this.minimumLoadTime - loadTime);
    
    // Ensure minimum display time for smooth experience
    setTimeout(() => {
      this.hideLoader();
    }, remainingTime);
  }
  
  hideLoader() {
    if (this.isLoaded) return;
    this.isLoaded = true;
    
    // Add exit animation class
    this.loader.classList.add('loader-exit');
    
    // Reveal content with stagger effect
    this.revealContent();
    
    // Remove loader after animation
    setTimeout(() => {
      document.body.style.overflow = '';
      this.loader.remove();
    }, 1000);
  }
  
  revealContent() {
    // Add loaded class to body
    document.body.classList.add('content-loaded');
    
    // Stagger reveal animations for different sections
    const sections = document.querySelectorAll('section, .hero-section, .navbar');
    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      setTimeout(() => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 100);
    });
    
    // Animate individual elements
    this.animateElements();
  }
  
  animateElements() {
    // Animate cards with stagger
    const cards = document.querySelectorAll('.glass-card, .artwork-item, .education-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      card.classList.add('reveal-animation');
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 800 + (index * 50));
    });
  }
  
  setupLazyLoading() {
    // Lazy load images for better performance
    const images = document.querySelectorAll('img:not([data-critical="true"])');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Load the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            // Add fade-in animation
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease-out';
            
            img.onload = () => {
              img.style.opacity = '1';
              img.classList.add('loaded');
            };
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
}

// Initialize loader when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ArtisticLoader();
  });
} else {
  new ArtisticLoader();
}