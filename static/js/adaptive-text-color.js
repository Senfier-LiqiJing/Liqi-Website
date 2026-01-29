/**
 * Adaptive Text Color for Gradient Backgrounds
 * Dynamically adjusts text color based on background brightness
 * to ensure optimal readability
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    // Only apply on homepage (set to false to apply on all pages)
    applyOnHomepageOnly: true,  // CHANGED BACK: Only homepage
    // Use blend mode as primary method (set to false to use JS color detection instead)
    useBlendMode: false,  // CHANGED: Switch to JS color detection
    // Add text shadows for extra contrast
    useTextShadow: true,
    // Debug mode - shows console logs
    debug: true,  // Set to true to see what's happening
    // For JS color detection mode: update frequency in ms
    updateInterval: 100
  };

  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🎨 Adaptive text: Initializing...');

    // Check if we're on the homepage
    if (config.applyOnHomepageOnly && !isHomepage()) {
      console.log('📝 Adaptive text: Not homepage, skipping');
      return;
    }

    // Find the biography section
    const bioSection = findBiographySection();
    if (!bioSection) {
      console.warn('⚠️ Adaptive text: Biography section not found');
      return;
    }

    console.log('✓ Adaptive text: Biography section found', bioSection);

    // Apply the contrast enhancement
    applyContrastEnhancement(bioSection);

    // Watch for theme changes
    observeThemeChanges(bioSection);

    console.log('✓ Adaptive text contrast applied successfully');
  }

  function isHomepage() {
    const path = window.location.pathname;
    return path === '/' || path === '/index.html' || path.endsWith('/');
  }

  function findBiographySection() {
    // Try multiple selectors for different page types
    const selectors = [
      'section.w-full',
      '.resume-biography',
      '[class*="resume-biography"]',
      '.page-body section:first-of-type',
      '.page-body article',
      '.page-body main',
      '.hbb-section',
      'section[id*="section"]',
      '.page-body' // Fallback to entire page body
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        console.log(`✓ Found content section with selector: ${selector}`);
        return element;
      }
    }

    return null;
  }

  function applyContrastEnhancement(section) {
    // Add identifying class
    section.classList.add('adaptive-text-enhanced');
    console.log('✓ Added adaptive-text-enhanced class');

    // Fix stacking context for blend modes to work
    fixStackingContext(section);

    // Force H1 to black IMMEDIATELY
    forceH1Black(section);

    if (config.useBlendMode) {
      applyBlendModeStyles(section);
    } else {
      applyInlineStyles(section);
    }
  }

  function forceH1Black(section) {
    // Find H1 and force it to black with maximum priority
    const h1 = section.querySelector('h1');
    if (h1) {
      function setH1Black() {
        h1.style.setProperty('color', '#000000', 'important');
        h1.style.setProperty('mix-blend-mode', 'normal', 'important');
        h1.style.setProperty('text-shadow', '0 2px 4px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)', 'important');
        h1.style.setProperty('-webkit-font-smoothing', 'antialiased', 'important');
        console.log('🔒 H1 forced to black');
      }

      // Set immediately
      setH1Black();

      // Watch for any changes and re-apply
      const observer = new MutationObserver(() => {
        if (h1.style.color !== 'rgb(0, 0, 0)') {
          console.log('⚠️ H1 color changed, re-applying black...');
          setH1Black();
        }
      });

      observer.observe(h1, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // Also re-apply every 500ms as backup
      setInterval(setH1Black, 500);

      console.log('✓ H1 black enforcement active');
    }
  }

  function fixStackingContext(section) {
    // Ensure parent elements don't block blend mode
    console.log('🔧 Fixing stacking context for blend mode...');

    // Fix the biography section itself
    section.style.setProperty('background', 'transparent', 'important');
    section.style.setProperty('isolation', 'auto', 'important');

    // Fix parent containers
    const pageBody = document.querySelector('.page-body');
    if (pageBody) {
      pageBody.style.setProperty('background', 'transparent', 'important');
      pageBody.style.setProperty('isolation', 'auto', 'important');
      console.log('✓ Fixed .page-body stacking context');
    }

    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
      pageWrapper.style.setProperty('background', 'transparent', 'important');
      pageWrapper.style.setProperty('isolation', 'auto', 'important');
      console.log('✓ Fixed .page-wrapper stacking context');
    }

    // Also fix any parent divs
    let parent = section.parentElement;
    let level = 0;
    while (parent && level < 5) {
      parent.style.setProperty('isolation', 'auto', 'important');
      if (window.getComputedStyle(parent).backgroundColor !== 'rgba(0, 0, 0, 0)') {
        console.log(`⚠️ Parent has background color: ${parent.className}`);
        parent.style.setProperty('background', 'transparent', 'important');
      }
      parent = parent.parentElement;
      level++;
    }

    console.log('✓ Stacking context fixed');
  }

  function applyBlendModeStyles(section) {
    // Create a style element with very high specificity
    const styleId = 'adaptive-text-styles';
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
      console.log('✓ Created style element');
    }

    // Get current theme
    const isDark = document.body.classList.contains('dark') ||
                   document.documentElement.classList.contains('dark');

    console.log(`🌓 Current theme: ${isDark ? 'dark' : 'light'}`);

    // Define the CSS rules with maximum specificity
    const css = `
      /* Force all text to white with blend mode - HIGHEST PRIORITY */
      body .adaptive-text-enhanced h1,
      body .adaptive-text-enhanced h2,
      body .adaptive-text-enhanced h3,
      body .adaptive-text-enhanced p,
      body .adaptive-text-enhanced span,
      body .adaptive-text-enhanced div,
      body .adaptive-text-enhanced strong,
      body .adaptive-text-enhanced b,
      body .adaptive-text-enhanced .bio-content,
      body .adaptive-text-enhanced .bio-content *,
      body .adaptive-text-enhanced [class*="text-"],
      body.dark .adaptive-text-enhanced h1,
      body.dark .adaptive-text-enhanced h2,
      body.dark .adaptive-text-enhanced h3,
      body.dark .adaptive-text-enhanced p,
      body.dark .adaptive-text-enhanced span,
      body.dark .adaptive-text-enhanced div,
      body.dark .adaptive-text-enhanced strong,
      body.dark .adaptive-text-enhanced b,
      body.dark .adaptive-text-enhanced .bio-content,
      body.dark .adaptive-text-enhanced .bio-content *,
      body.dark .adaptive-text-enhanced [class*="text-"] {
        mix-blend-mode: difference !important;
        color: #ffffff !important;
        ${config.useTextShadow ? `
        text-shadow:
          0 0 20px rgba(0, 0, 0, 0.5),
          0 2px 4px rgba(0, 0, 0, 0.3) !important;
        ` : ''}
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
      }

      /* Links - but not social buttons */
      body .adaptive-text-enhanced a:not([class*="border"]),
      body.dark .adaptive-text-enhanced a:not([class*="border"]) {
        mix-blend-mode: difference !important;
        color: #ffffff !important;
        text-decoration: underline !important;
        text-decoration-thickness: 2px !important;
        text-underline-offset: 3px !important;
        ${config.useTextShadow ? `
        text-shadow:
          0 0 20px rgba(0, 0, 0, 0.5),
          0 2px 4px rgba(0, 0, 0, 0.3) !important;
        ` : ''}
      }

      /* Hover effect for links */
      body .adaptive-text-enhanced a:not([class*="border"]):hover,
      body.dark .adaptive-text-enhanced a:not([class*="border"]):hover {
        text-decoration-thickness: 3px !important;
        ${config.useTextShadow ? `
        text-shadow:
          0 0 30px rgba(0, 0, 0, 0.7),
          0 2px 6px rgba(0, 0, 0, 0.4) !important;
        ` : ''}
      }

      /* Icons */
      body .adaptive-text-enhanced [class*="fa-"],
      body .adaptive-text-enhanced i,
      body.dark .adaptive-text-enhanced [class*="fa-"],
      body.dark .adaptive-text-enhanced i {
        mix-blend-mode: difference !important;
        color: #ffffff !important;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)) !important;
      }

      /* Social buttons with glassmorphism */
      body .adaptive-text-enhanced a[class*="border"],
      body.dark .adaptive-text-enhanced a[class*="border"] {
        mix-blend-mode: normal !important;
        background: rgba(0, 0, 0, 0.3) !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        transition: all 0.3s ease !important;
      }

      body .adaptive-text-enhanced a[class*="border"]:hover,
      body.dark .adaptive-text-enhanced a[class*="border"]:hover {
        background: rgba(0, 0, 0, 0.5) !important;
        border-color: rgba(255, 255, 255, 0.8) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      }

      /* Button text - force normal blend mode and white color */
      body .adaptive-text-enhanced a[class*="border"] span,
      body .adaptive-text-enhanced a[class*="border"] i,
      body.dark .adaptive-text-enhanced a[class*="border"] span,
      body.dark .adaptive-text-enhanced a[class*="border"] i {
        color: #ffffff !important;
        mix-blend-mode: normal !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
      }

      /* Avatar image - no blend mode */
      body .adaptive-text-enhanced img[class*="rounded"],
      body.dark .adaptive-text-enhanced img[class*="rounded"] {
        border: 4px solid rgba(255, 255, 255, 0.8) !important;
        box-shadow:
          0 10px 40px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(0, 0, 0, 0.1) !important;
        mix-blend-mode: normal !important;
      }

      /* Ensure no elements inside biography have conflicting styles */
      body .adaptive-text-enhanced *:not(img):not(a[class*="border"]) *:not(i),
      body.dark .adaptive-text-enhanced *:not(img):not(a[class*="border"]) *:not(i) {
        color: inherit !important;
      }

      /* Mobile adjustments */
      @media (max-width: 768px) {
        body .adaptive-text-enhanced h1,
        body .adaptive-text-enhanced p,
        body .adaptive-text-enhanced .bio-content,
        body.dark .adaptive-text-enhanced h1,
        body.dark .adaptive-text-enhanced p,
        body.dark .adaptive-text-enhanced .bio-content {
          ${config.useTextShadow ? `
          text-shadow:
            0 0 25px rgba(0, 0, 0, 0.6),
            0 2px 6px rgba(0, 0, 0, 0.4) !important;
          ` : ''}
        }
      }
    `;

    styleEl.textContent = css;
    console.log('✓ Applied CSS blend mode styles');

    // Also apply inline styles as backup for critical elements
    applyInlineStylesBackup(section);
  }

  function applyInlineStylesBackup(section) {
    // Apply inline styles to ensure styles are applied even if CSS doesn't work
    const textElements = section.querySelectorAll('h1, h2, h3, p, span:not(.typewriter-cursor), strong, b, a:not([class*="border"])');

    console.log(`✓ Applying inline styles to ${textElements.length} elements`);

    textElements.forEach(element => {
      // Skip images and button text
      if (element.tagName === 'IMG' || element.closest('a[class*="border"]')) {
        return;
      }

      element.style.setProperty('mix-blend-mode', 'difference', 'important');
      element.style.setProperty('color', '#ffffff', 'important');

      if (config.useTextShadow) {
        element.style.setProperty('text-shadow', '0 0 20px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)', 'important');
      }

      element.style.setProperty('-webkit-font-smoothing', 'antialiased', 'important');
      element.style.setProperty('-moz-osx-font-smoothing', 'grayscale', 'important');
    });

    // Handle social buttons separately
    const buttons = section.querySelectorAll('a[class*="border"]');
    buttons.forEach(button => {
      button.style.setProperty('mix-blend-mode', 'normal', 'important');
      button.style.setProperty('background', 'rgba(0, 0, 0, 0.3)', 'important');
      button.style.setProperty('border-color', 'rgba(255, 255, 255, 0.5)', 'important');
      button.style.setProperty('backdrop-filter', 'blur(10px)', 'important');

      // Button text
      const buttonText = button.querySelectorAll('span, i');
      buttonText.forEach(text => {
        text.style.setProperty('color', '#ffffff', 'important');
        text.style.setProperty('mix-blend-mode', 'normal', 'important');
        text.style.setProperty('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.5)', 'important');
      });
    });

    console.log('✓ Inline styles applied as backup');
  }

  function applyInlineStyles(section) {
    // Full inline style method (used if useBlendMode is false)
    console.log('📊 Using JavaScript color detection mode');

    function updateColors() {
      const textElements = section.querySelectorAll('h1, h2, h3, p, span:not(.typewriter-cursor), strong, b, a:not([class*="border"])');

      textElements.forEach(element => {
        if (element.tagName === 'IMG' || element.closest('a[class*="border"]')) return;

        // Special rule: H1 (name) is always black
        if (element.tagName === 'H1') {
          element.style.setProperty('color', '#000000', 'important');
          element.style.setProperty('mix-blend-mode', 'normal', 'important');
          element.style.setProperty('text-shadow', '0 2px 4px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)', 'important');
          console.log('H1 (name): Fixed to black');
          return; // Skip adaptive color for H1
        }

        const bgColor = getBackgroundColor(element);
        const brightness = calculateBrightness(bgColor);

        console.log(`Element: ${element.tagName}, BG: ${bgColor}, Brightness: ${brightness.toFixed(1)}`);

        if (brightness > 128) {
          // Light background - use dark text
          element.style.setProperty('color', '#000000', 'important');
          element.style.setProperty('mix-blend-mode', 'normal', 'important');
          if (config.useTextShadow) {
            element.style.setProperty('text-shadow', '0 2px 4px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)', 'important');
          }
        } else {
          // Dark background - use light text
          element.style.setProperty('color', '#ffffff', 'important');
          element.style.setProperty('mix-blend-mode', 'normal', 'important');
          if (config.useTextShadow) {
            element.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)', 'important');
          }
        }
      });
    }

    // Initial update
    updateColors();

    // Update periodically for animated gradients
    setInterval(updateColors, config.updateInterval);
    console.log(`✓ Color detection active (updates every ${config.updateInterval}ms)`);
  }

  function getBackgroundColor(element) {
    // First try to get color from page-bg gradient
    const pageBg = document.getElementById('page-bg');
    if (pageBg) {
      const bgStyle = window.getComputedStyle(pageBg);
      const bgColor = bgStyle.backgroundColor;

      // If page-bg has a solid color, use it
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }

      // Detect gradient type from classes
      const classes = pageBg.className;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const relativePosition = Math.max(0, Math.min(1, rect.top / windowHeight));

      // Define gradient color ranges
      let startColor, endColor;

      if (classes.includes('sunset')) {
        // Sunset: red to yellow
        startColor = { r: 239, g: 68, b: 68 };
        endColor = { r: 253, g: 224, b: 71 };
      } else if (classes.includes('professional')) {
        // Professional: blue to purple
        startColor = { r: 59, g: 130, b: 246 };
        endColor = { r: 147, g: 51, b: 234 };
      } else if (classes.includes('ocean')) {
        // Ocean: blue to cyan
        startColor = { r: 6, g: 182, b: 212 };
        endColor = { r: 59, g: 130, b: 246 };
      } else if (classes.includes('dark-mode')) {
        // Dark mode: dark navy
        startColor = { r: 15, g: 23, b: 42 };
        endColor = { r: 30, g: 41, b: 59 };
      } else {
        // Default gradient
        startColor = { r: 139, g: 92, b: 246 };
        endColor = { r: 236, g: 72, b: 153 };
      }

      // Interpolate colors based on position
      const red = Math.round(startColor.r + (endColor.r - startColor.r) * relativePosition);
      const green = Math.round(startColor.g + (endColor.g - startColor.g) * relativePosition);
      const blue = Math.round(startColor.b + (endColor.b - startColor.b) * relativePosition);

      return `rgb(${red}, ${green}, ${blue})`;
    }

    // Fallback: check element and parents
    let current = element;
    while (current) {
      const bgColor = window.getComputedStyle(current).backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return bgColor;
      }
      current = current.parentElement;
    }

    // Default to white if nothing found
    return 'rgb(255, 255, 255)';
  }

  function calculateBrightness(color) {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 128;

    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  function observeThemeChanges(section) {
    // Watch for theme toggle (light/dark mode changes)
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isDark = document.body.classList.contains('dark') ||
                         document.documentElement.classList.contains('dark');
          console.log(`🌓 Theme changed to: ${isDark ? 'dark' : 'light'}`);

          // Re-apply styles immediately
          setTimeout(() => {
            console.log('♻️ Re-applying styles after theme change...');
            if (config.useBlendMode) {
              applyBlendModeStyles(section);
            } else {
              applyInlineStyles(section);
            }
          }, 100);
        }
      });
    });

    // Observe both body and html for class changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    console.log('✓ Theme change observer active');
  }
})();
