# Featured Originals Mobile Fading Fix

## Issue
On iPhone/mobile devices, the bottom 3 images in the Featured Originals section appeared faded, along with the "View All Originals" CTA button. This made them difficult to see and impossible to click.

## Root Cause
The fading was caused by multiple overlapping CSS animations, gradient overlays, and reveal-on-scroll effects that were conflicting on mobile devices, particularly iOS Safari.

## Solution Implemented

### 1. Created `featured-originals-mobile-ultimate-fix.css`
This comprehensive CSS file:
- Removes ALL animations and transitions from the artwork section on mobile
- Forces full opacity on all elements
- Removes gradient overlays that were causing the fade effect
- Fixes z-index hierarchy to ensure clickability
- Includes iOS-specific fixes for Safari

### 2. Created `featured-originals-ultimate-fix.js`
This JavaScript file:
- Runs at multiple points to ensure fixes are applied
- Removes animation classes that cause fading
- Forces inline styles with !important declarations
- Uses mutation observer to catch dynamic changes
- Includes touch event handlers for mobile

### 3. Updated `index.html`
- Added links to both new files in the head section
- Files are loaded after existing fixes to ensure they take priority

## Technical Details

The fix addresses:
- CSS animation conflicts (fade-in, reveal-on-scroll)
- Gradient overlay transparency issues
- iOS Safari rendering quirks
- Z-index stacking context problems
- Touch event handling on mobile

## Testing
1. Local server is running at http://localhost:8300
2. Open this URL on your iPhone to test
3. All 6 artwork images should now be fully visible
4. The "View All Originals" button should be clickable
5. No fading or transparency issues should remain

## Files Modified
- `/docs/index.html` - Added new CSS and JS file references
- `/docs/styles/featured-originals-mobile-ultimate-fix.css` - New comprehensive CSS fix
- `/docs/scripts/featured-originals-ultimate-fix.js` - New JavaScript enforcement

The fix uses a "nuclear option" approach, completely removing all effects that could cause fading on mobile while preserving the desktop experience.
