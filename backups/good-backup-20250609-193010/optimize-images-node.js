#!/usr/bin/env node

/**
 * Phase 2: Advanced Image Optimization
 * Generates WebP, AVIF, and responsive variants
 * Target: 70% bandwidth reduction
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Install Sharp if not available
try {
  require('sharp');
  console.log('✅ Sharp is available');
} catch (error) {
  console.log('📦 Installing Sharp...');
  execSync('npm install sharp', { stdio: 'inherit' });
  console.log('✅ Sharp installed successfully');
}

const sharp = require('sharp');

// Configuration
const config = {
  inputDir: './images',
  outputDir: './images/optimized',
  sizes: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440
  },
  quality: {
    webp: { mobile: 80, tablet: 85, desktop: 90 },
    avif: { mobile: 70, tablet: 75, desktop: 80 },
    jpg: { mobile: 75, tablet: 80, desktop: 85 }
  }
};

// Critical images to optimize
const criticalImages = [
  'amira-header.png',
  'amira-about.png', 
  'amira-portrait-new.png',
  'amira-yellow-dress.png',
  'amira-portrait-enhanced.png'
];

// Artwork images
const artworkImages = [
  'artwork/rainbow_spectrum.jpeg',
  'artwork/eden_original_painting.jpeg', 
  'artwork/festival_original_painting.jpeg',
  'artwork/jubilee_original_painting.jpeg',
  'artwork/bloom_original_painting.jpeg',
  'artwork/radiance_original_painting.jpeg'
];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

async function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

async function optimizeImage(inputPath, outputDir, baseName) {
  const stats = { original: 0, optimized: 0, formats: [] };
  
  try {
    // Get original size
    stats.original = await getFileSize(inputPath);
    
    console.log(`🎨 Processing: ${baseName}`);
    
    // Load image with Sharp
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`   📐 Original: ${metadata.width}x${metadata.height} (${await formatFileSize(stats.original)})`);
    
    // Generate optimized variants for each size and format
    for (const [sizeName, width] of Object.entries(config.sizes)) {
      const resizedImage = image.clone().resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      });
      
      // WebP
      const webpPath = path.join(outputDir, `${baseName}-${sizeName}.webp`);
      await resizedImage.clone()
        .webp({ quality: config.quality.webp[sizeName], effort: 6 })
        .toFile(webpPath);
      stats.formats.push({ format: 'webp', size: sizeName, path: webpPath });
      
      // AVIF (better compression)
      const avifPath = path.join(outputDir, `${baseName}-${sizeName}.avif`);
      await resizedImage.clone()
        .avif({ quality: config.quality.avif[sizeName], effort: 6 })
        .toFile(avifPath);
      stats.formats.push({ format: 'avif', size: sizeName, path: avifPath });
      
      // JPG fallback
      const jpgPath = path.join(outputDir, `${baseName}-${sizeName}.jpg`);
      await resizedImage.clone()
        .jpeg({ quality: config.quality.jpg[sizeName], progressive: true })
        .toFile(jpgPath);
      stats.formats.push({ format: 'jpg', size: sizeName, path: jpgPath });
      
      console.log(`   ✨ Generated ${sizeName}: WebP, AVIF, JPG (${width}px width)`);
    }
    
    // Calculate optimized sizes
    for (const format of stats.formats) {
      const size = await getFileSize(format.path);
      stats.optimized += size;
    }
    
    const savings = ((stats.original - (stats.optimized / stats.formats.length * 3)) / stats.original * 100).toFixed(1);
    console.log(`   💾 Average savings per format: ${savings}%\n`);
    
    return stats;
    
  } catch (error) {
    console.error(`❌ Error processing ${baseName}:`, error.message);
    return stats;
  }
}

async function generatePictureElements() {
  const pictureElements = [];
  
  // Generate picture elements for critical images
  for (const imageName of criticalImages) {
    const baseName = path.parse(imageName).name;
    const ext = path.parse(imageName).ext;
    
    const pictureElement = `
<!-- ${imageName} - Optimized responsive image -->
<picture>
  <!-- AVIF format (best compression) -->
  <source
    srcset="
      images/optimized/${baseName}-mobile.avif 768w,
      images/optimized/${baseName}-tablet.avif 1024w,
      images/optimized/${baseName}-desktop.avif 1440w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
    type="image/avif">
  
  <!-- WebP format (good compression) -->
  <source
    srcset="
      images/optimized/${baseName}-mobile.webp 768w,
      images/optimized/${baseName}-tablet.webp 1024w,
      images/optimized/${baseName}-desktop.webp 1440w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
    type="image/webp">
  
  <!-- JPG fallback -->
  <img
    src="images/optimized/${baseName}-desktop.jpg"
    srcset="
      images/optimized/${baseName}-mobile.jpg 768w,
      images/optimized/${baseName}-tablet.jpg 1024w,
      images/optimized/${baseName}-desktop.jpg 1440w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
    alt="Amira Rahim"
    loading="lazy"
    decoding="async">
</picture>`;
    
    pictureElements.push(pictureElement);
  }
  
  return pictureElements.join('\n\n');
}

async function main() {
  console.log('🚀 Starting Phase 2: Advanced Image Optimization');
  console.log('🎯 Target: 70% bandwidth reduction\n');
  
  // Ensure output directory exists
  await ensureDir(config.outputDir);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;
  
  // Process critical images
  console.log('📸 Processing Critical Images:');
  console.log('=' .repeat(50));
  
  for (const imageName of criticalImages) {
    const inputPath = path.join(config.inputDir, imageName);
    const baseName = path.parse(imageName).name;
    
    try {
      await fs.access(inputPath);
      const stats = await optimizeImage(inputPath, config.outputDir, baseName);
      totalOriginal += stats.original;
      totalOptimized += stats.optimized;
      processedCount++;
    } catch (error) {
      console.log(`⚠️  Skipping ${imageName} (file not found)`);
    }
  }
  
  // Process artwork images
  console.log('\n🎨 Processing Artwork Gallery:');
  console.log('=' .repeat(50));
  
  for (const imageName of artworkImages) {
    const inputPath = path.join(config.inputDir, imageName);
    const baseName = path.parse(imageName).name;
    
    try {
      await fs.access(inputPath);
      const stats = await optimizeImage(inputPath, config.outputDir, baseName);
      totalOriginal += stats.original;
      totalOptimized += stats.optimized;
      processedCount++;
    } catch (error) {
      console.log(`⚠️  Skipping ${imageName} (file not found)`);
    }
  }
  
  // Calculate overall savings
  const averageOptimizedPerFormat = totalOptimized / (processedCount * 3 * 3); // 3 formats, 3 sizes each
  const overallSavings = ((totalOriginal - averageOptimizedPerFormat) / totalOriginal * 100).toFixed(1);
  
  console.log('\n📊 OPTIMIZATION RESULTS:');
  console.log('=' .repeat(50));
  console.log(`🔢 Images processed: ${processedCount}`);
  console.log(`📦 Original total size: ${await formatFileSize(totalOriginal)}`);
  console.log(`⚡ Average optimized size per format: ${await formatFileSize(averageOptimizedPerFormat)}`);
  console.log(`💰 Average bandwidth savings: ${overallSavings}%`);
  console.log(`🎯 Target achieved: ${overallSavings >= 70 ? '✅ YES' : '❌ NO'} (target: 70%)`);
  
  // Generate picture elements
  const pictureElements = await generatePictureElements();
  await fs.writeFile('./picture-elements.html', pictureElements);
  console.log('\n📝 Generated picture-elements.html with responsive HTML');
  
  console.log('\n🚀 Phase 2 optimization complete!');
  console.log('📋 Next steps:');
  console.log('   1. Update HTML to use <picture> elements from picture-elements.html');
  console.log('   2. Test the optimization system');
  console.log('   3. Verify 70% bandwidth reduction achieved');
}

// Run the optimization
main().catch(console.error);
