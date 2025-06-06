# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an artistic portfolio website for Amira Rahim, an abstract expressionist artist. The project is a static HTML/CSS/JavaScript website deployed on Netlify, featuring artwork galleries, educational content, licensing information, and contact sections.

## Common Development Commands

### Code Formatting
```bash
# Format code with Prettier (via lint-staged)
git add <files>
git commit  # This triggers pre-commit hooks

# Manual formatting (if needed)
npx prettier --write "*.{js,jsx,ts,tsx,json,css,scss,md}"
```

### Local Development
Since this is a static site, you can:
```bash
# Option 1: Use a simple HTTP server
python -m http.server 8000
# or
npx http-server -p 8000

# Option 2: Use VS Code Live Server extension

# Option 3: Open index.html directly in browser
```

### Git Hooks
The project uses Husky for Git hooks with lint-staged:
- Pre-commit: Automatically formats staged files with Prettier
- Configuration in `package.json` under `lint-staged`

### Deployment
The site is configured for Netlify deployment:
- Auto-deploys from git pushes
- Configuration in `netlify.toml`
- Publish directory: `.` (root)
- No build command required (static site)
- SPA redirects configured (all routes redirect to index.html)
- Security headers configured (X-Frame-Options, XSS Protection, etc.)

## High-Level Architecture

### Directory Structure
- **Root level**: Main site files (index.html, styles/, scripts/)
- **docs/**: Production deployment directory with full site
- **deploy/**: Alternative deployment directory
- **docs.bak/**: Backup of docs directory
- **minimal-deploy/**: Minimal version of the site
- **images/**: All site images organized by category
  - artwork/: Art pieces
  - logo/: Brand logos
  - podcasts/: Podcast icons
  - press/: Media outlet logos
  - education/: Educational content images
  - licensing/: Licensing-related images

### CSS Architecture
The site uses modular CSS with specific purpose files:
- `main.css`: Core styles
- `mobile-*.css`: Mobile-specific optimizations
- `premium-effects*.css`: Advanced visual effects
- `luxury-typography.css`: Typography enhancements
- `circle-animation.css`: Animation effects
- `logo-styles.css`: Logo-specific styling
- Various section-specific CSS files in docs/styles/

### JavaScript Organization
- `navigation.js`: Navigation functionality
- `animations.js`: Animation effects
- `mobile-*.js`: Mobile-specific interactions
- `iphone-interactions.js`: iOS-specific features
- Section-specific scripts (education-form.js, education-tabs.js, etc.)

### Key Features
1. **Responsive Design**: Extensive mobile optimizations
2. **Premium Effects**: Glassmorphism, parallax, animations
3. **Multiple Versions**: Enhanced and premium variants (index-enhanced.html, index-premium.html)
4. **Netlify Integration**: Headers for security, redirects for SPA behavior

### Development Considerations
- The site has multiple deployment directories (docs/, deploy/, minimal-deploy/)
- Husky and lint-staged are configured for code quality
- No build process - pure static files
- Heavy use of custom CSS animations and effects
- Mobile-first design with specific iPhone optimizations

## Project Context
- Repository URL: https://github.com/KingIVthe1st/mymanusproject
- Node version: 16 (specified in netlify.toml)
- NPM version: 8 (specified in netlify.toml)
- The project includes enhanced and premium versions of the main site for testing different visual effects