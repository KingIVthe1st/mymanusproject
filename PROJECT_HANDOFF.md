# My-Manus-Project Handoff Doc
*Token-Optimized Context for New Chat Sessions*

## 🎯 CURRENT STATE
**LIVE PREVIEW:** http://localhost:8089 (Python HTTP server PID 96505)
**PROJECT PATH:** `/Users/ivanjackson/Documents/local dev projects/🎨 Art & Creative Projects/my-manus-project`
**MAIN FILE:** `docs/index.html` (GitHub Pages source)
**STATUS:** Production-ready portfolio website

## 📁 PROJECT STRUCTURE
```
my-manus-project/
├── docs/           # GitHub Pages deployment folder
│   ├── index.html  # Main file - EDIT THIS
│   ├── styles/     # CSS files (many fixes applied)
│   ├── scripts/    # JS files (gallery, animations, fixes)
│   └── images/     # Optimized images (AVIF/WebP/JPG)
```

## 🚀 QUICK START
```bash
cd "/Users/ivanjackson/Documents/local dev projects/🎨 Art & Creative Projects/my-manus-project/docs"
python3 -m http.server 8089
# Visit: http://localhost:8089
```

## 🎨 WHAT THIS IS
- Artist portfolio for Amira Rahim (amirarahim.com)
- Abstract expressionist with Royal Collection credentials
- Glassmorphic design with vibrant colors
- Sections: Hero, Featured Originals, About, Featured In, Education, Testimonials, Collaborate, Contact

## 🔧 RECENT WORK (June 9, 2025)
### ISSUE FIXED: Mobile opacity problem
- **Problem:** Bottom 2 images in Featured Originals section + CTA button appeared faded on mobile only
- **Solution Applied:**
  1. Created `styles/featured-originals-mobile-fix.css`
  2. Added inline CSS override in HTML `<head>`
  3. Created `scripts/featured-originals-mobile-fix.js`
  4. All files properly linked in `docs/index.html`

## ⚠️ KNOWN ISSUES
1. Multiple CSS fix files creating specificity conflicts
2. Some malformed CSS references in HTML (missing quotes/commas)
3. Heavy page with many optimization scripts

## 🛠️ COMMON TASKS
### Update content:
Edit `docs/index.html` directly

### Test mobile view:
Chrome DevTools > Toggle device toolbar > iPhone/Android

### Deploy changes:
```bash
git add -A
git commit -m "Your message"
git push origin main
```

## 📝 KEY MEMORY POINTS
- Gallery modal disabled for shop links (artwork goes to Shopify)
- Service worker implemented for PWA functionality
- Image optimization system (AVIF/WebP fallbacks)
- Multiple animation systems (particles, gradients, micro-interactions)
- About section tabs MUST show on mobile (has fixes applied)
- Education section has visibility fixes
- Featured Originals mobile opacity issue JUST FIXED

## 🔄 TO CONTINUE WORK
1. Copy this entire doc to new chat
2. Run local server command above
3. Check http://localhost:8089
4. Continue from "Featured Originals mobile opacity fixed"

## 💡 OPTIMIZATION TIPS
- Main edits in `docs/index.html`
- Test mobile view for all changes
- Many existing CSS fixes - check before adding new ones
- Use browser DevTools to debug opacity/visibility issues

---
*Last updated: June 9, 2025 - Featured Originals mobile fix completed*
