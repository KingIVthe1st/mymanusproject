class RainbowCursor {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 50;
    this.hue = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.isDrawing = false;
    
    this.init();
  }

  init() {
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Add canvas to body
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    // Set up event listeners
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mousedown', () => { this.isDrawing = true; });
    document.addEventListener('mouseup', () => { this.isDrawing = false; });
    
    // Start animation loop
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate velocity
    const dx = x - this.lastX;
    const dy = y - this.lastY;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    
    // Create particles based on velocity
    if (velocity > 0) {
      const particleCount = Math.min(Math.floor(velocity / 2), 5);
      
      for (let i = 0; i < particleCount; i++) {
        this.createParticle(x, y, dx, dy, velocity);
      }
    }
    
    this.lastX = x;
    this.lastY = y;
  }

  createParticle(x, y, dx, dy, velocity) {
    // Create a new particle
    const particle = {
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      size: 2 + Math.random() * 3,
      speed: 0.5 + Math.random() * 2,
      angle: Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      color: `hsl(${this.hue}, 100%, 50%)`,
      life: 100,
      decay: 0.5 + Math.random() * 1.5,
      velocity: velocity * 0.1
    };
    
    this.particles.push(particle);
    
    // Update hue for next particle
    this.hue = (this.hue + 1) % 360;
    
    // Remove oldest particle if we have too many
    if (this.particles.length > this.maxParticles) {
      this.particles.shift();
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Update position
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      
      // Apply gravity
      p.y += 0.1;
      
      // Update rotation
      p.rotation += p.rotationSpeed;
      
      // Update life
      p.life -= p.decay;
      
      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      
      const alpha = p.life / 100;
      this.ctx.globalAlpha = alpha > 0.1 ? 0.1 : alpha;
      
      // Draw particle
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      
      this.ctx.restore();
    }
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the cursor effect when the page loads
window.addEventListener('load', () => {
  // Only initialize on non-touch devices
  if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
    new RainbowCursor();
  }
});
