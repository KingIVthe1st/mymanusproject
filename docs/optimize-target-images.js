#!/usr/bin/env node

/**
 * Target Image Optimization - 4 Specific Images
 * Optimizing: amiraartscreen.png, commisionartimage.png, amirainfrontofclass.jpeg, camel.png
 * June 7, 2025 - Continuing optimization work from previous sessions
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

// Target images to optimize
const targetImages = [
  {
    path: 'education/amiraartscreen.png',
    baseName: 'amiraartscreen',
    section: 'Education section'
  },
  {
    path: 'commisionartimage.png', 
    baseName: 'commisionartimage',
    section: 'Commission section'
  },
  {
    path: 'education/amirainfrontofclass.jpeg',
    baseName: 'amirainfrontofclass', 
    section: 'Speaking section'
  },
  {
    path: 'camel.png',
    baseName: 'camel',
    section: 'Contact section'
  }
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

async function optimizeImage(inputPath, outputDir, baseName, section) {
  const stats = { original: 0, optimized: 0, formats: [] };
  
  try {
    // Get original size
    stats.original = await getFileSize(inputPath);
    
    console.log(`🎨 Processing: ${baseName} (${section})`);
    
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
      
      console.log(`   ✨ Generated ${sizeName}: WebP, AVIF, JPG`);
    }
    
    // Calculate optimized sizes
    for (const format of stats.formats) {
      const size = await getFileSize(format.path);
      stats.optimized += size;
    }
    
    const avgOptimizedSize = stats.optimized / stats.formats.length;
    const savings = ((stats.original - avgOptimizedSize) / stats.original * 100).toFixed(1);
    console.log(`   💾 Average savings: ${savings}% per format\n`);
    
    return stats;
    
  } catch (error) {
    console.error(`❌ Error processing ${baseName}:`, error.message);
    return stats;
  }
}

async function main() {
  console.log('🚀 Target Image Optimization - 4 Specific Images');
  console.log('🎯 Continuing optimization work from previous sessions\n');
  
  // Ensure output directory exists
  await ensureDir(config.outputDir);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processedCount = 0;
  
  console.log('📸 Processing Target Images:');
  console.log('=' .repeat(60));
  
  for (const imageConfig of targetImages) {
    const inputPath = path.join(config.inputDir, imageConfig.path);
    
    try {
      await fs.access(inputPath);
      const stats = await optimizeImage(inputPath, config.outputDir, imageConfig.baseName, imageConfig.section);
      totalOriginal += stats.original;
      totalOptimized += stats.optimized;
      processedCount++;
    } catch (error) {
      console.log(`⚠️  Skipping ${imageConfig.path} (file not found)`);
    }
  }
  
  // Calculate overall savings
  const averageOptimizedPerFormat = totalOptimized / (processedCount * 9); // 3 formats × 3 sizes
  const overallSavings = ((totalOriginal - averageOptimizedPerFormat) / totalOriginal * 100).toFixed(1);
  
  console.log('\n📊 TARGET OPTIMIZATION RESULTS:');
  console.log('=' .repeat(60));
  console.log(`🔢 Images processed: ${processedCount}/4`);
  console.log(`📦 Original total size: ${await formatFileSize(totalOriginal)}`);
  console.log(`⚡ Average optimized size per format: ${await formatFileSize(averageOptimizedPerFormat)}`);
  console.log(`💰 Average bandwidth savings: ${overallSavings}%`);
  
  console.log('\n✅ Optimized variants generated for:');
  for (const imageConfig of targetImages) {
    console.log(`   🎨 ${imageConfig.baseName} (${imageConfig.section})`);
  }
  
  console.log('\n🚀 Target optimization complete!');
  console.log('📋 Next step: Update HTML to use <picture> elements');
}

// Run the optimization
main().catch(console.error);
