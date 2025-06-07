// Remaining Image Optimization Script - Convert 9 remaining images to picture elements
// This script efficiently converts the remaining unoptimized images to complete 100% optimization

const remainingImages = [
    // Logo (line 441, 464)
    {
        originalPath: 'images/logo/amira-logo.webp',
        optimizedName: 'amira-logo',
        alt: 'Amira Rahim',
        class: 'logo-image'
    },
    
    // Education section images (lines ~1523, 1593, 1650)
    {
        originalPath: 'images/education/amiraartscreen.png',
        optimizedName: 'amiraartscreen',
        alt: 'Art Workshop',
        class: 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
    },
    
    // Commission artwork image (line ~1883)
    {
        originalPath: 'images/commissionartimage.jpeg',
        optimizedName: 'commissionartimage',
        alt: 'Commission Artwork',
        class: 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
    },
    
    // Paint to Prosper book (line ~1913)
    {
        originalPath: 'images/paint_to_prosper_book.jpeg',
        optimizedName: 'paint_to_prosper_book',
        alt: 'Paint to Prosper Book',
        class: 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
    },
    
    // Camel image (line ~2507)
    {
        originalPath: 'images/camel.png',
        optimizedName: 'camel',
        alt: 'Camel Artwork',
        class: 'w-full h-auto'
    },
    
    // Additional artwork images that may be referenced
    {
        originalPath: 'images/artwork/new_beginnings_print.jpeg',
        optimizedName: 'new_beginnings_print',
        alt: 'New Beginnings Print',
        class: 'w-full h-full object-cover'
    },
    
    {
        originalPath: 'images/artwork/hopeless_romantic_print.jpeg',
        optimizedName: 'hopeless_romantic_print',
        alt: 'Hopeless Romantic Print',
        class: 'w-full h-full object-cover'
    },
    
    {
        originalPath: 'images/artwork/dressed_to_impress_painting.jpeg',
        optimizedName: 'dressed_to_impress_painting',
        alt: 'Dressed to Impress Painting',
        class: 'w-full h-full object-cover'
    },
    
    {
        originalPath: 'images/elephantstock_abstract_art.png',
        optimizedName: 'elephantstock_abstract_art',
        alt: 'Abstract Art',
        class: 'w-full h-full object-cover'
    }
];

// Generate picture element HTML for each image
function generatePictureElement(imageConfig) {
    return `<picture>
    <source srcset="images/optimized/${imageConfig.optimizedName}-desktop.avif" type="image/avif" media="(min-width: 1024px)">
    <source srcset="images/optimized/${imageConfig.optimizedName}-desktop.webp" type="image/webp" media="(min-width: 1024px)">
    <source srcset="images/optimized/${imageConfig.optimizedName}-tablet.avif" type="image/avif" media="(min-width: 768px)">
    <source srcset="images/optimized/${imageConfig.optimizedName}-tablet.webp" type="image/webp" media="(min-width: 768px)">
    <source srcset="images/optimized/${imageConfig.optimizedName}-mobile.avif" type="image/avif" media="(max-width: 767px)">
    <source srcset="images/optimized/${imageConfig.optimizedName}-mobile.webp" type="image/webp" media="(max-width: 767px)">
    <img src="${imageConfig.originalPath}" alt="${imageConfig.alt}" class="${imageConfig.class}" loading="lazy">
</picture>`;
}

// Search and replace patterns for each image
const searchReplacePatterns = [
    // Logo optimization (navbar)
    {
        search: '<img src="images/logo/amira-logo.webp" alt="Amira Rahim" class="logo-image">',
        replace: generatePictureElement(remainingImages[0])
    },
    
    // Education section art screen
    {
        search: 'src="images/education/amiraartscreen.png"',
        replace: generatePictureElement(remainingImages[1]).replace('<img src="images/education/amiraartscreen.png"', '<img')
    },
    
    // Commission artwork image
    {
        search: 'src="images/commissionartimage.jpeg"',
        replace: generatePictureElement(remainingImages[2]).replace('<img src="images/commissionartimage.jpeg"', '<img')
    },
    
    // Paint to Prosper book
    {
        search: 'src="images/paint_to_prosper_book.jpeg"',
        replace: generatePictureElement(remainingImages[3]).replace('<img src="images/paint_to_prosper_book.jpeg"', '<img')
    },
    
    // Camel image
    {
        search: 'src="images/camel.png"',
        replace: generatePictureElement(remainingImages[4]).replace('<img src="images/camel.png"', '<img')
    }
];

console.log('🎨 REMAINING IMAGE OPTIMIZATION SCRIPT READY');
console.log(`📊 Total images to optimize: ${remainingImages.length}`);
console.log(`🔧 Search/replace patterns: ${searchReplacePatterns.length}`);
console.log('📋 Generated picture elements ready for implementation');

// Export for use in optimization
if (typeof module !== 'undefined') {
    module.exports = { remainingImages, searchReplacePatterns, generatePictureElement };
}
