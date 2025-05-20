class PaintCursor {
  constructor() {
    // Configuration
    this.config = {
      colors: ['#FF748C', '#FDE02F', '#2F53FD', '#9B5DE5', '#00C896'],
      maxTrailLength: 15,
      minBlobSize: 4,
      maxBlobSize: 12,
      opacity: 0.9,
      fadeDuration: 800,
      maxSpeed: 50,
      minDistance: 3,
      noiseIntensity: 0.05
    };

    // State
    this.trail = [];
    this.lastPos = { x: 0, y: 0 };
    this.currentColorIndex = 0;
    this.animationId = null;
    this.lastTimestamp = 0;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Initialize
    this.init();
  }

  init() {
    if (this.isTouchDevice || this.isReducedMotion) {
      this.createSimpleCursor();
      return;
    }

    this.setupCanvas();
    this.setupEventListeners();
    this.animate();
  }

  createSimpleCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${this.config.colors[0]};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      mix-blend-mode: lighten;
    `;
    document.body.appendChild(cursor);

    let colorIndex = 0;
    const changeColor = () => {
      colorIndex = (colorIndex + 1) % this.config.colors.length;
      cursor.style.background = this.config.colors[colorIndex];
    };

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    // Change color every 2 seconds
    setInterval(changeColor, 2000);
  }


  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    // Set canvas size
    this.resizeCanvas();
    
    // Style canvas
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: lighten;
    `;
    
    document.body.appendChild(this.canvas);
    
    // Handle window resize
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    let lastTime = 0;
    const throttleDelay = 1000 / 60; // 60fps

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const currentPos = { x: e.clientX, y: e.clientY };
      const distance = this.calculateDistance(this.lastPos, currentPos);
      
      if (distance > this.config.minDistance) {
        this.addToTrail(currentPos, distance);
        this.lastPos = currentPos;
      }
    };

    // Pause effect when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId);
      } else {
        this.animate();
      }
    });

    // Initial setup
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', () => {
      this.animate();
    });
  }


  addToTrail(position, distance) {
    // Calculate number of blobs based on speed
    const speed = Math.min(distance, this.config.maxSpeed);
    const blobCount = Math.floor(speed / 2) + 1;
    
    for (let i = 0; i < blobCount; i++) {
      // Create a slight delay for each blob in the trail
      setTimeout(() => {
        const size = this.randomInRange(
          this.config.minBlobSize, 
          this.config.maxBlobSize
        );
        
        // Add some randomness to position
        const offset = this.config.maxBlobSize / 2;
        const x = position.x + this.randomInRange(-offset, offset);
        const y = position.y + this.randomInRange(-offset, offset);
        
        // Add to trail
        this.trail.push({
          x,
          y,
          size,
          opacity: this.config.opacity,
          color: this.getNextColor(),
          createdAt: Date.now(),
          scale: 1,
          rotation: Math.random() * Math.PI * 2
        });
        
        // Limit trail length
        if (this.trail.length > this.config.maxTrailLength) {
          this.trail.shift();
        }
      }, i * 2); // Slight delay between blobs
    }
  }

  animate() {
    if (document.hidden) return;
    
    // Clear canvas with alpha to create fade effect
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const now = Date.now();
    const activeTrails = [];
    
    // Update and draw each blob in the trail
    this.trail.forEach((blob) => {
      const age = now - blob.createdAt;
      const progress = Math.min(age / this.config.fadeDuration, 1);
      
      // Update blob properties
      blob.opacity = this.config.opacity * (1 - progress);
      blob.scale = 1 - (progress * 0.8); // Slight shrink
      
      // Only draw if still visible
      if (blob.opacity > 0.01) {
        this.drawBlob(blob);
        activeTrails.push(blob);
      }
    });
    
    // Update trail with only active blobs
    this.trail = activeTrails;
    
    // Continue animation loop
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  drawBlob(blob) {
    const { x, y, size, color, opacity, scale, rotation } = blob;
    
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(scale, scale);
    this.ctx.rotate(rotation);
    
    // Draw main blob
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    
    // Create organic shape
    const radius = size / 2;
    this.ctx.ellipse(0, 0, radius, radius * this.randomInRange(0.7, 1.3), 0, 0, Math.PI * 2);
    
    // Add some noise to the edge for texture
    const noise = this.config.noiseIntensity * radius;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = radius * (1 + this.randomInRange(-noise, noise));
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    
    this.ctx.closePath();
    this.ctx.fill();
    
    // Add highlight
    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.arc(-radius * 0.3, -radius * 0.3, radius * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }

  getNextColor() {
    const color = this.config.colors[this.currentColorIndex];
    this.currentColorIndex = (this.currentColorIndex + 1) % this.config.colors.length;
    return color;
  }

  calculateDistance(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) + 
      Math.pow(pos2.y - pos1.y, 2)
    );
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on desktop devices
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    new PaintCursor();
  }
});
