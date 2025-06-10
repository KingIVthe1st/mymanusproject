// Image Performance Monitor
// Add this to the console on your main site to monitor image loading performance

(function() {
    console.log('%c🎨 About Artist Image Performance Monitor', 'background: #6B46C1; color: white; padding: 5px 10px; border-radius: 3px;');
    
    // Monitor all image loads
    const imageLoadTimes = new Map();
    const startTime = performance.now();
    
    // Observer for image loading
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('amira-about')) {
                const loadTime = Math.round(entry.responseEnd - entry.startTime);
                const size = entry.encodedBodySize ? (entry.encodedBodySize / 1024).toFixed(2) + ' KB' : 'Unknown';
                const format = entry.name.split('.').pop().toUpperCase();
                
                console.log(`%c✓ ${format} Image Loaded`, 'color: #4CAF50; font-weight: bold');
                console.log(`  📁 File: ${entry.name.split('/').pop()}`);
                console.log(`  ⏱️  Load Time: ${loadTime}ms`);
                console.log(`  📦 Size: ${size}`);
                console.log(`  🚀 Started at: ${Math.round(entry.startTime)}ms after navigation`);
                
                imageLoadTimes.set(entry.name, {
                    loadTime,
                    size,
                    format,
                    startTime: entry.startTime
                });
            }
        }
    });
    
    observer.observe({ entryTypes: ['resource'] });
    
    // Check for layout shift
    let cumulativeShift = 0;
    const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                cumulativeShift += entry.value;
                if (entry.sources) {
                    entry.sources.forEach(source => {
                        if (source.node && source.node.className && source.node.className.includes('portrait-frame')) {
                            console.log('%c⚠️  Layout Shift Detected in About Image!', 'color: #FF9800; font-weight: bold');
                            console.log(`  Shift value: ${entry.value}`);
                        }
                    });
                }
            }
        }
    });
    
    try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        console.log('Layout shift monitoring not supported in this browser');
    }
    
    // Check the actual image element
    setTimeout(() => {
        const aboutImg = document.querySelector('#about .portrait-frame img');
        if (aboutImg) {
            console.log('%c📊 About Image Element Analysis:', 'background: #2196F3; color: white; padding: 5px 10px; border-radius: 3px;');
            console.log(`  Loading attribute: ${aboutImg.loading || 'not set'}`);
            console.log(`  Fetch priority: ${aboutImg.fetchPriority || 'not set'}`);
            console.log(`  Dimensions: ${aboutImg.width}x${aboutImg.height}`);
            console.log(`  Natural dimensions: ${aboutImg.naturalWidth}x${aboutImg.naturalHeight}`);
            console.log(`  Current src: ${aboutImg.currentSrc || aboutImg.src}`);
            console.log(`  Complete: ${aboutImg.complete ? '✓ Yes' : '✗ No'}`);
            
            // Check which format was actually used
            const src = aboutImg.currentSrc || aboutImg.src;
            if (src.includes('.avif')) {
                console.log('%c🎉 Using AVIF format (best compression!)', 'color: #4CAF50; font-weight: bold');
            } else if (src.includes('.webp')) {
                console.log('%c✓ Using WebP format (good compression)', 'color: #4CAF50; font-weight: bold');
            } else {
                console.log('%c⚠️  Using fallback PNG format', 'color: #FF9800; font-weight: bold');
            }
        }
        
        // Summary
        console.log('%c📈 Performance Summary:', 'background: #9C27B0; color: white; padding: 5px 10px; border-radius: 3px;');
        console.log(`  Total images loaded: ${imageLoadTimes.size}`);
        console.log(`  Cumulative Layout Shift: ${cumulativeShift.toFixed(4)}`);
        
        if (imageLoadTimes.size > 0) {
            const times = Array.from(imageLoadTimes.values());
            const avgLoadTime = times.reduce((sum, item) => sum + item.loadTime, 0) / times.length;
            console.log(`  Average load time: ${Math.round(avgLoadTime)}ms`);
            
            // Find the image that was actually used
            const usedImage = Array.from(imageLoadTimes.entries()).find(([url]) => 
                aboutImg && (aboutImg.currentSrc === url || aboutImg.src === url)
            );
            if (usedImage) {
                console.log(`  Used image: ${usedImage[0].split('/').pop()} (${usedImage[1].size})`);
            }
        }
        
    }, 3000); // Wait 3 seconds for everything to load
    
    // Provide a function to check current status
    window.checkAboutImagePerf = function() {
        const aboutImg = document.querySelector('#about .portrait-frame img');
        if (aboutImg) {
            return {
                loaded: aboutImg.complete,
                format: aboutImg.currentSrc?.split('.').pop() || 'unknown',
                dimensions: `${aboutImg.naturalWidth}x${aboutImg.naturalHeight}`,
                loadTimes: Object.fromEntries(imageLoadTimes),
                layoutShift: cumulativeShift
            };
        }
        return null;
    };
    
    console.log('%cTip: Run checkAboutImagePerf() anytime to see current stats', 'color: #666; font-style: italic');
    
})();
