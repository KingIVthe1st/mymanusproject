// Gallery-Style Paint Loading Experience
// Million-Dollar Agency Quality for The Color Poet

class GalleryPaintLoader {
    constructor() {
        this.loadingContainer = null;
        this.canvas = null;
        this.ctx = null;
        this.progress = 0;
        this.startTime = Date.now();
        this.minLoadTime = 4000; // 4 seconds for elegant experience
        this.isComplete = false;
        this.pageLoaded = false;
        
        // Paint colors matching Amira's palette
        this.colors = [
            '#F6C347', // Warm yellow
            '#EC4899', // Pink
            '#8B5CF6', // Purple
            '#4BC0C0', // Teal
            '#10B981'  // Emerald
        ];
        
        this.init();
    }
    
    init() {
        this.createDOM();
        this.setupCanvas();
        this.animateLetters();
        this.createPaintSplatters();
        this.simulateLoading();
        
        // Listen for actual page load
        window.addEventListener('load', () => {
            this.pageLoaded = true;
        });
    }
    
    createDOM() {
        const loadingHTML = `
            <div class="loading-gallery" id="loadingGallery">
                <!-- Paint Canvas for subtle effects -->
                <canvas id="paintCanvas"></canvas>
                
                <!-- Paint Strokes Animation -->
                <div class="paint-strokes">
                    <div class="paint-stroke stroke-1">
                        <div class="paint-drip"></div>
                    </div>
                    <div class="paint-stroke stroke-2">
                        <div class="paint-drip"></div>
                    </div>
                    <div class="paint-stroke stroke-3">
                        <div class="paint-drip"></div>
                    </div>
                    <div class="paint-stroke stroke-4">
                        <div class="paint-drip"></div>
                    </div>
                </div>
                
                <!-- Loading Content -->
                <div class="loading-content">
                    <h1 class="artist-name">
                        <span>A</span><span>M</span><span>I</span><span>R</span><span>A</span>
                        <span> </span>
                        <span>R</span><span>A</span><span>H</span><span>I</span><span>M</span>
                    </h1>
                    <p class="tagline">The Color Poet</p>
                </div>
                
                <!-- Paint Palette Progress -->
                <div class="progress-palette">
                    <div class="palette-dot dot-1"></div>
                    <div class="palette-dot dot-2"></div>
                    <div class="palette-dot dot-3"></div>
                    <div class="palette-dot dot-4"></div>
                    <div class="palette-dot dot-5"></div>
                </div>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        // Get references
        this.loadingContainer = document.getElementById('loadingGallery');
        this.canvas = document.getElementById('paintCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.paletteDots = document.querySelectorAll('.palette-dot');
        
        // Hide body scroll during loading
        document.body.style.overflow = 'hidden';
        
        // Add gallery-style CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles/gallery-paint-loader.css';
        document.head.appendChild(link);
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Set canvas to subtle paint texture mode
        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.globalAlpha = 0.03;
    }
    
    animateLetters() {
        // Letters are animated via CSS, but we can add paint effects here
        const letters = document.querySelectorAll('.artist-name span');
        
        letters.forEach((letter, index) => {
            // Add subtle paint texture to each letter on hover
            letter.addEventListener('mouseenter', () => {
                this.createLetterSplatter(letter);
            });
        });
    }
    
    createLetterSplatter(element) {
        const rect = element.getBoundingClientRect();
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // Create small paint splatters around the letter
        for (let i = 0; i < 3; i++) {
            const splatter = document.createElement('div');
            splatter.className = 'paint-splatter';
            splatter.style.left = rect.left + rect.width / 2 + 'px';
            splatter.style.top = rect.top + rect.height / 2 + 'px';
            splatter.style.background = color;
            splatter.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            splatter.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
            splatter.style.animationDelay = i * 0.1 + 's';
            
            this.loadingContainer.appendChild(splatter);
            
            // Remove after animation
            setTimeout(() => splatter.remove(), 2000);
        }
    }
    
    createPaintSplatters() {
        // Create ambient paint texture on canvas
        const createTexture = () => {
            for (let i = 0; i < 5; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                const radius = Math.random() * 100 + 50;
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                
                // Create soft paint blob
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, color + '20');
                gradient.addColorStop(0.5, color + '10');
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        };
        
        // Initial texture
        createTexture();
        
        // Subtle animation
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            createTexture();
        }, 3000);
    }
    
    updateProgress(progress) {
        this.progress = Math.min(progress, 100);
        
        // Fill palette dots based on progress
        const dotsToFill = Math.floor((this.progress / 100) * this.paletteDots.length);
        
        this.paletteDots.forEach((dot, index) => {
            if (index < dotsToFill) {
                dot.classList.add('filled');
                
                // Create paint splatter when dot fills
                if (!dot.classList.contains('splattered')) {
                    dot.classList.add('splattered');
                    this.createDotSplatter(dot, index);
                }
            }
        });
    }
    
    createDotSplatter(dot, index) {
        const rect = dot.getBoundingClientRect();
        const color = this.colors[index];
        
        // Create paint splash effect
        for (let i = 0; i < 5; i++) {
            const splatter = document.createElement('div');
            splatter.className = 'paint-splatter';
            splatter.style.left = rect.left + rect.width / 2 + 'px';
            splatter.style.top = rect.top + rect.height / 2 + 'px';
            splatter.style.background = color;
            splatter.style.width = Math.random() * 6 + 4 + 'px';
            splatter.style.height = splatter.style.width;
            splatter.style.setProperty('--tx', (Math.random() - 0.5) * 60 + 'px');
            splatter.style.setProperty('--ty', (Math.random() - 0.5) * 60 + 'px');
            splatter.style.animationDelay = i * 0.05 + 's';
            
            this.loadingContainer.appendChild(splatter);
            
            // Remove after animation
            setTimeout(() => splatter.remove(), 2000);
        }
    }
    
    simulateLoading() {
        const duration = 4000;
        const startTime = Date.now();
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            let progress = Math.min((elapsed / duration) * 100, 90);
            
            // Wait for actual page load for final 10%
            if (progress >= 90 && this.pageLoaded) {
                progress = 100;
            }
            
            this.updateProgress(progress);
            
            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                this.completeLoading();
            }
        };
        
        updateProgress();
    }
    
    completeLoading() {
        // Ensure minimum load time for elegant experience
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.minLoadTime - elapsed);
        
        setTimeout(() => {
            this.isComplete = true;
            this.loadingContainer.classList.add('complete');
            
            // Create final paint splash celebration
            this.createCompletionSplash();
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Clean up after animation
            setTimeout(() => {
                if (this.loadingContainer && this.loadingContainer.parentNode) {
                    this.loadingContainer.parentNode.removeChild(this.loadingContainer);
                }
            }, 2000);
        }, remaining);
    }
    
    createCompletionSplash() {
        // Create a burst of paint splatters
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 20; i++) {
            const splatter = document.createElement('div');
            splatter.className = 'paint-splatter';
            splatter.style.left = centerX + 'px';
            splatter.style.top = centerY + 'px';
            splatter.style.background = this.colors[i % this.colors.length];
            splatter.style.width = Math.random() * 10 + 5 + 'px';
            splatter.style.height = splatter.style.width;
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = Math.random() * 200 + 100;
            splatter.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            splatter.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            splatter.style.animationDuration = '1.5s';
            
            this.loadingContainer.appendChild(splatter);
        }
    }
}

// Initialize the gallery loader
(function() {
    // Check if we should show the loader
    const showLoader = !sessionStorage.getItem('galleryLoaderShown');
    
    if (showLoader) {
        // Mark as shown for this session
        sessionStorage.setItem('galleryLoaderShown', 'true');
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new GalleryPaintLoader();
            });
        } else {
            new GalleryPaintLoader();
        }
    }
})();