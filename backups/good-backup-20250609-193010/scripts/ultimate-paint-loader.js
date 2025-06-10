// Ultimate Liquid Paint Loading Experience
// Award-Winning Agency Quality with Canvas Animation

class UltimatePaintLoader {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.loadingUniverse = null;
        this.progressRing = null;
        this.cursor = null;
        
        this.particles = [];
        this.paintDrops = [];
        this.liquidPaths = [];
        this.progress = 0;
        this.startTime = Date.now();
        this.minLoadTime = 3500;
        this.isComplete = false;
        
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.mouseVX = 0;
        this.mouseVY = 0;
        
        this.colors = {
            coral: { r: 255, g: 99, b: 132 },
            ocean: { r: 54, g: 162, b: 235 },
            sunshine: { r: 255, g: 206, b: 86 },
            royal: { r: 153, g: 102, b: 255 }
        };
        
        this.init();
    }
    
    init() {
        this.createDOM();
        this.setupCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.createPaintDrops();
        this.createLiquidPaths();
        this.animate();
        this.simulateLoading();
    }
    
    createDOM() {
        // Create the loading universe container
        const loadingHTML = `
            <div class="loading-universe" id="loadingUniverse">
                <!-- WebGL Paint Canvas -->
                <canvas id="paintCanvas"></canvas>
                
                <!-- Liquid Paint Blobs -->
                <div class="paint-blob blob-1"></div>
                <div class="paint-blob blob-2"></div>
                <div class="paint-blob blob-3"></div>
                <div class="paint-blob blob-4"></div>
                
                <!-- Liquid Distortion Effect -->
                <div class="liquid-distortion"></div>
                
                <!-- Loading Content -->
                <div class="loading-content">
                    <h1 class="morphing-text">AMIRA RAHIM</h1>
                    <p class="loading-subtitle">The Color Poet</p>
                </div>
                
                <!-- Progress Ring -->
                <div class="progress-ring">
                    <svg width="120" height="120">
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff6384;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#36a2eb;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#9966ff;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <circle class="progress-ring-bg" cx="60" cy="60" r="54"></circle>
                        <circle class="progress-ring-fill" cx="60" cy="60" r="54"></circle>
                    </svg>
                </div>
                
                <!-- SVG Filters -->
                <svg style="display: none;">
                    <defs>
                        <filter id="liquidDistortion">
                            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="turbulence" seed="1">
                                <animate attributeName="baseFrequency" values="0.02;0.05;0.02" dur="20s" repeatCount="indefinite"/>
                            </feTurbulence>
                            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/>
                        </filter>
                    </defs>
                </svg>
            </div>
            
            <!-- Custom Cursor -->
            <div class="custom-cursor" id="customCursor"></div>
        `;
        
        // Insert at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        // Get references
        this.canvas = document.getElementById('paintCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.loadingUniverse = document.getElementById('loadingUniverse');
        this.progressRing = document.querySelector('.progress-ring-fill');
        this.cursor = document.getElementById('customCursor');
        
        // Hide body scroll during loading
        document.body.style.overflow = 'hidden';
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Enable smooth drawing
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Create gradient background
        const gradient = this.ctx.createRadialGradient(
            window.innerWidth / 2, 
            window.innerHeight / 2, 
            0,
            window.innerWidth / 2, 
            window.innerHeight / 2, 
            Math.max(window.innerWidth, window.innerHeight)
        );
        gradient.addColorStop(0, 'rgba(10, 10, 10, 0.8)');
        gradient.addColorStop(1, 'rgba(10, 10, 10, 1)');
        
        this.gradient = gradient;
    }
    
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Mouse movement
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Touch support
        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        }, { passive: true });
        
        // Detect when page is actually loaded
        window.addEventListener('load', () => {
            this.pageLoaded = true;
        });
    }
    
    handleResize() {
        this.setupCanvas();
    }
    
    handleMouseMove(e) {
        // Calculate velocity
        this.mouseVX = e.clientX - this.mouseX;
        this.mouseVY = e.clientY - this.mouseY;
        
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update cursor position with slight lag for smoothness
        if (this.cursor) {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        }
        
        // Create paint trail based on velocity
        const velocity = Math.sqrt(this.mouseVX * this.mouseVX + this.mouseVY * this.mouseVY);
        if (velocity > 5 && Math.random() > 0.7) {
            this.createPaintDrop(e.clientX, e.clientY, velocity);
        }
    }
    
    createParticles() {
        // Create floating DOM particles
        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (3 + Math.random() * 2) + 's';
            this.loadingUniverse.appendChild(particle);
        }
    }
    
    createPaintDrops() {
        // Initialize paint drops for canvas animation
        for (let i = 0; i < 5; i++) {
            this.paintDrops.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 50 + 20,
                color: this.getRandomColor(),
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                growing: true,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.02 + Math.random() * 0.03
            });
        }
    }
    
    createLiquidPaths() {
        // Create flowing liquid paths
        for (let i = 0; i < 3; i++) {
            const points = [];
            const pointCount = 5 + Math.floor(Math.random() * 5);
            
            for (let j = 0; j < pointCount; j++) {
                points.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
            
            this.liquidPaths.push({
                points: points,
                color: this.getRandomColor(),
                width: 20 + Math.random() * 30,
                life: 1
            });
        }
    }
    
    createPaintDrop(x, y, velocity = 10) {
        if (this.paintDrops.length < 30) {
            this.paintDrops.push({
                x: x,
                y: y,
                radius: 5 + velocity * 0.5,
                color: this.getRandomColor(),
                vx: this.mouseVX * 0.2 + (Math.random() - 0.5) * 2,
                vy: this.mouseVY * 0.2 + (Math.random() - 0.5) * 2,
                life: 1,
                growing: true,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.02 + Math.random() * 0.03
            });
        }
    }
    
    getRandomColor() {
        const colorKeys = Object.keys(this.colors);
        const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const color = this.colors[colorKey];
        return `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
    }
    
    updateProgress(progress) {
        this.progress = Math.min(progress, 100);
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (circumference * this.progress / 100);
        if (this.progressRing) {
            this.progressRing.style.strokeDashoffset = offset;
        }
    }
    
    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Draw liquid paths
        this.liquidPaths.forEach(path => {
            this.ctx.save();
            this.ctx.globalAlpha = path.life * 0.3;
            this.ctx.strokeStyle = path.color;
            this.ctx.lineWidth = path.width;
            this.ctx.beginPath();
            
            // Draw smooth curve through points
            if (path.points.length > 2) {
                this.ctx.moveTo(path.points[0].x, path.points[0].y);
                
                for (let i = 1; i < path.points.length - 1; i++) {
                    const xc = (path.points[i].x + path.points[i + 1].x) / 2;
                    const yc = (path.points[i].y + path.points[i + 1].y) / 2;
                    this.ctx.quadraticCurveTo(path.points[i].x, path.points[i].y, xc, yc);
                }
                
                // Last point
                const last = path.points[path.points.length - 1];
                this.ctx.lineTo(last.x, last.y);
            }
            
            this.ctx.stroke();
            this.ctx.restore();
            
            // Update points
            path.points.forEach(point => {
                point.x += point.vx;
                point.y += point.vy;
                
                // Wrap around edges
                if (point.x < -50) point.x = window.innerWidth + 50;
                if (point.x > window.innerWidth + 50) point.x = -50;
                if (point.y < -50) point.y = window.innerHeight + 50;
                if (point.y > window.innerHeight + 50) point.y = -50;
            });
        });
        
        // Update and draw paint drops
        this.paintDrops = this.paintDrops.filter(drop => {
            // Update position
            drop.x += drop.vx;
            drop.y += drop.vy;
            
            // Update wobble
            drop.wobble += drop.wobbleSpeed;
            
            // Update size
            if (drop.growing) {
                drop.radius += 0.5;
                if (drop.radius > 30) drop.growing = false;
            } else {
                drop.radius *= 0.98;
                drop.life -= 0.01;
            }
            
            // Apply gravity
            drop.vy += 0.1;
            
            // Draw paint drop with organic shape
            this.ctx.save();
            this.ctx.globalAlpha = drop.life;
            this.ctx.fillStyle = drop.color;
            this.ctx.beginPath();
            
            // Create organic blob shape
            const points = 12;
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const wobbleAmount = Math.sin(drop.wobble + i * 0.5) * 5;
                const r = drop.radius + wobbleAmount;
                const x = drop.x + Math.cos(angle) * r;
                const y = drop.y + Math.sin(angle) * r;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    // Use quadratic curves for smoother shape
                    const prevAngle = ((i - 1) / points) * Math.PI * 2;
                    const prevR = drop.radius + Math.sin(drop.wobble + (i - 1) * 0.5) * 5;
                    const prevX = drop.x + Math.cos(prevAngle) * prevR;
                    const prevY = drop.y + Math.sin(prevAngle) * prevR;
                    
                    const cpX = (prevX + x) / 2 + Math.cos(angle - Math.PI / 2) * 10;
                    const cpY = (prevY + y) / 2 + Math.sin(angle - Math.PI / 2) * 10;
                    
                    this.ctx.quadraticCurveTo(cpX, cpY, x, y);
                }
            }
            
            this.ctx.closePath();
            this.ctx.fill();
            
            // Add inner glow
            const glowGradient = this.ctx.createRadialGradient(
                drop.x, drop.y, 0,
                drop.x, drop.y, drop.radius
            );
            glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.ctx.fillStyle = glowGradient;
            this.ctx.fill();
            
            this.ctx.restore();
            
            // Keep drops that are still visible
            return drop.life > 0 && drop.radius > 1;
        });
        
        // Draw connections between nearby drops
        for (let i = 0; i < this.paintDrops.length; i++) {
            for (let j = i + 1; j < this.paintDrops.length; j++) {
                const drop1 = this.paintDrops[i];
                const drop2 = this.paintDrops[j];
                const distance = Math.hypot(drop1.x - drop2.x, drop1.y - drop2.y);
                
                if (distance < 150) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (1 - distance / 150) * 0.2 * Math.min(drop1.life, drop2.life);
                    
                    // Create gradient line
                    const gradient = this.ctx.createLinearGradient(
                        drop1.x, drop1.y, drop2.x, drop2.y
                    );
                    gradient.addColorStop(0, drop1.color);
                    gradient.addColorStop(1, drop2.color);
                    
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(drop1.x, drop1.y);
                    this.ctx.lineTo(drop2.x, drop2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
        
        // Continue animation
        if (!this.isComplete) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    simulateLoading() {
        const duration = 3500;
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
        // Ensure minimum load time
        const elapsed = Date.now() - this.startTime;
        const remaining = Math.max(0, this.minLoadTime - elapsed);
        
        setTimeout(() => {
            this.isComplete = true;
            this.loadingUniverse.classList.add('complete');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Clean up after animation
            setTimeout(() => {
                if (this.loadingUniverse && this.loadingUniverse.parentNode) {
                    this.loadingUniverse.parentNode.removeChild(this.loadingUniverse);
                }
                if (this.cursor && this.cursor.parentNode) {
                    this.cursor.parentNode.removeChild(this.cursor);
                }
            }, 1500);
        }, remaining);
    }
}

// Initialize the ultimate loader
(function() {
    // Check if we should show the loader (not on refresh, etc.)
    const showLoader = !sessionStorage.getItem('loaderShown');
    
    if (showLoader) {
        // Mark as shown for this session
        sessionStorage.setItem('loaderShown', 'true');
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new UltimatePaintLoader();
            });
        } else {
            new UltimatePaintLoader();
        }
    }
})();