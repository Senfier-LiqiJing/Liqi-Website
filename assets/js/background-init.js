// Dynamic Background Initialization for All Pages
(function() {
  console.log('🚀 Background initialization script loaded...');

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🚀 Initializing background...');

    // Create page-bg div if it doesn't exist
    let pageBg = document.getElementById('page-bg');
    if (!pageBg) {
      console.log('📦 Creating page-bg element...');
      pageBg = document.createElement('div');
      pageBg.id = 'page-bg';
      pageBg.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;';
      document.body.insertBefore(pageBg, document.body.firstChild);
    }

    console.log('✅ page-bg element ready');

    // Detect current page type
    function getPageType() {
      const path = window.location.pathname;
      console.log('🔍 Current path:', path);

      if (path === '/' || path === '/index.html') {
        return 'home';
      } else if (path.includes('/projects/') || path.includes('/project/') || path.includes('/blog/')) {
        return 'projects';
      } else if (path.includes('/tags/') || path.includes('/tag/')) {
        return 'topics';
      } else if (path.includes('/education')) {
        return 'education';
      }

      return 'default';
    }

    const pageType = getPageType();
    console.log(`📄 Page type detected: ${pageType}`);

    // Configuration based on page type
    let backgroundConfig;

    switch(pageType) {
      case 'home':
        backgroundConfig = {
          type: 'gradient',
          gradientVariant: 'sunset',
          useOverlay: false
        };
        break;

      case 'projects':
        backgroundConfig = {
          type: 'gradient',
          gradientVariant: 'professional',
          useOverlay: false
        };
        break;

      case 'topics':
        backgroundConfig = {
          type: 'gradient',
          gradientVariant: 'ocean',
          useOverlay: false
        };
        break;

      case 'education':
        backgroundConfig = {
          type: 'waves',
          gradientVariant: 'professional',
          useOverlay: false
        };
        break;

      default:
        backgroundConfig = {
          type: 'gradient',
          gradientVariant: 'professional',
          useOverlay: false
        };
    }

    console.log(`🎨 Applying background: ${backgroundConfig.type} - ${backgroundConfig.gradientVariant}`);

    // Apply background based on type
    switch(backgroundConfig.type) {
      case 'gradient':
        pageBg.className = `bg-animated-gradient ${backgroundConfig.gradientVariant}`;
        console.log(`✨ Applied gradient class: bg-animated-gradient ${backgroundConfig.gradientVariant}`);
        break;

      case 'geometric':
        pageBg.className = 'bg-geometric';
        if (document.body.classList.contains('dark')) {
          pageBg.classList.add('dark-mode');
        }
        break;

      case 'mesh':
        pageBg.className = 'bg-mesh-gradient';
        if (document.body.classList.contains('dark')) {
          pageBg.classList.add('dark-mode');
        }
        break;

      case 'particle':
        pageBg.dataset.particleBackground = 'true';
        pageBg.dataset.particleCount = 80;
        pageBg.dataset.particleSpeed = 0.5;
        pageBg.dataset.lineDistance = 150;
        pageBg.dataset.interactive = true;
        break;

      case 'waves':
        pageBg.className = 'bg-waves';
        // Add wave elements
        for (let i = 0; i < 3; i++) {
          const wave = document.createElement('div');
          wave.className = 'wave';
          pageBg.appendChild(wave);
        }
        break;

      case 'none':
      default:
        // No background
        break;
    }

    // Add overlay if enabled
    if (backgroundConfig.useOverlay) {
      const overlay = document.createElement('div');
      overlay.className = 'bg-overlay';
      document.body.appendChild(overlay);
    }

    // Watch for theme changes to update background
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.body.classList.contains('dark');

          // Update geometric/mesh backgrounds for dark mode
          if (backgroundConfig.type === 'geometric' || backgroundConfig.type === 'mesh') {
            if (isDark) {
              pageBg.classList.add('dark-mode');
            } else {
              pageBg.classList.remove('dark-mode');
            }
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    console.log('✨ Background configuration complete!');
  }
})();
