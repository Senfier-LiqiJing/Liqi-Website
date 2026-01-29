/**
 * Particle Network Background Effect
 * Creates an animated network of connected particles
 */

class ParticleBackground {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Configuration
    this.config = {
      particleCount: options.particleCount || 80,
      particleSpeed: options.particleSpeed || 0.5,
      particleSize: options.particleSize || 2,
      lineDistance: options.lineDistance || 150,
      particleColor: options.particleColor || 'rgba(99, 102, 241, 0.6)',
      lineColor: options.lineColor || 'rgba(99, 102, 241, 0.2)',
      backgroundColor: options.backgroundColor || 'transparent',
      interactive: options.interactive !== false,
      fps: options.fps || 60,
    };

    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / this.config.fps;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        size: Math.random() * this.config.particleSize + 1,
      });
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    if (this.config.interactive) {
      this.canvas.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      // Touch support
      this.canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        }
      });

      this.canvas.addEventListener('touchend', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
      }

      // Mouse interaction - repel particles
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.5;
          particle.vy -= Math.sin(angle) * force * 0.5;
        }
      }

      // Apply velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Ensure minimum velocity
      if (Math.abs(particle.vx) < 0.1) {
        particle.vx += (Math.random() - 0.5) * 0.1;
      }
      if (Math.abs(particle.vy) < 0.1) {
        particle.vy += (Math.random() - 0.5) * 0.1;
      }
    });
  }

  drawParticles() {
    this.ctx.fillStyle = this.config.particleColor;

    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawLines() {
    this.ctx.strokeStyle = this.config.lineColor;
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.lineDistance) {
          const opacity = (1 - distance / this.config.lineDistance) * 0.3;
          this.ctx.strokeStyle = this.config.lineColor.replace(/[\d.]+\)$/g, `${opacity})`);

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate(timestamp = 0) {
    const elapsed = timestamp - this.lastFrameTime;

    if (elapsed > this.frameInterval) {
      // Clear canvas
      this.ctx.fillStyle = this.config.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and draw
      this.updateParticles();
      this.drawLines();
      this.drawParticles();

      this.lastFrameTime = timestamp - (elapsed % this.frameInterval);
    }

    this.animationId = requestAnimationFrame((ts) => this.animate(ts));
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.resize);
    this.canvas.removeEventListener('mousemove', () => {});
    this.canvas.removeEventListener('mouseleave', () => {});
  }

  // Update configuration
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.createParticles();
  }
}

/**
 * Initialize particle background when DOM is ready
 */
function initParticleBackground(options = {}) {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: auto;
  `;

  // Insert canvas into page-bg container
  const pageBg = document.getElementById('page-bg');
  if (pageBg) {
    pageBg.appendChild(canvas);
  } else {
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  // Detect dark mode and adjust colors
  const isDarkMode = document.body.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;

  const defaultOptions = isDarkMode ? {
    particleColor: 'rgba(147, 197, 253, 0.6)',
    lineColor: 'rgba(147, 197, 253, 0.2)',
    backgroundColor: 'transparent',
  } : {
    particleColor: 'rgba(99, 102, 241, 0.6)',
    lineColor: 'rgba(99, 102, 241, 0.2)',
    backgroundColor: 'transparent',
  };

  // Merge user options with defaults
  const finalOptions = { ...defaultOptions, ...options };

  // Initialize particle background
  const particleBackground = new ParticleBackground(canvas, finalOptions);

  // Watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const isDark = document.body.classList.contains('dark');
        particleBackground.updateConfig(isDark ? {
          particleColor: 'rgba(147, 197, 253, 0.6)',
          lineColor: 'rgba(147, 197, 253, 0.2)',
        } : {
          particleColor: 'rgba(99, 102, 241, 0.6)',
          lineColor: 'rgba(99, 102, 241, 0.2)',
        });
      }
    });
  });

  observer.observe(document.body, { attributes: true });

  return particleBackground;
}

// Auto-initialize if data attribute is present
document.addEventListener('DOMContentLoaded', () => {
  const pageBg = document.getElementById('page-bg');

  if (pageBg && pageBg.dataset.particleBackground === 'true') {
    // Parse options from data attributes
    const options = {
      particleCount: parseInt(pageBg.dataset.particleCount) || 80,
      particleSpeed: parseFloat(pageBg.dataset.particleSpeed) || 0.5,
      lineDistance: parseInt(pageBg.dataset.lineDistance) || 150,
      interactive: pageBg.dataset.interactive !== 'false',
    };

    initParticleBackground(options);
  }
});

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ParticleBackground, initParticleBackground };
}
