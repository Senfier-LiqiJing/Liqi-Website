# Dynamic Background Effects Guide

This guide shows you how to customize the dynamic backgrounds for your Hugo Blox website.

## 🎨 Available Background Types

### 1. **Animated Gradient** (Recommended - Lightweight)
Smooth, flowing color transitions creating an elegant effect.

**Variants:**
- `professional` - Subtle blue/purple gradient (recommended for portfolios)
- `default` - Vibrant multi-color gradient
- `ocean` - Cool blue tones
- `sunset` - Warm orange/red tones
- `dark-mode` - Dark purple/blue gradient

**Performance:** ⭐⭐⭐⭐⭐ (CSS-only, very lightweight)

---

### 2. **Geometric Pattern**
Animated geometric shapes with radial gradients.

**Features:**
- Moving grid pattern
- Subtle radial gradients
- Professional appearance

**Performance:** ⭐⭐⭐⭐ (CSS-only, lightweight)

---

### 3. **Mesh Gradient**
Modern blurred blob gradients creating a soft aesthetic.

**Features:**
- Floating blurred circles
- Soft, dreamy appearance
- Modern design trend

**Performance:** ⭐⭐⭐⭐ (CSS-only with filters)

---

### 4. **Particle Network** (Most Interactive)
Animated particles connected by lines, interactive with mouse movement.

**Features:**
- Interactive particle system
- Mouse repulsion effect
- Network connections
- Fully customizable

**Performance:** ⭐⭐⭐ (JavaScript-based, uses Canvas)

---

### 5. **Waves**
Flowing wave animation at the bottom of the page.

**Features:**
- Calm, flowing effect
- Multiple wave layers
- Ocean-inspired

**Performance:** ⭐⭐⭐⭐ (CSS-only)

---

## 🔧 How to Configure

### Quick Start

Open [`layouts/partials/custom/body-end.html`](layouts/partials/custom/body-end.html) and modify the `backgroundConfig` object:

```javascript
const backgroundConfig = {
  // Choose background type
  type: 'gradient',  // Options: 'gradient', 'geometric', 'mesh', 'particle', 'waves', 'none'

  // Gradient variant (only for gradient type)
  gradientVariant: 'professional',  // Options: 'default', 'professional', 'ocean', 'sunset', 'dark-mode'

  // Particle settings (only for particle type)
  particle: {
    count: 80,              // Number of particles (30-150)
    speed: 0.5,            // Movement speed (0.1-2.0)
    lineDistance: 150,     // Connection distance (50-300)
    interactive: true      // Mouse interaction (true/false)
  },

  // Add overlay for better text readability
  useOverlay: false  // true = semi-transparent overlay, false = no overlay
};
```

---

## 📋 Configuration Examples

### Example 1: Professional Portfolio (Recommended)
```javascript
const backgroundConfig = {
  type: 'gradient',
  gradientVariant: 'professional',
  useOverlay: false
};
```
**Result:** Subtle blue/purple gradient that looks professional

---

### Example 2: Interactive Particle Network
```javascript
const backgroundConfig = {
  type: 'particle',
  particle: {
    count: 100,
    speed: 0.3,
    lineDistance: 180,
    interactive: true
  },
  useOverlay: false
};
```
**Result:** Animated particle network that responds to mouse movement

---

### Example 3: Minimalist Geometric
```javascript
const backgroundConfig = {
  type: 'geometric',
  useOverlay: false
};
```
**Result:** Clean geometric pattern with subtle animations

---

### Example 4: Modern Mesh Gradient
```javascript
const backgroundConfig = {
  type: 'mesh',
  useOverlay: false
};
```
**Result:** Soft, blurred gradients floating in the background

---

### Example 5: Ocean Waves
```javascript
const backgroundConfig = {
  type: 'waves',
  useOverlay: false
};
```
**Result:** Flowing waves animation

---

## 🎯 Customization Tips

### Improving Text Readability

If your text is hard to read with the background:

1. **Enable Overlay:**
   ```javascript
   useOverlay: true
   ```

2. **Or manually adjust opacity** in `body-end.html`:
   ```css
   body::after {
     opacity: 1; /* Change from 0 to 1 */
   }
   ```

### Changing Gradient Colors

Edit [`assets/css/dynamic-background.css`](assets/css/dynamic-background.css):

```css
.bg-animated-gradient.professional {
    background: linear-gradient(
        -45deg,
        #YOUR_COLOR_1 0%,
        #YOUR_COLOR_2 25%,
        #YOUR_COLOR_3 50%,
        #YOUR_COLOR_4 75%,
        #YOUR_COLOR_1 100%
    );
}
```

### Adjusting Particle Settings

For more/fewer particles:
```javascript
particle: {
  count: 150,  // More particles = denser network
}
```

For slower/faster animation:
```javascript
particle: {
  speed: 0.2,  // Lower = slower
}
```

For longer/shorter connections:
```javascript
particle: {
  lineDistance: 250,  // Higher = longer lines
}
```

### Dark Mode Support

All backgrounds automatically adapt to dark mode! The script watches for theme changes and updates colors accordingly.

---

## 📱 Responsive Design

All backgrounds are fully responsive and work on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ Touch devices (particle background responds to touch)

---

## ♿ Accessibility

All animations respect `prefers-reduced-motion` settings. Users who prefer reduced motion will see static backgrounds.

---

## 🚀 Performance

### Lightweight Options (Recommended for mobile):
- Gradient (5KB CSS)
- Geometric (8KB CSS)
- Waves (6KB CSS)

### Medium Weight:
- Mesh Gradient (10KB CSS)

### Heavy (Not recommended for slow devices):
- Particle Network (15KB JS + Canvas rendering)

---

## 🔍 Troubleshooting

### Background not showing?

1. **Clear browser cache:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Rebuild Hugo:** `hugo server --disableFastRender`
3. **Check console:** Open DevTools → Console for errors
4. **Verify files loaded:** DevTools → Network tab, look for `dynamic-background.css`

### Content not readable?

Enable overlay:
```javascript
useOverlay: true
```

### Animations laggy?

Switch to lighter background:
```javascript
type: 'gradient'  // Lightest option
```

Or reduce particle count:
```javascript
particle: {
  count: 50  // Fewer particles
}
```

---

## 📦 File Structure

```
your-site/
├── assets/
│   ├── css/
│   │   └── dynamic-background.css    ← Background styles
│   └── js/
│       └── particle-background.js    ← Particle animation
├── layouts/
│   └── partials/
│       └── custom/
│           ├── head.html             ← Loads CSS/JS
│           └── body-end.html         ← Configuration script
└── DYNAMIC-BACKGROUNDS-GUIDE.md      ← This file
```

---

## 🎨 Live Preview

After configuring, run:
```bash
hugo server --disableFastRender
```

Visit `http://localhost:1313` and navigate between pages to see the background on all pages (Home, Topics, Education, etc.)

---

## 🔄 Switching Backgrounds

You can easily switch between backgrounds by changing just one line:

```javascript
type: 'gradient'   // ← Change this to 'particle', 'mesh', 'geometric', or 'waves'
```

Save the file and Hugo will automatically reload!

---

## 💡 Best Practices

1. **Start with gradient** - It's the lightest and most professional
2. **Test on mobile** - Ensure good performance on all devices
3. **Check readability** - Make sure text is easy to read
4. **Match your brand** - Customize colors to match your brand
5. **Consider your audience** - Professional sites → subtle, Creative sites → bold

---

## 📚 Additional Resources

- [CSS Gradient Generator](https://cssgradient.io/)
- [Color Palette Tool](https://coolors.co/)
- [Mesh Gradient Generator](https://meshgradient.com/)

---

## ✅ Summary

**Recommended for most users:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'professional',
  useOverlay: false
}
```

**For tech/creative portfolios:**
```javascript
{
  type: 'particle',
  particle: { count: 80, speed: 0.5, interactive: true }
}
```

**For minimalist designs:**
```javascript
{
  type: 'geometric',
  useOverlay: false
}
```

Enjoy your dynamic backgrounds! 🎉
