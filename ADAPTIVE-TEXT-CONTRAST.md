# Adaptive Text Contrast Guide

## Overview

This feature ensures perfect text readability over gradient backgrounds by dynamically adjusting text colors based on the background brightness. It uses CSS blend modes and JavaScript for optimal contrast.

---

## 🎨 How It Works

The system uses two methods:

1. **CSS Blend Mode** (Primary): Uses `mix-blend-mode: difference` to automatically invert text colors relative to the background
2. **JavaScript Dynamic Colors** (Fallback): Calculates background brightness and applies contrasting text colors

---

## 📁 Files Involved

### CSS Files

- **[assets/css/adaptive-text-contrast.css](assets/css/adaptive-text-contrast.css)** - CSS-based blend mode styles
- Applied via [layouts/partials/custom/head.html](layouts/partials/custom/head.html)

### JavaScript Files

- **[static/js/adaptive-text-color.js](static/js/adaptive-text-color.js)** - JavaScript-based dynamic color adjustment
- Loaded via [content/_index.md](content/_index.md) markdown block

### Configuration Files

- **[content/_index.md](content/_index.md)** - Homepage configuration with script loader

---

## ⚙️ Configuration Options

### JavaScript Configuration

Edit [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js) lines 10-21:

```javascript
const config = {
  // Only apply on homepage
  applyOnHomepageOnly: true,

  // Minimum contrast ratio (WCAG AA standard is 4.5:1)
  minContrast: 4.5,

  // Use blend mode as primary method
  useBlendMode: true,

  // Add text shadows for extra contrast
  useTextShadow: true,

  // Update frequency in milliseconds (for scroll/resize)
  updateInterval: 100,

  // Debug mode - shows console logs
  debug: false
};
```

### Option Explanations

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `applyOnHomepageOnly` | boolean | `true` | Only apply effect to homepage (/) |
| `minContrast` | number | `4.5` | WCAG contrast ratio (AA=4.5, AAA=7.0) |
| `useBlendMode` | boolean | `true` | Use CSS blend mode (recommended) |
| `useTextShadow` | boolean | `true` | Add shadows for extra definition |
| `updateInterval` | number | `100` | Milliseconds between updates (dynamic mode) |
| `debug` | boolean | `false` | Enable console logging |

---

## 🎯 Methods Comparison

### Method 1: CSS Blend Mode (Recommended)

**Pros:**
- ✅ Automatic color inversion
- ✅ Works with any gradient
- ✅ GPU-accelerated (fast)
- ✅ No JavaScript calculations needed

**Cons:**
- ⚠️ May look unusual on some color combinations
- ⚠️ Not supported in IE (but who uses IE?)

**When to use:** Most cases, especially with vibrant gradients

### Method 2: JavaScript Dynamic Colors

**Pros:**
- ✅ Full control over color selection
- ✅ Predictable results
- ✅ Works in all browsers

**Cons:**
- ⚠️ Requires recalculation on scroll/resize
- ⚠️ Slightly more CPU usage
- ⚠️ May have slight delay on updates

**When to use:** When blend mode produces unexpected results

---

## 🔧 Switching Between Methods

### Enable Blend Mode (Default)

```javascript
const config = {
  useBlendMode: true,  // CSS blend mode
  // ...
};
```

**Result:** Text inverts automatically based on background

### Enable Dynamic Colors

```javascript
const config = {
  useBlendMode: false,  // JavaScript calculation
  // ...
};
```

**Result:** Text color calculated based on brightness (black on light, white on dark)

---

## 🎨 Visual Effects Applied

### Text Elements

- Headings (h1, h2, h3)
- Paragraphs (p)
- Biography content (.bio-content)
- Links (a)

**Effects:**
- Color inversion (blend mode) or dynamic color
- Text shadows for definition
- Smooth antialiasing

### Buttons and Social Links

- Semi-transparent background (glassmorphism)
- White text with shadows
- Hover effects (lift + glow)

**Style:**
```css
background: rgba(0, 0, 0, 0.3);
backdrop-filter: blur(10px);
border: rgba(255, 255, 255, 0.5);
```

### Avatar Image

- White border for definition
- Shadow for depth
- Normal blend mode (no inversion)

### Icons

- Color inversion
- Drop shadows for visibility

---

## 🚀 Testing Your Configuration

### Step 1: Enable Debug Mode

In [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js):

```javascript
const config = {
  debug: true,  // Enable debug logs
  // ...
};
```

### Step 2: Open Browser Console

1. Start Hugo server: `hugo server --disableFastRender`
2. Open homepage: `http://localhost:1313`
3. Open browser DevTools (F12)
4. Check Console tab

### Expected Output

```
✓ Adaptive text: Biography section found
✓ Adaptive text contrast applied successfully
```

### Step 3: Test Different Backgrounds

Change gradient in [static/js/init-background.js](static/js/init-background.js):

```javascript
const config = {
  type: 'gradient',
  gradientVariant: 'sunset',    // Try: professional, ocean, sunset, dark-mode
  useOverlay: false
};
```

---

## 🎨 Customization Examples

### Example 1: Stronger Text Shadows

In [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js), find the `applyBlendModeStyles()` function and modify:

```javascript
text-shadow:
  0 0 30px rgba(0, 0, 0, 0.7),    // Larger glow (was 20px, 0.5)
  0 3px 6px rgba(0, 0, 0, 0.5);   // Deeper shadow (was 2px, 0.3)
```

### Example 2: Add Background Overlay to Text

In [assets/css/adaptive-text-contrast.css](assets/css/adaptive-text-contrast.css), uncomment lines 48-52:

```css
.page-home .resume-biography .bio-content {
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  border-radius: 12px;
}
```

### Example 3: Different Button Style

In [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js), modify button styles:

```javascript
.adaptive-text-enhanced a[class*="border"] {
  background: rgba(255, 255, 255, 0.2) !important;  // Light buttons
  border-color: rgba(0, 0, 0, 0.3) !important;      // Dark borders
  backdrop-filter: blur(15px);                       // More blur
}
```

### Example 4: Apply to All Pages (Not Just Homepage)

In [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js):

```javascript
const config = {
  applyOnHomepageOnly: false,  // Apply to all pages
  // ...
};
```

---

## 🐛 Troubleshooting

### Issue 1: Text Not Changing Color

**Possible Causes:**
- JavaScript not loading
- Biography section not found
- CSS specificity conflict

**Solutions:**

1. **Check if script loaded:**
   ```javascript
   // In browser console
   console.log(document.querySelector('.adaptive-text-enhanced'));
   // Should return the biography section element
   ```

2. **Verify script is in _index.md:**
   ```yaml
   - block: markdown
     content:
       text: |
         <script src="/js/adaptive-text-color.js"></script>
   ```

3. **Check CSS is not being overridden:**
   - Open DevTools
   - Inspect text element
   - Look for `mix-blend-mode` in Computed styles
   - If missing, add `!important` to CSS rules

### Issue 2: Text Shadow Too Strong/Weak

**Solution:** Adjust shadow values in [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js)

```javascript
// Weaker shadow
text-shadow:
  0 0 10px rgba(0, 0, 0, 0.3),
  0 1px 2px rgba(0, 0, 0, 0.2);

// Stronger shadow
text-shadow:
  0 0 40px rgba(0, 0, 0, 0.8),
  0 4px 8px rgba(0, 0, 0, 0.5);
```

### Issue 3: Blend Mode Looks Weird

Some gradient colors may produce unexpected results with `mix-blend-mode: difference`.

**Solution:** Switch to dynamic color method

```javascript
const config = {
  useBlendMode: false,  // Use JavaScript calculation instead
  // ...
};
```

### Issue 4: Performance Issues on Mobile

**Solution:** Disable dynamic updates or increase update interval

```javascript
const config = {
  useBlendMode: true,      // Use CSS (no JS calculations)
  updateInterval: 300,     // Update less frequently (was 100ms)
  // ...
};
```

### Issue 5: Avatar Border Wrong Color

**Solution:** Edit border in [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js)

```javascript
.adaptive-text-enhanced img[class*="rounded"] {
  border: 4px solid rgba(0, 0, 0, 0.8);  // Dark border
  // OR
  border: 4px solid rgba(255, 255, 255, 0.8);  // Light border
}
```

---

## 🎨 Alternative Approaches

### Approach 1: Static Overlay (Simplest)

Add a semi-transparent overlay over the entire background:

In [static/js/init-background.js](static/js/init-background.js):

```javascript
const config = {
  type: 'gradient',
  gradientVariant: 'sunset',
  useOverlay: true  // Enable overlay
};
```

**Pros:** Simple, works everywhere
**Cons:** Dulls the background colors

### Approach 2: Text Background Boxes

Add semi-transparent backgrounds behind text blocks:

In [assets/css/adaptive-text-contrast.css](assets/css/adaptive-text-contrast.css), uncomment section at lines 160-170.

**Pros:** Guarantees readability
**Cons:** Changes visual design significantly

### Approach 3: Filter Approach

Use CSS filters instead of blend mode:

```css
.page-home .resume-biography * {
  filter: invert(1) hue-rotate(180deg);
}
```

**Pros:** Different visual effect
**Cons:** Inverts everything including images

---

## 📊 Accessibility Considerations

### WCAG Contrast Standards

- **WCAG AA**: Minimum contrast ratio of 4.5:1 (normal text)
- **WCAG AAA**: Minimum contrast ratio of 7.0:1 (enhanced)

Current setting: `minContrast: 4.5` (WCAG AA compliant)

### Testing Contrast

Use browser DevTools or online tools:

1. **Chrome DevTools:**
   - Inspect element
   - Check "Contrast" in Accessibility panel

2. **Online Tools:**
   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
   - Colorable: https://colorable.jxnblk.com/

### Screen Reader Compatibility

The blend mode and color changes are purely visual and do not affect:
- Text content
- Screen reader announcements
- Keyboard navigation
- Semantic HTML structure

---

## 🎨 Color Recommendations

### Best Gradient Backgrounds for This Effect

| Gradient | Text Method | Readability |
|----------|-------------|-------------|
| **Sunset** (red-yellow) | Blend mode | ⭐⭐⭐⭐⭐ Excellent |
| **Professional** (blue-purple) | Blend mode | ⭐⭐⭐⭐⭐ Excellent |
| **Ocean** (blue-cyan) | Blend mode | ⭐⭐⭐⭐ Good |
| **Dark Mode** (dark navy) | Dynamic colors | ⭐⭐⭐⭐⭐ Excellent |
| **Default** (multi-color) | Blend mode | ⭐⭐⭐ Fair |

### Tips for Best Results

1. **Use gradients with good color separation:** Large color differences work best with blend mode
2. **Avoid mid-tone grays:** These can produce low contrast with both methods
3. **Test in both light and dark modes:** Ensure readability in both themes
4. **Consider color blindness:** Use online simulators to test

---

## 🔄 Quick Settings Reference

### Maximum Readability (Recommended)

```javascript
const config = {
  applyOnHomepageOnly: true,
  minContrast: 4.5,
  useBlendMode: true,
  useTextShadow: true,
  updateInterval: 100,
  debug: false
};
```

### Performance Optimized (Mobile)

```javascript
const config = {
  applyOnHomepageOnly: true,
  minContrast: 4.5,
  useBlendMode: true,      // No JS calculations
  useTextShadow: false,    // Skip shadows
  updateInterval: 300,
  debug: false
};
```

### Conservative Approach (Most Compatible)

```javascript
const config = {
  applyOnHomepageOnly: true,
  minContrast: 4.5,
  useBlendMode: false,     // Use brightness calculation
  useTextShadow: true,
  updateInterval: 200,
  debug: false
};
```

---

## 📚 Additional Resources

### CSS Blend Modes
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- CSS Tricks: https://css-tricks.com/basics-css-blend-modes/

### Color Contrast
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- Contrast Checker: https://webaim.org/resources/contrastchecker/

### Backdrop Filters
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- Can I Use: https://caniuse.com/css-backdrop-filter

---

## ✅ Summary

**Default Configuration:**
- ✅ Blend mode enabled (automatic color inversion)
- ✅ Text shadows enabled (extra contrast)
- ✅ Homepage only (doesn't affect other pages)
- ✅ WCAG AA compliant (4.5:1 contrast ratio)
- ✅ Mobile optimized (GPU-accelerated)

**Main Configuration File:** [static/js/adaptive-text-color.js](static/js/adaptive-text-color.js)

**To Enable:** Already enabled by default via [content/_index.md](content/_index.md)

**To Customize:** Edit configuration object in JavaScript file (lines 10-21)

---

🎨 **Enjoy perfect text readability on your gradient backgrounds!**

For implementation details on gradient backgrounds, see [DYNAMIC-BACKGROUNDS-GUIDE.md](DYNAMIC-BACKGROUNDS-GUIDE.md)
