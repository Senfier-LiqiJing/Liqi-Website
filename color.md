# Color Customization Guide
## Dynamic Background Color Schemes & Customization

This guide provides all color information for customizing your website's dynamic backgrounds.

---

## 🎨 Pre-Built Color Schemes

### **1. Professional (Recommended for Portfolios)**
```css
Colors:
- Start: #667eea (Soft Blue)
- 25%:   #764ba2 (Purple)
- 50%:   #f093fb (Pink)
- 75%:   #4facfe (Sky Blue)
- End:   #667eea (Loop back)

Animation: 15-second smooth gradient shift
Use Case: Professional portfolios, resumes, business sites
```

**Configuration:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'professional'
}
```

---

### **2. Default (Vibrant Multi-Color)**
```css
Colors:
- #ee7752 (Coral Red)
- #e73c7e (Magenta)
- #23a6d5 (Bright Blue)
- #23d5ab (Turquoise)

Animation: Bold, energetic color transitions
Use Case: Creative portfolios, personal blogs, vibrant brands
```

**Configuration:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'default'
}
```

---

### **3. Ocean (Cool Blue Tones)**
```css
Colors:
- #2e3192 (Deep Navy)
- #1bffff (Bright Cyan)
- #4facfe (Sky Blue)
- #00f2fe (Light Cyan)

Animation: Calm wave-like color flow
Use Case: Tech blogs, marine themes, calming sites
```

**Configuration:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'ocean'
}
```

---

### **4. Sunset (Warm Orange/Red)**
```css
Colors:
- #ff6b6b (Coral Red)
- #feca57 (Golden Yellow)
- #ee5a6f (Pink Red)
- #f79d00 (Orange)

Animation: Warm, inviting transitions
Use Case: Photography portfolios, creative sites, warm brands
```

**Configuration:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'sunset'
}
```

---

### **5. Dark Mode (Dark Purple/Blue)**
```css
Colors:
- #1a1a2e (Dark Navy)
- #16213e (Dark Blue)
- #0f3460 (Deep Blue)
- #533483 (Dark Purple)

Animation: Subtle dark gradients
Use Case: Dark-themed sites, developer portfolios
```

**Configuration:**
```javascript
{
  type: 'gradient',
  gradientVariant: 'dark-mode'
}
```

---

## 🎨 Particle Network Colors

### **Light Mode (Default)**
```css
Particle Color: rgba(99, 102, 241, 0.6)  /* Blue with 60% opacity */
Line Color:     rgba(99, 102, 241, 0.2)  /* Blue with 20% opacity */
```

### **Dark Mode (Auto-Adjusted)**
```css
Particle Color: rgba(147, 197, 253, 0.6)  /* Light Blue with 60% opacity */
Line Color:     rgba(147, 197, 253, 0.2)  /* Light Blue with 20% opacity */
```

---

## 🎨 Geometric Pattern Colors

### **Light Mode**
```css
Background: #f0f4f8 (Light Gray-Blue)

Radial Gradients:
- Circle 1: rgba(99, 102, 241, 0.1)   /* Blue at 20% 50% */
- Circle 2: rgba(236, 72, 153, 0.1)   /* Pink at 80% 80% */
- Circle 3: rgba(59, 130, 246, 0.08)  /* Sky Blue at 40% 20% */

Grid Lines: rgba(99, 102, 241, 0.05)  /* Very subtle blue lines */
```

### **Dark Mode**
```css
Background: #0f172a (Dark Slate)

Radial Gradients (Enhanced):
- Circle 1: rgba(99, 102, 241, 0.15)
- Circle 2: rgba(236, 72, 153, 0.15)
- Circle 3: rgba(59, 130, 246, 0.12)
```

---

## 🎨 Mesh Gradient Colors

### **Light Mode**
```css
Base Gradient:
- From: #667eea (Blue)
- To:   #764ba2 (Purple)

Floating Blobs:
- Blob 1: #667eea (Blue) with radial fade
- Blob 2: #f093fb (Pink) with radial fade

Filter: blur(80px)
Opacity: 0.5
```

### **Dark Mode**
```css
Base Gradient:
- From: #1a1a2e (Dark Navy)
- To:   #16213e (Dark Blue)

Floating Blobs remain the same but blend differently with dark base
```

---

## 🎨 Waves Background Colors

```css
Base Gradient:
- From (top):    #667eea (Blue)
- To (bottom):   #764ba2 (Purple)

Wave Layers (White with varying opacity):
- Wave 1: rgba(255, 255, 255, 0.5)
- Wave 2: rgba(255, 255, 255, 0.3)
- Wave 3: rgba(255, 255, 255, 0.2)
```

---

## 🔧 How to Customize Colors

### **Option 1: Modify Existing Variants**

Edit [`assets/css/dynamic-background.css`](assets/css/dynamic-background.css)

**Example - Change Professional Gradient:**

Find line 40-48 and modify:

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
    background-size: 400% 400%;
}
```

---

### **Option 2: Create New Color Variant**

Add to [`assets/css/dynamic-background.css`](assets/css/dynamic-background.css) after line 70:

```css
/* Your custom variant */
.bg-animated-gradient.custom {
    background: linear-gradient(
        -45deg,
        #ff0080,  /* Hot Pink */
        #7928ca,  /* Purple */
        #00d4ff,  /* Cyan */
        #ff0080   /* Loop back */
    );
    background-size: 400% 400%;
}
```

Then use it in [`layouts/partials/custom/body-end.html`](layouts/partials/custom/body-end.html):

```javascript
{
  type: 'gradient',
  gradientVariant: 'custom'
}
```

---

### **Option 3: Customize Particle Colors**

Edit [`assets/js/particle-background.js`](assets/js/particle-background.js)

Find lines 186-200 (inside `initParticleBackground` function):

```javascript
const defaultOptions = isDarkMode ? {
  particleColor: 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.6)',
  lineColor: 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.2)',
  backgroundColor: 'transparent',
} : {
  particleColor: 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.6)',
  lineColor: 'rgba(YOUR_R, YOUR_G, YOUR_B, 0.2)',
  backgroundColor: 'transparent',
};
```

---

## 🎨 Color Palette Generator Tools

### **Recommended Tools:**

1. **Coolors** - https://coolors.co/
   - Generate 5-color palettes
   - Export as CSS

2. **CSS Gradient** - https://cssgradient.io/
   - Visual gradient builder
   - Copy CSS directly

3. **UI Gradients** - https://uigradients.com/
   - Pre-made gradient collections
   - Copy CSS code

4. **Adobe Color** - https://color.adobe.com/
   - Professional color wheels
   - Harmony rules

5. **Mesh Gradient** - https://meshgradient.com/
   - Modern mesh gradients
   - Export as CSS/SVG

---

## 🎨 Color Scheme Suggestions by Industry

### **Technology / Developer**
```css
Colors: #0066ff, #00ccff, #00ffcc, #6600ff
Style: Cool blues and purples
Variant: Professional or Ocean
```

### **Creative / Design**
```css
Colors: #ff6b6b, #f093fb, #4facfe, #fee140
Style: Vibrant, bold colors
Variant: Default or Sunset
```

### **Corporate / Business**
```css
Colors: #667eea, #764ba2, #536976, #292e49
Style: Subdued, professional
Variant: Professional or Dark Mode
```

### **Healthcare / Wellness**
```css
Colors: #a8edea, #fed6e3, #89f7fe, #66a6ff
Style: Soft, calming pastels
Variant: Ocean or custom light pastels
```

### **Education / Academic**
```css
Colors: #4facfe, #00f2fe, #43e97b, #38f9d7
Style: Fresh, energetic
Variant: Ocean or Professional
```

### **Photography / Art**
```css
Colors: #ee9ca7, #ffdde1, #ffafbd, #c9ffbf
Style: Warm, inviting
Variant: Sunset or custom warm tones
```

---

## 🎨 Brand Color Integration

### **Step 1: Identify Your Brand Colors**

Example brand palette:
- Primary: #2563eb (Blue)
- Secondary: #7c3aed (Purple)
- Accent: #f59e0b (Amber)

### **Step 2: Create Gradient from Brand Colors**

In [`assets/css/dynamic-background.css`](assets/css/dynamic-background.css):

```css
.bg-animated-gradient.brand {
    background: linear-gradient(
        -45deg,
        #2563eb,  /* Primary */
        #7c3aed,  /* Secondary */
        #f59e0b,  /* Accent */
        #2563eb   /* Back to Primary */
    );
    background-size: 400% 400%;
}
```

### **Step 3: Apply**

```javascript
{
  type: 'gradient',
  gradientVariant: 'brand'
}
```

---

## 🎨 Accessibility Considerations

### **Color Contrast**

Ensure text remains readable by:

1. **Using Overlay:**
   ```javascript
   useOverlay: true
   ```

2. **Adjusting Opacity:**
   ```css
   body::after {
     opacity: 0.8;  /* Increase for more contrast */
   }
   ```

3. **Testing Contrast:**
   - Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
   - Aim for WCAG AA (4.5:1) or AAA (7:1) contrast ratio

### **Color Blindness Testing**

Test your gradients with simulators:
- **Colorblind Web Page Filter:** https://www.toptal.com/designers/colorfilter
- **Chrome DevTools:** Built-in vision deficiency emulator

---

## 🎨 Seasonal Color Schemes

### **Spring**
```css
Colors: #a8e6cf, #dcedc8, #ffd3b6, #ffaaa5
Variant: Fresh pastels
```

### **Summer**
```css
Colors: #00d4ff, #ffd700, #ff6b6b, #00ffcc
Variant: Bright, vibrant
```

### **Fall/Autumn**
```css
Colors: #f79d00, #ee5a6f, #c89b3c, #8b4513
Variant: Warm, earthy
```

### **Winter**
```css
Colors: #667eea, #b4c6e7, #e3f2fd, #90caf9
Variant: Cool, icy blues
```

---

## 🎨 Testing Your Colors

### **Before/After Checklist:**

✅ **Text Readability:** Can you read white AND black text?
✅ **Dark Mode:** Does it look good in dark theme?
✅ **Mobile:** Test on actual mobile device
✅ **Animation Speed:** Is 15s too slow/fast?
✅ **Accessibility:** Run contrast checker
✅ **Brand Match:** Does it fit your brand identity?

---

## 🎨 Quick Color Reference

### **RGB to Hex Converter:**
```
rgb(99, 102, 241)  →  #6366f1
rgb(236, 72, 153)  →  #ec4899
rgb(59, 130, 246)  →  #3b82f6
```

### **Opacity Values:**
```
0.1 = 10%  (Very subtle)
0.2 = 20%  (Subtle)
0.5 = 50%  (Medium)
0.6 = 60%  (Visible)
0.8 = 80%  (Strong)
1.0 = 100% (Solid)
```

### **Common Color Codes:**

| Color | Hex | RGB |
|-------|-----|-----|
| Blue | #3b82f6 | rgb(59, 130, 246) |
| Purple | #8b5cf6 | rgb(139, 92, 246) |
| Pink | #ec4899 | rgb(236, 72, 153) |
| Red | #ef4444 | rgb(239, 68, 68) |
| Orange | #f97316 | rgb(249, 115, 22) |
| Yellow | #eab308 | rgb(234, 179, 8) |
| Green | #22c55e | rgb(34, 197, 94) |
| Cyan | #06b6d4 | rgb(6, 182, 212) |

---

## 🎨 Advanced: Animated Color Transitions

### **Change Animation Speed:**

In [`assets/css/dynamic-background.css`](assets/css/dynamic-background.css), find line 75:

```css
animation: gradientShift 15s ease infinite;
```

Adjust timing:
```css
animation: gradientShift 10s ease infinite;  /* Faster */
animation: gradientShift 25s ease infinite;  /* Slower */
```

### **Change Animation Direction:**

```css
@keyframes gradientShift {
    0% {
        background-position: 100% 50%;  /* Start from right */
    }
    50% {
        background-position: 0% 50%;    /* Move to left */
    }
    100% {
        background-position: 100% 50%;  /* Back to right */
    }
}
```

---

## 📚 Color Psychology Quick Guide

| Color | Emotion | Best For |
|-------|---------|----------|
| **Blue** | Trust, calm, professional | Corporate, tech, healthcare |
| **Purple** | Creative, luxury, wisdom | Design, art, premium brands |
| **Green** | Growth, nature, health | Eco, wellness, finance |
| **Red** | Energy, passion, urgency | Food, sports, entertainment |
| **Orange** | Friendly, confident, warm | Startups, creative, social |
| **Yellow** | Happy, optimistic, young | Children, food, travel |
| **Pink** | Feminine, playful, modern | Fashion, beauty, lifestyle |
| **Cyan** | Tech, modern, innovative | Software, apps, digital |

---

## ✅ Summary

**Most Popular Combinations:**

1. **Professional Blue/Purple** (Recommended for most users)
   ```css
   #667eea → #764ba2 → #f093fb → #4facfe
   ```

2. **Ocean Cool Tones** (Tech/Developer)
   ```css
   #2e3192 → #1bffff → #4facfe → #00f2fe
   ```

3. **Sunset Warm Tones** (Creative/Photography)
   ```css
   #ff6b6b → #feca57 → #ee5a6f → #f79d00
   ```

**Need help choosing?** Start with **Professional** - it works for 80% of websites!

---

For implementation details, see [DYNAMIC-BACKGROUNDS-GUIDE.md](DYNAMIC-BACKGROUNDS-GUIDE.md)

🎨 Happy customizing!
