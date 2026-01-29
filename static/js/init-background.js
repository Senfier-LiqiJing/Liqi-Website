/**
 * Dynamic Background Initializer
 * Loads and initializes the dynamic background effect
 */

(function() {
  'use strict';

  // Detect current page type
  function getPageType() {
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
      return 'home';
    } else if (path.includes('/projects') || path.includes('/project/') || path.includes('/blog/')) {
      return 'projects';
    } else if (path.includes('/topics') || path.includes('/topic/')) {
      return 'topics';
    } else if (path.includes('/education')) {
      return 'education';
    }

    return 'default';
  }

  // Get configuration based on page type
  function getConfig() {
    const pageType = getPageType();
    console.log(`📄 Page type: ${pageType}`);

    switch (pageType) {
      case 'home':
        return {
          type: 'gradient',
          gradientVariant: 'sunset',
          useOverlay: false
        };

      case 'projects':
        return {
          type: 'gradient',
          gradientVariant: 'ocean',
          useOverlay: false
        };

      case 'topics':
        return {
          type: 'gradient',
          gradientVariant: 'ocean',
          useOverlay: false
        };

      case 'education':
        return {
          type: 'gradient',
          gradientVariant: 'ocean',
          useOverlay: false
        };

      default:
        return {
          type: 'gradient',
          gradientVariant: 'professional',
          useOverlay: false
        };
    }
  }

  const config = getConfig();

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const pageBg = document.getElementById('page-bg');

    if (!pageBg) {
      console.warn('🎨 Dynamic Background: #page-bg element not found');
      return;
    }

    // Clear any existing content
    pageBg.className = '';
    pageBg.innerHTML = '';

    // Detect dark mode
    const isDarkMode = document.body.classList.contains('dark') ||
                       window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply background
    switch (config.type) {
      case 'gradient':
        pageBg.classList.add('bg-animated-gradient');
        if (config.gradientVariant) {
          pageBg.classList.add(config.gradientVariant);
        }
        if (isDarkMode) {
          pageBg.classList.add('dark-mode');
        }
        console.log('🎨 Gradient background applied:', config.gradientVariant);
        break;

      case 'geometric':
        pageBg.classList.add('bg-geometric');
        if (isDarkMode) {
          pageBg.classList.add('dark-mode');
        }
        console.log('🎨 Geometric background applied');
        break;

      case 'mesh':
        pageBg.classList.add('bg-mesh-gradient');
        if (isDarkMode) {
          pageBg.classList.add('dark-mode');
        }
        console.log('🎨 Mesh gradient background applied');
        break;

      case 'particle':
        if (typeof initParticleBackground === 'function') {
          initParticleBackground({
            particleCount: 80,
            particleSpeed: 0.5,
            lineDistance: 150,
            interactive: true
          });
          console.log('🎨 Particle background applied');
        } else {
          console.warn('Particle background script not loaded');
        }
        break;

      case 'waves':
        pageBg.classList.add('bg-waves');
        for (let i = 0; i < 3; i++) {
          const wave = document.createElement('div');
          wave.classList.add('wave');
          pageBg.appendChild(wave);
        }
        console.log('🎨 Waves background applied');
        break;

      default:
        console.log('🎨 No background applied');
    }

    // Add overlay if enabled
    if (config.useOverlay && !document.querySelector('.bg-overlay')) {
      const overlay = document.createElement('div');
      overlay.classList.add('bg-overlay');
      document.body.appendChild(overlay);
    }

    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          init(); // Re-initialize when theme changes
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }
})();
