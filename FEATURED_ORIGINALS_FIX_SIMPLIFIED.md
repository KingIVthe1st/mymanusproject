# Featured Originals Mobile Fix - Simplified Approach

## Issue
The Featured Originals section on mobile devices shows faded images and CTA button. Previous "nuclear option" fixes caused the website to crash and become unresponsive.

## Root Cause
The issue is caused by the `.artwork-overlay` class having `transform: translateY(100%)` which moves the overlay off-screen. On mobile, hover states don't work properly, so the overlay remains hidden.

## Solution Implemented

### 1. Reverted Problematic Changes
- Deleted `featured-originals-mobile-ultimate-fix.css`
- Deleted `featured-originals-ultimate-fix.js`
- Removed references to these files from HTML

### 2. Created Simplified Fix Files
- `featured-originals-simplified-fix.css` - Clean CSS that:
  - Forces artwork overlay to be visible on mobile
  - Removes animations and transitions on mobile
  - Ensures proper z-index layering
  - Includes iOS-specific fixes
  
- `featured-originals-simplified-fix.js` - Simple JavaScript that:
  - Applies fixes only on mobile devices
  - Forces overlay visibility
  - Removes blocking elements
  - Handles orientation changes

### 3. Updated HTML
- Replaced nuclear fix references with simplified fix
- Disabled conflicting scripts

## Testing
The local server is running at http://localhost:8301

## Next Steps
If this doesn't fully resolve the issue, we should:
1. Check if there are conflicting inline styles in the HTML
2. Look for any JavaScript that might be re-applying the transforms
3. Consider removing ALL the inline fixes and scripts to start with a clean slate