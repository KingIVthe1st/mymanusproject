# Amira Rahim Portfolio - Token-Efficient Handoff
*December 13, 2025*

## Current State ✅
- **Live Site**: https://amirarahim.com (GitHub Pages)
- **Repo**: github.com:KingIVthe1st/mymanusproject.git
- **Last Commit**: d1c36b0 - Mobile fixes (scroll + Chrome menu)
- **Local Server**: http://localhost:8989

## Recent Fixes (Dec 2025)
1. **Mobile Scroll**: Removed body.menu-open lock on load
2. **Chrome Menu**: Added touchstart events + vendor prefixes
3. **Files**: mobile-fix-december2025.js/.css integrated

## Tech Stack
- Static HTML/CSS/JS (no frameworks)
- Tailwind CSS + custom styles
- Service Worker + Image optimization
- Glassmorphic design + animations

## Key Features Working
- ✅ Mobile responsive
- ✅ Artwork gallery → Shopify
- ✅ Featured In section
- ✅ Education cards
- ✅ Contact form
- ✅ Testimonials auto-scroll
- ✅ Living gradient background
- ✅ Rainbow cursor particles

## Known Issues
- About section tabs visibility on mobile
- Featured originals bottom 2 cards opacity
- Some CSS conflicts from multiple fixes

## Critical Files
```
docs/
├── index.html (main file - 99KB)
├── styles/
│   ├── main.css (core styles)
│   ├── mobile-fix-december2025.css (latest fix)
│   └── [50+ CSS files - many redundant]
├── scripts/
│   ├── gallery.js
│   ├── sw-manager.js (service worker)
│   └── micro-interactions-modified.js
└── images/
    └── optimized/ (AVIF/WebP variants)
```

## Quick Commands
```bash
# Local dev
cd "/Users/ivanjackson/Documents/local dev projects/🎨 Art & Creative Projects/my-manus-project"
python3 -m http.server 8989 -d docs

# Git workflow
git add .
git commit -m "🔧 Fix description"
git push origin main

# Test mobile fixes
open http://localhost:8989/mobile-test.html
```

## Next Potential Tasks
1. CSS consolidation (50+ files → 5-10)
2. Fix About mobile tabs visibility
3. Remove conflicting mobile menu scripts
4. Performance: Lazy load remaining images
5. Accessibility audit

## Client Info
- **Artist**: Amira Rahim
- **Brand**: "The Color Poet"
- **Royal collector**: Al Nahyan Family
- **Media**: Ebony, HuffPost, Being Boss
- **Programs**: Better Than Art School, Paint to Prosper book

## Deploy Notes
- GitHub Pages auto-deploys from docs/ folder
- 2-5 min deployment time
- Domain: amirarahim.com (CNAME configured)

## Emergency Fixes
```javascript
// Remove scroll lock
document.body.classList.remove('menu-open');
document.body.style.overflow = '';

// Force mobile menu visible
document.querySelector('.mobile-menu').style.display = 'flex';
```

---
*Clean, working state. Mobile fixes tested Chrome/Safari.*