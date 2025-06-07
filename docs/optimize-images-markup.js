/**
 * Image Optimization Markup Converter
 * Converts standard img tags to optimized picture elements
 * Supports AVIF, WebP, and JPG fallbacks with responsive breakpoints
 */

class ImageMarkupOptimizer {
    constructor() {
        this.init();
    }

    init() {
        console.log('🎨 Image Optimization Markup Converter - Starting...');
        this.convertImages();
        console.log('✅ Image optimization markup conversion complete!');
    }

    // Convert specific images to optimized picture elements
    convertImages() {
        // Main hero image - amira-header.png
        this.convertImage(
            'img[src="images/amira-header.png"]',
            'amira-header',
            'Amira Rahim'
        );

        // About section image - amira-about.png
        this.convertImage(
            'img[src="images/amira-about.png"]',
            'amira-about',
            'Amira Rahim'
        );

        // Artwork gallery images
        this.convertArtworkImage('rainbow_spectrum', 'Rainbow Spectrum');
        this.convertArtworkImage('eden_original_painting', 'Eden');
        this.convertArtworkImage('festival_original_painting', 'Festival');
        this.convertArtworkImage('jubilee_original_painting', 'Jubilee');
        this.convertArtworkImage('bloom_original_painting', 'Bloom');
        this.convertArtworkImage('radiance_original_painting', 'Radiance');
    }

    convertImage(selector, baseName, altText) {
        const img = document.querySelector(selector);
        if (!img) return;

        const pictureElement = this.createPictureElement(baseName, altText, img.className);
        img.parentNode.replaceChild(pictureElement, img);
        
        console.log(`✓ Converted ${baseName} to optimized picture element`);
    }

    convertArtworkImage(imageName, altText) {
        const img = document.querySelector(`img[src*="${imageName}"]`);
        if (!img) return;

        const pictureElement = this.createPictureElement(imageName, altText, img.className);
        img.parentNode.replaceChild(pictureElement, img);
        
        console.log(`✓ Converted artwork ${imageName} to optimized picture element`);
    }

    createPictureElement(baseName, altText, className = '') {
        const picture = document.createElement('picture');
        
        // Desktop AVIF (1024px+)
        const desktopAvif = document.createElement('source');
        desktopAvif.srcset = `images/optimized/${baseName}-desktop.avif`;
        desktopAvif.type = 'image/avif';
        desktopAvif.media = '(min-width: 1024px)';
        picture.appendChild(desktopAvif);

        // Desktop WebP (1024px+)
        const desktopWebp = document.createElement('source');
        desktopWebp.srcset = `images/optimized/${baseName}-desktop.webp`;
        desktopWebp.type = 'image/webp';
        desktopWebp.media = '(min-width: 1024px)';
        picture.appendChild(desktopWebp);

        // Tablet AVIF (768px - 1023px)
        const tabletAvif = document.createElement('source');
        tabletAvif.srcset = `images/optimized/${baseName}-tablet.avif`;
        tabletAvif.type = 'image/avif';
        tabletAvif.media = '(min-width: 768px) and (max-width: 1023px)';
        picture.appendChild(tabletAvif);

        // Tablet WebP (768px - 1023px)
        const tabletWebp = document.createElement('source');
        tabletWebp.srcset = `images/optimized/${baseName}-tablet.webp`;
        tabletWebp.type = 'image/webp';
        tabletWebp.media = '(min-width: 768px) and (max-width: 1023px)';
        picture.appendChild(tabletWebp);

        // Mobile AVIF (<768px)
        const mobileAvif = document.createElement('source');
        mobileAvif.srcset = `images/optimized/${baseName}-mobile.avif`;
        mobileAvif.type = 'image/avif';
        mobileAvif.media = '(max-width: 767px)';
        picture.appendChild(mobileAvif);

        // Mobile WebP (<768px)
        const mobileWebp = document.createElement('source');
        mobileWebp.srcset = `images/optimized/${baseName}-mobile.webp`;
        mobileWebp.type = 'image/webp';
        mobileWebp.media = '(max-width: 767px)';
        picture.appendChild(mobileWebp);

        // Fallback IMG element (JPG)
        const fallbackImg = document.createElement('img');
        fallbackImg.src = `images/optimized/${baseName}-desktop.jpg`;
        fallbackImg.alt = altText;
        fallbackImg.className = className;
        fallbackImg.loading = 'lazy';
        picture.appendChild(fallbackImg);

        return picture;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImageMarkupOptimizer();
    });
} else {
    new ImageMarkupOptimizer();
}
