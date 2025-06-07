#!/bin/bash
# Phase 2: Image Optimization Script
# Generates WebP and responsive image variants
# Expected bandwidth reduction: 70%

echo "🎨 Starting Phase 2 Image Optimization..."
echo "Target: 70% bandwidth reduction"

# Create optimized directory
mkdir -p images/optimized

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/"
    exit 1
fi

# Convert critical images with progressive enhancement
echo "Converting images/amira-header.png..."
convert "images/amira-header.png" -resize 400x -quality 85 -format webp "images/optimized/amira-header-mobile.webp"
convert "images/amira-header.png" -resize 600x -quality 90 -format webp "images/optimized/amira-header-tablet.webp"
convert "images/amira-header.png" -resize 800x -quality 95 -format webp "images/optimized/amira-header-desktop.webp"
convert "images/amira-header.png" -resize 400x -quality 80 -format jpg "images/optimized/amira-header-mobile.jpg"
convert "images/amira-header.png" -resize 600x -quality 85 -format jpg "images/optimized/amira-header-tablet.jpg"
convert "images/amira-header.png" -resize 800x -quality 90 -format jpg "images/optimized/amira-header-desktop.jpg"

echo "Converting images/amira-about.png..."
convert "images/amira-about.png" -resize 350x -quality 85 -format webp "images/optimized/amira-about-mobile.webp"
convert "images/amira-about.png" -resize 500x -quality 90 -format webp "images/optimized/amira-about-tablet.webp"
convert "images/amira-about.png" -resize 700x -quality 95 -format webp "images/optimized/amira-about-desktop.webp"
convert "images/amira-about.png" -resize 350x -quality 80 -format jpg "images/optimized/amira-about-mobile.jpg"
convert "images/amira-about.png" -resize 500x -quality 85 -format jpg "images/optimized/amira-about-tablet.jpg"
convert "images/amira-about.png" -resize 700x -quality 90 -format jpg "images/optimized/amira-about-desktop.jpg"

# Convert artwork gallery images
echo "Converting images/artwork/rainbow_spectrum.jpeg..."
convert "images/artwork/rainbow_spectrum.jpeg" -resize 400x -quality 85 -format webp "images/optimized/rainbow_spectrum-mobile.webp"
convert "images/artwork/rainbow_spectrum.jpeg" -resize 600x -quality 90 -format webp "images/optimized/rainbow_spectrum-tablet.webp"
convert "images/artwork/rainbow_spectrum.jpeg" -resize 800x -quality 95 -format webp "images/optimized/rainbow_spectrum-desktop.webp"
convert "images/artwork/rainbow_spectrum.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/rainbow_spectrum-mobile.jpg"
convert "images/artwork/rainbow_spectrum.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/rainbow_spectrum-tablet.jpg"
convert "images/artwork/rainbow_spectrum.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/rainbow_spectrum-desktop.jpg"

echo "Converting images/artwork/eden_original_painting.jpeg..."
convert "images/artwork/eden_original_painting.jpeg" -resize 400x -quality 85 -format webp "images/optimized/eden_original_painting-mobile.webp"
convert "images/artwork/eden_original_painting.jpeg" -resize 600x -quality 90 -format webp "images/optimized/eden_original_painting-tablet.webp"
convert "images/artwork/eden_original_painting.jpeg" -resize 800x -quality 95 -format webp "images/optimized/eden_original_painting-desktop.webp"
convert "images/artwork/eden_original_painting.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/eden_original_painting-mobile.jpg"
convert "images/artwork/eden_original_painting.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/eden_original_painting-tablet.jpg"
convert "images/artwork/eden_original_painting.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/eden_original_painting-desktop.jpg"

echo "Converting images/artwork/festival_original_painting.jpeg..."
convert "images/artwork/festival_original_painting.jpeg" -resize 400x -quality 85 -format webp "images/optimized/festival_original_painting-mobile.webp"
convert "images/artwork/festival_original_painting.jpeg" -resize 600x -quality 90 -format webp "images/optimized/festival_original_painting-tablet.webp"
convert "images/artwork/festival_original_painting.jpeg" -resize 800x -quality 95 -format webp "images/optimized/festival_original_painting-desktop.webp"
convert "images/artwork/festival_original_painting.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/festival_original_painting-mobile.jpg"
convert "images/artwork/festival_original_painting.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/festival_original_painting-tablet.jpg"
convert "images/artwork/festival_original_painting.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/festival_original_painting-desktop.jpg"

echo "Converting images/artwork/jubilee_original_painting.jpeg..."
convert "images/artwork/jubilee_original_painting.jpeg" -resize 400x -quality 85 -format webp "images/optimized/jubilee_original_painting-mobile.webp"
convert "images/artwork/jubilee_original_painting.jpeg" -resize 600x -quality 90 -format webp "images/optimized/jubilee_original_painting-tablet.webp"
convert "images/artwork/jubilee_original_painting.jpeg" -resize 800x -quality 95 -format webp "images/optimized/jubilee_original_painting-desktop.webp"
convert "images/artwork/jubilee_original_painting.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/jubilee_original_painting-mobile.jpg"
convert "images/artwork/jubilee_original_painting.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/jubilee_original_painting-tablet.jpg"
convert "images/artwork/jubilee_original_painting.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/jubilee_original_painting-desktop.jpg"

echo "Converting images/artwork/bloom_original_painting.jpeg..."
convert "images/artwork/bloom_original_painting.jpeg" -resize 400x -quality 85 -format webp "images/optimized/bloom_original_painting-mobile.webp"
convert "images/artwork/bloom_original_painting.jpeg" -resize 600x -quality 90 -format webp "images/optimized/bloom_original_painting-tablet.webp"
convert "images/artwork/bloom_original_painting.jpeg" -resize 800x -quality 95 -format webp "images/optimized/bloom_original_painting-desktop.webp"
convert "images/artwork/bloom_original_painting.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/bloom_original_painting-mobile.jpg"
convert "images/artwork/bloom_original_painting.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/bloom_original_painting-tablet.jpg"
convert "images/artwork/bloom_original_painting.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/bloom_original_painting-desktop.jpg"

echo "Converting images/artwork/radiance_original_painting.jpeg..."
convert "images/artwork/radiance_original_painting.jpeg" -resize 400x -quality 85 -format webp "images/optimized/radiance_original_painting-mobile.webp"
convert "images/artwork/radiance_original_painting.jpeg" -resize 600x -quality 90 -format webp "images/optimized/radiance_original_painting-tablet.webp"
convert "images/artwork/radiance_original_painting.jpeg" -resize 800x -quality 95 -format webp "images/optimized/radiance_original_painting-desktop.webp"
convert "images/artwork/radiance_original_painting.jpeg" -resize 400x -quality 80 -format jpg "images/optimized/radiance_original_painting-mobile.jpg"
convert "images/artwork/radiance_original_painting.jpeg" -resize 600x -quality 85 -format jpg "images/optimized/radiance_original_painting-tablet.jpg"
convert "images/artwork/radiance_original_painting.jpeg" -resize 800x -quality 90 -format jpg "images/optimized/radiance_original_painting-desktop.jpg"

# Generate size report
echo ""
echo "📊 Optimization Results:"
echo "Original sizes:"
du -sh images/*.png images/*.jpg images/*.jpeg 2>/dev/null | sort -hr

echo ""
echo "Optimized sizes:"
du -sh images/optimized/* 2>/dev/null | sort -hr

echo ""
echo "🚀 Phase 2 optimization complete!"
echo "Expected bandwidth savings: 70%"
echo "Next: Update HTML to use responsive images with <picture> elements"
