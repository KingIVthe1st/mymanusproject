// Premium Paint Splash Loading Screen JavaScript
// Million-Dollar Agency Quality Loading Experience

class PaintSplashLoader {
    constructor() {
        this.loadingScreen = null;
        this.progressBar = null;
        this.paintContainer = null;
        this.progress = 0;
        this.particles = [];
        this.isLoading = true;
        this.startTime = performance.now();
        this.minLoadTime = 2500; // 2.5 seconds minimum
        this.paintColors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];
        
        this.init();
    }
    
    init() {
        // Create loading screen HTML structure
        this.createLoadingScreen();
        
        // Start animations
        this.animateProgress();
        this.createPaintParticles();
        this.createPaintDrips();
        this.createPaintBlobs();
        this.animateParticles();
        
        // Listen for page load events
        this.setupLoadListeners();
    }
    
    createLoadingScreen() {
        // Create main container
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'paint-splash-loading';
        loadingDiv.id = 'paintSplashLoading';
        
        // Paint container
        const paintContainer = document.createElement('div');
        paintContainer.className = 'paint-container';
        
        // SVG Paint Splash
        const svgHTML = `
            <svg class="paint-splash-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- Realistic paint texture filter -->
                    <filter id="paintTexture">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="turbulence"/>
                        <feColorMatrix in="turbulence" type="saturate" values="0"/>
                        <feComponentTransfer>
                            <feFuncA type="discrete" tableValues="0 0.1 0.1 0.2 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1"/>
                        </feComponentTransfer>
                        <feGaussianBlur stdDeviation="0.5"/>
                        <feComposite operator="over" in2="SourceGraphic"/>
                    </filter>
                    
                    <!-- Gooey effect for organic shapes -->
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
                        <feComposite in2="SourceGraphic" operator="atop"/>
                    </filter>
                    
                    <!-- Gradients for paint colors -->
                    <linearGradient id="paintGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ff6384;stop-opacity:1">
                            <animate attributeName="stop-color" values="#ff6384;#ff8fa3;#ff6384" dur="4s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="100%" style="stop-color:#ff8fa3;stop-opacity:1">
                            <animate attributeName="stop-color" values="#ff8fa3;#ff6384;#ff8fa3" dur="4s" repeatCount="indefinite"/>
                        </stop>
                    </linearGradient>
                    
                    <linearGradient id="paintGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#36a2eb;stop-opacity:1">
                            <animate attributeName="stop-color" values="#36a2eb;#4bc0c0;#36a2eb" dur="5s" repeatCount="indefinite"/>
                        </stop>
                        <stop offset="100%" style="stop-color:#4bc0c0;stop-opacity:1"/>
                    </linearGradient>
                    
                    <linearGradient id="paintGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#ffce56;stop-opacity:1"/>
                        <stop offset="100%" style="stop-color:#ffd93d;stop-opacity:1"/>
                    </linearGradient>
                    
                    <linearGradient id="paintGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#9966ff;stop-opacity:1"/>
                        <stop offset="100%" style="stop-color:#c77dff;stop-opacity:1"/>
                    </linearGradient>
                </defs>
                
                <!-- Paint splash shapes -->
                <g filter="url(#goo)">
                    <!-- Main central splash -->
                    <path d="M300,200 Q350,180 380,220 T400,280 Q390,320 360,340 T300,350 Q250,340 220,300 T200,240 Q210,200 250,180 T300,200" 
                          fill="url(#paintGrad1)" 
                          filter="url(#paintTexture)"
                          opacity="0.9">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 300 300"
                            to="360 300 300"
                            dur="20s"
                            repeatCount="indefinite"/>
                        <animate attributeName="d" 
                                 values="M300,200 Q350,180 380,220 T400,280 Q390,320 360,340 T300,350 Q250,340 220,300 T200,240 Q210,200 250,180 T300,200;
                                         M300,190 Q360,170 390,210 T410,270 Q400,310 370,330 T310,340 Q260,330 230,290 T210,230 Q220,190 260,170 T300,190;
                                         M300,200 Q350,180 380,220 T400,280 Q390,320 360,340 T300,350 Q250,340 220,300 T200,240 Q210,200 250,180 T300,200"
                                 dur="4s"
                                 repeatCount="indefinite"/>
                    </path>
                    
                    <!-- Secondary splashes -->
                    <ellipse cx="380" cy="250" rx="60" ry="80" 
                             fill="url(#paintGrad2)" 
                             filter="url(#paintTexture)"
                             opacity="0.8"
                             transform="rotate(25 380 250)">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="25 380 250"
                            to="385 380 250"
                            dur="15s"
                            repeatCount="indefinite"/>
                    </ellipse>
                    
                    <ellipse cx="220" cy="280" rx="70" ry="60" 
                             fill="url(#paintGrad3)" 
                             filter="url(#paintTexture)"
                             opacity="0.7"
                             transform="rotate(-15 220 280)">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="-15 220 280"
                            to="-375 220 280"
                            dur="18s"
                            repeatCount="indefinite"/>
                    </ellipse>
                    
                    <ellipse cx="300" cy="350" rx="50" ry="70" 
                             fill="url(#paintGrad4)" 
                             filter="url(#paintTexture)"
                             opacity="0.6">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="45 300 350"
                            to="405 300 350"
                            dur="12s"
                            repeatCount="indefinite"/>
                    </ellipse>
                    
                    <!-- Small paint splatters -->
                    <circle cx="180" cy="200" r="25" fill="url(#paintGrad1)" opacity="0.6">
                        <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    <circle cx="420" cy="320" r="20" fill="url(#paintGrad2)" opacity="0.5">
                        <animate attributeName="r" values="20;25;20" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                </g>
            </svg>
        `;
        
        paintContainer.innerHTML = svgHTML;
        
        // Logo/Text
        const logoDiv = document.createElement('div');
        logoDiv.className = 'loading-logo';
        logoDiv.innerHTML = `
            <h1>AMIRA RAHIM</h1>
            <p>Loading Artistry</p>
        `;
        paintContainer.appendChild(logoDiv);
        
        // Progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar" id="paintProgressBar"></div>';
        
        // Assemble loading screen
        loadingDiv.appendChild(paintContainer);
        loadingDiv.appendChild(progressContainer);
        
        // Add to body at the beginning
        document.body.insertBefore(loadingDiv, document.body.firstChild);
        
        // Store references
        this.loadingScreen = loadingDiv;
        this.progressBar = document.getElementById('paintProgressBar');
        this.paintContainer = paintContainer;
    }
    
    animateProgress() {
        const duration = 2500; // 2.5 seconds
        const interval = 30; // Update every 30ms
        const increment = 90 / (duration / interval); // Go to 90%
        
        const progressInterval = setInterval(() => {
            if (this.progress < 90) {
                this.progress += increment;
                this.updateProgressBar(this.progress);
            } else {
                clearInterval(progressInterval);
                // Wait for actual load
                if (document.readyState === 'complete') {
                    this.completeProgress();
                }
            }
        }, interval);
    }
    
    updateProgressBar(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
    }
    
    createPaintParticles() {
        const particleCount = window.innerWidth > 768 ? 20 : 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'paint-particle';
            
            const size = Math.random() * 30 + 10;
            const color = this.paintColors[Math.floor(Math.random() * this.paintColors.length)];
            const x = Math.random() * 600;
            const y = Math.random() * 600;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            
            this.paintContainer.appendChild(particle);
            this.particles.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: size
            });
        }
    }
    
    createPaintDrips() {
        const dripCount = 5;
        
        for (let i = 0; i < dripCount; i++) {
            const drip = document.createElement('div');
            drip.className = 'paint-drip';
            
            const color = this.paintColors[Math.floor(Math.random() * this.paintColors.length)];
            const x = Math.random() * 500 + 50;
            
            drip.style.backgroundColor = color;
            drip.style.left = `${x}px`;
            drip.style.top = '50px';
            drip.style.animationDelay = `${Math.random() * 2}s`;
            
            this.paintContainer.appendChild(drip);
        }
    }
    
    createPaintBlobs() {
        const blobCount = 8;
        
        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.className = 'paint-blob';
            
            const size = Math.random() * 60 + 20;
            const color = this.paintColors[Math.floor(Math.random() * this.paintColors.length)];
            const x = Math.random() * 600;
            const y = Math.random() * 600;
            
            blob.style.width = `${size}px`;
            blob.style.height = `${size}px`;
            blob.style.backgroundColor = color;
            blob.style.left = `${x}px`;
            blob.style.top = `${y}px`;
            blob.style.animationDelay = `${Math.random() * 4}s`;
            
            this.paintContainer.appendChild(blob);
        }
    }
    
    animateParticles() {
        const animate = () => {
            if (!this.isLoading) return;
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= 600 - particle.size) {
                    particle.vx *= -1;
                }
                if (particle.y <= 0 || particle.y >= 600 - particle.size) {
                    particle.vy *= -1;
                }
                
                particle.element.style.transform = `translate(${particle.x - parseFloat(particle.element.style.left)}px, ${particle.y - parseFloat(particle.element.style.top)}px)`;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    setupLoadListeners() {
        // Multiple load event listeners for reliability
        window.addEventListener('load', () => this.handleLoad());
        document.addEventListener('DOMContentLoaded', () => {
            if (document.readyState === 'complete') {
                this.handleLoad();
            }
        });
        
        // Also check periodically
        const checkInterval = setInterval(() => {
            if (document.readyState === 'complete' && !this.isLoading) {
                clearInterval(checkInterval);
            } else if (document.readyState === 'complete') {
                this.handleLoad();
                clearInterval(checkInterval);
            }
        }, 100);
    }
    
    handleLoad() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - this.startTime;
        
        if (elapsedTime < this.minLoadTime) {
            // Wait for minimum load time
            setTimeout(() => {
                this.completeProgress();
            }, this.minLoadTime - elapsedTime);
        } else {
            this.completeProgress();
        }
    }
    
    completeProgress() {
        this.progress = 100;
        this.updateProgressBar(100);
        
        // Hide loader after progress completes
        setTimeout(() => {
            this.hideLoader();
        }, 500);
    }
    
    hideLoader() {
        this.isLoading = false;
        
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            
            // Remove loader after animation
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 1000);
        }
    }
}

// Initialize loader as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PaintSplashLoader();
    });
} else {
    new PaintSplashLoader();
}